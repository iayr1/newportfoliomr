import { db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

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

function getOrCreateVisitorId(): { id: string; isNew: boolean } {
  const key = "visitor_id";
  let id = localStorage.getItem(key);
  let isNew = false;
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
    isNew = true;
  }
  return { id, isNew };
}

let sessionId: string | null = null;
let sessionStart = 0;
let pageViews = 0;
let entryPage = "";
let lastPage = "";
let geo: { country?: string; city?: string; region?: string; ip?: string } = {};

async function fetchGeo() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (res.ok) {
      const j = await res.json();
      geo = { country: j.country_name, city: j.city, region: j.region, ip: j.ip };
    }
  } catch {}
}

export async function initSession() {
  if (sessionId) return;
  sessionId = crypto.randomUUID();
  sessionStart = Date.now();
  pageViews = 0;
  entryPage = window.location.pathname;
  lastPage = entryPage;
  const { id: visitorId, isNew } = getOrCreateVisitorId();
  const ua = parseUA();
  await fetchGeo();
  const params = new URLSearchParams(window.location.search);
  const conn = (navigator as any).connection || {};

  await setDoc(doc(db, "sessions", sessionId), {
    visitorId,
    isNewVisitor: isNew,
    startedAt: serverTimestamp(),
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

  const endSession = () => {
    if (!sessionId) return;
    const duration = Math.round((Date.now() - sessionStart) / 1000);
    const payload = JSON.stringify({
      sessionId,
      duration,
      exitPage: lastPage,
      endedAt: new Date().toISOString(),
    });
    navigator.sendBeacon?.(
      `https://firestore.googleapis.com/v1/projects/portfolio-44af5/databases/(default)/documents/session_ends`,
      new Blob([payload], { type: "application/json" }),
    );
    updateDoc(doc(db, "sessions", sessionId), {
      duration,
      exitPage: lastPage,
      endedAt: serverTimestamp(),
    }).catch(() => {});
  };
  window.addEventListener("beforeunload", endSession);
  window.addEventListener("pagehide", endSession);
}

export async function trackPageView(path: string) {
  if (!sessionId) return;
  pageViews += 1;
  lastPage = path;
  try {
    await addDoc(collection(db, "pageviews"), {
      sessionId,
      path,
      timestamp: serverTimestamp(),
    });
    await updateDoc(doc(db, "sessions", sessionId), {
      pageViews: increment(1),
      exitPage: path,
    });
  } catch {}
}

export async function trackEvent(name: string, data: Record<string, any> = {}) {
  try {
    await addDoc(collection(db, "events"), {
      name,
      sessionId,
      visitorId: localStorage.getItem("visitor_id"),
      data,
      path: window.location.pathname,
      timestamp: serverTimestamp(),
    });
  } catch {}
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

export async function trackLead(data: { name: string; email: string; message?: string; phone?: string }) {
  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid lead data");
  }
  try {
    await addDoc(collection(db, "leads"), {
      ...parsed.data,
      sessionId,
      visitorId: localStorage.getItem("visitor_id"),
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error("trackLead failed", err);
  }
}
