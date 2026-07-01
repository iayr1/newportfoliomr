import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useState, useRef } from "react";
import {
  Bot,
  Workflow,
  Brain,
  Target,
  Layers,
  Zap,
  ArrowRight,
  CheckCircle2,
  FileText,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Nav, Footer, ScrollProgress, SpotlightCard, triggerChimeSound } from "./index";
import { WebGLBackground } from "@/components/WebGLBackground";

export const Route = createFileRoute("/expertise/agentic-ai-development")({
  head: () => ({
    meta: [
      {
        title: "Agentic AI Development Company | Multi-Agent Systems with LangGraph & CrewAI",
      },
      {
        name: "description",
        content:
          "Agentic AI development services for businesses. We design, build, and deploy multi-agent systems with LangGraph and CrewAI that transform content production, financial analysis, and core business operations.",
      },
      {
        name: "keywords",
        content:
          "agentic ai development company, ai agent services, multi-agent systems, LangGraph, CrewAI, how ai agents transform business operations",
      },
      {
        property: "og:title",
        content: "Agentic AI Development Company | Multi-Agent Systems with LangGraph & CrewAI",
      },
      {
        property: "og:description",
        content:
          "End-to-end agentic AI development: discovery, design, build, evaluation, and deployment of autonomous multi-agent systems for measurable business impact.",
      },
      { property: "og:url", content: "/expertise/agentic-ai-development" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/expertise/agentic-ai-development" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Agentic AI Development",
          provider: {
            "@type": "Person",
            name: "Mayur Chaudhari",
            jobTitle: "AI Business Transformation Manager",
            url: "https://mayuro.lovable.app/",
          },
          areaServed: "Global",
          description:
            "Design, build, and deployment of multi-agent systems using LangGraph and CrewAI for business transformation.",
          url: "https://mayuro.lovable.app/expertise/agentic-ai-development",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is an agentic AI development company?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "An agentic AI development company designs and ships autonomous, multi-agent software systems that can plan, use tools, and complete multi-step business tasks with minimal human oversight — typically built on frameworks like LangGraph or CrewAI.",
              },
            },
            {
              "@type": "Question",
              name: "How do AI agents transform business operations?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "AI agents transform business operations by automating multi-step knowledge work — content production, financial analysis, research, customer operations — through specialized agents that collaborate, call tools, and adapt to new inputs without rigid scripted workflows.",
              },
            },
            {
              "@type": "Question",
              name: "When should you use LangGraph vs CrewAI?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "LangGraph fits stateful, branching workflows where you need explicit control over agent state, retries, and human-in-the-loop checkpoints. CrewAI fits role-based crews where multiple agents collaborate on a shared goal with lightweight orchestration.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: AgenticAIDevelopmentPage,
});

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-5xl px-4 py-16 ${className}`}>{children}</section>;
}

function AgenticAIDevelopmentPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark";
      if (savedTheme) {
        setTheme(savedTheme);
      }
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
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Play chime on load
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

  // Subtle cursor glow
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen text-foreground transition-colors duration-300 overflow-hidden">
      <ScrollProgress />
      <WebGLBackground />

      {mounted && (
        <div
          aria-hidden
          className="pointer-events-none fixed -z-[5] h-[400px] w-[400px] rounded-full"
          style={{
            left: pos.x - 200,
            top: pos.y - 200,
            background:
              theme === "dark"
                ? "radial-gradient(circle, rgba(0,168,90,0.1) 0%, transparent 60%)"
                : "radial-gradient(circle, rgba(0,168,90,0.18) 0%, transparent 60%)",
            transition: "left 0.15s ease-out, top 0.15s ease-out, background 0.3s ease",
          }}
        />
      )}

      <Nav
        theme={theme}
        setTheme={setTheme}
        mounted={mounted}
        audioEnabled={audioEnabled}
        toggleAudio={toggleAudio}
      />

      <main className="relative z-10 pt-32 pb-16">
        {/* Background grids */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

        {/* Hero */}
        <Section className="pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#FFDB58] transition-colors mb-8 cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            Back to portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="chip mb-6">
              <Bot className="w-3.5 h-3.5" />
              <span>Expertise Deep Dive</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-[1.15] tracking-tight mb-8">
              Agentic AI Development Company for{" "}
              <span className="text-gradient-green">Multi-Agent Systems</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              A practical guide to how we design, build, and deploy multi-agent systems using
              LangGraph and CrewAI — and how autonomous AI agents transform business operations like
              content production, research, and financial analysis.
            </p>
          </motion.div>
        </Section>

        {/* What is agentic AI */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-8 md:p-12">
              <h2 className="text-2xl md:text-4xl font-semibold mb-6">What is agentic AI?</h2>
              <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
                <p>
                  Agentic AI describes software systems where one or more LLM-powered agents plan,
                  decide, and act across multiple steps to complete a goal. Unlike a single
                  prompt-and-response chatbot, an agentic system maintains state, calls tools,
                  retries on failures, and coordinates with other specialized agents.
                </p>
                <p>
                  As an agentic AI development partner, our focus is on shipping these systems into
                  real business workflows — not just building static demos. That means implementing
                  robust observability, continuous evaluation metrics, policy guardrails, and a
                  clear path from pilot to production deployments your team can rely on day in and
                  day out.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        </Section>

        {/* Lifecycle */}
        <Section>
          <div className="text-center md:text-left mb-12">
            <div className="section-eyebrow">Development Lifecycle</div>
            <h2 className="text-3xl md:text-5xl font-semibold mt-4">
              Our <span className="text-gradient-green">Agentic Lifecycle</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: "1. Discovery & Mapping",
                body: "We map operational workflows where agents create the most leverage — typically multi-step knowledge work with clear inputs, repeatable structures, and measurable outcomes. Delivering a prioritized ROI backlog.",
              },
              {
                icon: Layers,
                title: "2. Architecture Design",
                body: "We select the optimal framework. We utilize LangGraph for stateful graphs and human-in-the-loop checkpoints, and CrewAI for role-based crews. For complex workflows, we build hybrid networks.",
              },
              {
                icon: Brain,
                title: "3. Agent & Tool Integration",
                body: "Each agent gets a specific persona, a structured tool belt (APIs, web retrieval, local files), and dynamic RAG memory. Tools wrap existing CRM, analytics, or CMS systems directly.",
              },
              {
                icon: Workflow,
                title: "4. Orchestration & Safety",
                body: "We define hand-offs and specify strict guardrails covering output validations, cost alerts, data compliance (PII masking), and clean fallback routes on tool failures.",
              },
              {
                icon: CheckCircle2,
                title: "5. Evals & Observability",
                body: "We measure agent trajectories in real-time. Tracking token costs, success rates, latency, and tool accuracy. Systems are instrumented to ensure they don't regress silently.",
              },
              {
                icon: Zap,
                title: "6. Production Deploy",
                body: "We ship to production behind feature flags, monitoring telemetry. Most value compounds in the first 90 days as we tune prompts and states based on real-world logs.",
              },
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="w-10 h-10 rounded-lg border-2 border-black bg-neo-yellow text-black flex items-center justify-center mb-5 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* LangGraph vs CrewAI */}
        <Section>
          <div className="text-center md:text-left mb-12">
            <div className="section-eyebrow">Framework Comparison</div>
            <h2 className="text-3xl md:text-5xl font-semibold mt-4">
              LangGraph <span className="text-gradient">vs</span> CrewAI
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed">
              Most agentic AI projects live or die on framework fit. We design architecture around
              your specific workflow requirements:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SpotlightCard className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg border-2 border-black bg-neo-yellow text-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">LangGraph</h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-black bg-[#BAFCA2] border border-black px-2.5 py-0.5 rounded mt-1 inline-block shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                        Stateful Graph Orchestration
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Best for stateful, branching workflows. Explicit nodes and edges make retries,
                    checkpoints, and human approvals straightforward. We reach for LangGraph when
                    correctness, auditability, and recovery matter — for example, financial analysis
                    pipelines and compliance-sensitive automations.
                  </p>
                </div>
                <div className="bg-card/30 p-4 rounded-xl border border-border/40 text-xs text-muted-foreground">
                  <div className="font-bold text-foreground mb-1 uppercase tracking-wider text-[9px]">
                    Use Case Match:
                  </div>
                  Complex decision trees, regulatory data parsing, critical CRM integrations.
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SpotlightCard className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg border-2 border-black bg-neo-yellow text-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">CrewAI</h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-black bg-[#BAFCA2] border border-black px-2.5 py-0.5 rounded mt-1 inline-block shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                        Role-Based Agent Crews
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Best for role-based collaboration. A researcher, writer, and editor agent
                    collaborating on a deliverable maps cleanly to a CrewAI crew. We reach for
                    CrewAI when the work is naturally modeled as a team and orchestration overhead
                    should stay light, allowing autonomous role-play behaviors.
                  </p>
                </div>
                <div className="bg-card/30 p-4 rounded-xl border border-border/40 text-xs text-muted-foreground">
                  <div className="font-bold text-foreground mb-1 uppercase tracking-wider text-[9px]">
                    Use Case Match:
                  </div>
                  Content drafting pipelines, competitive analysis, automated social campaigns.
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </Section>

        {/* How AI agents transform business operations */}
        <Section>
          <div className="text-center md:text-left mb-12">
            <div className="section-eyebrow">Business Impact</div>
            <h2 className="text-3xl md:text-5xl font-semibold mt-4">
              Real-World <span className="text-gradient-green">Business Transformation</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: FileText,
                title: "Content Production Pipelines",
                desc: "A research agent gathers sources, a writer agent drafts against a brand voice spec, an editor agent enforces structure and fact consistency, and a publisher agent pushes to the CMS. Cycle time drops from days to hours; humans review and approve instead of drafting from scratch.",
              },
              {
                icon: TrendingUp,
                title: "Structured Financial Analysis",
                desc: "Agents pull filings, normalize statements, run ratio calculations, and assemble structured briefing memos with inline citations. LangGraph checkpoints let analysts step in at defined points to validate assumptions before the next stage executes.",
              },
              {
                icon: Workflow,
                title: "Operations & Back-Office Automations",
                desc: "Triage, classification, enrichment, and routing tasks — the workflows hiding inside support, finance ops, and HR — become autonomous pipelines with human escalation paths for edge cases. Delivering +70% throughput speeds.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <SpotlightCard className="p-6 md:p-8">
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#BAFCA2] border border-black text-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] flex items-center justify-center self-start sm:self-center">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg md:text-xl text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-strong p-8 md:p-16 rounded-3xl text-center relative overflow-hidden">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to scope an <span className="text-gradient-green">Agentic Build</span>?
              </h2>

              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                I help teams move from "we should try agents" to a deployed, measurable system.
                Start with a discovery call to identify the highest-leverage use case in your
                operations.
              </p>

              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  href="https://calendly.com/mayurchaudhari1675/30min"
                  target="_blank"
                  rel="noreferrer"
                  className="neo-btn px-6 py-3 flex items-center gap-2 text-black"
                >
                  Book on Calendly
                </a>
                <Link
                  to="/"
                  hash="contact"
                  className="neo-btn neo-btn-white px-6 py-3 flex items-center gap-2 text-black"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </motion.div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
