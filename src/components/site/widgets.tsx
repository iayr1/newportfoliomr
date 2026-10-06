import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { playBlip } from "./primitives";

/* Shared shell for the small "live demo" panels inside project cards */
function WidgetShell({
  title,
  badge,
  live = true,
  children,
  className = "",
}: {
  title: string;
  badge?: React.ReactNode;
  live?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mt-5 flex h-[172px] w-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08090d]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-40" />
      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/90">
          <span className="relative flex h-1.5 w-1.5">
            {live && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
          {title}
        </span>
        {badge}
      </div>
      <div className="relative flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`truncate rounded-full border border-lime/30 bg-lime/10 px-2.5 py-0.5 font-mono text-[9.5px] font-medium text-lime ${className}`}
    >
      {children}
    </span>
  );
}

function ActionButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`shrink-0 cursor-pointer rounded-full bg-lime px-3 py-1 text-[10px] font-semibold text-ink shadow-[0_6px_20px_-6px_rgba(200,255,77,0.8)] transition-all hover:brightness-110 active:scale-95 disabled:cursor-wait disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Hero diagnostics card                                               */
/* ------------------------------------------------------------------ */

export function AIDiagnostics() {
  const [status, setStatus] = useState("Orchestrating");
  const [efficiency, setEfficiency] = useState(84);
  const [nodeIndex, setNodeIndex] = useState(1);
  const [bars, setBars] = useState<number[]>([40, 65, 50, 80, 55, 72, 60, 90, 68, 76]);

  useEffect(() => {
    const statuses = ["Reasoning", "Retrieving", "Executing", "Optimizing", "Orchestrating"];
    const interval = setInterval(() => {
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      setEfficiency((prev) =>
        Math.min(100, Math.max(70, prev + Math.floor(Math.random() * 7) - 3)),
      );
      setNodeIndex((prev) => (prev % 5) + 1);
      setBars((b) => [...b.slice(1), 35 + Math.floor(Math.random() * 60)]);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-strong flex min-w-[220px] select-none flex-col gap-3 rounded-2xl p-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
        <span className="flex items-center gap-2 font-medium tracking-tight text-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          AI Core Diagnostics
        </span>
        <span className="font-mono text-[9px] uppercase text-muted-foreground">v1.2.4</span>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            Agent State
          </div>
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-0.5 truncate text-[13px] font-semibold text-lime"
          >
            {status}
          </motion.div>
        </div>
        <div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            Accuracy
          </div>
          <div className="mt-0.5 text-[13px] font-semibold text-foreground">99.8%</div>
        </div>
        <div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            Efficiency
          </div>
          <div className="mt-0.5 text-[13px] font-semibold text-foreground">+{efficiency}%</div>
        </div>
        <div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            Active Nodes
          </div>
          <div className="mt-0.5 font-mono text-[13px] font-semibold text-foreground">
            0{nodeIndex} / 05
          </div>
        </div>
      </div>

      {/* live throughput sparkline */}
      <div className="flex h-8 items-end gap-[3px]">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            initial={false}
            animate={{ height: `${h}%` }}
            style={{ height: `${h}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="block min-w-0 flex-1 rounded-[2px] bg-gradient-to-t from-lime/20 to-lime"
          />
        ))}
      </div>

      <div className="flex flex-col gap-1.5 border-t border-white/[0.08] pt-2.5">
        <div className="flex justify-between font-mono text-[8.5px] uppercase text-muted-foreground">
          <span>System Temperature</span>
          <span>42°C</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-1 w-[65%] rounded-full bg-gradient-to-r from-lime to-cyan" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Expertise graph                                                     */
/* ------------------------------------------------------------------ */

export function NeuralNetworkGraph({ active }: { active: boolean }) {
  return (
    <div className="relative mt-4 flex h-[110px] w-full select-none items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-[#08090d]/70 p-2">
      <div className="absolute inset-0 bg-dot-pattern opacity-60" />

      <svg className="relative h-full w-full max-w-[340px]" viewBox="0 0 100 30">
        <defs>
          <linearGradient id="nn-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#c8ff4d" />
            <stop offset="50%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <path
          d="M10,15 L30,8 M10,15 L30,22 M30,8 L60,15 M30,22 L60,15 M60,15 L90,15"
          fill="none"
          stroke="url(#nn-grad)"
          strokeWidth="0.5"
          opacity="0.45"
        />
        <motion.path
          d="M10,15 L30,8 M30,8 L60,15 M60,15 L90,15"
          fill="none"
          stroke="#c8ff4d"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="8 42"
          animate={{ strokeDashoffset: [-50, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M10,15 L30,22 M30,22 L60,15"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray="6 44"
          animate={{ strokeDashoffset: [0, -50] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="10" cy="15" r="2" fill="#c8ff4d" />
        <circle cx="30" cy="8" r="1.5" fill="#5eead4" />
        <circle cx="30" cy="22" r="1.5" fill="#5eead4" />
        <circle cx="60" cy="15" r="2" fill="#c8ff4d" />
        <circle cx="90" cy="15" r="2.5" fill="#a78bfa" className="animate-pulse" />
        <circle cx="90" cy="15" r="4.5" fill="none" stroke="#a78bfa" strokeWidth="0.3" opacity="0.6" />
      </svg>

      <div className="absolute bottom-1.5 right-3 font-mono text-[8px] text-muted-foreground">
        Active Node Orchestration: {active ? "Connected" : "Standby"}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project demos                                                       */
/* ------------------------------------------------------------------ */

export function MockTerminal() {
  const [logs, setLogs] = useState<string[]>([
    "[System] agentic-terminal initialized. Ready for operations.",
    "[Agent] Idle. Listening for webhook triggers...",
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  const runCommand = (cmd: string) => {
    if (isRunning) return;
    playBlip(600);

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
        const line = commandSequence[step];
        setLogs((prev) => {
          const next = [...prev, line];
          if (next.length > 6) next.shift();
          return next;
        });
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 600);
  };

  const colorFor = (log: string) =>
    log.startsWith("[Success]") || log.startsWith("[Audit Report]")
      ? "text-lime"
      : log.startsWith(">")
        ? "text-cyan"
        : log.startsWith("[Security]") || log.startsWith("[Observability]")
          ? "text-violet"
          : "text-foreground/75";

  return (
    <div className="group/terminal relative mt-5 flex h-[190px] w-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050608] font-mono text-[10.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_60px_-30px_rgba(200,255,77,0.25)]">
      <div className="flex select-none items-center justify-between border-b border-white/[0.07] bg-white/[0.02] px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
          workflow-agent-shell
        </span>
        <span className="hidden text-[9px] text-muted-foreground/60 sm:inline">zsh — 80×24</span>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-none min-w-0 flex-1 space-y-1 overflow-y-auto px-4 py-2.5 text-left"
      >
        {logs.map((log, i) => (
          <motion.div
            key={`${i}-${log}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className={`truncate ${colorFor(log)}`}
          >
            <span className="mr-1.5 select-none text-lime/50">$</span>
            {log}
          </motion.div>
        ))}
        <div className="flex items-center">
          <span className="mr-1.5 select-none text-lime/50">$</span>
          <span className="inline-block h-3 w-1.5 animate-pulse bg-lime" />
        </div>
      </div>

      <div className="flex w-full min-w-0 select-none flex-wrap items-center gap-1.5 border-t border-white/[0.07] px-4 py-2">
        <span className="mr-1 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
          Quick Actions:
        </span>
        {[
          { c: "help", l: "Help" },
          { c: "optimize", l: "Optimize" },
          { c: "audit", l: "Audit" },
        ].map((b) => (
          <button
            key={b.c}
            onClick={() => runCommand(b.c)}
            disabled={isRunning}
            className="cursor-pointer rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9.5px] text-foreground transition-all hover:border-lime/60 hover:bg-lime hover:text-ink active:scale-95 disabled:opacity-50"
          >
            {b.l}
          </button>
        ))}
        <button
          onClick={() => runCommand("clear")}
          disabled={isRunning}
          className="cursor-pointer rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9.5px] text-foreground transition-all hover:border-[#ff6b6b]/60 hover:bg-[#ff6b6b] hover:text-ink active:scale-95 disabled:opacity-50 sm:ml-auto"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export function MockContentDashboard() {
  const [progress, setProgress] = useState(100);
  const [status, setStatus] = useState("Published to Webflow CMS");
  const [isRunning, setIsRunning] = useState(false);
  const [activeAgent, setActiveAgent] = useState(-1);

  const startAutomation = () => {
    if (isRunning) return;
    playBlip(800);

    setIsRunning(true);
    setProgress(0);
    setStatus("Initializing Crew...");

    const steps = [
      { p: 15, s: "Agent: Researcher - Scraping Google Trends...", a: 0 },
      { p: 40, s: "Agent: Writer - Drafting content outline...", a: 1 },
      { p: 70, s: "Agent: Editor - Proofreading & fact-checking...", a: 2 },
      { p: 90, s: "API Webhook - Structuring JSON format...", a: 3 },
      { p: 100, s: "Published to Webflow CMS!", a: -1 },
    ];

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatus(steps[currentStep].s);
        setActiveAgent(steps[currentStep].a);
        currentStep++;
      } else {
        clearInterval(timer);
        setIsRunning(false);
      }
    }, 1200);
  };

  const agents = ["Research", "Write", "Edit", "Publish"];

  return (
    <WidgetShell
      title="Content Crew Status"
      live={isRunning}
      badge={<Badge className="max-w-[150px] sm:max-w-[210px]">{status}</Badge>}
    >
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {agents.map((a, i) => (
          <div
            key={a}
            className={`rounded-lg border px-1.5 py-1.5 text-center font-mono text-[9px] transition-all duration-500 ${
              activeAgent === i
                ? "border-lime/60 bg-lime/15 text-lime shadow-[0_0_20px_-6px_rgba(200,255,77,0.8)]"
                : progress === 100 || (activeAgent > i && isRunning)
                  ? "border-white/10 bg-white/[0.04] text-foreground/80"
                  : "border-white/[0.06] bg-transparent text-muted-foreground/60"
            }`}
          >
            {a}
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <div className="mb-1 flex justify-between font-mono text-[9px] text-muted-foreground">
          <span>Task Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-1.5 rounded-full bg-gradient-to-r from-lime via-cyan to-violet"
          />
        </div>
        <div className="mt-2.5 flex w-full min-w-0 flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-2 text-[9px] text-muted-foreground">
          <span className="shrink-0">Agents: Planner, Writer, Editor</span>
          <ActionButton onClick={startAutomation} disabled={isRunning}>
            {isRunning ? "Running..." : "Run Crew Workflow"}
          </ActionButton>
        </div>
      </div>
    </WidgetShell>
  );
}

interface MockMobileProps {
  type: "edtech" | "finance";
}

export function MockMobileApp({ type }: MockMobileProps) {
  const [reloadCount, setReloadCount] = useState(0);
  const [isReloading, setIsReloading] = useState(false);

  const triggerReload = () => {
    if (isReloading) return;
    setIsReloading(true);
    playBlip(1000, 0.01, 0.1);
    setTimeout(() => {
      setReloadCount((c) => c + 1);
      setIsReloading(false);
    }, 800);
  };

  return (
    <div className="relative mt-5 flex h-[172px] w-full min-w-0 items-center justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08090d]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-40" />
      {/* Left: dev console */}
      <div className="relative flex h-full min-w-0 flex-1 flex-col justify-between pr-3 text-left">
        <div>
          <span className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/90">
            <span
              className={`h-1.5 w-1.5 rounded-full bg-lime ${isReloading ? "animate-ping" : "animate-pulse"}`}
            />
            {type === "edtech" ? "Shiksha Live Sync" : "Eazr Pay Gateway"}
          </span>
          <div className="mt-3 space-y-1.5 font-mono text-[9.5px] text-muted-foreground">
            <div className="truncate">
              <span className="text-foreground/40">Status:</span>{" "}
              <span className={isReloading ? "text-cyan" : "text-lime"}>
                {isReloading ? "Hot Reloading..." : "Live Connection"}
              </span>
            </div>
            <div className="truncate">
              <span className="text-foreground/40">Sync:</span>{" "}
              {reloadCount > 0 ? `Synced (${reloadCount} updates)` : "Synced (Clean)"}
            </div>
            <div className="truncate">
              <span className="text-foreground/40">Platform:</span> iOS & Android
            </div>
          </div>
        </div>

        <ActionButton onClick={triggerReload} disabled={isReloading} className="mt-2 self-start">
          {isReloading ? "Reloading..." : "Hot Reload Sync"}
        </ActionButton>
      </div>

      {/* Right: phone frame */}
      <motion.div
        animate={isReloading ? { rotate: [0, -3, 3, 0], scale: [1, 0.97, 1] } : {}}
        transition={{ duration: 0.6 }}
        className="relative flex h-[140px] w-[78px] shrink-0 select-none flex-col justify-between overflow-hidden rounded-[1.1rem] border-[3px] border-[#2a2c36] bg-black p-1 shadow-[0_20px_40px_-12px_rgba(167,139,250,0.45)]"
      >
        <div className="absolute left-1/2 top-1 z-20 h-1.5 w-6 -translate-x-1/2 rounded-full bg-[#2a2c36]" />

        <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-[0.8rem] bg-gradient-to-b from-[#14161e] to-[#0a0b10] p-1.5 pt-3 text-[5px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-0.5">
            <span className="max-w-[50px] truncate text-[5.5px] font-bold text-foreground">
              {type === "edtech" ? "ShareShiksha" : "Eazr Wallet"}
            </span>
            <span className="h-1 w-1 animate-pulse rounded-full bg-lime" />
          </div>

          {type === "edtech" ? (
            <div className="my-0.5 space-y-0.5">
              <div className="truncate rounded-[3px] bg-lime p-0.5 text-center text-[4.5px] font-semibold text-ink">
                Interactive Classes
              </div>
              <div className="flex gap-0.5">
                <div className="flex-1 truncate rounded-[3px] bg-white/10 p-0.5 text-center text-[4px] text-foreground/80">
                  Quiz
                </div>
                <div className="flex-1 truncate rounded-[3px] bg-white/10 p-0.5 text-center text-[4px] text-foreground/80">
                  Video
                </div>
              </div>
              <div className="h-4 rounded-[3px] bg-gradient-to-br from-violet/50 to-cyan/30" />
            </div>
          ) : (
            <div className="my-0.5 space-y-0.5">
              <div className="flex items-center justify-between rounded-[3px] bg-white/10 p-0.5 text-[4px] text-foreground/80">
                <span>Bal:</span>
                <span className="font-bold text-lime">$1,480.00</span>
              </div>
              <div className="h-4 rounded-[3px] bg-gradient-to-br from-lime/40 to-cyan/20" />
              <div className="rounded-[3px] bg-lime py-0.5 text-center text-[4px] font-bold text-ink">
                Transfer Instant
              </div>
            </div>
          )}

          <div className="flex justify-around border-t border-white/10 pt-0.5 text-[4px] font-medium text-muted-foreground">
            <span>Home</span>
            <span>Learn</span>
            <span>Wallet</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function RagMemoryWidget() {
  const [querying, setQuerying] = useState(false);
  const [chunk, setChunk] = useState("#188a-92b4");
  const [score, setScore] = useState(98);

  const query = () => {
    if (querying) return;
    playBlip(500, 0.01, 0.1);
    setQuerying(true);
    setScore(0);
    setTimeout(() => {
      setChunk(
        `#${Math.random().toString(16).slice(2, 6)}-${Math.random().toString(16).slice(2, 6)}`,
      );
      setScore(98);
      setQuerying(false);
    }, 900);
  };

  return (
    <WidgetShell
      title="RAG Memory Store"
      badge={<Badge className="max-w-[120px]">98% Accuracy</Badge>}
    >
      <div className="mt-3 flex flex-wrap gap-1">
        {["policy.pdf", "crm.leads", "sop.md", "faq.json", "notion"].map((d, i) => (
          <span
            key={d}
            className={`rounded-md border px-1.5 py-0.5 font-mono text-[8.5px] transition-all duration-300 ${
              querying && i % 2 === 0
                ? "border-violet/60 bg-violet/15 text-violet"
                : "border-white/[0.08] text-muted-foreground"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <div className="mb-1 flex justify-between font-mono text-[9px] text-muted-foreground">
          <span>Vector Embedding Chunk</span>
          <span className="text-foreground/80">{chunk}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-1.5 rounded-full bg-gradient-to-r from-violet to-lime"
          />
        </div>
        <div className="mt-2.5 flex w-full min-w-0 flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-2 text-[9px] text-muted-foreground">
          <span className="shrink-0">Memory: Active Semantics</span>
          <ActionButton onClick={query} disabled={querying}>
            {querying ? "Retrieving..." : "Query Vector Store"}
          </ActionButton>
        </div>
      </div>
    </WidgetShell>
  );
}
