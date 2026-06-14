import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { initSession, trackEvent, trackDownload, trackPageView } from "@/lib/analytics";
import { CLARITY_PROJECT_ID } from "@/lib/firebase";

export function AnalyticsProvider() {
  const location = useLocation();

  useEffect(() => {
    initSession();
    // Microsoft Clarity
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).clarity) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (function (c: any, l: any, a: any, r: any, i: any) {
        c[a] =
          c[a] ||
          function () {
            // eslint-disable-next-line prefer-rest-params
            (c[a].q = c[a].q || []).push(arguments);
          };
        const t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        const y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.href || "";
      if (!href) return;
      const isDownload = a.hasAttribute("download") || /\.(pdf|docx?|zip)(\?|$)/i.test(href);
      if (isDownload) {
        const lower = href.toLowerCase();
        const type = lower.includes("resume")
          ? "resume"
          : lower.includes("portfolio")
            ? "portfolio"
            : "brochure";
        trackDownload(type as "resume" | "portfolio" | "brochure", href);
        return;
      }
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
          trackEvent("outbound_click", { url: href });
        }
      } catch (err) {
        // Ignore parsing errors for invalid/internal URLs
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}
