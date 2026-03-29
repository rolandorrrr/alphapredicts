import type { Metadata } from "next";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import CheckoutButton from "./CheckoutButton";
import StatusBanner from "./StatusBanner";

export const metadata: Metadata = { title: "Pro", description: "Alpha Pro subscription — institutional intelligence for prediction market analysts." };

export default function ProPage() {
  return (
    <div className="pt-24">
      <JsonLd data={faqSchema} />
      <StatusBanner />

      {/* Hero */}
      <section className="relative px-6 py-20 max-w-[1440px] mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-tertiary/40 via-transparent to-transparent" />
        </div>
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container signal-dot" />
            <span className="text-secondary font-[var(--font-label)] tracking-widest text-xs uppercase font-bold">Live Institutional Feed Active</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
            The Edge <br /><span className="text-tertiary">Is Alpha.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Stop reacting. Start predicting. Alpha Pro grants you the sovereign intelligence utilized by tier-one analysts to navigate volatility with surgical precision.
          </p>
        </div>
      </section>

      {/* Free Trial CTA */}
      <section className="px-6 py-16 max-w-[1440px] mx-auto">
        <div className="bg-surface-container-highest border border-tertiary/30 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-tertiary/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="bg-secondary/10 text-secondary px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
              No commitment required
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Try Alpha Pro Free for <span className="text-tertiary">7 Days</span>
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-8">
              Full access to every signal, every analysis tool, and the complete Alpha Stack. Add a payment method to start your trial — cancel anytime before day 7 and you won&apos;t be charged.
            </p>
            <CheckoutButton
              tier="tactical"
              trial={true}
              className="px-12 py-5 premium-gradient text-on-tertiary-fixed font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform inline-flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">rocket_launch</span>
              Start 7-Day Free Trial
            </CheckoutButton>
            <p className="text-[10px] text-on-surface-variant mt-4 uppercase tracking-widest">
              $149/mo after trial &bull; Cancel anytime &bull; Payment method required
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-20">
          <div className="bg-surface-container-low p-12 border-l-4 border-primary/20 hover:border-primary transition-all duration-500 group">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="font-bold uppercase tracking-widest text-on-surface-variant mb-2 text-sm">Tactical</h3>
                <div className="text-5xl font-black tracking-tighter">$149<span className="text-lg text-on-surface-variant font-normal">/MO</span></div>
              </div>
            </div>
            <p className="text-on-surface-variant mb-12 max-w-xs">Full access to real-time signals and the core Alpha dashboard for agility.</p>
            <CheckoutButton
              tier="tactical"
              className="w-full py-4 border border-outline-variant hover:bg-surface-container-highest transition-colors font-bold uppercase tracking-widest text-sm"
            >
              Deploy Monthly
            </CheckoutButton>
          </div>
          <div className="bg-surface-container-highest p-12 border-l-4 border-tertiary relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[240px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            </div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="bg-tertiary/10 text-tertiary px-2 py-1 text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Best Value &bull; Save 30%</div>
                <h3 className="font-bold uppercase tracking-widest text-tertiary mb-2 text-sm">Sovereign</h3>
                <div className="text-5xl font-black tracking-tighter text-tertiary">$1,250<span className="text-lg text-on-surface-variant font-normal">/YR</span></div>
              </div>
            </div>
            <p className="text-on-surface-variant mb-12 max-w-xs">The full suite including API hooks, private mentorship, and priority execution.</p>
            <CheckoutButton
              tier="sovereign"
              className="w-full py-4 premium-gradient text-on-tertiary-fixed font-black uppercase tracking-widest text-sm active:scale-[0.98] transition-all"
            >
              Claim Annual Alpha
            </CheckoutButton>
          </div>
        </div>
      </section>

      {/* Alpha Stack */}
      <section className="px-6 py-20 bg-surface-container-lowest">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-4 mb-12"><h2 className="text-3xl font-black uppercase tracking-tighter">The Alpha Stack</h2><div className="h-px flex-grow bg-outline-variant/30" /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 lg:row-span-2 bg-surface-container p-8 flex flex-col justify-between min-h-[400px]">
              <span className="material-symbols-outlined text-tertiary text-4xl">bolt</span>
              <div><h4 className="text-xl font-bold mb-4 uppercase italic tracking-tight">Real-Time Alerts</h4><p className="text-on-surface-variant text-sm leading-relaxed">Sub-second latency execution signals delivered via WebSocket and Telegram. Never miss the entry that defines the cycle.</p></div>
            </div>
            {[
              { icon: "groups", color: "text-primary", t: "Private Discord", d: "Direct access to our lead analysts and a high-signal community of whales." },
              { icon: "podcasts", color: "text-primary", t: "Webinars", d: "Weekly deep-dives into macro trends and micro-structure analysis." },
              { icon: "query_stats", color: "text-secondary", t: "Alpha Ledger", d: "Our full historical signal performance, verified on-chain." },
            ].map((f) => (
              <div key={f.t} className="bg-surface-container-high p-8 flex flex-col justify-between">
                <span className={`material-symbols-outlined ${f.color} text-3xl`}>{f.icon}</span>
                <div><h4 className="text-lg font-bold mb-2 uppercase tracking-tight">{f.t}</h4><p className="text-on-surface-variant text-xs">{f.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-32 max-w-[1440px] mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-6 italic">Voices from the <span className="text-tertiary underline decoration-4">Vanguard</span></h2>
            <p className="text-on-surface-variant italic">Alpha Pro isn&apos;t just a subscription; it&apos;s the standard for those who trade with conviction.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { q: "Alpha Pro called the French election unwind 36 hours before Polymarket moved. I was positioned before the crowd even woke up. This is the only edge I trust.", name: "Daniel K.", role: "Polymarket Top 50 Trader", initials: "DK" },
              { q: "I was bleeding on Kalshi event contracts until I found AlphaPredicts. Their signal correlation model flipped my P&L in the first week. The conviction data is unmatched.", name: "Priya S.", role: "Kalshi Event Strategist", initials: "PS" },
            ].map((t) => (
              <div key={t.name} className="space-y-6">
                <div className="text-lg leading-relaxed font-medium italic text-on-surface">&ldquo;{t.q}&rdquo;</div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-surface-container-highest flex items-center justify-center text-tertiary font-black text-sm">{t.initials}</div>
                  <div><div className="text-sm font-bold uppercase tracking-widest">{t.name}</div><div className="text-[10px] text-tertiary uppercase tracking-widest">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-tertiary text-on-tertiary py-24 text-center px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter">Ascend to Alpha.</h2>
          <p className="font-bold text-lg uppercase tracking-wide opacity-80">Institutional intelligence for the sovereign individual.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <CheckoutButton
              tier="tactical"
              className="bg-on-tertiary text-tertiary px-10 py-5 font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
            >
              Get Started Now
            </CheckoutButton>
            <a href="#pricing" className="border-2 border-on-tertiary/20 px-10 py-5 font-black uppercase tracking-widest text-sm hover:bg-on-tertiary/10 transition-colors inline-flex items-center justify-center">
              Compare Tiers
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
