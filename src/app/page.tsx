import GlassPanel from "@/components/GlassPanel";

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Real-Time Ticker */}
      <section className="bg-surface-container-lowest border-y border-outline-variant/15 overflow-hidden py-2 whitespace-nowrap">
        <div className="ticker-scroll flex items-center space-x-12">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center space-x-12">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">POLYMKT</span>
                <span className="text-xs font-bold">US ELECTION:</span>
                <span className="text-xs text-secondary">TRUMP 52%</span>
                <span className="material-symbols-outlined text-[14px] text-secondary">trending_up</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">KALSHI</span>
                <span className="text-xs font-bold">FED RATE CUT:</span>
                <span className="text-xs text-error">SEPT 25BPS 41%</span>
                <span className="material-symbols-outlined text-[14px] text-error">trending_down</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">POLYMKT</span>
                <span className="text-xs font-bold">BTC ATH 2024:</span>
                <span className="text-xs text-secondary">YES 68%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">KALSHI</span>
                <span className="text-xs font-bold">RECESSION 2024:</span>
                <span className="text-xs text-on-surface-variant">NO 82%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hero: Breaking Alpha */}
      <section className="relative h-[819px] min-h-[600px] flex items-end overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover" alt="Dark dramatic trading floor with stock charts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUbNIvdHDTbl3VGk9IDFvNmTYeNUNHUUzBSNaiD3lRopoacDRb1LEl_mJYiFIhnwsFYKa3oXcXiHLSeQCsp046hGdXPRvChbBK7XSMgPp8i3M-1jUXE2LMm_J3YFPZFCeCNYhFSRfwY4vn7FqQP5CHnL9ASrewRRR8dnpH3tippAjnPg6ntuS3WHCy2wnJJR4DkTwYBR9jnCTZ6mhOcK2Ihtd8XPk0bhWysgE5rPrC7WcKNtv2OTMK7G_V6aSoySEAx-Y1j-kfouA" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative w-full max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center space-x-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(60,228,47,0.6)]" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Breaking Alpha</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6 text-on-surface">
              THE SEPTEMBER SURPRISE:<br />
              <span className="text-primary">LIQUIDITY TRAP DEEPENS</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-8">
              New data from Kalshi indicates a massive shift in probability for the Q4 rate trajectory. Roberto explores how whale movements are front-running the Fed&apos;s next signal.
            </p>
            <div className="flex items-center space-x-4">
              <button className="px-8 py-3 bg-primary text-on-primary font-bold rounded-sm hover:brightness-110 transition-all uppercase tracking-tight">Full Analysis</button>
              <button className="px-8 py-3 border border-outline-variant text-on-surface font-bold rounded-sm hover:bg-surface-container-high transition-all uppercase tracking-tight">View Market</button>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <GlassPanel>
              <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-4">Live Prediction Data</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold uppercase">Fed Rate Cut</span>
                    <span className="text-2xl font-black text-secondary">58%</span>
                  </div>
                  <div className="w-full h-1 bg-surface-container-highest">
                    <div className="bg-secondary h-full" style={{ width: "58%" }} />
                  </div>
                </div>
                <div className="h-24 w-full bg-surface-container-low/50 relative overflow-hidden flex items-end">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                    <path className="drop-shadow-[0_0_5px_rgba(60,228,47,0.5)]" d="M0,35 Q10,30 20,32 T40,25 T60,28 T80,15 T100,10" fill="none" stroke="#3ce42f" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* Predictor's Hub */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-secondary-container" />
              <h2 className="text-sm font-black uppercase tracking-widest text-on-surface-variant">The Predictor&apos;s Hub</h2>
            </div>
            <h3 className="text-3xl font-black tracking-tight">Active Consensus</h3>
          </div>
          <div className="hidden md:flex space-x-4">
            <button className="text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-tertiary transition-colors">Politics</button>
            <button className="text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-tertiary transition-colors">Finance</button>
            <button className="text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-tertiary transition-colors">Pop Culture</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          <div className="md:col-span-2 md:row-span-2 bg-surface-container-low p-8 group relative overflow-hidden flex flex-col justify-end">
            <div className="absolute inset-0 opacity-20 group-hover:scale-105 transition-transform duration-700">
              <img className="w-full h-full object-cover" alt="Political debate stage" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw4m9eyYrXF7-wCWkDaZUcs8fosdHVB9qCz2EPPal_VEPytY7gNf5G7OIA1ihTG2PzycAoMV7LyRjfeJlS81NWYUCXQX18GIoUUvyPHfxqKoZaJn2eEbntgW6QC3WVyvJbuP8l-E5N0PXkWGwAsGIzqEbC5TPXOn5lfnM7U7UF6Zlw_rz4q_-vbAuxHi30i5bpXgrTB8NnwrOtJJCjhKVY75xEyKhk4Mnpjje31QuFyqM3SPGD5KWdYEiu6CFvVi2IGab3wXejoUc" />
            </div>
            <div className="relative z-10">
              <span className="px-2 py-0.5 bg-tertiary text-on-tertiary text-[10px] font-black uppercase tracking-tighter mb-4 inline-block">Pro Signal</span>
              <h4 className="text-3xl font-black mb-4 leading-tight uppercase">US House Majority 2024:<br />GOP Holds?</h4>
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col"><span className="text-4xl font-black text-secondary">64&cent;</span><span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Yes Odds</span></div>
                <div className="flex flex-col text-right"><span className="text-4xl font-black text-on-surface">36&cent;</span><span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">No Odds</span></div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-highest p-6 flex flex-col justify-between border-b-2 border-transparent hover:border-secondary transition-all">
            <div><span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Finance</span><h5 className="text-lg font-bold mt-2 leading-tight uppercase">S&amp;P 500 New ATH before Oct?</h5></div>
            <div className="flex justify-between items-center"><span className="text-2xl font-black">72%</span><span className="material-symbols-outlined text-secondary">trending_up</span></div>
          </div>
          <div className="bg-surface-container-highest p-6 flex flex-col justify-between border-b-2 border-transparent hover:border-error transition-all">
            <div><span className="text-[10px] font-bold text-error uppercase tracking-widest">Pop Culture</span><h5 className="text-lg font-bold mt-2 leading-tight uppercase">GTA VI Release Date Delay?</h5></div>
            <div className="flex justify-between items-center"><span className="text-2xl font-black">15%</span><span className="material-symbols-outlined text-on-surface-variant">horizontal_rule</span></div>
          </div>
          <div className="bg-surface-container-highest p-6 flex flex-col justify-between md:col-span-2">
            <div className="flex justify-between items-start">
              <div><span className="text-[10px] font-bold text-primary uppercase tracking-widest">Global Affairs</span><h5 className="text-xl font-bold mt-2 leading-tight uppercase">OPEC+ Oil Production Cut?</h5></div>
              <div className="text-right"><span className="text-xs font-bold block">KALSHI VOL</span><span className="text-sm font-black">$4.2M</span></div>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex-1 h-8 bg-surface-container-low border border-outline-variant/10 flex items-center justify-center text-xs font-bold uppercase tracking-widest hover:bg-secondary/20 transition-colors cursor-pointer">Yes 45&cent;</div>
              <div className="flex-1 h-8 bg-surface-container-low border border-outline-variant/10 flex items-center justify-center text-xs font-bold uppercase tracking-widest hover:bg-error/20 transition-colors cursor-pointer">No 55&cent;</div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Corner */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-2 mb-12">
            <span className="w-2 h-2 rounded-full bg-secondary-container" />
            <h2 className="text-sm font-black uppercase tracking-widest text-on-surface-variant">Strategy Corner</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="h-64 bg-surface-container-highest overflow-hidden">
                <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Analyst looking at data monitors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuraOn16Xlxbs0TZSTd3RulRg0L-NzF8bdST0LmaiYh26aXHohyiWb9ksylA0YtjqA9XFYrLKq_FCfVgNlgVvvTkqwqOj36FxODQRbXDstecLylE1ldE_ezmefW2v4LfnGgjhRsYDDAZ1Wz5HOMNLK7UR4-5HrzGeGt7x8Fag7gyXoaK68VwwFZ6je6GAecO72baJXX0xwmsMK7voTHCiHFgX3XdCvI6s8EG6Rs8p-2By116zc6qIlcbyu0SJ0suo7k2XmxKAathw" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-[10px] font-black bg-primary-container px-2 py-0.5 text-primary uppercase">Deep Dive</span>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">By Roberto</span>
                </div>
                <h3 className="text-2xl font-black uppercase leading-tight mb-4 hover:text-primary transition-colors cursor-pointer">The Asymmetry of Hedging: Why Every Predictor Needs a &quot;Nuclear Option&quot;</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Roberto breaks down the tactical advantage of opposing consensus when the implied volatility of prediction markets exceeds real-world risk metrics.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-surface-container-highest overflow-hidden">
                <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Blockchain nodes connecting with golden light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh9N7hJS-Cti2w36tqig9CMifGMCZQXenyyjajkbYgLSiDD0pJ4Bm6K-jN7hvCSKPjH-3DYLo5c_f1Fk0VBnAO5qF9g1V-hCvl7Xwo96kVingPzQ3kJL4s2RmcB20D5LFk2V8Dy2l2XD2KSiVjYppdJpKeYVpAy_BuXptb78HQYtjh4w7qQlwC81nLAvNOXAJUddF_ZJndhj7q_p9_jlzINElga-z8AOQ0wsF2y_7Z7_iu7NYJ4y87brcm_SXUoo9P2VXAKTycF34" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-[10px] font-black bg-primary-container px-2 py-0.5 text-primary uppercase">Technicals</span>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">By Rolando</span>
                </div>
                <h3 className="text-2xl font-black uppercase leading-tight mb-4 hover:text-primary transition-colors cursor-pointer">Decoding the Polygon Whale: Tracking the $2M Polymarket Position</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Rolando uses on-chain forensic data to identify the source of the recent massive influx of liquidity.</p>
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] border-b border-outline-variant pb-4">Latest Insights</h3>
              <div className="space-y-6">
                <div className="group cursor-pointer"><span className="text-[10px] font-bold text-tertiary block mb-1">08:42 AM</span><h4 className="text-sm font-bold uppercase group-hover:text-primary transition-colors">Poll Traps: Why Polymarket is beating FiveThirtyEight</h4></div>
                <div className="group cursor-pointer"><span className="text-[10px] font-bold text-tertiary block mb-1">06:15 AM</span><h4 className="text-sm font-bold uppercase group-hover:text-primary transition-colors">The Entertainment Gap: Betting on the Oscars vs the FED</h4></div>
                <div className="group cursor-pointer"><span className="text-[10px] font-bold text-tertiary block mb-1">Yesterday</span><h4 className="text-sm font-bold uppercase group-hover:text-primary transition-colors">Macro Signal: The yield curve inversion and your positions</h4></div>
              </div>
              <button className="w-full py-4 border border-outline-variant text-xs font-black uppercase tracking-widest hover:bg-surface-container-highest transition-all">View Archive</button>
            </div>
          </div>
        </div>
      </section>

      {/* Alpha Pro CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 premium-gradient opacity-90" />
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-on-tertiary-fixed">
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-6 leading-none">Unlock the<br />Alpha Edge</h2>
            <p className="text-lg font-bold mb-8 opacity-80">Join 5,000+ professional analysts getting daily signal alerts, private forum access, and exclusive whale-tracking tools.</p>
            <ul className="space-y-4 mb-8">
              {["Real-time alert engine for market shifts > 5%", "Private Discord with Roberto & Rolando", "Alpha Predicts API for automated execution"].map((f) => (
                <li key={f} className="flex items-center space-x-3"><span className="material-symbols-outlined font-black">check_circle</span><span className="font-bold">{f}</span></li>
              ))}
            </ul>
            <button className="px-10 py-4 bg-on-tertiary-fixed text-tertiary font-black uppercase tracking-widest hover:scale-105 transition-transform rounded-sm">Join Alpha Pro — $49/mo</button>
          </div>
          <div className="hidden lg:block relative">
            <div className="bg-surface-container-lowest p-8 border border-white/10 rounded-sm shadow-2xl scale-110">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Signal Monitor</span>
                <span className="text-[10px] font-black uppercase text-secondary">Live</span>
              </div>
              <div className="space-y-6">
                <div className="p-4 bg-surface-container-low border-l-4 border-secondary">
                  <span className="text-[10px] font-bold text-on-surface-variant block mb-1">DETECTION: WHALE MOVEMENT</span>
                  <p className="text-sm font-bold uppercase">&quot;POLITICS_US_2024&quot; MARKET — $500K LONG INFLOW DETECTED</p>
                </div>
                <div className="p-4 bg-surface-container-low border-l-4 border-tertiary">
                  <span className="text-[10px] font-bold text-on-surface-variant block mb-1">PRO TIP: ROBERTO</span>
                  <p className="text-sm font-bold uppercase">&quot;The hedge here is the secondary market on Kalshi. Look at the spread.&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Opinion */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center space-x-2 mb-12">
          <span className="w-2 h-2 rounded-full bg-secondary-container" />
          <h2 className="text-sm font-black uppercase tracking-widest text-on-surface-variant">Expert Opinion</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative aspect-video bg-surface-container-highest group cursor-pointer overflow-hidden">
            <img className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Professional podcast studio" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARqx4aH9BCRqUHd-kEbp1wgD-x5lc_o2dJdF_YhOHzdYkX6Ri8vVVji_aIhGpKBxNtZDy6IyfHG6H3sYNkYt03tQm3BWYlBqj4qb8AkKkjNxIwSdDnd8jr9MQUNxfisk29tmnv7peZOFxHNqlL1hEfS2FxJxdvEBCl-6mfMahMN3oYWRjvWKkebBxStkpo392LcyhZn5YhgMQycOPsZ6gWcYsvtBSZV-BkexRwIvvoLsdTIEHudggLz7xZbJeT8Nd439WIcrHgI6M" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/40 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background to-transparent">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2 block">New Episode</span>
              <h3 className="text-2xl font-black uppercase leading-tight">The Prediction Paradox: Season 3 Premiere</h3>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: "mic", type: "Podcast — 42 Min", title: "Why traditional polling failed the prediction markets" },
              { icon: "video_library", type: "Weekly Brief — 15 Min", title: "Roberto's Top 3 Long-Shots for October" },
              { icon: "analytics", type: "Technical Workshop — 60 Min", title: "Rolando: Arbitrage strategies between Kalshi & Polymarket" },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-surface-container-low flex items-center space-x-6 hover:bg-surface-container-high transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-surface-container-highest flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-on-surface-variant">{item.icon}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{item.type}</span>
                  <h5 className="text-lg font-bold uppercase leading-tight mt-1">{item.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
