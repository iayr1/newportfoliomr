import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

function isPrivateIp(ip: string): boolean {
  const cleanIp = ip.trim();
  if (
    cleanIp === "localhost" ||
    cleanIp === "::1" ||
    cleanIp.startsWith("127.") ||
    cleanIp.startsWith("10.") ||
    cleanIp.startsWith("192.168.") ||
    cleanIp.startsWith("169.254.")
  ) {
    return true;
  }

  if (cleanIp.startsWith("172.")) {
    const parts = cleanIp.split(".");
    if (parts.length >= 2) {
      const secondOctet = parseInt(parts[1], 10);
      if (secondOctet >= 16 && secondOctet <= 31) {
        return true;
      }
    }
  }

  const lowerIp = cleanIp.toLowerCase();
  if (
    lowerIp.startsWith("fe8") ||
    lowerIp.startsWith("fe9") ||
    lowerIp.startsWith("fea") ||
    lowerIp.startsWith("feb") ||
    lowerIp.startsWith("fc") ||
    lowerIp.startsWith("fd")
  ) {
    return true;
  }

  return false;
}

export const getGeoInfo = createServerFn({ method: "GET" }).handler(async () => {
  const headers: Record<string, string | undefined> = {};
  try {
    const rawHeaders = getRequestHeaders();
    if (rawHeaders) {
      for (const [key, value] of Object.entries(rawHeaders)) {
        if (typeof value === "string") {
          headers[key.toLowerCase()] = value;
        } else if (Array.isArray(value)) {
          headers[key.toLowerCase()] = value.join(", ");
        }
      }
    }
  } catch (e) {
    console.warn("Could not retrieve request headers on server:", e);
  }

  // Extract IP address from headers
  const ipHeaders = [
    "cf-connecting-ip",
    "x-connecting-ip",
    "x-real-ip",
    "x-forwarded-for",
    "x-client-ip",
    "x-cluster-client-ip",
    "forwarded-for",
    "forwarded",
  ];
  let ip: string | null = null;
  for (const h of ipHeaders) {
    const val = headers[h];
    if (val) {
      if (h === "x-forwarded-for" || h === "forwarded-for") {
        const first = val.split(",")[0].trim();
        if (first) {
          ip = first;
          break;
        }
      } else {
        ip = val.trim();
        break;
      }
    }
  }

  // If no IP was extracted, or if it is a private/local IP, do not perform server-side lookup
  // (which would fallback to the server's own IP and return 'Amazon, Ashburn').
  // Return null/empty so client-side fallback can detect the user's actual IP.
  if (!ip || isPrivateIp(ip)) {
    return {
      country: null,
      city: null,
      region: null,
      ip: null,
      isp: null,
    };
  }

  // Now, let's fetch geolocation info using fallback APIs
  const apis = [
    async () => {
      const url = `https://ipwho.is/${ip}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("ipwho.is failed");
      const j = await res.json();
      if (!j.success) throw new Error("ipwho.is unsuccessful");
      return {
        country: j.country || null,
        city: j.city || null,
        region: j.region || null,
        ip: j.ip || ip,
        isp: j.connection?.isp || j.connection?.org || null,
      };
    },
    async () => {
      const url = `https://ipapi.co/${ip}/json/`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("ipapi.co failed");
      const j = await res.json();
      return {
        country: j.country_name || null,
        city: j.city || null,
        region: j.region || null,
        ip: j.ip || ip,
        isp: j.org || null,
      };
    },
  ];

  for (const fetchFn of apis) {
    try {
      const data = await fetchFn();
      if (data && data.ip) {
        return data;
      }
    } catch (e) {
      console.error("Server Geo Lookup Error:", e);
    }
  }

  return {
    country: null,
    city: null,
    region: null,
    ip: ip,
    isp: null,
  };
});
