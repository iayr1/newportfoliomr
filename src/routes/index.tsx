import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  Phone,
} from "lucide-react";
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

function Nav() {
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
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#00A85A] text-black">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>Mayur Chaudhari</span>
          </a>
          <div className="hidden gap-7 md:flex">
            {items.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="text-sm text-muted-foreground transition-colors hover:text-[#00723D]"
              >
                {i.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://drive.google.com/file/d/1FgLCjW_7zYTOkBD2QumKM4Oi7E6rpHa4/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 md:px-4 md:py-1.5 md:text-sm"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="hidden rounded-full bg-[#00A85A] px-4 py-1.5 text-sm font-medium text-black transition-transform hover:scale-105 md:inline-block"
            >
              Let's talk
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center pt-32 pb-20">
      <div className="aurora-blob left-[-10%] top-[10%] h-[480px] w-[480px] bg-[#00A85A]/30" />
      <div
        className="aurora-blob right-[-10%] bottom-[5%] h-[520px] w-[520px] bg-[#00A85A]/20"
        style={{ animationDelay: "-6s" }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00A85A]" />
            <span className="text-muted-foreground">AI Business Transformation Manager · EDGE</span>
          </div>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
            Transforming Businesses with <span className="text-gradient-green">Agentic AI</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg text-muted-foreground md:text-xl">
            I help organizations automate workflows, redesign operations, and deploy intelligent AI
            systems that create measurable business impact.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[#00A85A] px-6 py-3 font-medium text-white transition-transform hover:scale-105 glow-green"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-foreground transition-colors hover:border-[#00A85A]/40"
            >
              <Calendar className="h-4 w-4" />
              Book Consultation
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "50+", v: "AI Workflows" },
              { k: "20+", v: "Processes Automated" },
              { k: "3+", v: "Years Experience" },
              { k: "1000s", v: "Users Impacted" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl p-4">
                <div className="font-display text-2xl font-semibold text-[#00723D] md:text-3xl">
                  {s.k}
                </div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#00A85A]/30 via-[#00A85A]/10 to-transparent blur-2xl" />
          <div className="glass-strong relative overflow-hidden rounded-[2rem] p-2">
            <img
              src={mayurPortrait}
              alt="Mayur Chaudhari, AI Business Transformation Manager"
              width={900}
              height={900}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="aspect-square w-full rounded-[1.6rem] object-cover"
            />
            <div className="pointer-events-none absolute inset-2 rounded-[1.6rem] ring-1 ring-inset ring-white/40" />
          </div>
          <div className="glass absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#00A85A] text-white">
              <Bot className="h-4 w-4" />
            </span>
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Currently leading</div>
              <div className="text-sm font-semibold">AI Transformation @ EDGE</div>
            </div>
          </div>
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
                className="group absolute inset-0 h-full w-full"
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
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-[#00A85A] text-white shadow-[0_20px_60px_rgba(0,168,90,0.55)] transition-transform group-hover:scale-110">
                    <PlayCircle className="h-10 w-10" />
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-left text-white">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#00FF9F]">
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
              <PlayCircle className="h-4 w-4 text-[#00723D]" />
              Watch on{" "}
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[#00723D] hover:underline"
              >
                YouTube
              </a>
            </div>
            <a href="#contact" className="text-sm font-medium text-[#00723D] hover:underline">
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
    <section aria-label="Tools and platforms" className="relative py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-5 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Building with the modern AI &amp; automation stack
        </div>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7F8F5] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F7F8F5] to-transparent z-10" />
          <div className="marquee-track flex w-max gap-3">
            {row.map((s, i) => (
              <span key={`${s}-${i}`} className="chip whitespace-nowrap font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00A85A]" />
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
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <div className="section-eyebrow">Who I Am</div>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
            Beyond AI. <span className="text-gradient">Beyond Automation.</span>
          </h2>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground">
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

        <div className="mt-16 grid gap-4 md:grid-cols-3">
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
          ].map((c) => (
            <div key={c.title} className="glass hover-lift rounded-2xl p-6">
              <c.icon className="h-6 w-6 text-[#00723D]" />
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const responsibilities = [
    "AI strategy development",
    "Business process transformation",
    "Enterprise workflow automation",
    "AI adoption programs",
    "Cross-functional AI implementation",
    "AI opportunity assessment",
    "Internal AI systems design",
    "Productivity optimization",
  ];
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-eyebrow">Current Role</div>
            <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
              Leading AI Transformation at <span className="text-gradient-green">EDGE</span>
            </h2>
          </div>
          <a
            href="https://drive.google.com/file/d/1FgLCjW_7zYTOkBD2QumKM4Oi7E6rpHa4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="glass hover-lift inline-flex items-center gap-2 self-start rounded-full px-5 py-2.5 text-sm font-medium text-[#00723D] border-[#00A85A]/20 transition-all hover:bg-[#00A85A]/10 hover:border-[#00A85A]/40"
          >
            <span>View Full Resume</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="glass-strong mt-12 rounded-3xl p-8 md:p-12">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#00A85A]/15 text-[#00723D]">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xl font-semibold">EDGE</div>
                  <div className="text-sm text-muted-foreground">
                    AI Business Transformation Manager
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-full border border-[#00A85A]/30 bg-[#00A85A]/5 px-4 py-1.5 text-sm text-[#00723D]">
              July 2026 — Present
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {responsibilities.map((r) => (
              <div key={r} className="flex items-start gap-3 text-sm text-muted-foreground">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#00723D]" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              role: "Agentic AI Engineer",
              company: "Colage Communication",
              date: "July 2025 — July 2026",
            },
            {
              role: "Chatbot Developer",
              company: "Eazr Digipayments",
              date: "June 2024 — July 2025",
            },
            { role: "SDE", company: "ShareShiksha", date: "Apr 2023 — June 2024" },
          ].map((p) => (
            <div key={p.role} className="glass hover-lift rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Previously
              </div>
              <div className="mt-2 font-semibold">{p.role}</div>
              <div className="text-sm text-muted-foreground">{p.company}</div>
              <div className="mt-3 text-xs text-[#00723D]">{p.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
    },
    {
      icon: Workflow,
      title: "Automation",
      items: ["n8n", "Make", "Zapier", "Workflow Design", "Business Automation", "RPA"],
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
    },
    {
      icon: Smartphone,
      title: "Development",
      items: ["Flutter", "Dart", "Firebase", "Node.js", "REST APIs", "Mobile Apps"],
    },
  ];
  return (
    <section id="expertise" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <div className="section-eyebrow">Core Expertise</div>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
            A full stack for <span className="text-gradient-green">AI transformation</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {categories.map((c) => (
            <div
              key={c.title}
              className="glass hover-lift group relative overflow-hidden rounded-3xl p-7"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#00A85A]/10 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#00A85A]/15 text-[#00723D]">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.items.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-[#00A85A]/40 hover:text-[#00723D]"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
        <div className="glass-strong grid grid-cols-2 gap-6 rounded-3xl p-8 md:grid-cols-5 md:p-12">
          {metrics.map((m) => (
            <div key={m.v} className="text-center md:text-left">
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

function Projects() {
  const projects = [
    {
      title: "Enterprise AI Automation Framework",
      desc: "Built intelligent workflow systems that automate repetitive business processes and improve operational efficiency.",
      challenges: "Fragmented manual workflows across teams.",
      solutions: "Designed a unified agent-orchestrated automation framework.",
      results: "60% reduction in manual ops time across pilot teams.",
      tech: ["LangGraph", "n8n", "OpenAI", "Postgres"],
    },
    {
      title: "AI Content Production System",
      desc: "Designed agent-based content creation workflows reducing manual effort.",
      challenges: "High volume content needs with limited human bandwidth.",
      solutions: "Multi-agent pipeline for research, drafting, review, and publishing.",
      results: "4x faster content production with editorial QA loops.",
      tech: ["CrewAI", "OpenAI", "Next.js", "Make"],
    },
    {
      title: "ShareShiksha EdTech Platform",
      desc: "Developed scalable mobile learning experiences using Flutter and API-driven architecture.",
      challenges: "Reach learners on low-end devices with poor connectivity.",
      solutions: "Optimized Flutter architecture with offline-first sync.",
      results: "Smooth experience across thousands of student devices.",
      tech: ["Flutter", "Firebase", "Node.js", "REST"],
    },
    {
      title: "Eazr Digipayments Mobile Application",
      desc: "Built secure financial applications with scalable architecture and modern user experiences.",
      challenges: "Strict security and performance requirements.",
      solutions: "Layered architecture with secure auth and modular UI.",
      results: "Production-grade app with high reliability under load.",
      tech: ["Flutter", "Dart", "Firebase", "REST"],
    },
    {
      title: "Agentic AI Business Assistant",
      desc: "Created AI agents capable of handling business operations and decision-support workflows.",
      challenges: "Knowledge scattered across tools and people.",
      solutions: "Agent system with tool-use, memory, and human-in-the-loop.",
      results: "Faster decisions with consistent operational quality.",
      tech: ["OpenAI Agents", "LangGraph", "Vector DB"],
    },
  ];

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <div className="section-eyebrow">Featured Projects</div>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
            Shipping AI systems that <span className="text-gradient-green">move the business</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, idx) => (
            <article
              key={p.title}
              className={`glass hover-lift relative overflow-hidden rounded-3xl p-7 ${
                idx === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-[#00A85A]/10 to-transparent blur-2xl" />
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold md:text-2xl">{p.title}</h3>
                <Layers className="h-5 w-5 shrink-0 text-[#00723D]" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>

              <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#00723D]">Challenge</div>
                  <div className="mt-1 text-muted-foreground">{p.challenges}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#00723D]">Solution</div>
                  <div className="mt-1 text-muted-foreground">{p.solutions}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#00723D]">Result</div>
                  <div className="mt-1 text-muted-foreground">{p.results}</div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
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
    },
    {
      title: "Business Process Automation",
      desc: "Eliminate manual workflows with intelligent automation systems.",
      tier: "Operational",
    },
    {
      title: "Agentic AI Solutions",
      desc: "Custom multi-agent systems built for your business workflows.",
      tier: "Engineering",
    },
    {
      title: "AI Strategy Workshops",
      desc: "Align leadership on AI opportunities and prioritize initiatives.",
      tier: "Advisory",
    },
    {
      title: "Flutter App Development",
      desc: "Scalable, modern mobile applications with clean architecture.",
      tier: "Engineering",
    },
    {
      title: "Enterprise AI Adoption",
      desc: "Change management and rollout programs that actually stick.",
      tier: "Transformation",
    },
  ];
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <div className="section-eyebrow">Services</div>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
            How we can <span className="text-gradient-green">work together</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="glass hover-lift relative rounded-3xl p-7">
              <div className="text-xs uppercase tracking-wider text-[#00723D]">{s.tier}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#00723D]"
              >
                Discuss scope <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Articles() {
  const articles = [
    { title: "The Future of Agentic AI", read: "8 min read", tag: "Agentic AI" },
    { title: "How Businesses Can Adopt AI Successfully", read: "6 min read", tag: "Strategy" },
    {
      title: "Building AI Workflows That Actually Deliver ROI",
      read: "10 min read",
      tag: "Automation",
    },
    { title: "AI Transformation vs Digital Transformation", read: "7 min read", tag: "Leadership" },
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <div className="section-eyebrow">Thought Leadership</div>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
            Writing on AI, automation, and{" "}
            <span className="text-gradient-green">business impact</span>.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {articles.map((a) => (
            <a
              key={a.title}
              href="#"
              className="glass hover-lift group flex items-center justify-between rounded-2xl p-6"
            >
              <div>
                <div className="text-xs uppercase tracking-wider text-[#00723D]">{a.tag}</div>
                <h3 className="mt-2 text-lg font-semibold">{a.title}</h3>
                <div className="mt-1 text-xs text-muted-foreground">{a.read}</div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-[#00723D]" />
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
    },
    {
      q: "He bridges the gap between business and AI engineering better than anyone we've worked with.",
      n: "Product Director",
      c: "Eazr Digipayments",
    },
    {
      q: "Our content team became 4x more productive after his agent system rolled out.",
      n: "Marketing Lead",
      c: "Media Company",
    },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <div className="section-eyebrow">Testimonials</div>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
            Trusted by <span className="text-gradient-green">teams shipping AI</span>.
          </h2>
        </div>

        <div className="glass-strong relative mt-12 overflow-hidden rounded-3xl p-10 md:p-14">
          <Quote className="absolute right-8 top-8 h-12 w-12 text-[#00723D]/20" />
          {items.map((t, idx) => (
            <div
              key={t.n}
              className="transition-all duration-500"
              style={{
                display: i === idx ? "block" : "none",
              }}
            >
              <p className="font-display text-2xl leading-snug md:text-3xl">"{t.q}"</p>
              <div className="mt-6">
                <div className="font-semibold">{t.n}</div>
                <div className="text-sm text-muted-foreground">{t.c}</div>
              </div>
            </div>
          ))}
          <div className="mt-8 flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-[#00A85A]" : "w-4 bg-black/15"
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
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-10 md:p-16">
          <div className="aurora-blob left-1/3 top-1/2 h-[400px] w-[400px] bg-[#00A85A]/20" />
          <div className="relative">
            <h2 className="text-4xl font-semibold md:text-6xl">
              Let's build the <span className="text-gradient-green">future together</span>.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Whether you're exploring AI strategy, automating a workflow, or building an agentic
              system — I'd love to help you ship it.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://calendly.com/mayurchaudhari1675/30min"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#00A85A] px-6 py-3 font-medium text-black transition-transform hover:scale-105 glow-green"
              >
                <Calendar className="h-4 w-4" />
                Book on Calendly
              </a>
              <a
                href="mailto:mayuraimaker@gmail.com"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-foreground transition-colors hover:border-[#00A85A]/40"
              >
                <Mail className="h-4 w-4" />
                mayuraimaker@gmail.com
              </a>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#00723D]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Location
                  </div>
                  <div className="text-sm font-medium">Mumbai, India</div>
                </div>
              </div>
              <a
                href="tel:+918087205660"
                className="flex items-center gap-3 transition-colors hover:text-[#00723D]"
              >
                <Phone className="h-5 w-5 text-[#00723D]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Phone
                  </div>
                  <div className="text-sm font-medium">+91 808 720 5660</div>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/iayr1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[#00723D]"
              >
                <Linkedin className="h-5 w-5 text-[#00723D]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    LinkedIn
                  </div>
                  <div className="text-sm font-medium">Connect</div>
                </div>
              </a>
              <a
                href="https://www.github.com/iayr1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[#00723D]"
              >
                <Github className="h-5 w-5 text-[#00723D]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    GitHub
                  </div>
                  <div className="text-sm font-medium">View Code</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
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
            className="text-xs text-muted-foreground/60 hover:text-[#00723D] transition-colors"
          >
            Resume
          </a>
          <a
            href="/admin"
            className="text-xs text-muted-foreground/60 hover:text-[#00723D] transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}

function Portfolio() {
  // Subtle cursor glow
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen text-foreground">
      <WebGLBackground />
      <div
        aria-hidden
        className="pointer-events-none fixed -z-[5] h-[400px] w-[400px] rounded-full"
        style={{
          left: pos.x - 200,
          top: pos.y - 200,
          background: "radial-gradient(circle, rgba(0,168,90,0.18) 0%, transparent 60%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />
      <Nav />
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
