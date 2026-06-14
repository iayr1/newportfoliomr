import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const getGeoInfo = createServerFn({ method: "GET" }).handler(async () => {
  let headers: Record<string, string | undefined> = {};
  try {
    headers = getRequestHeaders() as Record<string, string | undefined>;
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

  // Now, let's fetch geolocation info using fallback APIs
  const apis = [
    async () => {
      const url = ip ? `https://ipwho.is/${ip}` : `https://ipwho.is/`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("ipwho.is failed");
      const j = await res.json();
      if (!j.success) throw new Error("ipwho.is unsuccessful");
      return {
        country: j.country || null,
        city: j.city || null,
        region: j.region || null,
        ip: j.ip || ip || null,
        isp: j.connection?.isp || j.connection?.org || null,
      };
    },
    async () => {
      const url = ip ? `https://ipapi.co/${ip}/json/` : `https://ipapi.co/json/`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("ipapi.co failed");
      const j = await res.json();
      return {
        country: j.country_name || null,
        city: j.city || null,
        region: j.region || null,
        ip: j.ip || ip || null,
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
    ip: ip || null,
    isp: null,
  };
});
