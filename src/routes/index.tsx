import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
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
  ChevronLeft,
  ChevronRight,
  Quote,
  PlayCircle,
  Play,
  Phone,
  Compass,
  Settings,
  Users,
  Check,
  Copy,
  AlertTriangle,
  Lightbulb,
  Trophy,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { WebGLBackground } from "@/components/WebGLBackground";
import {
  CountUp,
  EASE_OUT,
  Magnetic,
  Reveal,
  SectionHeader,
  SplitReveal,
  SpotlightCard,
  playBlip,
  triggerChimeSound,
  useAudioPreference,
  useWelcomeChime,
} from "@/components/site/primitives";
import {
  CALENDLY_URL,
  CustomCursor,
  EMAIL,
  Footer,
  GITHUB_URL,
  LINKEDIN_URL,
  Nav,
  NoiseOverlay,
  Preloader,
  RESUME_URL,
  ScrollProgress,
} from "@/components/site/chrome";
import {
  AIDiagnostics,
  MockContentDashboard,
  MockMobileApp,
  MockTerminal,
  NeuralNetworkGraph,
  RagMemoryWidget,
} from "@/components/site/widgets";
import mayurPortrait from "@/assets/mayur-portrait.png";
import videoPoster from "@/assets/mayur-video-poster.png";

// Shared building blocks are re-exported so other routes can keep importing them from here.
export { Nav, Footer, ScrollProgress, SpotlightCard, triggerChimeSound };

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
      { rel: "preload", as: "image", href: mayurPortrait, fetchPriority: "high" },
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

/* ================================================================== */
/* Hero                                                                */
/* ================================================================== */

function TypewriterSubtitle() {
  const words = ["Agentic AI", "Workflow Automation", "Intelligent Systems", "AI Strategy"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="relative block h-[1.12em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="animate-text-shimmer text-serif block whitespace-nowrap pr-[0.1em]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function PortraitCard({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 18,
  });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay: 0.25, ease: EASE_OUT }}
      className="relative mx-auto w-full max-w-[420px] lg:max-w-none [perspective:1200px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* glow behind */}
        <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-lime/30 via-cyan/10 to-violet/30 blur-3xl" />

        {/* Portrait frame */}
        <div className="relative rounded-[2rem] bg-[#0b0c11] p-2 shadow-[0_50px_100px_-40px_rgba(0,0,0,1)]">
          <span className="conic-ring rounded-[2rem]" />
          <div className="relative overflow-hidden rounded-[1.6rem]">
            <img
              src={mayurPortrait}
              alt="Mayur Chaudhari, AI Business Transformation Manager"
              width={900}
              height={900}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/10 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(200,255,77,0.18),transparent_50%)] mix-blend-screen" />

            {/* Sticker */}
            <div className="absolute left-4 top-4 z-30 flex select-none items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-lime" />
              verified expert
            </div>
          </div>
        </div>

        {/* Floating: agent runner */}
        <div
          style={{ transform: "translateZ(60px)" }}
          className="absolute -left-10 top-16 z-20 hidden select-none items-center gap-2 rounded-xl border border-white/10 bg-[#0d0e13]/85 px-3 py-2 font-mono text-[10px] text-foreground/90 backdrop-blur-md xl:flex animate-float"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
          agent-runner.js <span className="text-lime">&rarr; connected</span>
        </div>

        {/* Floating: workflow rating */}
        <div
          style={{ transform: "translateZ(50px)", animationDelay: "1.5s" }}
          className="absolute -right-8 bottom-28 z-20 hidden select-none flex-col gap-0.5 rounded-xl border border-white/10 bg-[#0d0e13]/85 px-3 py-2 font-mono text-[10px] backdrop-blur-md xl:flex animate-float"
        >
          <div className="text-muted-foreground">WORKFLOW RATING</div>
          <div className="text-[13px] font-semibold text-lime">+92.4% Optimal</div>
        </div>

        {/* Floating: diagnostics */}
        <div
          style={{ transform: "translateZ(40px)" }}
          className="absolute -right-6 -top-8 z-20 hidden md:block lg:hidden xl:block xl:-right-14"
        >
          <AIDiagnostics />
        </div>

        {/* Floating: currently leading */}
        <div
          style={{ transform: "translateZ(70px)" }}
          className="absolute -bottom-6 -left-4 z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0e13]/90 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,1)] backdrop-blur-xl sm:flex lg:-left-10"
        >
          <span className="icon-tile h-10 w-10 [--tile:#a78bfa]">
            <TrendingUp className="h-4 w-4" />
          </span>
          <div className="text-left">
            <div className="text-[11px] text-muted-foreground">Currently leading</div>
            <div className="text-sm font-semibold">AI Transformation @ EDGE</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hx", `${e.clientX - r.left}px`);
    el.style.setProperty("--hy", `${e.clientY - r.top}px`);
  };

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 sm:pt-36"
    >
      {/* Backdrop layers */}
      <div className="pointer-events-none absolute inset-0 bg-line-grid" />
      <div className="perspective-grid" />
      <div className="aurora-blob -left-40 top-10 h-[480px] w-[480px] bg-lime/20" />
      <div
        className="aurora-blob -right-40 top-40 h-[520px] w-[520px] bg-violet/25"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [@media(pointer:fine)]:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--hx, 50%) var(--hy, 30%), rgba(200,255,77,0.07), transparent 45%)",
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-14"
      >
        <div className="min-w-0">
          <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-2">
            <div className="chip">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              <span className="text-foreground/90">
                AI Systems & Business Transformation Manager · EDGE
              </span>
            </div>
          </motion.div>

          <h1 className="mt-7 text-[clamp(2.6rem,6.6vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground">
            <SplitReveal text="Transforming" play={ready} className="block" />
            <SplitReveal
              text="Businesses with"
              play={ready}
              delay={0.12}
              className="block text-foreground/55"
            />
            <motion.span {...fadeUp(0.45)} className="block">
              <TypewriterSubtitle />
            </motion.span>
          </h1>

          <motion.p
            {...fadeUp(0.55)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            I help organizations automate workflows, redesign operations, and deploy intelligent AI
            systems that create <span className="text-foreground">measurable business impact</span>.
          </motion.p>

          <motion.div {...fadeUp(0.65)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#projects" className="group neo-btn px-6 py-3.5 text-[15px]">
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="neo-btn neo-btn-white px-6 py-3.5 text-[15px]">
                <Calendar className="h-4 w-4" />
                <span>Book Consultation</span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            {...fadeUp(0.8)}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
          >
            {[
              { k: "50+", v: "AI Workflows", color: "from-lime" },
              { k: "20+", v: "Processes Automated", color: "from-cyan" },
              { k: "6+", v: "Years Experience", color: "from-violet" },
              { k: "1000s", v: "Users Impacted", color: "from-[#fdba74]" },
            ].map((s) => (
              <div
                key={s.v}
                className="group relative select-none bg-[#0a0b0f]/90 p-4 transition-colors hover:bg-[#101117] sm:p-5"
              >
                <div className="text-3xl font-semibold tracking-tight text-foreground md:text-[2.1rem]">
                  <CountUp value={s.k} />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.v}
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r ${s.color} to-transparent transition-all duration-700 group-hover:w-full`}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <PortraitCard ready={ready} />
      </motion.div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Scroll Down
        </span>
        <div className="flex h-[34px] w-[20px] justify-center rounded-full border border-white/20 p-[5px]">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-[6px] w-[3px] rounded-full bg-lime"
          />
        </div>
      </a>
    </section>
  );
}

/* ================================================================== */
/* Stack marquee                                                       */
/* ================================================================== */

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
  const dots = ["bg-lime", "bg-cyan", "bg-violet"];
  const row = [...stack, ...stack];
  const rowReversed = [...[...stack].reverse(), ...[...stack].reverse()];

  return (
    <section aria-label="Tools and platforms" className="relative overflow-hidden py-14">
      <div className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        Building with the modern AI &amp; automation stack
      </div>
      <div className="marquee-pause mask-fade-x relative space-y-3 overflow-hidden">
        {[row, rowReversed].map((r, ri) => (
          <div key={ri} className={`marquee-track flex w-max gap-3 ${ri === 1 ? "reverse" : ""}`}>
            {r.map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.025] px-5 py-2.5 text-[15px] font-medium text-foreground/85 transition-colors hover:border-lime/40 hover:text-foreground"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${dots[i % 3]}`} />
                {s}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* About                                                               */
/* ================================================================== */

function HighlightWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
function ScrollHighlightText({ paragraphs }: { paragraphs: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const all = paragraphs.map((p) => p.split(" "));
  const total = all.reduce((n, w) => n + w.length, 0);
  let cursor = 0;

  return (
    <div ref={ref} className="space-y-6">
      {all.map((words, pi) => (
        <p
          key={pi}
          className="text-[1.45rem] font-medium leading-[1.35] tracking-[-0.02em] text-foreground sm:text-3xl md:text-[2.1rem]"
        >
          {words.map((w, wi) => {
            const start = cursor / total;
            cursor++;
            return (
              <HighlightWord
                key={wi}
                progress={scrollYProgress}
                range={[start, Math.min(1, start + 3 / total)]}
              >
                {w}
              </HighlightWord>
            );
          })}
        </p>
      ))}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeader
          number="01"
          eyebrow="Who I Am"
          title={
            <>
              Beyond AI. <span className="text-serif text-gradient-green">Beyond Automation.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <ScrollHighlightText
            paragraphs={[
              "I am an AI Business Transformation Manager focused on helping organizations unlock productivity through Agentic AI, workflow automation, and intelligent digital systems.",
              "My expertise lies in connecting business problems with AI-powered solutions. Instead of building models in isolation, I design systems that improve operations, automate repetitive work, and create scalable business outcomes.",
            ]}
          />

          <div className="space-y-4">
            {[
              {
                icon: Brain,
                title: "Strategy First",
                desc: "Business outcomes drive every AI deployment.",
                tile: "#c8ff4d",
              },
              {
                icon: Workflow,
                title: "Systems Thinking",
                desc: "Connected workflows over isolated models.",
                tile: "#5eead4",
              },
              {
                icon: Target,
                title: "Measurable Impact",
                desc: "ROI, productivity, and operational lift.",
                tile: "#a78bfa",
              },
            ].map((c, index) => (
              <Reveal key={c.title} delay={index * 0.1}>
                <SpotlightCard className="flex items-center gap-5 p-5 sm:p-6">
                  <div
                    className="icon-tile h-12 w-12 shrink-0"
                    style={{ "--tile": c.tile } as React.CSSProperties}
                  >
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        0{index + 1}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {c.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Video                                                               */
/* ================================================================== */

function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoId = "s43HrsbMxCs";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);

  return (
    <section id="video" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Watch"
          title={
            <>
              AI Automation, <span className="text-serif text-gradient-green">explained simply</span>
              .
            </>
          }
        >
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A walkthrough of how I help teams adopt Agentic AI and automate real business workflows
            — strategy, tools, and outcomes.
          </p>
        </SectionHeader>

        <div ref={ref} className="mt-14 [perspective:1400px]">
          <motion.div
            style={{ scale, rotateX }}
            className="relative rounded-[2rem] bg-[#0b0c11] p-2 shadow-[0_60px_120px_-50px_rgba(200,255,77,0.35)]"
          >
            <span className="conic-ring rounded-[2rem]" />
            <div className="relative aspect-video w-full overflow-hidden rounded-[1.6rem] bg-black">
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
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="relative grid h-16 w-16 place-items-center sm:h-24 sm:w-24">
                      <span className="absolute inset-0 rounded-full bg-lime/40 animate-pulse-ring" />
                      <span
                        className="absolute inset-0 rounded-full bg-lime/30 animate-pulse-ring"
                        style={{ animationDelay: "1.2s" }}
                      />
                      <span className="relative grid h-full w-full place-items-center rounded-full bg-lime text-ink shadow-[0_0_60px_-5px_rgba(200,255,77,0.9)] transition-transform duration-500 group-hover:scale-110 group-active:scale-95">
                        <Play className="h-7 w-7 fill-current pl-1" />
                      </span>
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-left text-white sm:bottom-8 sm:left-8">
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime">
                      Featured talk
                    </div>
                    <div className="mt-1.5 hidden text-xl font-semibold tracking-tight sm:block sm:text-3xl">
                      AI Automation for Business Teams
                    </div>
                  </div>
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-2 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PlayCircle className="h-4 w-4 text-lime" />
                Watch on{" "}
                <a
                  href={`https://youtu.be/${videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  YouTube
                </a>
              </div>
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
              >
                Want this for your team?
                <ArrowRight className="h-4 w-4 text-lime transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Experience                                                          */
/* ================================================================== */

function Experience() {
  const roles = [
    {
      role: "AI Systems & Business Transformation Manager",
      company: "EDGE",
      date: "Jul 2026 — Present",
      desc: "Lead AI, CRM, automation, and digital transformation initiatives, translating business requirements into scalable technology solutions.",
      responsibilities: [
        "Lead AI, CRM, automation, and digital transformation initiatives, translating business requirements into scalable technology solutions.",
        "Led end-to-end transformation of offline business operations into Zoho CRM, digitizing manual workflows and centralizing business processes and customer data.",
        "Design CRM architecture across inquiries, leads, customers, sales pipelines, follow-ups, and operations; manage Zoho CRM and work with Salesforce for CRM processes and integrations.",
        "Identify Generative AI and Agentic AI use cases for customer profiling, lead qualification, sales automation, decision support, and operational efficiency.",
        "Bridge management, sales, marketing, operations, and technology teams to drive adoption of AI-enabled business processes.",
      ],
      current: true,
    },
    {
      role: "Senior AI Engineer / Agentic AI - Automation",
      company: "Colage Communication",
      date: "Apr 2023 — Jul 2026",
      desc: "Designed LLM, Agentic AI, RAG, and intelligent automation solutions integrating business workflows, APIs, data, and external systems.",
      responsibilities: [
        "Designed LLM, Agentic AI, RAG, and intelligent automation solutions integrating business workflows, APIs, data, and external systems.",
        "Built AI orchestration and multi-step automation using LangChain, LangGraph, n8n, Make, Zapier, FastAPI, and webhooks.",
        "Translated business and product requirements into scalable AI solutions, building the technical foundation for AI transformation leadership.",
      ],
    },
    {
      role: "Flutter Developer (Chatbot Developer)",
      company: "Eazr Digipayments Pvt Ltd",
      date: "Aug 2020 — Dec 2022",
      desc: "Built an AI-driven chatbot to assist insurance agents by answering policy and customer queries instantly, reducing manual support effort.",
      responsibilities: [
        "Built an AI-driven chatbot to assist insurance agents by answering policy and customer queries instantly, reducing manual support effort.",
        "Developed personal loan mobile applications in Flutter covering onboarding, application flows, and customer-facing journeys for Android and iOS.",
        "Created conversational chatbots and cross-platform mobile apps, integrating REST APIs and backend services for fintech and insurance use cases.",
        "Collaborated with product, backend, and business teams to deliver features, fix bugs, and ship app releases.",
      ],
    },
  ];

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.7", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-16 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            number="02"
            eyebrow="Professional Path"
            title={
              <>
                My <span className="text-serif text-gradient-green">Experience Journey</span>
              </>
            }
          />
          <Reveal>
            <Magnetic>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-white self-start px-5 py-3 text-sm"
              >
                <span>View Full Resume</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div ref={timelineRef} className="relative">
          {/* rail */}
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-white/[0.08] md:left-[251px]" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-lime via-cyan to-violet shadow-[0_0_12px_rgba(200,255,77,0.6)] md:left-[251px]"
          />

          <div className="space-y-14 md:space-y-20">
            {roles.map((r, idx) => (
              <div
                key={r.company}
                className="relative grid grid-cols-1 gap-5 pl-10 md:grid-cols-[220px_1fr] md:gap-16 md:pl-0"
              >
                {/* node */}
                <div className="absolute left-0 top-1 z-10 grid h-6 w-6 place-items-center rounded-full border border-lime/50 bg-[#06070a] md:left-[240px]">
                  <span
                    className={`h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_#c8ff4d] ${r.current ? "animate-pulse" : ""}`}
                  />
                  {r.current && (
                    <span className="absolute inset-0 rounded-full border border-lime/60 animate-pulse-ring" />
                  )}
                </div>

                {/* meta (sticky on desktop) */}
                <Reveal className="md:sticky md:top-32 md:self-start md:text-right">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
                    {r.date}
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                    {r.company}
                  </div>
                  <div className="mt-2 flex items-center gap-2 md:justify-end">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      0{idx + 1} / 0{roles.length}
                    </span>
                    {r.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/40 bg-lime/10 px-2.5 py-0.5 text-[11px] font-medium text-lime">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                        Active
                      </span>
                    )}
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <SpotlightCard className="p-6 md:p-8">
                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
                      {r.role}
                    </h3>
                    <h4 className="mt-1.5 text-sm font-medium text-muted-foreground">
                      @ <span className="text-foreground/90">{r.company}</span>
                    </h4>
                    <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">{r.desc}</p>

                    <ul className="mt-6 space-y-3 border-t border-white/[0.07] pt-6">
                      {r.responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-lime/80" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Expertise                                                           */
/* ================================================================== */

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
      tile: "#c8ff4d",
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
      tile: "#5eead4",
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
      tile: "#a78bfa",
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
      tile: "#fdba74",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const active = categories[activeTab];

  return (
    <section id="expertise" className="relative py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-14">
          <SectionHeader
            number="03"
            eyebrow="Core Expertise"
            title={
              <>
                A full stack for{" "}
                <span className="text-serif text-gradient-green">AI transformation</span>.
              </>
            }
          />
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.25fr] lg:gap-8">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col">
            {categories.map((c, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={c.title}
                  onClick={() => {
                    setActiveTab(idx);
                    playBlip(700, 0.01, 0.06);
                  }}
                  className={`relative flex min-w-0 cursor-pointer items-center justify-between gap-4 rounded-2xl border p-3.5 text-left transition-colors duration-300 sm:p-5 lg:w-full ${
                    isActive
                      ? "border-white/15 text-foreground"
                      : "border-white/[0.06] bg-white/[0.015] text-muted-foreground hover:border-white/12 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="expertise-active"
                      className="absolute inset-0 -z-0 rounded-2xl bg-gradient-to-r from-white/[0.08] to-white/[0.02] shadow-[0_20px_50px_-30px_rgba(200,255,77,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <div
                      className={`icon-tile h-10 w-10 shrink-0 sm:h-11 sm:w-11 transition-all duration-300 ${isActive ? "" : "opacity-60 grayscale"}`}
                      style={{ "--tile": c.tile } as React.CSSProperties}
                    >
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          0{idx + 1}
                        </span>
                        <h3 className="truncate text-sm font-semibold sm:text-base">{c.title}</h3>
                      </div>
                      <p className="mt-0.5 hidden text-xs text-muted-foreground sm:line-clamp-1 lg:max-w-[260px]">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`relative hidden h-4 w-4 shrink-0 sm:block transition-all duration-300 ${isActive ? "translate-x-0.5 text-lime" : "opacity-40"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <SpotlightCard className="flex min-h-[420px] flex-col justify-between p-6 sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
                  style={{ background: active.tile }}
                />
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className="icon-tile h-14 w-14"
                      style={{ "--tile": active.tile } as React.CSSProperties}
                    >
                      {React.createElement(active.icon, { className: "h-6 w-6" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {active.title}
                      </h3>
                      <span className="mt-1.5 inline-block rounded-full border border-lime/30 bg-lime/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-lime">
                        {Object.values(active.stats)[0]}
                      </span>
                    </div>
                  </div>

                  <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground">
                    {active.desc}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {active.items.map((i, n) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * n }}
                        className="tag cursor-default"
                      >
                        {i}
                      </motion.span>
                    ))}
                  </div>

                  {active.title === "Agentic AI" && (
                    <div className="mb-6">
                      <Link
                        to="/expertise/agentic-ai-development"
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-lime underline-offset-4 hover:underline"
                      >
                        Read Detailed Framework Comparison & Lifecycle Guide
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  {Object.entries(active.stats)
                    .slice(1)
                    .map(([key, val]) => (
                      <div key={key}>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {key}
                        </div>
                        <div className="mt-1 text-sm font-medium text-foreground sm:truncate">
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

/* ================================================================== */
/* Metrics                                                             */
/* ================================================================== */

function Metrics() {
  const metrics = [
    { k: "50+", v: "AI Workflows Designed" },
    { k: "20+", v: "Business Processes Automated" },
    { k: "6+", v: "Years Technology Experience" },
    { k: "10+", v: "Production AI Systems" },
    { k: "1000s", v: "End Users Impacted" },
  ];
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#0f1016] to-[#08090c]">
            <div className="pointer-events-none absolute inset-0 bg-line-grid opacity-70" />
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-lime/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-violet/20 blur-3xl" />
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              {metrics.map((m, idx) => (
                <div
                  key={m.v}
                  className={`group border-white/[0.06] p-6 text-center md:px-7 md:py-10 lg:px-9 md:text-left ${
                    idx === 4 ? "col-span-2 sm:col-span-1" : ""
                  } ${idx > 0 ? "md:border-l" : ""} border-b md:border-b-0`}
                >
                  <div className="text-5xl font-semibold tracking-[-0.05em] text-gradient-green md:text-[clamp(2.75rem,4.4vw,3.75rem)]">
                    <CountUp value={m.k} />
                  </div>
                  <div className="mt-3 text-xs leading-snug text-muted-foreground md:text-sm">
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Projects                                                            */
/* ================================================================== */

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
    <section id="projects" className="relative py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            number="04"
            eyebrow="Featured Projects"
            title={
              <>
                Shipping AI systems that{" "}
                <span className="text-serif text-gradient-green">move the business</span>.
              </>
            }
          />

          {/* Filters */}
          <Reveal className="shrink-0">
            <div className="flex max-w-full flex-wrap items-center gap-1 self-start rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-md">
              {["All", "AI & Automations", "Web & Mobile"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    playBlip(650, 0.01, 0.06);
                  }}
                  className={`relative cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-[13px] ${
                    filter === cat ? "text-ink" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter === cat && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-lime shadow-[0_8px_24px_-8px_rgba(200,255,77,0.8)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, idx) => {
              const featured = filter === "All" && idx === 0;
              const originalIndex = projects.indexOf(p);
              return (
                <motion.article
                  layout
                  key={p.title}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className={`w-full min-w-0 ${featured ? "lg:col-span-2" : ""}`}
                >
                  <SpotlightCard className="relative flex h-full w-full min-w-0 flex-col justify-between overflow-hidden p-5 sm:p-8">
                    {/* Card personality variation */}
                    {originalIndex === 0 && (
                      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-lime to-transparent" />
                    )}
                    {originalIndex === 1 && (
                      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-50" />
                    )}
                    {originalIndex === 3 && (
                      <div className="absolute right-6 top-6 z-10 rotate-[5deg] select-none rounded-full bg-lime px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-ink shadow-[0_6px_20px_-6px_rgba(200,255,77,0.8)]">
                        ✨ live
                      </div>
                    )}

                    <div
                      className={`relative w-full min-w-0 ${featured ? "lg:grid lg:grid-cols-[1fr_1.15fr] lg:gap-10" : ""}`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/80">
                            {p.category}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            0{originalIndex + 1}
                            <span className="text-muted-foreground/40"> / 0{projects.length}</span>
                          </span>
                        </div>
                        <h3
                          className={`mt-5 font-semibold leading-[1.1] tracking-[-0.03em] text-foreground ${featured ? "text-3xl md:text-[2.6rem]" : "text-2xl md:text-[1.75rem]"}`}
                        >
                          {p.title}
                        </h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                          {p.desc}
                        </p>

                        {featured && (
                          <div className="mt-6 hidden flex-wrap gap-2 lg:flex">
                            {p.tech.map((t) => (
                              <span key={t} className="tag cursor-default">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        {/* Simulated project widget demo */}
                        {p.title === "Enterprise AI Automation Framework" && <MockTerminal />}
                        {p.title === "AI Content Production System" && <MockContentDashboard />}
                        {p.title === "ShareShiksha EdTech Platform" && (
                          <MockMobileApp type="edtech" />
                        )}
                        {p.title === "Eazr Digipayments Mobile Application" && (
                          <MockMobileApp type="finance" />
                        )}
                        {p.title === "Agentic AI Business Assistant" && <RagMemoryWidget />}
                      </div>
                    </div>

                    <div className="relative mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] text-xs sm:grid-cols-3">
                      {[
                        { l: "Challenge", v: p.challenges, icon: AlertTriangle, c: "text-[#fdba74]" },
                        { l: "Solution", v: p.solutions, icon: Lightbulb, c: "text-cyan" },
                        { l: "Result", v: p.results, icon: Trophy, c: "text-lime" },
                      ].map((b) => (
                        <div key={b.l} className="bg-[#0b0c10] p-4">
                          <div
                            className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${b.c}`}
                          >
                            <b.icon className="h-3 w-3" />
                            {b.l}
                          </div>
                          <div
                            className={`mt-2 leading-relaxed ${b.l === "Result" ? "font-medium text-foreground" : "text-muted-foreground"}`}
                          >
                            {b.v}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={`relative mt-5 flex flex-wrap gap-2 ${featured ? "lg:hidden" : ""}`}>
                      {p.tech.map((t) => (
                        <span key={t} className="tag cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Services                                                            */
/* ================================================================== */

function Services() {
  const services = [
    {
      title: "AI Transformation Consulting",
      desc: "End-to-end roadmap for adopting AI across your organization.",
      tier: "Strategic",
      icon: Compass,
      num: "01",
      tile: "#c8ff4d",
      pattern: false,
    },
    {
      title: "Business Process Automation",
      desc: "Eliminate manual workflows with intelligent automation systems.",
      tier: "Operational",
      icon: Settings,
      num: "02",
      tile: "#5eead4",
      pattern: true,
    },
    {
      title: "Agentic AI Solutions",
      desc: "Custom multi-agent systems built for your business workflows.",
      tier: "Engineering",
      icon: Bot,
      num: "03",
      tile: "#a78bfa",
      pattern: false,
    },
    {
      title: "AI Strategy Workshops",
      desc: "Align leadership on AI opportunities and prioritize initiatives.",
      tier: "Advisory",
      icon: Zap,
      num: "04",
      tile: "#f9a8d4",
      pattern: true,
    },
    {
      title: "Flutter App Development",
      desc: "Scalable, modern mobile applications with clean architecture.",
      tier: "Engineering",
      icon: Smartphone,
      num: "05",
      tile: "#7dd3fc",
      pattern: false,
    },
    {
      title: "Enterprise AI Adoption",
      desc: "Change management and rollout programs that actually stick.",
      tier: "Transformation",
      icon: Users,
      num: "06",
      tile: "#fdba74",
      pattern: false,
    },
  ];
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeader
          number="05"
          eyebrow="Services"
          title={
            <>
              How we can <span className="text-serif text-gradient-green">work together</span>.
            </>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Reveal key={s.title} delay={(idx % 3) * 0.08} className="h-full">
              <SpotlightCard className="group flex h-full flex-col justify-between p-6 sm:p-7">
                {s.pattern && (
                  <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-40" />
                )}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
                  style={{ background: s.tile }}
                />
                <div className="relative w-full">
                  <div className="flex items-start justify-between">
                    <div
                      className="icon-tile mb-6 h-12 w-12 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                      style={{ "--tile": s.tile } as React.CSSProperties}
                    >
                      <s.icon className="h-5 w-5" />
                    </div>
                    <span className="select-none text-5xl font-semibold leading-none tracking-tighter text-white/[0.06] transition-colors duration-500 group-hover:text-white/[0.14]">
                      {s.num}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.tier}
                  </div>
                  <h3 className="mt-2.5 text-xl font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
                <a
                  href="#contact"
                  className="group/link relative mt-8 inline-flex items-center gap-2 self-start text-sm font-medium text-foreground"
                >
                  <span className="relative">
                    Discuss scope
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover/link:w-full" />
                  </span>
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 transition-all duration-300 group-hover/link:border-lime group-hover/link:bg-lime group-hover/link:text-ink">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Articles                                                            */
/* ================================================================== */

function Articles() {
  const articles = [
    { title: "The Future of Agentic AI", read: "8 min read", tag: "Agentic AI", color: "#c8ff4d" },
    {
      title: "How Businesses Can Adopt AI Successfully",
      read: "6 min read",
      tag: "Strategy",
      color: "#5eead4",
    },
    {
      title: "Building AI Workflows That Actually Deliver ROI",
      read: "10 min read",
      tag: "Automation",
      color: "#a78bfa",
    },
    {
      title: "AI Transformation vs Digital Transformation",
      read: "7 min read",
      tag: "Leadership",
      color: "#fdba74",
    },
  ];
  return (
    <section className="relative py-28 md:py-40">
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeader
          number="06"
          eyebrow="Thought Leadership"
          title={
            <>
              Writing on AI, automation, and{" "}
              <span className="text-serif text-gradient-green">business impact</span>.
            </>
          }
        />
        <div className="mt-14 border-t border-white/[0.08]">
          {articles.map((a, idx) => (
            <Reveal key={a.title} delay={idx * 0.06}>
              <a
                href="#"
                className="group relative flex items-center justify-between gap-6 overflow-hidden border-b border-white/[0.08] py-7 sm:py-9"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-white/[0.04] to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                />
                <div className="relative flex min-w-0 items-start gap-5 sm:items-center sm:gap-8">
                  <span className="mt-1 font-mono text-xs text-muted-foreground sm:mt-0">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                      {a.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink"
                        style={{ background: a.color }}
                      >
                        {a.tag}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">{a.read}</span>
                    </div>
                  </div>
                </div>
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-ink sm:h-14 sm:w-14">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Testimonials                                                        */
/* ================================================================== */

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
  const DURATION = 6000;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((p) => (p + 1) % items.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, items.length]);

  const go = (dir: number) => setI((p) => (p + dir + items.length) % items.length);

  return (
    <section className="relative py-28 md:py-40">
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader
          number="07"
          align="center"
          eyebrow="Testimonials"
          title={
            <>
              Trusted by <span className="text-serif text-gradient-green">teams shipping AI</span>.
            </>
          }
        />

        <Reveal>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative mt-14 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#111219] to-[#08090c] p-7 sm:p-12 md:p-16"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
            <Quote className="pointer-events-none absolute right-8 top-8 h-20 w-20 text-white/[0.04] sm:h-28 sm:w-28" />

            <div className="relative min-h-[240px] sm:min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                >
                  <div className="mb-6 flex gap-1 text-lime">
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx} className="text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-2xl leading-[1.3] tracking-[-0.02em] text-foreground sm:text-3xl md:text-[2.4rem]">
                    <span className="text-serif text-lime">“</span>
                    {items[i].q}
                    <span className="text-serif text-lime">”</span>
                  </p>
                  <div className="mt-10 flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-lime via-cyan to-violet text-sm font-bold text-ink">
                      {items[i].initials}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{items[i].n}</div>
                      <div className="text-sm text-muted-foreground">{items[i].c}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mt-10 flex items-center justify-between gap-6">
              <div className="flex flex-1 gap-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Testimonial ${idx + 1}`}
                    className="relative h-1 flex-1 max-w-[90px] cursor-pointer overflow-hidden rounded-full bg-white/10"
                  >
                    {idx < i && <span className="absolute inset-0 bg-white/40" />}
                    {idx === i && (
                      <motion.span
                        key={`${i}-${paused}`}
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "0%" : "100%" }}
                        transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
                        className="absolute inset-y-0 left-0 bg-lime"
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/10 text-foreground transition-all hover:border-lime hover:bg-lime hover:text-ink"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/10 text-foreground transition-all hover:border-lime hover:bg-lime hover:text-ink"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Contact                                                             */
/* ================================================================== */

function BigMarquee() {
  const words = ["Let's build", "Agentic AI", "Automation", "AI Strategy", "Transformation"];
  const row = [...words, ...words];
  return (
    <div className="mask-fade-x relative overflow-hidden py-6" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-10">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span
              className={`text-6xl font-semibold tracking-[-0.05em] sm:text-8xl md:text-9xl ${
                i % 2 === 0 ? "text-foreground/90" : "text-outline text-serif"
              }`}
            >
              {w}
            </span>
            <Sparkles className="h-8 w-8 shrink-0 text-lime sm:h-12 sm:w-12" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    playBlip(600, 0.04, 0.12, 1000);
  };

  const info = [
    { icon: MapPin, label: "Location", value: "Mumbai, India" },
    { icon: Phone, label: "Phone", value: "+91 808 720 5660", href: "tel:+918087205660" },
    { icon: Linkedin, label: "LinkedIn", value: "Connect", href: LINKEDIN_URL, external: true },
    { icon: Github, label: "GitHub", value: "View Code", href: GITHUB_URL, external: true },
  ];

  return (
    <section id="contact" className="relative overflow-hidden pt-20 pb-28 md:pb-40">
      <BigMarquee />

      <div className="relative mx-auto mt-16 max-w-6xl px-4">
        <div
          aria-hidden
          className="section-number absolute -top-14 left-0 text-[7rem] sm:-top-20 sm:text-[11rem] md:text-[14rem]"
        >
          08
        </div>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0b0c11] p-[1.5px]">
            <span className="conic-ring rounded-[2rem]" />
            <div className="relative overflow-hidden rounded-[calc(2rem-1.5px)] bg-gradient-to-br from-[#12131a] via-[#0b0c11] to-[#08090c] p-6 sm:p-10 md:p-16">
              <div className="pointer-events-none absolute inset-0 bg-line-grid opacity-70" />
              <div className="aurora-blob -right-32 -top-32 h-96 w-96 bg-lime/20" />
              <div
                className="aurora-blob -bottom-40 -left-24 h-96 w-96 bg-violet/25"
                style={{ animationDelay: "-10s" }}
              />
              <div className="pointer-events-none absolute -bottom-16 -right-16 hidden text-white/[0.06] animate-spin-slow sm:block">
                <svg
                  width="260"
                  height="260"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <circle cx="50" cy="50" r="45" strokeDasharray="4 6" />
                  <circle cx="50" cy="50" r="32" strokeDasharray="2 8" />
                </svg>
              </div>

              <div className="relative">
                <div className="mb-8 inline-flex select-none items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-4 py-1.5 text-xs font-medium text-lime">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                  </span>
                  <span>Available for Projects (Q3 2026)</span>
                </div>

                <h2 className="max-w-4xl text-[2.6rem] font-semibold leading-[1] tracking-[-0.05em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                  <SplitReveal text="Let's build the" />{" "}
                  <span className="text-serif text-gradient-green">future together</span>.
                </h2>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Whether you're exploring AI strategy, automating a workflow, or building an
                  agentic system — I'd love to help you ship it.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="neo-btn px-6 py-3.5 text-[15px]"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book on Calendly</span>
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <button
                      onClick={handleCopyEmail}
                      className="neo-btn neo-btn-white relative overflow-visible px-6 py-3.5 text-[15px]"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-lime" />
                      ) : (
                        <Mail className="h-4 w-4" />
                      )}
                      <span>{copied ? "Copied Email!" : EMAIL}</span>
                      {!copied && <Copy className="h-3.5 w-3.5 opacity-50" />}
                      <AnimatePresence>
                        {copied && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 6, x: "-50%" }}
                            className="absolute -top-11 left-1/2 whitespace-nowrap rounded-full bg-lime px-3 py-1 text-[11px] font-semibold text-ink shadow-[0_8px_24px_-8px_rgba(200,255,77,0.9)]"
                          >
                            Copied to Clipboard!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </Magnetic>
                </div>

                <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 md:grid-cols-4">
                  {info.map((it) => {
                    const inner = (
                      <>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                          <it.icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            {it.label}
                          </div>
                          <div className="truncate text-sm font-medium text-foreground">
                            {it.value}
                          </div>
                        </div>
                        {it.href && (
                          <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
                        )}
                      </>
                    );
                    const cls =
                      "group flex items-center gap-3 bg-[#0b0c10]/90 p-5 transition-colors hover:bg-[#111219]";
                    return it.href ? (
                      <a
                        key={it.label}
                        href={it.href}
                        target={it.external ? "_blank" : undefined}
                        rel={it.external ? "noreferrer" : undefined}
                        className={cls}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div key={it.label} className={cls}>
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Page                                                                */
/* ================================================================== */

function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const { audioEnabled, toggleAudio } = useAudioPreference();

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("dark");
  }, []);

  // Play chime on load, or on first interaction if the browser blocks autoplay
  useWelcomeChime();

  return (
    <div className="relative min-h-screen overflow-x-clip text-foreground">
      <Preloader onDone={() => setReady(true)} />
      <ScrollProgress />
      <WebGLBackground />
      <NoiseOverlay />

      {mounted && <CustomCursor />}
      <Nav mounted={mounted} audioEnabled={audioEnabled} toggleAudio={toggleAudio} />
      <main>
        <Hero ready={ready} />
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
