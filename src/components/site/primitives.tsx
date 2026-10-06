import React, { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";

export const EASE_OUT = [0.2, 0.8, 0.2, 1] as const;

/* ------------------------------------------------------------------ */
/* Sound helpers                                                       */
/* ------------------------------------------------------------------ */

function soundAllowed() {
  return typeof window !== "undefined" && localStorage.getItem("audio_effects") !== "false";
}

function getAudioCtor(): typeof AudioContext | undefined {
  if (typeof window === "undefined") return undefined;
  return (
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  );
}

/** Short UI "blip" used by buttons and widgets. Respects the sound toggle. */
export function playBlip(freq = 600, gainValue = 0.015, duration = 0.08, sweepTo?: number) {
  if (!soundAllowed()) return;
  try {
    const AudioCtx = getAudioCtor();
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, ctx.currentTime + duration);
    gain.gain.setValueAtTime(gainValue, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    /* audio is a nicety — ignore failures */
  }
}

export function triggerChimeSound(ctx: AudioContext) {
  if (typeof window !== "undefined" && localStorage.getItem("audio_effects") === "false") {
    return;
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("chime-triggered"));
  }
  const now = ctx.currentTime;
  const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C4, E4, G4, C5, E5, G5
  notes.forEach((freq, idx) => {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const delay = ctx.createDelay();
    const feedback = ctx.createGain();

    const startTime = now + idx * 0.08;

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    filter.type = "lowpass";
    filter.Q.setValueAtTime(4, startTime);
    filter.frequency.setValueAtTime(1800, startTime);
    filter.frequency.exponentialRampToValueAtTime(150, startTime + 1.5);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.6);

    delay.delayTime.setValueAtTime(0.25, startTime);
    feedback.gain.setValueAtTime(0.25, startTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);

    gainNode.connect(ctx.destination);
    gainNode.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    feedback.connect(ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + 1.8);
    osc2.stop(startTime + 1.8);
  });
}

/** Plays the welcome chime now, or on the first interaction if autoplay is blocked. */
export function useWelcomeChime() {
  useEffect(() => {
    try {
      const AudioCtx = getAudioCtor();
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (ctx.state === "suspended") {
        const resumeAndPlay = () => {
          ctx.resume().then(() => {
            triggerChimeSound(ctx);
            window.removeEventListener("click", resumeAndPlay);
            window.removeEventListener("keydown", resumeAndPlay);
          });
        };
        window.addEventListener("click", resumeAndPlay, { passive: true });
        window.addEventListener("keydown", resumeAndPlay, { passive: true });
        return () => {
          window.removeEventListener("click", resumeAndPlay);
          window.removeEventListener("keydown", resumeAndPlay);
        };
      }

      triggerChimeSound(ctx);
    } catch (err) {
      console.warn("AudioContext blocked or failed:", err);
    }
  }, []);
}

export function useAudioPreference() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("audio_effects");
    if (saved !== null) setAudioEnabled(saved === "true");
  }, []);
  const toggleAudio = () => {
    setAudioEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("audio_effects", String(next));
      return next;
    });
  };
  return { audioEnabled, toggleAudio };
}

/* ------------------------------------------------------------------ */
/* Spotlight card                                                      */
/* ------------------------------------------------------------------ */

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/** Vercel-style card whose glow and gradient border follow the pointer. */
export function SpotlightCard({ children, className = "", ...props }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Motion primitives                                                   */
/* ------------------------------------------------------------------ */

/** Fade + rise + un-blur when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Splits text into words that slide up from a mask, staggered. */
export function SplitReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
  play,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** When provided, animation is driven by this flag instead of scroll position. */
  play?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const trigger =
    play !== undefined
      ? { animate: play ? ("show" as const) : ("hidden" as const) }
      : { whileInView: "show" as const, viewport: { once: true, margin: "-40px" } };
  return (
    <motion.span
      className={className}
      initial={reduce ? false : "hidden"}
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE_OUT } },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Element that is gently pulled toward the pointer (desktop only). */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Animates a stat like "50+", "1000s" or "99.8%" from zero when in view. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match || !inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(`${match[1]}${v.toFixed(decimals)}${match[3]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {match ? display : value}
    </span>
  );
}

/** Section heading block: eyebrow, big title, optional big outlined index number. */
export function SectionHeader({
  eyebrow,
  title,
  number,
  align = "left",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  number?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative ${align === "center" ? "text-center mx-auto" : ""} max-w-4xl`}>
      {number && (
        <div
          aria-hidden
          className={`section-number absolute -top-10 sm:-top-16 text-[7rem] sm:text-[11rem] md:text-[14rem] ${
            align === "center" ? "left-1/2 -translate-x-1/2" : "-left-2 sm:-left-6"
          }`}
        >
          {number}
        </div>
      )}
      <Reveal>
        <div className={`section-eyebrow ${align === "center" ? "justify-center" : ""}`}>
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-[2.4rem] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
          {title}
        </h2>
      </Reveal>
      {children && <Reveal delay={0.1}>{children}</Reveal>}
    </div>
  );
}
