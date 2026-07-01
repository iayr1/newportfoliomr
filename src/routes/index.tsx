import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useState, useRef, MouseEvent } from "react";
import {
  ArrowRight,
  Sparkles,
  Workflow,
  Bot,
  Smartphone,
  TrendingUp,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Calendar,
  Zap,
  Brain,
  Target,
  Layers,
  ChevronRight,
  Quote,
  PlayCircle,
  Play,
  Phone,
  Menu,
  X,
  Sun,
  Moon,
  Compass,
  Settings,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WebGLBackground } from "@/components/WebGLBackground";
import mayurPortrait from "@/assets/mayur-portrait.png";
import videoPoster from "@/assets/mayur-video-poster.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mayur Chaudhari | AI Business Transformation Manager" },
      {
        name: "description",
        content:
          "AI Business Transformation Manager specializing in Agentic AI, Workflow Automation, Business Process Optimization, AI Strategy, and Flutter Development.",
      },
      { property: "og:title", content: "Mayur Chaudhari | AI Business Transformation Manager" },
      {
        property: "og:description",
        content:
          "Transforming Businesses with Agentic AI. Workflow automation, AI strategy, and intelligent systems for measurable impact.",
      },
      { property: "og:url", content: "/" },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/b1c4b602-3de3-4ac2-9607-51748b390274",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/b1c4b602-3de3-4ac2-9607-51748b390274",
      },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: mayurPortrait, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mayur Chaudhari",
          jobTitle: "AI Business Transformation Manager",
          worksFor: {
            "@type": "Organization",
            name: "EDGE",
          },
          url: "https://mayuro.lovable.app/",
          sameAs: ["https://www.linkedin.com/in/iayr1", "https://www.github.com/iayr1"],
        }),
      },
    ],
  }),
  component: Portfolio,
});

/* Vercel-style Mouse-tracking Spotlight Card Component */
interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = "", ...props }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
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
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioCtx) {
            const ctx = new AudioCtx();
            triggerChimeSound(ctx);
          }
        } catch (e) {
          console.warn(e);
        }
      }, 100);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle sound effects"
      className="rounded-full border border-border bg-card/40 p-2 text-foreground transition-all hover:bg-card/85 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 h-8.5 w-8.5"
    >
      {audioEnabled ? (
        <div className="flex items-end gap-[2px] h-3.5 w-3.5 px-[1px]">
          <span
            className={`w-[2px] rounded-full bg-black dark:bg-white transition-all duration-300 ${isPlaying ? "animate-bounce h-3" : "h-1.5"}`}
            style={{ animationDelay: "0ms" }}
          />
          <span
            className={`w-[2px] rounded-full bg-black dark:bg-white transition-all duration-300 ${isPlaying ? "animate-bounce h-2" : "h-3"}`}
            style={{ animationDelay: "150ms" }}
          />
          <span
            className={`w-[2px] rounded-full bg-black dark:bg-white transition-all duration-300 ${isPlaying ? "animate-bounce h-3" : "h-2"}`}
            style={{ animationDelay: "300ms" }}
          />
        </div>
      ) : (
        <div className="relative h-3.5 w-3.5 flex items-center justify-center">
          <div className="flex items-end gap-[2px] h-3.5 w-3.5 opacity-40">
            <span className="w-[2px] h-1.5 rounded-full bg-muted-foreground" />
            <span className="w-[2px] h-2 rounded-full bg-muted-foreground" />
            <span className="w-[2px] h-1.5 rounded-full bg-muted-foreground" />
          </div>
          <span className="absolute w-[18px] h-[1px] bg-[#FF6B6B] rotate-45" />
        </div>
      )}
    </button>
  );
}

function AIDiagnostics() {
  const [status, setStatus] = useState("Orchestrating");
  const [efficiency, setEfficiency] = useState(84);
  const [nodeIndex, setNodeIndex] = useState(1);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const statuses = ["Reasoning", "Retrieving", "Executing", "Optimizing", "Orchestrating"];
    const interval = setInterval(() => {
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      setEfficiency((prev) =>
        Math.min(100, Math.max(70, prev + Math.floor(Math.random() * 7) - 3)),
      );
      setNodeIndex((prev) => (prev % 5) + 1);
      setPulse((p) => !p);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass p-4 rounded-2xl border border-border shadow-lg flex flex-col gap-2 min-w-[190px] font-sans text-xs select-none backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <span className="font-semibold text-foreground tracking-tight flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BAFCA2] opacity-75 ${pulse ? "" : "paused"}`}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BAFCA2] border border-black/30" />
          </span>
          AI Core Diagnostics
        </span>
        <span className="text-[9px] font-mono text-muted-foreground uppercase">v1.2.4</span>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <div>
          <div className="text-[9px] text-muted-foreground uppercase">Agent State</div>
          <div className="font-semibold text-foreground text-xs mt-0.5 truncate">{status}</div>
        </div>
        <div>
          <div className="text-[9px] text-muted-foreground uppercase">Accuracy</div>
          <div className="font-semibold text-black dark:text-white text-xs mt-0.5">99.8%</div>
        </div>
        <div>
          <div className="text-[9px] text-muted-foreground uppercase">Efficiency</div>
          <div className="font-semibold text-foreground text-xs mt-0.5">+{efficiency}%</div>
        </div>
        <div>
          <div className="text-[9px] text-muted-foreground uppercase">Active Nodes</div>
          <div className="font-semibold text-foreground text-xs mt-0.5 font-mono">
            0{nodeIndex} / 05
          </div>
        </div>
      </div>

      <div className="mt-1 pt-2 border-t border-border/40 flex flex-col gap-1">
        <div className="flex justify-between text-[8px] text-muted-foreground uppercase font-mono">
          <span>System Temperature</span>
          <span>42°C</span>
        </div>
        <div className="w-full bg-muted border border-black/10 rounded-full h-1 overflow-hidden">
          <div
            className="bg-[#BAFCA2] h-1 rounded-full w-[65%]"
            style={{ transition: "width 0.5s ease" }}
          />
        </div>
      </div>
    </div>
  );
}

interface NavProps {
  mounted: boolean;
  audioEnabled: boolean;
  toggleAudio: () => void;
}

export function Nav({ mounted, audioEnabled, toggleAudio }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Expertise", href: "#expertise" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass-strong flex items-center justify-between rounded-full px-5 py-3">
          <a href="#top" className="flex items-center gap-2 font-display font-semibold">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#BAFCA2] border border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Mayur Chaudhari
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden gap-7 lg:flex">
            {items.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="text-sm text-muted-foreground transition-colors hover:text-[#FFDB58]"
              >
                {i.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Control Button */}
            {mounted && <AudioControl audioEnabled={audioEnabled} toggleAudio={toggleAudio} />}

            <a
              href="https://drive.google.com/file/d/1FgLCjW_7zYTOkBD2QumKM4Oi7E6rpHa4/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex neo-btn neo-btn-white py-1 px-3.5 text-xs lg:text-sm"
            >
              Resume
            </a>

            <a href="#contact" className="hidden lg:inline-flex neo-btn py-1.5 px-4 text-sm">
              Let's talk
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className="rounded-full border border-border bg-card/40 p-2 text-foreground transition-all hover:bg-card/80 lg:hidden cursor-pointer h-8.5 w-8.5 flex items-center justify-center"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Nav Overlay with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mx-4 mt-2 z-40 lg:hidden"
          >
            <div className="glass-strong rounded-2xl p-6 shadow-2xl flex flex-col gap-4 font-sans">
              {items.map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-[#FFDB58] py-2 border-b border-border last:border-0"
                >
                  {i.label}
                </a>
              ))}
              <a
                href="https://drive.google.com/file/d/1FgLCjW_7zYTOkBD2QumKM4Oi7E6rpHa4/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-2 text-center neo-btn neo-btn-white py-3 text-sm"
              >
                Resume
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-center neo-btn py-3 text-sm"
              >
                Let's talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function TypewriterSubtitle() {
  const words = ["Agentic AI", "Workflow Automation", "Intelligent Systems", "AI Strategy"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[180px] sm:min-w-[220px] overflow-hidden vertical-align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="animate-text-shimmer font-bold block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Moving background grids */}
      <div className="perspective-grid" />

      {/* Dotted background overlays for the hero section, similar to the mockup */}
      <div className="absolute top-24 left-12 text-black/5 dark:text-white/5 pointer-events-none select-none hidden xl:block z-0">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
          <pattern id="dotGridHero" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" />
          </pattern>
          <rect width="100" height="100" fill="url(#dotGridHero)" />
        </svg>
      </div>

      <div className="absolute bottom-24 right-12 text-black/5 dark:text-white/5 pointer-events-none select-none hidden xl:block z-0">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="currentColor">
          <pattern id="dotGridHero2" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" />
          </pattern>
          <rect width="120" height="120" fill="url(#dotGridHero2)" />
        </svg>
      </div>

      {/* Floating Outline Triangle (Mockup style) */}
      <div
        className="absolute bottom-1/4 left-8 text-[#FF7A5C] dark:text-[#FF7A5C]/80 rotate-[-15deg] animate-bounce pointer-events-none select-none hidden lg:block z-10"
        style={{ animationDuration: "8s" }}
      >
        <svg
          width="56"
          height="48"
          viewBox="0 0 56 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="28,4 52,44 4,44" className="fill-[#FF7A5C]/5" />
        </svg>
      </div>

      {/* Floating Outline Semi-circle (Mockup style) */}
      <div
        className="absolute top-1/4 right-[42%] text-[#C4A1FF] dark:text-[#C4A1FF]/80 rotate-[25deg] animate-pulse pointer-events-none select-none hidden lg:block z-10"
        style={{ animationDuration: "4s" }}
      >
        <svg
          width="60"
          height="32"
          viewBox="0 0 60 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M3,30 C3,15.1 15.1,3 30,3 C44.9,3 57,15.1 57,30" className="fill-[#C4A1FF]/5" />
        </svg>
      </div>

      {/* Floating Star (Mockup style) */}
      <div
        className="absolute top-20 left-[48%] text-[#BAFCA2] rotate-[12deg] animate-bounce pointer-events-none select-none hidden md:block z-10"
        style={{ animationDuration: "6s" }}
      >
        <svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-[#BAFCA2]/15"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>

      {/* Grid Cross Indicator */}
      <div className="absolute bottom-28 left-[45%] text-[#FFDB58] opacity-60 pointer-events-none select-none hidden md:block z-10">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="15" y1="0" x2="15" y2="30" />
          <line x1="0" y1="15" x2="30" y2="15" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-[1.25fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="chip text-xs mb-4">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#BAFCA2] border border-black" />
            <span className="text-foreground">AI Business Transformation Manager · EDGE</span>
          </div>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black dark:text-white">
            Transforming Businesses with <br className="hidden sm:inline" />
            <TypewriterSubtitle />
          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed font-sans">
            I help organizations automate workflows, redesign operations, and deploy intelligent AI
            systems that create measurable business impact.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#projects"
              className="group neo-btn px-5 py-2.5 text-sm sm:text-base bg-neo-yellow text-black border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all rounded-lg font-bold"
            >
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="neo-btn px-5 py-2.5 text-sm sm:text-base bg-neo-green text-black border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all rounded-lg font-bold"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Consultation</span>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "50+", v: "AI Workflows", color: "bg-[#BAFCA2]" },
              { k: "20+", v: "Processes Automated", color: "bg-[#FFDB58]" },
              { k: "3+", v: "Years Experience", color: "bg-[#C4A1FF]" },
              { k: "1000s", v: "Users Impacted", color: "bg-[#FFA07A]" },
            ].map((s) => (
              <div
                key={s.v}
                className="bg-white dark:bg-[#1E1E1E] p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform select-none"
              >
                <div className="font-display text-2xl font-black text-black dark:text-white md:text-3xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider">
                  {s.v}
                </div>
                <div className="mt-2.5 w-full bg-neutral-100 dark:bg-neutral-800 h-1 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} w-3/4 rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none group"
        >
          {/* Portrait Image container in Neo-brutalist card */}
          <div className="relative overflow-hidden rounded-2xl border-4 border-black bg-white p-2.5 shadow-[10px_10px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_var(--neo-shadow)] z-10">
            {/* Minimal Sticker Overlay */}
            <div className="absolute top-4 left-4 bg-neo-yellow text-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-md z-30 select-none">
              ✨ verified expert
            </div>
            <img
              src={mayurPortrait}
              alt="Mayur Chaudhari, AI Business Transformation Manager"
              width={900}
              height={900}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="aspect-square w-full rounded-xl object-cover scale-100 hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* Floating AI Notification Sticker Left */}
          <div className="absolute top-12 -left-8 bg-white dark:bg-[#1E1E1E] border-2 border-black p-2 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] text-[9px] font-mono hidden xl:flex items-center gap-1.5 rotate-[-4deg] animate-pulse z-20 select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-[#BAFCA2] animate-ping" />
            <span>agent-runner.js &rarr; connected</span>
          </div>

          {/* Floating AI Metrics Sticker Right */}
          <div className="absolute bottom-20 -right-6 bg-white dark:bg-[#1E1E1E] border-2 border-black p-2 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] text-[9px] font-mono hidden xl:flex flex-col gap-0.5 rotate-[3deg] z-20 select-none">
            <div className="text-muted-foreground font-bold">WORKFLOW RATING</div>
            <div className="text-neo-green font-extrabold">+92.4% Optimal</div>
          </div>

          <div className="absolute -top-6 -right-6 hidden md:block z-20">
            <AIDiagnostics />
          </div>

          <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 bg-white dark:bg-[#1E1E1E] border-2.5 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_var(--neo-shadow)] rounded-xl px-4 py-3 sm:flex z-20">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-neo-yellow border border-black text-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
              <Bot className="h-4 w-4" />
            </span>
            <div className="text-left">
              <div className="text-xs text-muted-foreground font-semibold">Currently leading</div>
              <div className="text-sm font-extrabold">AI Transformation @ EDGE</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mouse scroll down animation indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Scroll Down
        </span>
        <div className="w-[18px] h-[30px] rounded-full border-2 border-muted-foreground/30 flex justify-center p-[4px]">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[4px] h-[6px] rounded-full bg-[#BAFCA2]"
          />
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoId = "s43HrsbMxCs";
  return (
    <section id="video" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <div className="section-eyebrow">Watch</div>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
            AI Automation, <span className="text-gradient-green">explained simply</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            A walkthrough of how I help teams adopt Agentic AI and automate real business workflows
            — strategy, tools, and outcomes.
          </p>
        </div>

        <div className="glass-strong relative mt-12 overflow-hidden rounded-3xl p-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="AI Automation by Mayur Chaudhari"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play video"
                className="group absolute inset-0 h-full w-full cursor-pointer"
              >
                <img
                  src={videoPoster}
                  alt="Mayur Chaudhari explaining AI automation"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-black backdrop-blur-md border border-black/10 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white active:scale-95">
                    <Play className="h-6 w-6 fill-current pl-1" />
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-left text-white">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#FFDB58]">
                    Featured talk
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold md:text-2xl">
                    AI Automation for Business Teams
                  </div>
                </div>
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-2 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <PlayCircle className="h-4 w-4 text-black dark:text-white" />
              Watch on{" "}
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-black dark:text-white hover:underline"
              >
                YouTube
              </a>
            </div>
            <a
              href="#contact"
              className="text-sm font-bold text-black dark:text-white hover:underline"
            >
              Want this for your team? →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackMarquee() {
  const stack = [
    "OpenAI",
    "LangGraph",
    "CrewAI",
    "n8n",
    "Make",
    "Zapier",
    "Flutter",
    "Firebase",
    "Node.js",
    "Postgres",
    "Anthropic",
    "Vector DB",
  ];
  const row = [...stack, ...stack];
  return (
    <section aria-label="Tools and platforms" className="relative py-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-5 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Building with the modern AI &amp; automation stack
        </div>
        <div className="relative overflow-hidden py-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#DAF5F0] via-[#DAF5F0]/80 to-transparent z-10 dark:from-[#121212]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#DAF5F0] via-[#DAF5F0]/80 to-transparent z-10 dark:from-[#121212]" />
          <div className="marquee-track flex w-max gap-3">
            {row.map((s, i) => (
              <span key={`${s}-${i}`} className="chip whitespace-nowrap font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#BAFCA2] border border-black" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Outlined Section Number Separator */}
      <div className="absolute -top-10 -left-6 text-[12rem] font-black text-black/[0.03] dark:text-white/[0.02] select-none pointer-events-none font-display leading-none">
        01
      </div>

      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="max-w-3xl">
          <div className="section-eyebrow">Who I Am</div>
          <h2 className="mt-4 text-4xl font-extrabold md:text-6xl tracking-tight text-black dark:text-white">
            Beyond AI. <span className="text-gradient">Beyond Automation.</span>
          </h2>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>
              I am an AI Business Transformation Manager focused on helping organizations unlock
              productivity through Agentic AI, workflow automation, and intelligent digital systems.
            </p>
            <p>
              My expertise lies in connecting business problems with AI-powered solutions. Instead
              of building models in isolation, I design systems that improve operations, automate
              repetitive work, and create scalable business outcomes.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Brain,
              title: "Strategy First",
              desc: "Business outcomes drive every AI deployment.",
            },
            {
              icon: Workflow,
              title: "Systems Thinking",
              desc: "Connected workflows over isolated models.",
            },
            {
              icon: Target,
              title: "Measurable Impact",
              desc: "ROI, productivity, and operational lift.",
            },
          ].map((c, index) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SpotlightCard className="p-6 neo-premium-card h-full">
                <div className="grid h-12 w-12 place-items-center rounded-lg border-2 border-black bg-[#BAFCA2] text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const roles = [
    {
      role: "AI Business Transformation Manager",
      company: "EDGE",
      date: "July 2026 — Present",
      desc: "Leading AI strategy, business process transformation, enterprise workflow automation, and productivity optimization.",
      responsibilities: [
        "AI strategy development & opportunity assessment",
        "Business process transformation & enterprise workflow automation",
        "AI adoption programs & cross-functional implementation",
        "Internal AI systems design & productivity optimization",
      ],
      current: true,
    },
    {
      role: "Agentic AI Engineer",
      company: "Colage Communication",
      date: "July 2025 — July 2026",
      desc: "Designed and built multi-agent AI systems, custom workflows, and LLM integrations to optimize business communication processes.",
      responsibilities: [
        "Developing multi-agent orchestration structures using LangGraph & CrewAI",
        "Integrating advanced reasoning LLMs for specialized communications",
        "Optimizing LLM response speed, prompt design, and cost metrics",
      ],
    },
    {
      role: "Chatbot Developer",
      company: "Eazr Digipayments",
      date: "June 2024 — July 2025",
      desc: "Created highly conversational payment support bots, handling customer queries, automated receipt validation, and transactional support.",
      responsibilities: [
        "Building payment bot integration pipelines with payment gateways",
        "Developing secure conversational dialog management systems",
        "Reducing support ticket backlog by 45% through automated resolution flows",
      ],
    },
    {
      role: "Software Development Engineer (SDE)",
      company: "ShareShiksha",
      date: "Apr 2023 — June 2024",
      desc: "Developed cross-platform EdTech features using Flutter, Dart, and Firebase to deliver seamless mobile and web classroom tools.",
      responsibilities: [
        "Designing modular mobile features and offline state syncing in Flutter",
        "Creating back-end logic, REST APIs, and database structures",
        "Implementing security configurations for customer payment details",
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Outlined Section Number Separator */}
      <div className="absolute -top-10 -left-6 text-[12rem] font-black text-black/[0.03] dark:text-white/[0.02] select-none pointer-events-none font-display leading-none">
        02
      </div>

      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <div className="section-eyebrow">Professional Path</div>
            <h2 className="mt-4 text-4xl font-extrabold md:text-5xl tracking-tight text-black dark:text-white">
              My <span className="text-gradient-green">Experience Journey</span>
            </h2>
          </div>
          <a
            href="https://drive.google.com/file/d/1FgLCjW_7zYTOkBD2QumKM4Oi7E6rpHa4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn neo-btn-white py-2 px-5 text-sm self-start"
          >
            <span>View Full Resume</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        {/* Timeline structure */}
        <div className="relative border-l-2 border-black md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:h-full md:before:w-[2px] md:before:bg-black pl-6 md:pl-0 space-y-12">
          {roles.map((r, idx) => (
            <div
              key={r.company}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                idx % 2 === 0 ? "md:text-right" : ""
              }`}
            >
              {/* Central Circle Dot */}
              <div className="absolute left-0 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 top-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-neo-yellow border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${r.current ? "bg-black animate-ping" : "bg-black"}`}
                />
              </div>

              {/* Card placement based on index */}
              <div className={`${idx % 2 === 0 ? "md:order-1" : "md:order-2 md:col-start-2"}`}>
                <SpotlightCard className="p-6 md:p-8 neo-premium-card">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-black bg-[#FFC0CB] border border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] px-2.5 py-0.5 rounded">
                      {r.date}
                    </span>
                    {r.current && (
                      <span className="rounded-full bg-[#BAFCA2] text-black border border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] px-2.5 py-0.5 text-xs font-bold">
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-black">{r.role}</h3>
                  <h4 className="text-sm font-bold text-black mt-1 mb-3 underline decoration-[#FFDB58] decoration-2">
                    {r.company}
                  </h4>
                  <p className="text-sm text-black font-semibold mb-4 leading-relaxed">{r.desc}</p>

                  <div className="space-y-2 border-t border-border/60 pt-4">
                    {r.responsibilities.map((resp, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-neutral-800 font-medium"
                      >
                        <ChevronRight className="h-3 w-3 shrink-0 text-black mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NeuralNetworkGraph({ active }: { active: boolean }) {
  return (
    <div className="h-[90px] w-full border border-border/30 rounded-xl overflow-hidden bg-card/20 relative flex items-center justify-center p-2 mt-4 select-none">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <svg className="w-full h-full max-w-[280px]" viewBox="0 0 100 30">
        {/* Connection Paths */}
        <motion.path
          d="M10,15 L30,8 M10,15 L30,22 M30,8 L60,15 M30,22 L60,15 M60,15 L90,15"
          fill="none"
          stroke="#BAFCA2"
          strokeWidth="0.8"
          opacity="0.4"
        />

        {/* Animated signal pulse along the path */}
        <motion.path
          d="M10,15 L30,8 M30,8 L60,15 M60,15 L90,15"
          fill="none"
          stroke="#FFDB58"
          strokeWidth="1.2"
          strokeDasharray="10 40"
          animate={{
            strokeDashoffset: [-50, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Nodes */}
        <circle cx="10" cy="15" r="2" fill="#BAFCA2" />
        <circle cx="30" cy="8" r="1.5" fill="#FFA07A" />
        <circle cx="30" cy="22" r="1.5" fill="#FFA07A" />
        <circle cx="60" cy="15" r="2" fill="#BAFCA2" />
        <circle cx="90" cy="15" r="2.5" fill="#C4A1FF" className="animate-pulse" />
      </svg>

      <div className="absolute bottom-1 right-2 text-[7px] text-muted-foreground font-mono">
        Active Node Orchestration: {active ? "Connected" : "Standby"}
      </div>
    </div>
  );
}

function Expertise() {
  const categories = [
    {
      icon: Bot,
      title: "Agentic AI",
      items: [
        "Multi-Agent Systems",
        "AI Agents",
        "CrewAI",
        "LangGraph",
        "OpenAI Agents",
        "Autonomous Workflows",
      ],
      desc: "Architecting autonomous systems that can reason, plan, use tools, and collaborate to achieve business outcomes.",
      stats: {
        capability: "Core Specialty",
        scale: "Enterprise Grade",
        frameworks: "LangGraph / CrewAI",
      },
    },
    {
      icon: Workflow,
      title: "Automation",
      items: ["n8n", "Make", "Zapier", "Workflow Design", "Business Automation", "RPA"],
      desc: "Integrating APIs, triggers, data mappings, and human-in-the-loop steps to eliminate manual bottlenecks.",
      stats: {
        capability: "System Integration",
        scale: "Production Pipelines",
        tools: "n8n / Make / Zapier",
      },
    },
    {
      icon: TrendingUp,
      title: "AI Transformation",
      items: [
        "AI Strategy",
        "AI Consulting",
        "Business Analysis",
        "Change Management",
        "Digital Transformation",
      ],
      desc: "Translating executive vision into concrete technical roadmaps. Conducting maturity assessments and training teams.",
      stats: {
        capability: "Strategic Advisory",
        scale: "Organizational Lift",
        outcome: "Measurable Productivity",
      },
    },
    {
      icon: Smartphone,
      title: "Development",
      items: ["Flutter", "Dart", "Firebase", "Node.js", "REST APIs", "Mobile Apps"],
      desc: "Building clean-architecture mobile frontends and secure API backends that bridge AI agents to end users.",
      stats: {
        capability: "Full-Stack Dev",
        scale: "Cross-Platform Mobile",
        stacks: "Flutter / Node.js",
      },
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="expertise" className="relative py-32 overflow-hidden">
      {/* Outlined Section Number Separator */}
      <div className="absolute -top-10 -left-6 text-[12rem] font-black text-black/[0.03] dark:text-white/[0.02] select-none pointer-events-none font-display leading-none">
        03
      </div>

      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="max-w-3xl mb-14">
          <div className="section-eyebrow">Core Expertise</div>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl tracking-tight text-black dark:text-white">
            A full stack for <span className="text-gradient-green">AI transformation</span>.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Left: Tab Selectors */}
          <div className="space-y-4">
            {categories.map((c, idx) => (
              <button
                key={c.title}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === idx
                    ? "bg-neo-yellow border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black translate-x-[-2px] translate-y-[-2px]"
                    : "bg-card border-black/15 hover:border-black/55 text-muted-foreground hover:text-foreground shadow-[2px_2px_0px_rgba(0,0,0,0.08)]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-lg border border-black transition-colors ${
                      activeTab === idx ? "bg-white text-black" : "bg-neo-yellow text-black"
                    }`}
                  >
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 max-w-[200px] truncate">
                      {c.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${activeTab === idx ? "rotate-90 text-black" : ""}`}
                />
              </button>
            ))}
          </div>

          {/* Right: Interactive Node View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard className="p-5 sm:p-8 min-h-[350px] flex flex-col justify-between neo-premium-card">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="grid h-12 w-12 place-items-center rounded-lg border-2 border-black bg-neo-yellow text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      {React.createElement(categories[activeTab].icon, { className: "h-6 w-6" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{categories[activeTab].title}</h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-black bg-[#BAFCA2] border border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] px-2.5 py-0.5 rounded mt-1 inline-block">
                        {Object.values(categories[activeTab].stats)[0]}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {categories[activeTab].desc}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {categories[activeTab].items.map((i) => (
                      <span
                        key={i}
                        className="rounded-lg border-2 border-black bg-card px-3.5 py-1 text-xs text-foreground hover:bg-[#FFDB58] hover:text-black hover:border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-default hover:scale-105"
                      >
                        {i}
                      </span>
                    ))}
                  </div>

                  {categories[activeTab].title === "Agentic AI" && (
                    <div className="mb-6">
                      <Link
                        to="/expertise/agentic-ai-development"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline cursor-pointer dark:text-white transition-colors"
                      >
                        Read Detailed Framework Comparison & Lifecycle Guide →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Dashboard / Node visualization panel */}
                <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-6 bg-card/10 rounded-2xl p-4">
                  {Object.entries(categories[activeTab].stats)
                    .slice(1)
                    .map(([key, val]) => (
                      <div key={key}>
                        <div className="text-[10px] uppercase tracking-wider text-black dark:text-white font-bold">
                          {key}
                        </div>
                        <div className="text-xs font-semibold text-foreground mt-1 truncate">
                          {val as string}
                        </div>
                      </div>
                    ))}
                  <div className="col-span-2">
                    <NeuralNetworkGraph active={true} />
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  const metrics = [
    { k: "50+", v: "AI Workflows Designed" },
    { k: "20+", v: "Business Processes Automated" },
    { k: "3+", v: "Years Technology Experience" },
    { k: "10+", v: "Production AI Systems" },
    { k: "1000s", v: "End Users Impacted" },
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass-strong grid grid-cols-2 gap-6 rounded-3xl p-8 sm:grid-cols-3 md:grid-cols-5 md:p-12">
          {metrics.map((m, idx) => (
            <div
              key={m.v}
              className={`text-center md:text-left ${idx === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="font-display text-4xl font-semibold text-gradient-green md:text-5xl">
                {m.k}
              </div>
              <div className="mt-2 text-xs text-muted-foreground md:text-sm">{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ScrollProgress() {
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight === 0) return;
      const pct = (window.scrollY / scrollHeight) * 100;
      setWidth(`${pct}%`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-[#FFDB58] border-b border-black z-[100] transition-all duration-75"
      style={{ width }}
    />
  );
}

function MockTerminal() {
  const [logs, setLogs] = useState<string[]>([
    "[System] agentic-terminal initialized. Ready for operations.",
    "[Agent] Idle. Listening for webhook triggers...",
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const runCommand = (cmd: string) => {
    if (isRunning) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx && localStorage.getItem("audio_effects") !== "false") {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {}

    setIsRunning(true);
    setLogs((prev) => [...prev, `> Executing: ${cmd}`]);

    if (cmd === "clear") {
      setTimeout(() => {
        setLogs(["[System] Console cleared.", "[Agent] Idle. Listening for webhook triggers..."]);
        setIsRunning(false);
      }, 300);
      return;
    }

    let commandSequence: string[] = [];
    if (cmd === "help") {
      commandSequence = [
        "[System] Available commands:",
        "  - optimize: Run neural graph optimization",
        "  - audit: Run agent security and cost check",
        "  - clear: Reset terminal state",
      ];
    } else if (cmd === "optimize") {
      commandSequence = [
        "[Agent] Analyzing current LangGraph paths...",
        "[Agent] Found 3 redundant loops in Node: Writer.",
        "[Success] Restructured graph edges. Speed +35%, Cost -12%.",
      ];
    } else if (cmd === "audit") {
      commandSequence = [
        "[Security] Starting system-wide token security audit...",
        "[Observability] All API keys masked. RAG permissions locked.",
        "[Audit Report] Cost threshold: OK, Security rating: A+",
      ];
    }

    let step = 0;
    const interval = setInterval(() => {
      if (step < commandSequence.length) {
        setLogs((prev) => {
          const next = [...prev, commandSequence[step]];
          if (next.length > 5) next.shift();
          return next;
        });
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 600);
  };

  return (
    <div className="font-mono text-[10px] bg-black/95 dark:bg-black p-4 rounded-xl border border-border text-[#BAFCA2] mt-4 h-[155px] flex flex-col justify-between overflow-hidden shadow-inner relative group/terminal w-full min-w-0">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5 select-none">
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#BAFCA2] animate-pulse" />
          workflow-agent-shell
        </span>
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B6B]"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFDB58]"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#BAFCA2]"></span>
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto mb-2 text-left scrollbar-none min-w-0 w-full">
        {logs.map((log, i) => (
          <div key={i} className="truncate">
            <span className="text-[#BAFCA2]/50 mr-1 select-none">$</span>
            {log}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 border-t border-white/10 pt-2 select-none flex-wrap w-full min-w-0">
        <span className="text-[8px] text-muted-foreground mr-1 uppercase font-bold">
          Quick Actions:
        </span>
        <button
          onClick={() => runCommand("help")}
          disabled={isRunning}
          className="bg-neutral-800 hover:bg-neutral-700 text-white text-[8px] px-2 py-0.5 rounded cursor-pointer transition-colors active:scale-95 disabled:opacity-50"
        >
          Help
        </button>
        <button
          onClick={() => runCommand("optimize")}
          disabled={isRunning}
          className="bg-neutral-800 hover:bg-[#FFDB58] hover:text-black text-white text-[8px] px-2 py-0.5 rounded cursor-pointer transition-colors active:scale-95 disabled:opacity-50"
        >
          Optimize
        </button>
        <button
          onClick={() => runCommand("audit")}
          disabled={isRunning}
          className="bg-neutral-800 hover:bg-[#FFDB58] hover:text-black text-white text-[8px] px-2 py-0.5 rounded cursor-pointer transition-colors active:scale-95 disabled:opacity-50"
        >
          Audit
        </button>
        <button
          onClick={() => runCommand("clear")}
          disabled={isRunning}
          className="bg-neutral-800 hover:bg-[#FF6B6B] text-white text-[8px] px-2 py-0.5 rounded cursor-pointer transition-colors active:scale-95 disabled:opacity-50 sm:ml-auto"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function MockContentDashboard() {
  const [progress, setProgress] = useState(100);
  const [status, setStatus] = useState("Published to Webflow CMS");
  const [isRunning, setIsRunning] = useState(false);

  const startAutomation = () => {
    if (isRunning) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx && localStorage.getItem("audio_effects") !== "false") {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {}

    setIsRunning(true);
    setProgress(0);
    setStatus("Initializing Crew...");

    const steps = [
      { p: 15, s: "Agent: Researcher - Scraping Google Trends..." },
      { p: 40, s: "Agent: Writer - Drafting content outline..." },
      { p: 70, s: "Agent: Editor - Proofreading & fact-checking..." },
      { p: 90, s: "API Webhook - Structuring JSON format..." },
      { p: 100, s: "Published to Webflow CMS!" },
    ];

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatus(steps[currentStep].s);
        currentStep++;
      } else {
        clearInterval(timer);
        setIsRunning(false);
      }
    }, 1200);
  };

  return (
    <div className="bg-card/75 dark:bg-black/40 p-4 rounded-xl border border-border mt-4 flex flex-col justify-between h-[155px] shadow-sm relative group/dashboard w-full min-w-0 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 shrink-0">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isRunning ? "bg-[#BAFCA2] animate-ping" : "bg-[#7FBC8C]"}`}
          />
          Content Crew Status
        </span>
        <span className="text-[9px] font-semibold bg-[#BAFCA2] text-black border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] px-2 py-0.5 rounded-md truncate max-w-[100px] xs:max-w-[130px] sm:max-w-[170px]">
          {status}
        </span>
      </div>

      <div className="mt-2 flex-1 flex flex-col justify-center min-w-0 w-full">
        <div className="flex justify-between text-[9px] text-muted-foreground mb-1 select-none">
          <span>Task Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#BAFCA2] h-1.5 rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[8px] text-muted-foreground mt-2 border-t border-border/40 pt-2 select-none w-full min-w-0">
        <span className="shrink-0">Agents: Planner, Writer, Editor</span>
        <button
          onClick={startAutomation}
          disabled={isRunning}
          className="text-black font-bold bg-[#FFDB58] border-2 border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] px-2.5 py-1 rounded text-[8px] transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] shrink-0"
        >
          {isRunning ? "Running..." : "Run Crew Workflow"}
        </button>
      </div>
    </div>
  );
}

interface MockMobileProps {
  type: "edtech" | "finance";
}

function MockMobileApp({ type }: MockMobileProps) {
  const [reloadCount, setReloadCount] = useState(0);
  const [isReloading, setIsReloading] = useState(false);

  const triggerReload = () => {
    if (isReloading) return;
    setIsReloading(true);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx && localStorage.getItem("audio_effects") !== "false") {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {}

    setTimeout(() => {
      setReloadCount((c) => c + 1);
      setIsReloading(false);
    }, 800);
  };

  return (
    <div className="bg-card/75 dark:bg-black/40 p-4 rounded-xl border border-border mt-4 flex items-center justify-between h-[155px] shadow-sm relative group/simulator w-full min-w-0 overflow-hidden">
      {/* Left: Dev Console */}
      <div className="flex-1 flex flex-col justify-between h-full text-left pr-3 min-w-0">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full bg-[#BAFCA2] ${isReloading ? "animate-ping" : "animate-pulse"}`}
            />
            {type === "edtech" ? "Shiksha Live Sync" : "Eazr Pay Gateway"}
          </span>
          <div className="mt-2 space-y-1 font-mono text-[8px] text-muted-foreground">
            <div className="truncate">
              Status: {isReloading ? "Hot Reloading..." : "Live Connection"}
            </div>
            <div className="truncate">
              Sync: {reloadCount > 0 ? `Synced (${reloadCount} updates)` : "Synced (Clean)"}
            </div>
            <div className="truncate">Platform: iOS & Android</div>
          </div>
        </div>

        <button
          onClick={triggerReload}
          disabled={isReloading}
          className="text-black font-bold bg-[#FFDB58] border-2 border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] px-2 py-0.5 rounded text-[8px] transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50 self-start mt-2 shrink-0"
        >
          {isReloading ? "Reloading..." : "Hot Reload Sync"}
        </button>
      </div>

      {/* Right: Phone Frame Preview */}
      <div className="relative border-[3px] border-neutral-700 dark:border-neutral-800 rounded-[1rem] p-1 w-[85px] h-[125px] bg-black shadow-md overflow-hidden flex flex-col justify-between shrink-0 select-none">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-8 bg-neutral-700 dark:bg-neutral-800 rounded-b-[2px] z-20" />

        {/* App Screen Content */}
        <div className="flex-1 bg-background rounded-[0.5rem] p-1 flex flex-col justify-between text-[5px] overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/60 pb-0.5">
            <span className="font-bold text-[5.5px] text-foreground truncate max-w-[50px]">
              {type === "edtech" ? "ShareShiksha" : "Eazr Wallet"}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#BAFCA2] animate-pulse" />
          </div>

          {type === "edtech" ? (
            <div className="space-y-0.5 my-0.5">
              <div className="bg-[#BAFCA2] text-black border border-black p-0.5 rounded-[2px] text-center text-[4.5px] font-semibold truncate">
                Interactive Classes
              </div>
              <div className="flex gap-0.5">
                <div className="flex-1 bg-muted/60 p-0.5 rounded-[2px] text-center text-[4px] truncate">
                  Quiz
                </div>
                <div className="flex-1 bg-muted/60 p-0.5 rounded-[2px] text-center text-[4px] truncate">
                  Video
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-0.5 my-0.5">
              <div className="flex justify-between items-center bg-muted/60 p-0.5 rounded-[2px] text-[4px]">
                <span>Bal:</span>
                <span className="font-bold text-black">$1,480.00</span>
              </div>
              <div className="bg-[#BAFCA2] text-black border border-black text-center font-bold rounded-[2px] text-[4px] py-0.2">
                Transfer Instant
              </div>
            </div>
          )}

          <div className="flex justify-around border-t border-border/40 pt-0.5 text-muted-foreground text-[4px] font-medium">
            <span>Home</span>
            <span>Learn</span>
            <span>Wallet</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      title: "Enterprise AI Automation Framework",
      desc: "Built intelligent workflow systems that automate repetitive business processes and improve operational efficiency.",
      challenges: "Fragmented manual workflows across teams.",
      solutions: "Designed a unified agent-orchestrated automation framework.",
      results: "60% reduction in manual ops time across pilot teams.",
      tech: ["LangGraph", "n8n", "OpenAI", "Postgres"],
      category: "AI & Automations",
    },
    {
      title: "AI Content Production System",
      desc: "Designed agent-based content creation workflows reducing manual effort.",
      challenges: "High volume content needs with limited human bandwidth.",
      solutions: "Multi-agent pipeline for research, drafting, review, and publishing.",
      results: "4x faster content production with editorial QA loops.",
      tech: ["CrewAI", "OpenAI", "Next.js", "Make"],
      category: "AI & Automations",
    },
    {
      title: "ShareShiksha EdTech Platform",
      desc: "Developed scalable mobile learning experiences using Flutter and API-driven architecture.",
      challenges: "Reach learners on low-end devices with poor connectivity.",
      solutions: "Optimized Flutter architecture with offline-first sync.",
      results: "Smooth experience across thousands of student devices.",
      tech: ["Flutter", "Firebase", "Node.js", "REST"],
      category: "Web & Mobile",
    },
    {
      title: "Eazr Digipayments Mobile Application",
      desc: "Built secure financial applications with scalable architecture and modern user experiences.",
      challenges: "Strict security and performance requirements.",
      solutions: "Layered architecture with secure auth and modular UI.",
      results: "Production-grade app with high reliability under load.",
      tech: ["Flutter", "Dart", "Firebase", "REST"],
      category: "Web & Mobile",
    },
    {
      title: "Agentic AI Business Assistant",
      desc: "Created AI agents capable of handling business operations and decision-support workflows.",
      challenges: "Knowledge scattered across tools and people.",
      solutions: "Agent system with tool-use, memory, and human-in-the-loop.",
      results: "Faster decisions with consistent operational quality.",
      tech: ["OpenAI Agents", "LangGraph", "Vector DB"],
      category: "AI & Automations",
    },
  ];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Outlined Section Number Separator */}
      <div className="absolute -top-10 -left-6 text-[12rem] font-black text-black/[0.03] dark:text-white/[0.02] select-none pointer-events-none font-display leading-none">
        04
      </div>

      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-eyebrow">Featured Projects</div>
            <h2 className="mt-4 text-4xl font-extrabold md:text-5xl tracking-tight text-black dark:text-white">
              Shipping AI systems that{" "}
              <span className="text-gradient-green">move the business</span>.
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] self-start max-w-full">
            {["All", "AI & Automations", "Web & Mobile"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  filter === cat
                    ? "text-black bg-neo-yellow font-bold border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-14 grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, idx) => (
              <motion.article
                layout
                key={p.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`w-full min-w-0 overflow-hidden ${filter === "All" && idx === 0 ? "lg:col-span-2" : ""}`}
              >
                <SpotlightCard className="p-5 sm:p-7 flex flex-col justify-between h-full w-full min-w-0 overflow-hidden neo-premium-card relative">
                  {/* Card Personality Variation */}
                  {idx === 0 && (
                    <div className="absolute top-0 left-0 right-0 h-2 bg-neo-yellow" />
                  )}
                  {idx === 1 && (
                    <div className="absolute inset-0 bg-dot-pattern opacity-[0.08] pointer-events-none" />
                  )}
                  {idx === 2 && (
                    <div className="absolute top-4 right-4 text-black/10 dark:text-white/10 pointer-events-none hidden sm:block">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="12" y1="0" x2="12" y2="24" />
                        <line x1="0" y1="12" x2="24" y2="12" />
                      </svg>
                    </div>
                  )}
                  {idx === 3 && (
                    <div className="absolute top-4 right-12 bg-neo-green text-black border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded rotate-[5deg] select-none z-10">
                      ✨ live
                    </div>
                  )}
                  {idx === 4 && (
                    <div className="absolute bottom-4 right-4 text-black/10 dark:text-white/15 pointer-events-none hidden sm:block">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="6" y="6" width="20" height="20" rx="2" />
                        <line x1="10" y1="6" x2="10" y2="2" />
                        <line x1="16" y1="6" x2="16" y2="2" />
                        <line x1="22" y1="6" x2="22" y2="2" />
                        <line x1="10" y1="26" x2="10" y2="30" />
                        <line x1="16" y1="26" x2="16" y2="30" />
                        <line x1="22" y1="26" x2="22" y2="30" />
                        <line x1="6" y1="10" x2="2" y2="10" />
                        <line x1="6" y1="16" x2="2" y2="16" />
                        <line x1="6" y1="22" x2="2" y2="22" />
                        <line x1="26" y1="10" x2="30" y2="10" />
                        <line x1="26" y1="16" x2="30" y2="16" />
                        <line x1="26" y1="22" x2="30" y2="22" />
                      </svg>
                    </div>
                  )}

                  <div className="w-full min-w-0 relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-black bg-[#BAFCA2] border border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] px-2.5 py-0.5 rounded">
                          {p.category}
                        </span>
                        <h3 className="text-xl font-semibold md:text-2xl mt-2">{p.title}</h3>
                      </div>
                      <Layers className="h-5 w-5 shrink-0 text-black dark:text-white" />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>

                    {/* Simulated Project Widget Demo */}
                    {p.title === "Enterprise AI Automation Framework" && <MockTerminal />}
                    {p.title === "AI Content Production System" && <MockContentDashboard />}
                    {p.title === "ShareShiksha EdTech Platform" && <MockMobileApp type="edtech" />}
                    {p.title === "Eazr Digipayments Mobile Application" && (
                      <MockMobileApp type="finance" />
                    )}
                    {p.title === "Agentic AI Business Assistant" && (
                      <div className="bg-card/75 dark:bg-black/40 p-4 rounded-xl border border-border mt-4 flex flex-col justify-between h-[155px] shadow-sm relative group/rag-widget w-full min-w-0 overflow-hidden select-none">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 shrink-0">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#BAFCA2] animate-pulse" />
                            RAG Memory Store
                          </span>
                          <span className="text-[9px] font-semibold bg-[#BAFCA2] text-black border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] px-2 py-0.5 rounded-md truncate max-w-[120px]">
                            98% Accuracy
                          </span>
                        </div>

                        <div className="mt-2 flex-1 flex flex-col justify-center min-w-0 w-full">
                          <div className="flex justify-between text-[9px] text-muted-foreground mb-1 select-none">
                            <span>Vector Embedding Chunk</span>
                            <span className="font-mono">#188a-92b4</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              animate={{ width: "98%" }}
                              className="bg-[#BAFCA2] h-1.5 rounded-full"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 text-[8px] text-muted-foreground mt-2 border-t border-border/40 pt-2 select-none w-full min-w-0">
                          <span className="shrink-0">Memory: Active Semantics</span>
                          <button
                            onClick={() => {
                              try {
                                const AudioCtx =
                                  window.AudioContext || (window as any).webkitAudioContext;
                                if (AudioCtx && localStorage.getItem("audio_effects") !== "false") {
                                  const ctx = new AudioCtx();
                                  const osc = ctx.createOscillator();
                                  const gain = ctx.createGain();
                                  osc.type = "sine";
                                  osc.frequency.setValueAtTime(500, ctx.currentTime);
                                  gain.gain.setValueAtTime(0.01, ctx.currentTime);
                                  gain.gain.exponentialRampToValueAtTime(
                                    0.0001,
                                    ctx.currentTime + 0.1,
                                  );
                                  osc.connect(gain);
                                  gain.connect(ctx.destination);
                                  osc.start();
                                  osc.stop(ctx.currentTime + 0.1);
                                }
                              } catch (e) {}
                            }}
                            className="text-black font-bold bg-[#FFDB58] border-2 border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] px-2 py-1 rounded text-[8px] transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] shrink-0"
                          >
                            Query Vector Store
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 grid gap-4 text-xs sm:grid-cols-3 bg-card/25 p-4 rounded-2xl border border-border/40">
                      <div>
                        <div className="font-bold text-black dark:text-white uppercase tracking-wider">
                          Challenge
                        </div>
                        <div className="mt-1 text-muted-foreground">{p.challenges}</div>
                      </div>
                      <div>
                        <div className="font-bold text-black dark:text-white uppercase tracking-wider">
                          Solution
                        </div>
                        <div className="mt-1 text-muted-foreground">{p.solutions}</div>
                      </div>
                      <div>
                        <div className="font-bold text-black dark:text-white uppercase tracking-wider">
                          Result
                        </div>
                        <div className="mt-1 text-muted-foreground font-medium text-foreground">
                          {p.results}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border-2 border-black bg-card px-2.5 py-1 text-xs text-muted-foreground hover:bg-[#FFDB58] hover:text-black hover:border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      title: "AI Transformation Consulting",
      desc: "End-to-end roadmap for adopting AI across your organization.",
      tier: "Strategic",
      icon: Compass,
      num: "01",
      badgeColor: "bg-[#BAFCA2]",
      pattern: false,
    },
    {
      title: "Business Process Automation",
      desc: "Eliminate manual workflows with intelligent automation systems.",
      tier: "Operational",
      icon: Settings,
      num: "02",
      badgeColor: "bg-[#FFDB58]",
      pattern: true,
    },
    {
      title: "Agentic AI Solutions",
      desc: "Custom multi-agent systems built for your business workflows.",
      tier: "Engineering",
      icon: Bot,
      num: "03",
      badgeColor: "bg-[#C4A1FF]",
      pattern: false,
    },
    {
      title: "AI Strategy Workshops",
      desc: "Align leadership on AI opportunities and prioritize initiatives.",
      tier: "Advisory",
      icon: Zap,
      num: "04",
      badgeColor: "bg-[#FFC0CB]",
      pattern: true,
    },
    {
      title: "Flutter App Development",
      desc: "Scalable, modern mobile applications with clean architecture.",
      tier: "Engineering",
      icon: Smartphone,
      num: "05",
      badgeColor: "bg-[#A7DBD8]",
      pattern: false,
    },
    {
      title: "Enterprise AI Adoption",
      desc: "Change management and rollout programs that actually stick.",
      tier: "Transformation",
      icon: Users,
      num: "06",
      badgeColor: "bg-[#FFA07A]",
      pattern: false,
    },
  ];
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Outlined Section Number Separator */}
      <div className="absolute -top-10 -left-6 text-[12rem] font-black text-black/[0.03] dark:text-white/[0.02] select-none pointer-events-none font-display leading-none">
        05
      </div>

      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="max-w-3xl">
          <div className="section-eyebrow">Services</div>
          <h2 className="mt-4 text-4xl font-extrabold md:text-6xl tracking-tight text-black dark:text-white">
            How we can <span className="text-gradient-green">work together</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <SpotlightCard
              key={s.title}
              className="p-6 sm:p-7 flex flex-col justify-between neo-premium-card overflow-hidden"
            >
              {s.pattern && (
                <div className="absolute inset-0 bg-dot-pattern opacity-[0.06] pointer-events-none" />
              )}
              <div className="relative z-10 w-full">
                <div className="flex items-start justify-between">
                  <div className={`grid h-12 w-12 place-items-center rounded-lg border-2 border-black ${s.badgeColor} text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-black text-black/5 dark:text-white/5 select-none pointer-events-none font-display leading-none">
                    {s.num}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-extrabold">
                  {s.tier}
                </div>
                <h3 className="mt-3 text-lg font-bold text-black dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black dark:text-white hover:underline self-start relative z-10 group/link"
              >
                <span>Discuss scope</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Articles() {
  const articles = [
    { title: "The Future of Agentic AI", read: "8 min read", tag: "Agentic AI", color: "bg-[#BAFCA2]" },
    { title: "How Businesses Can Adopt AI Successfully", read: "6 min read", tag: "Strategy", color: "bg-[#FFDB58]" },
    {
      title: "Building AI Workflows That Actually Deliver ROI",
      read: "10 min read",
      tag: "Automation",
      color: "bg-[#C4A1FF]",
    },
    { title: "AI Transformation vs Digital Transformation", read: "7 min read", tag: "Leadership", color: "bg-[#FFA07A]" },
  ];
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Outlined Section Number Separator */}
      <div className="absolute -top-10 -left-6 text-[12rem] font-black text-black/[0.03] dark:text-white/[0.02] select-none pointer-events-none font-display leading-none">
        06
      </div>

      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="max-w-3xl">
          <div className="section-eyebrow">Thought Leadership</div>
          <h2 className="mt-4 text-4xl font-extrabold md:text-6xl tracking-tight text-black dark:text-white">
            Writing on AI, automation, and{" "}
            <span className="text-gradient-green">business impact</span>.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {articles.map((a) => (
            <a
              key={a.title}
              href="#"
              className="neo-premium-card flex items-center justify-between p-6 w-full relative group/art"
            >
              <div className="w-full pr-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[9px] uppercase font-extrabold tracking-wider text-black ${a.color} border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] px-2.5 py-0.5 rounded`}>
                    {a.tag}
                  </span>
                  <span className="text-[9px] font-extrabold bg-white dark:bg-black text-black dark:text-white border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] px-2.5 py-0.5 rounded">
                    {a.read}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-black dark:text-white leading-snug group-hover/art:underline">
                  {a.title}
                </h3>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover/art:translate-x-1 group-hover/art:text-[#FFDB58] shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      q: "Mayur reframed our AI strategy around outcomes. We shipped automations that real teams actually use.",
      n: "Head of Operations",
      c: "Enterprise Client",
      initials: "HO",
    },
    {
      q: "He bridges the gap between business and AI engineering better than anyone we've worked with.",
      n: "Product Director",
      c: "Eazr Digipayments",
      initials: "PD",
    },
    {
      q: "Our content team became 4x more productive after his agent system rolled out.",
      n: "Marketing Lead",
      c: "Media Company",
      initials: "ML",
    },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Outlined Section Number Separator */}
      <div className="absolute -top-10 -left-6 text-[12rem] font-black text-black/[0.03] dark:text-white/[0.02] select-none pointer-events-none font-display leading-none">
        07
      </div>

      <div className="mx-auto max-w-4xl px-4 relative">
        <div className="text-center">
          <div className="section-eyebrow justify-center">Testimonials</div>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl tracking-tight text-black dark:text-white">
            Trusted by <span className="text-gradient-green">teams shipping AI</span>.
          </h2>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl border-4 border-black bg-white dark:bg-[#1E1E1E] p-8 md:p-14 min-h-[250px] flex flex-col justify-between shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_var(--neo-shadow)]">
          {/* Micro Paper Clip Sticker */}
          <div className="absolute top-4 right-12 text-black/20 dark:text-white/20 select-none pointer-events-none hidden sm:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 7.91V16a6 6 0 0 0 12 0V7.91a4 4 0 0 0-8 0V15a2 2 0 0 0 4 0V7.91" />
            </svg>
          </div>
          <Quote className="absolute right-8 top-8 h-12 w-12 text-black/[0.05] dark:text-white/[0.05] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <div className="flex gap-1 mb-4 text-[#FFDB58]">
                {[...Array(5)].map((_, idx) => (
                  <span key={idx} className="text-xl">★</span>
                ))}
              </div>
              <p className="font-display text-xl leading-relaxed md:text-2xl text-foreground italic">
                "{items[i].q}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#BAFCA2] border-2 border-black text-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] flex items-center justify-center font-bold text-xs">
                  {items[i].initials}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{items[i].n}</div>
                  <div className="text-sm text-muted-foreground">{items[i].c}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === idx
                    ? "w-8 bg-[#FFDB58] border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                    : "w-4 bg-border hover:bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("mayuraimaker@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Audio click feedback
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (err) {}
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Outlined Section Number Separator */}
      <div className="absolute -top-10 -left-6 text-[12rem] font-black text-black/[0.03] dark:text-white/[0.02] select-none pointer-events-none font-display leading-none">
        08
      </div>

      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="relative overflow-hidden rounded-3xl border-4 border-black bg-white dark:bg-[#1E1E1E] p-6 sm:p-10 md:p-16 shadow-[12px_12px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_var(--neo-shadow)]">
          {/* Subtle Rotating Grid Shape in background */}
          <div className="absolute -bottom-16 -right-16 text-black/5 dark:text-white/5 pointer-events-none hidden sm:block animate-spin-slow">
            <svg width="240" height="240" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="50" cy="50" r="45" strokeDasharray="6 6" />
            </svg>
          </div>

          <div className="relative">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 bg-[#BAFCA2] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] px-4 py-1.5 rounded-full text-xs font-black text-black mb-8 select-none">
              <span className="h-2 w-2 rounded-full bg-black animate-ping" />
              <span>Available for Projects (Q3 2026)</span>
            </div>

            <h2 className="text-4xl font-extrabold md:text-6xl tracking-tight text-black dark:text-white">
              Let's build the <span className="text-gradient-green">future together</span>.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Whether you're exploring AI strategy, automating a workflow, or building an agentic
              system — I'd love to help you ship it.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://calendly.com/mayurchaudhari1675/30min"
                target="_blank"
                rel="noreferrer"
                className="neo-btn px-6 py-3"
              >
                <Calendar className="h-4 w-4" />
                <span>Book on Calendly</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="neo-btn neo-btn-white px-6 py-3 relative overflow-visible"
              >
                <Mail className="h-4 w-4" />
                <span>{copied ? "Copied Email!" : "mayuraimaker@gmail.com"}</span>
                {copied && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded border border-black shadow-[2px_2px_0px_rgba(186,252,162,1)] whitespace-nowrap animate-bounce">
                    Copied to Clipboard!
                  </div>
                )}
              </button>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4 border-t border-black/10 dark:border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-black dark:text-white" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Location
                  </div>
                  <div className="text-sm font-extrabold">Mumbai, India</div>
                </div>
              </div>
              <a
                href="tel:+918087205660"
                className="flex items-center gap-3 transition-colors hover:text-[#FFDB58]"
              >
                <Phone className="h-5 w-5 text-black dark:text-white" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Phone
                  </div>
                  <div className="text-sm font-extrabold">+91 808 720 5660</div>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/iayr1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[#FFDB58]"
              >
                <Linkedin className="h-5 w-5 text-black dark:text-white" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    LinkedIn
                  </div>
                  <div className="text-sm font-extrabold">Connect</div>
                </div>
              </a>
              <a
                href="https://www.github.com/iayr1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[#FFDB58]"
              >
                <Github className="h-5 w-5 text-black dark:text-white" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    GitHub
                  </div>
                  <div className="text-sm font-extrabold">View Code</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} Mayur Chaudhari. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span>AI Business Transformation · Mumbai, India</span>
          <a
            href="https://drive.google.com/file/d/1FgLCjW_7zYTOkBD2QumKM4Oi7E6rpHa4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/60 hover:text-[#FFDB58] transition-colors"
          >
            Resume
          </a>
          <a
            href="/admin"
            className="text-xs text-muted-foreground/60 hover:text-[#FFDB58] transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let cursorX = 0;
    let cursorY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    };

    const tick = () => {
      ringX += (cursorX - ringX) * 0.12;
      ringY += (cursorY - ringY) * 0.12;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    const raf = requestAnimationFrame(tick);

    // Hover triggers
    const onEnter = () => {
      ring.classList.add("scale-150", "border-[#BAFCA2]", "bg-[#BAFCA2]/10");
      cursor.classList.add("scale-50");
    };
    const onLeave = () => {
      ring.classList.remove("scale-150", "border-[#BAFCA2]", "bg-[#BAFCA2]/10");
      cursor.classList.remove("scale-50");
    };

    const registerHoverables = () => {
      const hoverables = document.querySelectorAll(
        "a, button, [role='button'], .neo-premium-card, .spotlight-card, input, textarea"
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      return hoverables;
    };

    let hoverables = registerHoverables();

    // Re-register hoverables if DOM updates
    const observer = new MutationObserver(() => {
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      hoverables = registerHoverables();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-white transition-transform duration-100 ease-out hidden md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black dark:border-white transition-all duration-300 ease-out hidden md:block"
      />
    </>
  );
}

function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedAudio = localStorage.getItem("audio_effects");
      if (savedAudio !== null) {
        setAudioEnabled(savedAudio === "true");
      }
    }
  }, []);

  const toggleAudio = () => {
    const nextVal = !audioEnabled;
    setAudioEnabled(nextVal);
    localStorage.setItem("audio_effects", String(nextVal));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
  }, []);

  // Play chime on load, or fallback to first interaction if browser blocks it
  useEffect(() => {
    const playChime = () => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
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
          return;
        }

        triggerChimeSound(ctx);
      } catch (err) {
        console.warn("AudioContext blocked or failed:", err);
      }
    };

    playChime();
  }, []);

  return (
    <div className="relative min-h-screen text-foreground transition-colors duration-300 overflow-x-hidden">
      <ScrollProgress />
      <WebGLBackground />
      {/* Ambient gradient blobs */}
      <div className="absolute top-[10%] left-[-100px] w-[500px] h-[500px] bg-neo-green/10 rounded-full blur-[150px] pointer-events-none -z-20 select-none" />
      <div className="absolute top-[45%] right-[-100px] w-[500px] h-[500px] bg-neo-purple/10 rounded-full blur-[150px] pointer-events-none -z-20 select-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-neo-yellow/10 rounded-full blur-[150px] pointer-events-none -z-20 select-none" />

      {mounted && <CustomCursor />}
      <Nav mounted={mounted} audioEnabled={audioEnabled} toggleAudio={toggleAudio} />
      <main>
        <Hero />
        <StackMarquee />
        <About />
        <VideoSection />
        <Experience />
        <Expertise />
        <Metrics />
        <Projects />
        <Services />
        <Articles />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
