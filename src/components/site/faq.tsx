import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import type { Faq } from "@/lib/seo";
import { Reveal, SectionHeader } from "./primitives";

/**
 * Visible FAQ list. Uses native <details> so every answer ships in the server HTML —
 * search engines only honour FAQPage schema when the Q&A is on the page, and AI
 * answer engines quote this text directly.
 */
export function FaqSection({
  faqs,
  number,
  eyebrow = "FAQ",
  title,
  id = "faq",
}: {
  faqs: Faq[];
  number?: string;
  eyebrow?: string;
  title: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="relative py-28 md:py-40">
      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeader number={number} align="center" eyebrow={eyebrow} title={title} />

        <div className="mt-14 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i * 0.05, 0.3)}>
              <details
                className="group rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0f1016] to-[#08090c] transition-colors open:border-lime/30 hover:border-white/[0.16]"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                    {f.q}
                  </h3>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-lime transition-transform duration-300 group-open:rotate-45">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="px-5 pb-6 pl-[3.25rem] text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pl-[3.6rem] sm:text-base">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
