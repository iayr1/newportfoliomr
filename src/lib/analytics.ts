import { db } from "./firebase";
import { collection, addDoc, doc, setDoc, updateDoc, increment } from "firebase/firestore";
import { getGeoInfo } from "./api/geo.functions";

type UA = {
  device: "Mobile" | "Tablet" | "Desktop";
  os: string;
  browser: string;
};

function parseUA(): UA {
  const ua = navigator.userAgent;
  const isTablet = /iPad|Tablet/i.test(ua);
  const isMobile = !isTablet && /Mobi|Android|iPhone/i.test(ua);
  const device = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";
  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua) && !/Mobile/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iOS/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";
  let browser = "Other";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/Chrome\//.test(ua) && !/Edg|OPR/.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = "Safari";
  return { device, os, browser };
}

function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch (e) {
      // Fallback
    }
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getOrCreateVisitorId(): { id: string; isNew: boolean } {
  const key = "visitor_id";
  let id: string | null = null;
  try {
    id = localStorage.getItem(key);
  } catch (e) {
    console.warn("localStorage is not accessible:", e);
  }
  let isNew = false;
  if (!id) {
    id = generateUUID();
    try {
      localStorage.setItem(key, id);
    } catch (e) {
      console.warn("Could not save visitor_id to localStorage:", e);
    }
    isNew = true;
  }
  return { id, isNew };
}

let sessionId: string | null = null;
let sessionStart = 0;
let pageViews = 0;
let entryPage = "";
let lastPage = "";
let lastTrackedPath = "";
let geo: { country?: string; city?: string; region?: string; ip?: string; isp?: string } = {};
let heartbeatInterval: ReturnType<typeof setInterval> | null = null;

async function fetchGeo() {
  try {
    // 1. Try server-side lookup via TanStack Start server function
    const serverGeo = await getGeoInfo();
    if (serverGeo && serverGeo.ip) {
      geo = serverGeo;
      return;
    }
  } catch (err) {
    console.warn("Server geo lookup failed, trying client fallback:", err);
  }

  // 2. Client-side fallback APIs in sequence
  const apis = [
    async () => {
      const res = await fetch("https://ipwho.is/");
      if (!res.ok) throw new Error("ipwho.is client failed");
      const j = await res.json();
      if (!j.success) throw new Error("ipwho.is client unsuccessful");
      return {
        country: j.country || null,
        city: j.city || null,
        region: j.region || null,
        ip: j.ip || null,
        isp: j.connection?.isp || j.connection?.org || null,
      };
    },
    async () => {
      const res = await fetch("https://ipapi.co/json/");
      if (!res.ok) throw new Error("ipapi.co client failed");
      const j = await res.json();
      return {
        country: j.country_name || null,
        city: j.city || null,
        region: j.region || null,
        ip: j.ip || null,
        isp: j.org || null,
      };
    },
    async () => {
      const res = await fetch("https://ipinfo.io/json");
      if (!res.ok) throw new Error("ipinfo.io client failed");
      const j = await res.json();
      return {
        country: j.country || null,
        city: j.city || null,
        region: j.region || null,
        ip: j.ip || null,
        isp: j.org || null,
      };
    },
  ];

  for (const api of apis) {
    try {
      const data = await api();
      if (data && data.ip) {
        geo = data;
        return;
      }
    } catch (err) {
      console.warn("Client Geo API fallback failed, trying next:", err);
    }
  }
}

function startHeartbeat() {
  if (heartbeatInterval) return;
  heartbeatInterval = setInterval(() => {
    if (!sessionId) return;
    const duration = Math.round((Date.now() - sessionStart) / 1000);
    updateDoc(doc(db, "sessions", sessionId), {
      duration,
      endedAt: new Date(),
    }).catch(() => {});
  }, 15000); // every 15 seconds
}

export async function initSession() {
  if (sessionId) return;
  try {
    sessionId = generateUUID();
    sessionStart = Date.now();
    pageViews = 0;
    entryPage = window.location.pathname;
    lastPage = entryPage;
    const { id: visitorId, isNew } = getOrCreateVisitorId();
    const ua = parseUA();
    await fetchGeo();
    const params = new URLSearchParams(window.location.search);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn = (navigator as any).connection || {};

    await setDoc(doc(db, "sessions", sessionId), {
      visitorId,
      isNewVisitor: isNew,
      startedAt: new Date(),
      entryPage,
      referrer: document.referrer || "Direct",
      userAgent: navigator.userAgent,
      device: ua.device,
      os: ua.os,
      browser: ua.browser,
      language: navigator.language,
      screen: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      country: geo.country || null,
      city: geo.city || null,
      region: geo.region || null,
      ip: geo.ip || null,
      isp: geo.isp || null,
      connectionType: conn.effectiveType || null,
      downlink: conn.downlink || null,
      utm: {
        source: params.get("utm_source"),
        medium: params.get("utm_medium"),
        campaign: params.get("utm_campaign"),
        term: params.get("utm_term"),
        content: params.get("utm_content"),
      },
      pageViews: 0,
    });

    trackPageView(window.location.pathname);
    startHeartbeat();

    const endSession = () => {
      if (!sessionId) return;
      const duration = Math.round((Date.now() - sessionStart) / 1000);
      updateDoc(doc(db, "sessions", sessionId), {
        duration,
        exitPage: lastPage,
        endedAt: new Date(),
      }).catch(() => {});
    };
    window.addEventListener("beforeunload", endSession);
    window.addEventListener("pagehide", endSession);
  } catch (err) {
    console.error("initSession failed:", err);
  }
}

export async function trackPageView(path: string) {
  if (!sessionId) return;
  if (lastTrackedPath === path) return;
  lastTrackedPath = path;
  pageViews += 1;
  lastPage = path;
  try {
    await addDoc(collection(db, "pageviews"), {
      sessionId,
      path,
      timestamp: new Date(),
    });
    await updateDoc(doc(db, "sessions", sessionId), {
      pageViews: increment(1),
      exitPage: path,
    });
  } catch (err) {
    console.error("trackPageView failed:", err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function trackEvent(name: string, data: Record<string, any> = {}) {
  try {
    let visitorId = null;
    try {
      visitorId = localStorage.getItem("visitor_id");
    } catch (err) {
      // Ignore localStorage read failure
    }
    await addDoc(collection(db, "events"), {
      name,
      sessionId,
      visitorId,
      data,
      path: window.location.pathname,
      timestamp: new Date(),
    });
  } catch (err) {
    console.error("trackEvent failed:", err);
  }
}

export async function trackDownload(type: "resume" | "portfolio" | "brochure", url?: string) {
  await trackEvent("download", { type, url });
}

import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().max(2000).optional(),
  phone: z.string().trim().max(40).optional(),
});

export async function trackLead(data: {
  name: string;
  email: string;
  message?: string;
  phone?: string;
}) {
  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid lead data");
  }
  try {
    let visitorId = null;
    try {
      visitorId = localStorage.getItem("visitor_id");
    } catch (err) {
      // Ignore localStorage read failure
    }
    await addDoc(collection(db, "leads"), {
      ...parsed.data,
      sessionId,
      visitorId,
      timestamp: new Date(),
    });
  } catch (err) {
    console.error("trackLead failed:", err);
  }
}
