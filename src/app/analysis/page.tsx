import type { Metadata } from "next";
import JsonLd, { articleSchema } from "@/components/JsonLd";

export const metadata: Metadata = { title: "Analysis", description: "Live analysis feed with deep dives into prediction markets, politics, finance, and pop culture." };

export default function AnalysisPage() {
  return (
    <div className="pt-24 pb-12 max-w-[1440px] mx-auto px-6">
      <JsonLd data={articleSchema({ title: "The Fed's Shadow Pivot: Quantitative Analysis of Q4 Liquidity", description: "Deep dive into internal ledger movements suggesting a structural shift in overnight lending facilities.", author: "Dr. Elias Vance", datePublished: "2024-09-15" })} />
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse shadow-[0_0_8px_#00c705]" />
        <h1 className="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant">Live Analysis Feed // Terminal v4.2</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Featured */}
          <section className="relative group cursor-pointer overflow-hidden rounded-sm bg-surface-container-low">
            <div className="aspect-[21/9] w-full relative">
              <img className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Digital visualization of network nodes and data flows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq9WqlQcWcMk23ukBYR9QnPEmK4Pc70ZJxtSjDwqFgauuMRLq-qXP1yK-eZ1tcPLmRgLOsaAyNqDQriAAX47pA4VeBkB3b72uUqcCRL0m0cxli8pcCMXck4q7M0aTcFMvl5lOcfGJVQjFWoJnHqBRvx3tO84uy7xJhb5KC2OwpOVRFZhGKfp51qcMbi9tm3KXY1WL5jm743c1GSD9NN7oi-8MZvAILHBXGLOThfh_pL-yCh0hAlu7GsklC470WmqS8zyViH_mAfHk" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-2 py-0.5 bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest">Featured Report</span>
                <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">14 MIN READ // BY DR. ELIAS VANCE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter leading-none mb-4 max-w-2xl">THE FED&apos;S SHADOW PIVOT: QUANTITATIVE ANALYSIS OF Q4 LIQUIDITY</h2>
              <p className="text-on-surface-variant text-lg max-w-xl line-clamp-2 font-light">Deep dive into internal ledger movements suggesting a structural shift in overnight lending facilities.</p>
            </div>
          </section>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">01. Finance</h3>
                <span className="text-[10px] text-on-surface-variant uppercase">View Category</span>
              </div>
              <article className="group">
                <div className="mb-4 aspect-video bg-surface-container overflow-hidden">
                  <img className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Financial trading terminal with candle charts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj0Vp1Y5yFYzHqw3kn6AmBd1XeJGNxclVck7Eb3eUs3WiUggAAEKCQRY06G0RdHt4pSz5UmN6epjREk5zbDypQFO2CrBdw_KlQd3XPmEMxoCLqEepip4w2O7th4AMvfcVl9B-R08PUe-gB3J4FRpmGPmHgiVaTndGCVjnmKDfD6-LyssJQqHgHjXoZS2yCqH4eG8yqqGUCKPxZrOipvG0bBCUrHmKzpSb_gUPH_ytlKprw0IO7dpFSkrRcRtDnXl0GYz3IUWb1hPo" />
                </div>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">Bullish Signal</span>
                <h4 className="text-xl font-bold text-on-surface mt-2 group-hover:text-primary transition-colors">Yield Curve Inversion: A Statistical Re-evaluation for 2025</h4>
                <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">Why historical precedents may no longer apply to the current inflationary regime.</p>
              </article>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">02. Politics</h3>
                <span className="text-[10px] text-on-surface-variant uppercase">View Category</span>
              </div>
              <article className="group">
                <div className="mb-4 aspect-video bg-surface-container overflow-hidden">
                  <img className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Neoclassical government building facade" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYw30p9jSiuJFraGh2bSxA9tgGdo6FUWFmAWzlknkZeJ6bonTCCNwYMeVnX0SywNISqYaAVJLoBbC0YP4epEPIuoWkpapVl-Y903pjkGBsrqTvFB5HD2ZzxfO_ybMXyRXkcoIvL-k0XLKYaj7-ORxc8ujM3rySmB4GA1EXGHvaA-LdbCzqU3R7wXJLNfVI32ntx6VTHu5hzLhTShiZUNBCa_45qP0zxvXzzztplT06bkHQ4Pp2UrVRum3WJE1rnPkxzWpyIusIH6E" />
                </div>
                <span className="text-[10px] text-error font-bold uppercase tracking-widest">High Volatility</span>
                <h4 className="text-xl font-bold text-on-surface mt-2 group-hover:text-primary transition-colors">Geopolitical Chess: The Impact of New Trade Corridors</h4>
                <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">Mapping the logistical shifts that are redefining international trade alliances.</p>
              </article>
            </div>
          </div>

          {/* Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-surface-container-high p-6 flex flex-col justify-between min-h-[240px]">
              <div><span className="text-[10px] font-black uppercase tracking-widest text-tertiary">Pro Analysis</span><h3 className="text-2xl font-black text-on-surface mt-2">CRYPTO REGULATION: THE FIRST 100 DAYS</h3></div>
              <div className="flex items-center gap-4"><div className="flex -space-x-2"><div className="w-8 h-8 rounded-full border-2 border-surface-container-high bg-surface-bright" /><div className="w-8 h-8 rounded-full border-2 border-surface-container-high bg-surface-variant" /></div><span className="text-xs text-on-surface-variant uppercase">6 Authors contributing</span></div>
            </div>
            <div className="bg-surface-container-highest p-6 flex flex-col items-center justify-center text-center border border-tertiary/20">
              <span className="material-symbols-outlined text-tertiary text-4xl mb-4">diamond</span>
              <h3 className="text-lg font-bold text-on-surface leading-tight">UNLOCK ALPHA INSIGHTS</h3>
              <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-widest">Get access to 40+ monthly deep dives</p>
              <button className="mt-6 w-full premium-gradient text-on-tertiary-fixed font-black py-3 rounded-sm text-xs uppercase tracking-tighter">Upgrade to Pro</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-low border-l border-outline-variant/10 p-6">
            <div className="flex items-center justify-between mb-8"><h3 className="text-sm font-black uppercase tracking-widest">Whale Watching</h3><span className="material-symbols-outlined text-secondary text-sm">visibility</span></div>
            <div className="space-y-6">
              {[
                { user: "User_8294 (Whale)", shares: "+1.2M SHARES", target: "Fed Rate Cut Jan 2025", pct: 85, size: "$4.2M", conf: "94%", color: "text-secondary" },
                { user: "Prop_Desk_Alpha", shares: "-450K SHARES", target: "Midterm Election Outcome", pct: 30, size: "$1.1M", conf: "32%", color: "text-error" },
                { user: "VC_Collective_Z", shares: "+2.8M SHARES", target: "AI Compute Tax Bill", pct: 98, size: "$9.4M", conf: "98%", color: "text-secondary" },
              ].map((w) => (
                <div key={w.user}>
                  <div className="flex justify-between items-start mb-1"><span className="text-xs font-bold text-on-surface uppercase tracking-tight">{w.user}</span><span className={`text-[10px] ${w.color} font-mono`}>{w.shares}</span></div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-3">Target: {w.target}</div>
                  <div className="w-full bg-surface-container h-1 overflow-hidden"><div className={`${w.color === "text-secondary" ? "bg-secondary" : "bg-error"} h-full`} style={{ width: `${w.pct}%` }} /></div>
                  <div className="mt-2 flex justify-between text-[9px] uppercase font-bold text-on-surface-variant/50"><span>Position Size: {w.size}</span><span>Confidence: {w.conf}</span></div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] border border-outline-variant/30 hover:bg-surface-container transition-colors">View All Major Movements</button>
          </div>

          <div className="p-6 bg-surface-container-low">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6">Trending Analysis</h3>
            <ul className="space-y-4">
              {[{ n: "01", t: "The Death of 60/40 Portfolio", s: "342 Signals Today" }, { n: "02", t: "Uranium: The Invisible Bull Market", s: "189 Signals Today" }, { n: "03", t: "TikTok Ban: Market Implications", s: "156 Signals Today" }].map((i) => (
                <li key={i.n} className="flex gap-4 items-center group cursor-pointer">
                  <span className="text-2xl font-black text-outline-variant group-hover:text-primary transition-colors italic">{i.n}</span>
                  <div><h4 className="text-xs font-bold uppercase text-on-surface">{i.t}</h4><span className="text-[10px] text-on-surface-variant uppercase">{i.s}</span></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-primary-container relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition-transform duration-700"><span className="material-symbols-outlined text-9xl">mail</span></div>
            <h3 className="text-xl font-black text-on-background leading-tight relative z-10">THE DAILY SIGNAL</h3>
            <p className="text-sm text-on-primary-container mt-2 relative z-10 leading-relaxed">The most critical market-moving data, delivered before the opening bell.</p>
            <div className="mt-6 space-y-2 relative z-10">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input id="newsletter-email" className="w-full bg-surface-container-lowest border-none text-xs px-4 py-3 focus:ring-1 focus:ring-tertiary text-on-surface" placeholder="EMAIL ADDRESS" type="email" />
              <button className="w-full bg-on-background text-background font-black py-3 text-xs uppercase tracking-widest hover:bg-white">Subscribe Now</button>
            </div>
          </div>
        </aside>
      </div>

      {/* Pop Culture */}
      <section className="mt-16">
        <div className="flex items-center gap-4 mb-8"><h2 className="text-2xl font-black uppercase tracking-tighter">03. Pop Culture &amp; Entertainment</h2><div className="h-[1px] flex-grow bg-outline-variant/20" /></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { cat: "Entertainment", t: "Streaming Wars: The Consolidation Cycle Begins", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgEf9QEBvYtbppOi8PSmw08VzCWJNcelZ7yj8hv62xxCMNKnPx07_023LPeJhNiRhfIxaPMghOuIcJctG1_86VpXGzgYvr9R2gsv0Uo0rk_vbeP0M1ixIycnyy1poYWQfsic9haakJtHEpwG9IK63BX5_VccD3tgchdRYvStEwNX_srE8orefyZnFuvrLtuZa9D_2WvN3xa5nDE8nDwkjrBU_J2WH0-IHreP-s1l5DLBEfK-t4fNYpjfZ156h9Yl5PBz0lfB_Na0w" },
            { cat: "Gaming", t: "Micro-Transactions vs. Quality: The Industry Pivot", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMik4YmoEMDoAX3IMaTc9jnkNM7y6hyoAmu0xtsWt9XtBjhMAG27aNKoBINVf_5SoblHyV43lKyknjSr7PFnNHnUCJ8GsJQXdIMIEXSW_g7-WMfVkytMisTRlus17HuDnBMVAV_7mUPrzmqPnwnUp1Cfr8OUtVkh9hzNmJ_XZ1vrqkcX9SyUZBD42YrKXFfeY0eWlBPwQX2wEeFlyoNXAB_-4SuTUp40LEB7oDaIwjCjyXqlzpFq_rj_EYpPWTiJjQnCnx8Rav038" },
            { cat: "Box Office", t: "The AI Actor Strike: Financial Forecasts", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnrKd5FNNzavojYjocrukDFLBUiNNFiZgh_HVLfMdqmAUQfHiRhO6VpGaT3jz_b9MKd6pIAM46OPWvoUh6WNLtNgq6wvCsEye7JG1nub41lBTn_fjDutkKo27t02qhnxLo6kHQ0AgfoWx7S6f_r1eHP_Mrvkiw4UvFnjkKQw1b1FCkLtmvXKC-fNogIfOpBwVl6-excYW6RoHOJ1WtC_2o_k94VJ-eLiO-ANjmhCQbnqgXYQdLCBg8A8WHBaQpgWqH1bPpFdpQZaY" },
            { cat: "Trends", t: "Social Media ROI for 2025: A Deep Dive", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbtpsbYQ3G7B_60LlLhI72xymBojh8DzaUylkSmPFuETZ-UBu3Mtp28TdnK23byzAa001A840LX4ce_FkPbLlDa4K0ZkeRUvPxWbmpmJAnFWAnPMAJ4TeC5PFp329tD_qn0HXF9sMMHc7w00zFy7OhT-p_o705WX65IUxyUiSccDl95ZvbyOS2aTUkRNglxP2Fng9-6vRBtpZY2gkOShWSnJvH9PN5Xw1LHbWYL0cJfoaWC7kByoiHxPFP-aPkEn_zTfhanSwWy4M" },
          ].map((c) => (
            <article key={c.t} className="bg-surface-container-low hover:bg-surface-container transition-colors group">
              <div className="h-32 bg-surface-container overflow-hidden"><img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={c.t} src={c.img} /></div>
              <div className="p-4"><span className="text-[9px] font-bold text-tertiary uppercase tracking-[0.2em]">{c.cat}</span><h4 className="text-sm font-bold text-on-surface mt-1 line-clamp-2">{c.t}</h4></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
