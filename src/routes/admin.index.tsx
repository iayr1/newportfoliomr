import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, orderBy, limit, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { auth, db, ADMIN_EMAIL } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Analytics Dashboard — Mayur Chaudhari" },
      { name: "description", content: "Admin analytics dashboard tracking visitors, leads, downloads, and engagement metrics for the portfolio." },
      { property: "og:title", content: "Analytics Dashboard — Mayur Chaudhari" },
      { property: "og:description", content: "Admin analytics dashboard tracking visitors, leads, downloads, and engagement metrics for the portfolio." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type Session = {
  id: string;
  visitorId?: string;
  isNewVisitor?: boolean;
  startedAt?: any;
  endedAt?: any;
  entryPage?: string;
  exitPage?: string;
  referrer?: string;
  device?: string;
  os?: string;
  browser?: string;
  country?: string;
  city?: string;
  pageViews?: number;
  duration?: number;
  utm?: any;
  ip?: string;
};

type Lead = {
  id: string;
  name?: string;
  email?: string;
  message?: string;
  phone?: string;
  timestamp?: any;
};

type Event = {
  id: string;
  name?: string;
  data?: any;
  timestamp?: any;
  path?: string;
};

function fmtDate(ts: any): string {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString();
}

function top<T>(arr: T[], key: (x: T) => string | undefined, n = 5) {
  const counts: Record<string, number> = {};
  arr.forEach((x) => {
    const k = key(x) || "Unknown";
    counts[k] = (counts[k] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

function AdminDashboard() {
  const nav = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u || u.email !== ADMIN_EMAIL) {
        setAuthed(false);
        nav({ to: "/admin/login" });
      } else {
        setAuthed(true);
      }
    });
    return unsub;
  }, [nav]);

  useEffect(() => {
    if (!authed) return;
    (async () => {
      setLoading(true);
      try {
        const [sSnap, lSnap, eSnap] = await Promise.all([
          getDocs(query(collection(db, "sessions"), orderBy("startedAt", "desc"), limit(500))),
          getDocs(query(collection(db, "leads"), orderBy("timestamp", "desc"), limit(200))),
          getDocs(query(collection(db, "events"), orderBy("timestamp", "desc"), limit(500))),
        ]);
        setSessions(sSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
        setLeads(lSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
        setEvents(eSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [authed]);

  const stats = useMemo(() => {
    const now = Date.now();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const sessionDate = (s: Session) =>
      s.startedAt?.toDate ? s.startedAt.toDate().getTime() : 0;

    const visitors = new Set(sessions.map((s) => s.visitorId).filter(Boolean));
    const todaySessions = sessions.filter((s) => sessionDate(s) >= today.getTime());
    const monthSessions = sessions.filter((s) => sessionDate(s) >= monthStart.getTime());
    const live = sessions.filter((s) => now - sessionDate(s) < 5 * 60 * 1000 && !s.endedAt);

    const downloads = events.filter((e) => e.name === "download");
    const linkedinClicks = events.filter(
      (e) => e.name === "outbound_click" && /linkedin/i.test(e.data?.url || ""),
    ).length;
    const githubClicks = events.filter(
      (e) => e.name === "outbound_click" && /github/i.test(e.data?.url || ""),
    ).length;

    const conversionRate = sessions.length
      ? ((leads.length / sessions.length) * 100).toFixed(1) + "%"
      : "0%";

    const ipVisits: Record<string, number> = {};
    sessions.forEach((s) => {
      const ip = s.ip || "Unknown";
      ipVisits[ip] = (ipVisits[ip] || 0) + 1;
    });

    return {
      totalVisitors: visitors.size,
      live: live.length,
      today: todaySessions.length,
      month: monthSessions.length,
      totalSessions: sessions.length,
      downloads: downloads.length,
      resumeDownloads: downloads.filter((d) => d.data?.type === "resume").length,
      portfolioDownloads: downloads.filter((d) => d.data?.type === "portfolio").length,
      brochureDownloads: downloads.filter((d) => d.data?.type === "brochure").length,
      leads: leads.length,
      linkedinClicks,
      githubClicks,
      conversionRate,
      topCountries: top(sessions, (s) => s.country),
      topCities: top(sessions, (s) => s.city),
      topBrowsers: top(sessions, (s) => s.browser),
      topDevices: top(sessions, (s) => s.device),
      topOS: top(sessions, (s) => s.os),
      topReferrers: top(sessions, (s) => s.referrer),
      ipVisits,
    };
  }, [sessions, leads, events]);

  const deleteSession = async (id: string) => {
    if (!confirm("Delete this session?")) return;
    try {
      await deleteDoc(doc(db, "sessions", id));
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete session");
    }
  };

  const deleteByIp = async (ip?: string) => {
    if (!ip) return;
    const matches = sessions.filter((s) => (s.ip || "Unknown") === ip);
    if (!confirm(`Delete all ${matches.length} sessions from IP ${ip}?`)) return;
    try {
      const batch = writeBatch(db);
      matches.forEach((s) => batch.delete(doc(db, "sessions", s.id)));
      await batch.commit();
      setSessions((prev) => prev.filter((s) => (s.ip || "Unknown") !== ip));
    } catch (e) {
      console.error(e);
      alert("Failed to delete sessions");
    }
  };

  if (authed === null) return <div className="p-8">Loading…</div>;
  if (!authed) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <Button
            variant="outline"
            onClick={async () => {
              await signOut(auth);
              nav({ to: "/admin/login" });
            }}
          >
            Sign out
          </Button>
        </div>

        {loading ? (
          <p>Loading data…</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Stat label="Total Visitors" value={stats.totalVisitors} />
              <Stat label="Live (5min)" value={stats.live} />
              <Stat label="Today" value={stats.today} />
              <Stat label="This Month" value={stats.month} />
              <Stat label="Sessions" value={stats.totalSessions} />
              <Stat label="Conversion" value={stats.conversionRate} />
              <Stat label="Leads" value={stats.leads} />
              <Stat label="Downloads" value={stats.downloads} />
              <Stat label="Resume DLs" value={stats.resumeDownloads} />
              <Stat label="Portfolio DLs" value={stats.portfolioDownloads} />
              <Stat label="LinkedIn Clicks" value={stats.linkedinClicks} />
              <Stat label="GitHub Clicks" value={stats.githubClicks} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TopList title="Top Countries" data={stats.topCountries} />
              <TopList title="Top Cities" data={stats.topCities} />
              <TopList title="Top Browsers" data={stats.topBrowsers} />
              <TopList title="Top Devices" data={stats.topDevices} />
              <TopList title="Top OS" data={stats.topOS} />
              <TopList title="Top Referrers" data={stats.topReferrers} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Leads ({leads.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.slice(0, 50).map((l) => (
                      <TableRow key={l.id}>
                        <TableCell>{fmtDate(l.timestamp)}</TableCell>
                        <TableCell>{l.name}</TableCell>
                        <TableCell>{l.email}</TableCell>
                        <TableCell>{l.phone || "—"}</TableCell>
                        <TableCell className="max-w-xs truncate">{l.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions ({sessions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Start</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Visits</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>OS</TableHead>
                      <TableHead>Browser</TableHead>
                      <TableHead>Entry</TableHead>
                      <TableHead>Exit</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Dur(s)</TableHead>
                      <TableHead>Referrer</TableHead>
                      <TableHead>New?</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.slice(0, 100).map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>{fmtDate(s.startedAt)}</TableCell>
                        <TableCell>{s.country || "—"}</TableCell>
                        <TableCell>{s.city || "—"}</TableCell>
                        <TableCell className="font-mono text-xs">{s.ip || "—"}</TableCell>
                        <TableCell>{stats.ipVisits[s.ip || "Unknown"] || 1}</TableCell>
                        <TableCell>{s.device}</TableCell>
                        <TableCell>{s.os}</TableCell>
                        <TableCell>{s.browser}</TableCell>
                        <TableCell>{s.entryPage}</TableCell>
                        <TableCell>{s.exitPage || "—"}</TableCell>
                        <TableCell>{s.pageViews || 0}</TableCell>
                        <TableCell>{s.duration ?? "—"}</TableCell>
                        <TableCell className="max-w-[160px] truncate">{s.referrer}</TableCell>
                        <TableCell>{s.isNewVisitor ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" onClick={() => deleteSession(s.id)}>
                              Delete
                            </Button>
                            {s.ip && (
                              <Button size="sm" variant="destructive" onClick={() => deleteByIp(s.ip)}>
                                Delete IP
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function TopList({ title, data }: { title: string; data: [string, number][] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {data.map(([k, v]) => (
              <li key={k} className="flex justify-between">
                <span className="truncate">{k}</span>
                <span className="font-mono">{v}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
