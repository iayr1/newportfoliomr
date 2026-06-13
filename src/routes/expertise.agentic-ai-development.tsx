import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute("/expertise/agentic-ai-development")({
  head: () => ({
    meta: [
      {
        title:
          "Agentic AI Development Company | Multi-Agent Systems with LangGraph & CrewAI",
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
        content:
          "Agentic AI Development Company | Multi-Agent Systems with LangGraph & CrewAI",
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

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-4xl px-6 py-16 ${className}`}>
      {children}
    </section>
  );
}

function AgenticAIDevelopmentPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <Section className="pt-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to portfolio
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
          <Bot className="w-3.5 h-3.5" /> Agentic AI Development Services
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Agentic AI Development Company for Multi-Agent Systems
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A practical guide to how we design, build, and deploy multi-agent
          systems using LangGraph and CrewAI — and how autonomous AI agents
          transform business operations like content production, research, and
          financial analysis.
        </p>
      </Section>

      {/* What is agentic AI */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          What is agentic AI?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Agentic AI describes software systems where one or more LLM-powered
          agents plan, decide, and act across multiple steps to complete a
          goal. Unlike a single prompt-and-response chatbot, an agentic system
          maintains state, calls tools, retries, and coordinates with other
          agents.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          As an agentic AI development company, we focus on shipping these
          systems into real business workflows — not demos. That means
          observability, evaluations, guardrails, and a clear path from a
          pilot to a production deployment your team can rely on.
        </p>
      </Section>

      {/* Lifecycle */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          The agentic AI development lifecycle
        </h2>
        <div className="space-y-6">
          {[
            {
              icon: Target,
              title: "1. Discovery & opportunity mapping",
              body: "We map the operations where agents create the most leverage — typically multi-step knowledge work with clear inputs, repeatable structure, and measurable outcomes. The deliverable is a prioritized backlog of agent use cases with expected ROI.",
            },
            {
              icon: Layers,
              title: "2. Architecture & framework selection",
              body: "We choose between LangGraph (stateful graphs, explicit control flow, human-in-the-loop checkpoints) and CrewAI (role-based crews collaborating on a shared goal). For complex flows, we often combine both — CrewAI for the team metaphor, LangGraph for the orchestration backbone.",
            },
            {
              icon: Brain,
              title: "3. Agent design & tool integration",
              body: "Each agent gets a focused role, a tool belt (APIs, retrieval, code execution), and a memory strategy. Tools wrap existing systems — CRMs, data warehouses, internal APIs — so agents act inside your stack, not around it.",
            },
            {
              icon: Workflow,
              title: "4. Orchestration & guardrails",
              body: "We define how agents hand off work, when humans are looped in, and what the system is not allowed to do. Guardrails cover output validation, cost limits, PII handling, and fallback behavior on tool failure.",
            },
            {
              icon: CheckCircle2,
              title: "5. Evaluation & observability",
              body: "Every agent path is measured with offline evals and live telemetry: task success rate, tool-call accuracy, latency, and cost per resolved task. Without evals, agentic systems regress silently — this stage is non-negotiable.",
            },
            {
              icon: Zap,
              title: "6. Deployment & continuous improvement",
              body: "We ship to production behind feature flags, monitor real traffic, and iterate on prompts, tools, and graphs based on observed failure modes. Most value compounds in the first 90 days post-launch.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="flex gap-4 p-6 rounded-xl border border-border bg-card"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <step.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* LangGraph vs CrewAI */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          LangGraph vs CrewAI: choosing the right framework
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Most agentic AI projects live or die on framework fit. Here's how we
          choose:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" /> LangGraph
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Best for stateful, branching workflows. Explicit nodes and edges
              make retries, checkpoints, and human approvals straightforward.
              We reach for LangGraph when correctness, auditability, and
              recovery matter — for example, financial analysis pipelines and
              compliance-sensitive automations.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" /> CrewAI
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Best for role-based collaboration. A researcher, writer, and
              editor agent collaborating on a deliverable maps cleanly to a
              CrewAI crew. We reach for CrewAI when the work is naturally
              modeled as a team and orchestration overhead should stay light.
            </p>
          </div>
        </div>
      </Section>

      {/* How AI agents transform business operations */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          How AI agents transform business operations
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The biggest wins from agentic AI come from compressing multi-step
          knowledge work that previously required a coordinated team. Three
          patterns recur across our engagements:
        </p>
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Content production
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A research agent gathers sources, a writer agent drafts against a
              brand voice spec, an editor agent enforces structure and fact
              consistency, and a publisher agent pushes to the CMS. Cycle time
              drops from days to hours; humans review and approve instead of
              drafting from scratch.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Financial analysis
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Agents pull filings, normalize statements, run ratio analysis,
              and assemble briefing memos with citations. LangGraph
              checkpoints let analysts step in at defined points to validate
              assumptions before the next stage runs.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-primary" /> Operations &
              back-office
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Triage, classification, enrichment, and routing tasks — the
              workflows hiding inside support, finance ops, and HR — become
              autonomous pipelines with human escalation paths for edge cases.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="p-8 md:p-10 rounded-2xl border border-border bg-card text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to scope an agentic AI build?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I help teams move from "we should try agents" to a deployed,
            measurable system. Start with a discovery call to identify the
            highest-leverage use case in your operations.
          </p>
          <Link
            to="/"
            hash="contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>
    </main>
  );
}
