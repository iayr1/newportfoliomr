import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ArrowUp, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { EASE_OUT, Magnetic, triggerChimeSound } from "./primitives";

export const RESUME_URL =
  "https://drive.google.com/file/d/1s2oNwDboOIICgA8PMPOqUFK-m_yQVCdp/view?usp=sharing";
export const CALENDLY_URL = "https://calendly.com/mayurchaudhari1675/30min";
export const EMAIL = "mayurailead@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/iayr1";
export const GITHUB_URL = "https://www.github.com/iayr1";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Audio toggle                                                        */
/* ------------------------------------------------------------------ */

function AudioControl({
  audioEnabled,
  toggleAudio,
}: {
  audioEnabled: boolean;
  toggleAudio: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleChime = () => {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 2000);
    };
    window.addEventListener("chime-triggered", handleChime);
    return () => window.removeEventListener("chime-triggered", handleChime);
  }, []);

  const handleClick = () => {
    toggleAudio();
    if (!audioEnabled) {
      setTimeout(() => {
        try {
          const AudioCtx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
          if (AudioCtx) triggerChimeSound(new AudioCtx());
        } catch (e) {
          console.warn(e);
        }
      }, 100);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={audioEnabled ? "Mute sound effects" : "Enable sound effects"}
      aria-pressed={audioEnabled}
      className="group relative grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground transition-all hover:border-lime/50 hover:bg-white/[0.07] active:scale-95 cursor-pointer"
    >
      <div className="flex items-end gap-[2.5px] h-3.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full transition-all duration-300 ${
              audioEnabled ? "bg-lime" : "bg-muted-foreground/50"
            } ${audioEnabled && isPlaying ? "animate-bounce" : ""}`}
            style={{
              height: audioEnabled ? ["40%", "100%", "60%", "85%"][i] : "30%",
              animationDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </div>
      {!audioEnabled && (
        <span className="absolute h-[1.5px] w-5 rotate-45 rounded-full bg-[#ff6b6b]" />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

interface NavProps {
  mounted: boolean;
  audioEnabled: boolean;
  toggleAudio: () => void;
  /** Accepted for backwards compatibility; the site is dark-only. */
  theme?: "light" | "dark";
  setTheme?: (t: "light" | "dark") => void;
}

export function Nav({ mounted, audioEnabled, toggleAudio }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 400 && !isOpen);
  });

  // Scroll-spy for the active section
  useEffect(() => {
    if (!onHome) return;
    const ids = NAV_ITEMS.map((i) => i.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const href = (h: string) => (onHome ? h : `/${h}`);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-3 sm:mt-4 max-w-6xl px-3 sm:px-4">
        <nav
          className={`flex items-center justify-between rounded-full pl-2 pr-2 sm:pl-3 py-2 transition-all duration-500 ${
            scrolled || isOpen
              ? "glass-strong"
              : "border border-white/[0.06] bg-white/[0.02] backdrop-blur-md"
          }`}
        >
          <a
            href={href("#top")}
            className="group flex items-center gap-2.5 font-display font-semibold pr-2"
            aria-label="Mayur Chaudhari — home"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-lime text-ink text-[13px] font-bold tracking-tight shadow-[0_0_24px_-4px_rgba(200,255,77,0.7)] transition-transform duration-500 group-hover:rotate-[360deg]">
              MC
            </span>
            <span className="hidden min-[400px]:flex flex-col leading-none">
              <span className="text-[15px] tracking-tight text-foreground">Mayur Chaudhari</span>
              <span className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
                AI Transformation
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <div
            className="hidden items-center lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_ITEMS.map((i) => {
              const isActive = active === i.href;
              return (
                <a
                  key={i.href}
                  href={href(i.href)}
                  onMouseEnter={() => setHovered(i.href)}
                  className={`relative px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {hovered === i.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {i.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_10px_#c8ff4d]"
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {mounted && <AudioControl audioEnabled={audioEnabled} toggleAudio={toggleAudio} />}

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex neo-btn neo-btn-white py-2 px-4 text-[13px]"
            >
              Resume
            </a>

            <a href={href("#contact")} className="hidden sm:inline-flex neo-btn py-2 px-4 text-[13px]">
              Let's talk
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground transition-all hover:bg-white/[0.08] lg:hidden cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "x" : "m"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="fixed inset-0 -z-10 lg:hidden bg-[#08090c]/95 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-line-grid opacity-60" />
            <div className="aurora-blob h-80 w-80 bg-lime/25 -top-10 -left-20" />
            <div className="aurora-blob h-80 w-80 bg-violet/25 bottom-10 -right-20" />
            <div className="relative flex h-full flex-col justify-between px-6 pt-28 pb-10 overflow-y-auto">
              <ul className="space-y-1">
                {NAV_ITEMS.map((i, idx) => (
                  <motion.li
                    key={i.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.06, duration: 0.6, ease: EASE_OUT }}
                  >
                    <a
                      href={href(i.href)}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4 py-2 border-b border-white/[0.06]"
                    >
                      <span className="font-mono text-xs text-lime/80">0{idx + 1}</span>
                      <span className="text-[2.6rem] sm:text-6xl font-semibold tracking-[-0.04em] text-foreground transition-all group-hover:translate-x-2 group-hover:text-lime">
                        {i.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-10 space-y-6"
              >
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="neo-btn neo-btn-white py-3.5 text-sm"
                  >
                    Resume
                  </a>
                  <a
                    href={href("#contact")}
                    onClick={() => setIsOpen(false)}
                    className="neo-btn py-3.5 text-sm"
                  >
                    Let's talk
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="font-mono text-xs">{EMAIL}</span>
                  <div className="flex gap-3">
                    <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll progress                                                     */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] bg-gradient-to-r from-lime via-cyan to-violet shadow-[0_0_12px_rgba(200,255,77,0.8)]"
      style={{ scaleX }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Preloader                                                           */
/* ------------------------------------------------------------------ */

export function Preloader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  useEffect(() => {
    const seen = sessionStorage.getItem("preloader_seen") === "1";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setDone(true);
      return;
    }
    const start = performance.now();
    const DURATION = 1500;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        sessionStorage.setItem("preloader_seen", "1");
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="preloader fixed inset-0 z-[200] flex flex-col justify-between bg-[#06070a] p-6 sm:p-10"
          aria-hidden
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Mayur Chaudhari</span>
            <span className="hidden sm:inline">AI Business Transformation</span>
            <span>Mumbai · IN</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
                className="text-4xl sm:text-6xl font-semibold tracking-[-0.05em]"
              >
                Initializing <span className="text-serif text-gradient-green">agents</span>
              </motion.div>
            </div>
            <div className="h-px w-56 sm:w-72 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-lime via-cyan to-violet"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio © {new Date().getFullYear()}
            </span>
            <span className="text-7xl sm:text-9xl font-semibold tabular-nums tracking-[-0.06em] text-foreground">
              {count}
              <span className="text-lime">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Custom cursor                                                       */
/* ------------------------------------------------------------------ */

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;
    document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let cursorX = -100;
    let cursorY = -100;
    let ringX = -100;
    let ringY = -100;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: globalThis.MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      ringX += (cursorX - ringX) * 0.16;
      ringY += (cursorY - ringY) * 0.16;
      scale += (targetScale - scale) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    const HOVERABLE =
      "a, button, [role='button'], .neo-premium-card, .spotlight-card, input, textarea, select, label";
    const onOver = (e: globalThis.MouseEvent) => {
      const t = e.target as Element | null;
      const hit = t?.closest?.(HOVERABLE);
      const interactive = t?.closest?.("a, button, [role='button']");
      targetScale = interactive ? 2.2 : hit ? 1.5 : 1;
      ring.dataset.hover = interactive ? "1" : "0";
      cursor.dataset.hover = interactive ? "1" : "0";
    };
    const onDown = () => (targetScale *= 0.8);
    const onUp = () => (targetScale /= 0.8);
    const onLeaveWindow = () => {
      cursor.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnterWindow = () => {
      cursor.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[150] h-2 w-2 rounded-full bg-lime shadow-[0_0_12px_#c8ff4d] transition-[width,height,opacity] duration-200 data-[hover=1]:h-1 data-[hover=1]:w-1"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[150] h-9 w-9 rounded-full border border-white/40 transition-[background-color,border-color,opacity] duration-300 data-[hover=1]:border-lime/70 data-[hover=1]:bg-lime/10 mix-blend-difference"
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function MumbaiClock() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="tabular-nums">{time || "--:--:--"}</span>;
}

export function Footer() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const href = (h: string) => (onHome ? h : `/${h}`);

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/[0.06]">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-lime/60 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-full h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="text-2xl font-semibold tracking-tight">
              Have an idea? <span className="text-serif text-gradient-green">Let's automate it.</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Agentic AI, workflow automation and business transformation — designed for
              measurable impact.
            </p>
            <Magnetic className="mt-6">
              <a href={`mailto:${EMAIL}`} className="neo-btn px-5 py-2.5 text-sm">
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </Magnetic>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm">
              {NAV_ITEMS.map((i) => (
                <li key={i.href}>
                  <a
                    href={href(i.href)}
                    className="text-foreground/80 transition-colors hover:text-lime"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/expertise/agentic-ai-development"
                  className="text-foreground/80 transition-colors hover:text-lime"
                >
                  Agentic AI Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Elsewhere
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { l: "LinkedIn", h: LINKEDIN_URL },
                { l: "GitHub", h: GITHUB_URL },
                { l: "Book a call", h: CALENDLY_URL },
                { l: "Resume", h: RESUME_URL },
              ].map((s) => (
                <li key={s.l}>
                  <a
                    href={s.h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-foreground/80 transition-colors hover:text-lime"
                  >
                    {s.l}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              Mumbai · <MumbaiClock /> IST
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="relative mt-16 select-none" aria-hidden>
          <div className="whitespace-nowrap text-center font-semibold leading-[0.8] tracking-[-0.07em] text-[12.5vw] xl:text-[9.5rem] bg-gradient-to-b from-white/[0.14] to-white/[0.01] bg-clip-text text-transparent">
            Mayur Chaudhari
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-white/[0.06] pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Mayur Chaudhari. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>AI Business Transformation · Mumbai, India</span>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/70 hover:text-lime transition-colors"
            >
              Resume
            </a>
            <a
              href="/admin"
              className="text-xs text-muted-foreground/70 hover:text-lime transition-colors"
            >
              Admin
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground transition-all hover:-translate-y-1 hover:border-lime/60 hover:text-lime cursor-pointer"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function NoiseOverlay() {
  return <div aria-hidden className="noise-overlay" />;
}
