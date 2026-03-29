import type { Metadata } from "next";
import Forum from "./Forum";

export const metadata: Metadata = { title: "Community", description: "Connect with top-tier analysts, verify market sentiment, and participate in prediction streams." };

export default function CommunityPage() {
  return (
    <div className="pt-24 px-6 max-w-[1440px] mx-auto w-full pb-20">
      <header className="mb-12">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-secondary-container signal-dot" />
          <span className="text-secondary font-[var(--font-label)] text-xs tracking-widest uppercase font-bold">Live Network Pulse</span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter mb-4 text-on-surface">COMMUNITY HUB</h1>
        <p className="text-on-primary-container max-w-2xl">Connect with top-tier analysts, verify market sentiment, and participate in high-stakes prediction streams.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Forum */}
        <div className="md:col-span-8">
          <Forum />
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-8">
          <div className="bg-surface-container p-6 border border-outline-variant/10">
            <h2 className="text-sm font-bold tracking-widest text-on-primary-container uppercase mb-6 flex items-center justify-between"><a href="/community/members" className="hover:text-primary transition-colors">Top Analysts</a><a href="/community/members"><span className="material-symbols-outlined text-tertiary text-lg hover:scale-110 transition-transform">military_tech</span></a></h2>
            <div className="space-y-4">
              {[
                { rank: "01", name: "@Matrix_Quant", acc: "94.2%", pct: 94, color: "text-tertiary" },
                { rank: "02", name: "@Sovereign_Alpha", acc: "91.8%", pct: 91, color: "text-on-primary-container" },
                { rank: "03", name: "@BullRun_Legacy", acc: "88.5%", pct: 88, color: "text-on-primary-container" },
              ].map((a) => (
                <div key={a.name} className={`flex items-center justify-between p-3 ${a.rank === "01" ? "bg-surface-container-highest/30" : ""}`}>
                  <div className="flex items-center space-x-4">
                    <span className={`text-lg font-black ${a.color} italic`}>{a.rank}</span>
                    <div><div className="text-sm font-bold">{a.name}</div><div className="text-[10px] text-on-primary-container uppercase tracking-tighter">{a.acc} Accuracy</div></div>
                  </div>
                  <div className="h-6 w-16 bg-surface-container-lowest relative overflow-hidden"><div className="absolute inset-0 bg-secondary/20" style={{ width: `${a.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 border border-outline-variant/15">
            <h2 className="text-sm font-bold tracking-widest text-on-primary-container uppercase mb-6">Upcoming Streams</h2>
            <div className="space-y-4">
              {[
                { month: "OCT", day: "24", title: "Weekly Alpha Recap", detail: "16:00 UTC • Hosted by @Matrix_Quant" },
                { month: "OCT", day: "27", title: "Election Odds Breakdown", detail: "20:00 UTC • Live Predictive Model" },
              ].map((e) => (
                <div key={e.title} className="flex gap-4">
                  <div className="flex-none w-12 h-12 bg-surface-variant flex flex-col items-center justify-center font-bold">
                    <span className="text-[10px] text-on-primary-container">{e.month}</span>
                    <span className="text-lg text-primary">{e.day}</span>
                  </div>
                  <div><h4 className="text-sm font-bold text-on-surface">{e.title}</h4><p className="text-[11px] text-on-primary-container">{e.detail}</p></div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 transition-colors">View All Events</button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 premium-gradient opacity-20 group-hover:opacity-40 transition duration-1000 blur" />
            <div className="relative bg-[#5865F2] p-6 flex flex-col items-center text-center space-y-4">
              <h3 className="font-bold text-white uppercase tracking-tight">Access The War Room</h3>
              <p className="text-[11px] text-white/80 uppercase tracking-widest leading-relaxed">2,400+ Members Online Now<br />Exclusive Bot Commands &amp; Alerts</p>
              <a className="bg-white text-[#5865F2] px-6 py-2 text-xs font-black uppercase tracking-widest rounded-sm hover:bg-on-surface transition-colors" href="#">Join Discord</a>
            </div>
          </div>
        </aside>
      </div>

      {/* Reputation Section */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 relative h-96">
          <img className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen" alt="Futuristic data visualization of global connectivity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4VjZpE6WaDjqn3muBSsWwNXpqsLSobLD0wSaxCj1X1BzJ9uiSGbKPhd2XeQxCjt07uPT_p1tqsBcgWi7FJFmwFY_ueUnTuG9J9zL7zWiQc0P4YuHfDmemUoptCMw5bXSjom-ZRihCEUb0HwMOfTaWWV7CKXN6hfIJmVsKzg8UuDbjuuD9lrtiF3K3-xiFK973K5xh8gm2PCaEJhZdAJQlPDq0_5uStmtg0NujLsfvciYTVcBscMZNpi7Vba5ASmQAA-HFnJjdYNI" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="order-1 md:order-2 space-y-6">
          <h2 className="text-4xl font-black tracking-tighter text-on-surface uppercase leading-none">Your Accuracy is Your Reputation</h2>
          <p className="text-on-primary-container">In the AlphaPredicts ecosystem, we don&apos;t just talk markets. We prove them. Every forum post and signal is tracked. Gain reputational tokens and unlock high-level API access by maintaining a &gt;75% win rate over 30 days.</p>
          <div className="flex gap-4">
            <button className="bg-tertiary text-on-tertiary px-8 py-3 font-bold text-sm rounded-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95">Submit Prediction</button>
            <button className="border border-outline px-8 py-3 font-bold text-sm rounded-sm uppercase tracking-widest transition-all hover:bg-surface-variant">Review Rulebook</button>
          </div>
        </div>
      </section>
    </div>
  );
}
