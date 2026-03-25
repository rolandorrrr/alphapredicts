import type { Metadata } from "next";
import SentimentBar from "@/components/SentimentBar";

export const metadata: Metadata = { title: "Signals", description: "Live signal stream with real-time market alerts, sentiment gauges, and whale tracking." };

export default function SignalsPage() {
  return (
    <div className="pt-24 pb-12 px-6 max-w-[1440px] mx-auto min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(60,228,47,0.8)]" />
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-on-surface">Live Signal Stream</h1>
        <span className="ml-auto font-[var(--font-label)] text-[10px] tracking-[0.2em] uppercase text-on-surface-variant bg-surface-container-high px-2 py-1">System Status: Optimal</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-surface-container-low p-6 rounded-sm">
            <h2 className="font-[var(--font-label)] text-xs font-bold tracking-widest uppercase mb-6 text-primary flex items-center justify-between">Market Sentiment<span className="material-symbols-outlined text-sm">analytics</span></h2>
            <div className="space-y-6">
              <SentimentBar label="BTC/USD Intelligence" value={78} sentiment="bullish" valueLabel="78% Bullish" />
              <SentimentBar label="Tech Sector Pulse" value={52} sentiment="neutral" valueLabel="Neutral" />
              <SentimentBar label="Macro volatility" value={21} sentiment="bearish" valueLabel="Extreme Fear" />
            </div>
          </section>

          <section className="bg-surface-container-low p-6 rounded-sm">
            <h2 className="font-[var(--font-label)] text-xs font-bold tracking-widest uppercase mb-6 text-primary flex items-center justify-between">Volatility Alerts<span className="material-symbols-outlined text-sm">warning</span></h2>
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-lowest border-l-2 border-error"><span className="font-[var(--font-label)] text-[9px] text-error uppercase tracking-tighter">High Intensity</span><p className="text-xs font-bold mt-1 text-on-surface">VIX Spike Detected: +12.4% in 15m</p></div>
              <div className="p-4 bg-surface-container-lowest border-l-2 border-secondary"><span className="font-[var(--font-label)] text-[9px] text-secondary uppercase tracking-tighter">Liquidating</span><p className="text-xs font-bold mt-1 text-on-surface">EUR/USD Sharp Reversal at 1.085</p></div>
            </div>
          </section>

          <section className="premium-gradient p-8 rounded-sm text-on-tertiary relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-black uppercase leading-none mb-2">Unlock Pro Signals</h3>
              <p className="text-sm font-medium mb-6 opacity-90 leading-relaxed">Access 100ms low-latency alerts and exclusive institutional whale tracking.</p>
              <button className="bg-on-tertiary text-tertiary font-bold py-3 px-6 text-xs uppercase tracking-widest hover:bg-black transition-colors">Go Premium Now</button>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-10 pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          </section>
        </div>

        {/* Signal Feed */}
        <div className="lg:col-span-8">
          <div className="space-y-1">
            {/* Signal 1: High Impact */}
            <article className="group bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 p-6 flex gap-6 relative overflow-hidden">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center rounded-sm"><span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span></div>
                <span className="mt-4 font-[var(--font-label)] text-[10px] text-on-surface-variant font-bold">14:02</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-[var(--font-headline)] font-extrabold text-lg text-on-surface uppercase tracking-tight">Whale Inflow: $2.4M Shorts on GTA VI Delay Rumors</h3>
                  <span className="bg-error/10 text-error px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border border-error/20 flex-shrink-0 ml-2">High Impact</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">Institutional wallets linked to Tier-1 hedge funds have moved significant capital into downside protection. Order flow suggests anticipation of a formal press release within 24 hours.</p>
                <div className="mt-6 flex items-center gap-6">
                  <div className="flex items-center gap-2"><span className="text-[10px] font-[var(--font-label)] text-on-surface-variant uppercase">Confidence</span><div className="flex gap-1"><div className="w-4 h-1 bg-secondary glow-secondary" /><div className="w-4 h-1 bg-secondary glow-secondary" /><div className="w-4 h-1 bg-secondary glow-secondary" /><div className="w-4 h-1 bg-surface-container-highest" /></div></div>
                  <button className="text-[10px] font-[var(--font-label)] font-bold text-primary hover:text-tertiary transition-colors uppercase tracking-widest flex items-center gap-1">Analyze Flow <span className="material-symbols-outlined text-sm">arrow_right_alt</span></button>
                </div>
              </div>
            </article>

            {/* Signal 2: Alpha Pick */}
            <article className="group bg-surface-container p-6 flex gap-6 relative overflow-hidden">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center rounded-sm"><span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span></div>
                <span className="mt-4 font-[var(--font-label)] text-[10px] text-on-surface-variant font-bold">13:45</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-[var(--font-headline)] font-extrabold text-lg text-on-surface uppercase tracking-tight">AI Compute Surge: NVDA Options Chain Skew</h3>
                  <span className="bg-secondary/10 text-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border border-secondary/20 flex-shrink-0 ml-2">Alpha Pick</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">Detected anomalous call buying at the $950 strike for end-of-week expiry. Sentiment index for Semis has flipped positive following TSMC production report.</p>
                <div className="mt-6 flex items-center gap-6">
                  <div className="flex items-center gap-2 text-on-surface-variant text-[10px] font-[var(--font-label)]"><span className="material-symbols-outlined text-sm">group</span> 1.2k ANALYSTS WATCHING</div>
                  <button className="text-[10px] font-[var(--font-label)] font-bold text-primary hover:text-tertiary transition-colors uppercase tracking-widest flex items-center gap-1">View Full Signal <span className="material-symbols-outlined text-sm">arrow_right_alt</span></button>
                </div>
              </div>
            </article>

            {/* Signal 3: Locked/Pro */}
            <article className="group bg-surface-container-low/50 p-6 flex gap-6 relative overflow-hidden grayscale opacity-60">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center rounded-sm"><span className="material-symbols-outlined text-on-surface-variant">lock</span></div>
                <span className="mt-4 font-[var(--font-label)] text-[10px] text-on-surface-variant font-bold">13:21</span>
              </div>
              <div className="flex-grow blur-[4px] select-none pointer-events-none">
                <h3 className="font-[var(--font-headline)] font-extrabold text-lg text-on-surface uppercase tracking-tight mb-2">Proprietary Fed Pivot Probability Model Update</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">This content is restricted to Pro members. Our proprietary model has just shifted the probability of a 50bps cut to...</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-surface-container-highest/90 border border-outline-variant p-4 text-center">
                  <span className="material-symbols-outlined text-tertiary mb-2">workspace_premium</span>
                  <p className="text-[10px] font-[var(--font-label)] font-bold uppercase tracking-widest text-on-surface">Pro Subscriber Only</p>
                  <button className="mt-2 text-[9px] font-bold underline text-tertiary uppercase">Upgrade</button>
                </div>
              </div>
            </article>

            {/* Signal 4: Neutral */}
            <article className="group bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 p-6 flex gap-6 relative overflow-hidden">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center rounded-sm"><span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span></div>
                <span className="mt-4 font-[var(--font-label)] text-[10px] text-on-surface-variant font-bold">12:55</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-[var(--font-headline)] font-extrabold text-lg text-on-surface uppercase tracking-tight">Flash Volatility: $ETH Cross-Exchange Spread</h3>
                  <span className="bg-tertiary/10 text-tertiary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border border-tertiary/20 flex-shrink-0 ml-2">Neutral Alert</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">Price discrepancy of $12.40 detected between Coinbase and Kraken. Arbitrage windows are opening for high-frequency bots.</p>
                <div className="mt-6 flex items-center gap-6">
                  <div className="flex items-center gap-2"><span className="text-[10px] font-[var(--font-label)] text-on-surface-variant uppercase">Intensity</span><div className="flex gap-1"><div className="w-4 h-1 bg-tertiary" /><div className="w-4 h-1 bg-tertiary" /><div className="w-4 h-1 bg-surface-container-highest" /><div className="w-4 h-1 bg-surface-container-highest" /></div></div>
                  <button className="text-[10px] font-[var(--font-label)] font-bold text-primary hover:text-tertiary transition-colors uppercase tracking-widest flex items-center gap-1">Track Spread <span className="material-symbols-outlined text-sm">arrow_right_alt</span></button>
                </div>
              </div>
            </article>
          </div>
          <div className="mt-12 text-center">
            <button className="font-[var(--font-label)] text-xs uppercase tracking-[0.3em] font-bold text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center mx-auto gap-4">
              <span className="h-[1px] w-12 bg-outline-variant" />Load Historical Signals<span className="h-[1px] w-12 bg-outline-variant" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
