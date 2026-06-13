import { useEffect } from "react";
import { initSession, trackEvent, trackDownload } from "@/lib/analytics";
import { CLARITY_PROJECT_ID } from "@/lib/firebase";

export function AnalyticsProvider() {
  useEffect(() => {
    initSession();
    // Microsoft Clarity
    if (!(window as any).clarity) {
      (function (c: any, l: any, a: any, r: any, i: any) {
        c[a] =
          c[a] ||
          function () {
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
        trackDownload(type as any, href);
        return;
      }
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
          trackEvent("outbound_click", { url: href });
        }
      } catch {}
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

