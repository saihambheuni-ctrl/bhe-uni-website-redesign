/* Why partner (bento) · What you get · Who it's for */
const { Reveal: R1, SectionHeading: SH1, Eyebrow: EB1, useInView: useInViewB } = window;
const { useState: useStateB } = React;

/* ------------------------------ BENTO GRID ------------------------------- */
function CommissionBars() {
  const [ref, inView] = useInViewB({ threshold: 0.4 });
  const [hover, setHover] = useStateB(-1);
  const bars = [
    { h: 42, label: 'Q1' }, { h: 58, label: 'Q2' }, { h: 50, label: 'Q3' },
    { h: 72, label: 'Q4' }, { h: 64, label: 'Q5' }, { h: 90, label: 'Q6' },
  ];
  return (
    <div ref={ref} className="mt-7 flex items-end gap-2.5 h-28">
      {bars.map((b, i) => (
        <div key={i} className="relative flex-1 h-full flex items-end"
             onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}>
          {/* value bubble */}
          <div className={`absolute left-1/2 -translate-x-1/2 -top-1 px-2 py-0.5 rounded-md bg-white text-navy-900 text-[10px] font-semibold shadow transition-all duration-200 ${hover === i ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-1'}`}>
            {b.h}%
          </div>
          <div className="w-full rounded-t-md bg-gradient-to-t from-white/25 to-white origin-bottom transition-all ease-out"
               style={{
                 height: inView ? `${b.h}%` : '0%',
                 opacity: hover === -1 || hover === i ? 1 : 0.55,
                 transitionDuration: '900ms',
                 transitionDelay: `${i * 80}ms`,
               }} />
        </div>
      ))}
    </div>
  );
}

function ValueBento() {
  const [active, setActive] = useStateB(0);
  const right = [
    {
      icon: 'network',
      title: 'Direct University Portals',
      body: 'Our partners receive monthly training, product updates, and direct access to a dedicated B2B manager who actively oversees agent-submitted applications to maintain smooth processing and strong outcomes.',
    },
    {
      icon: 'bookOpen',
      title: '24/7 Dedicated Support',
      body: 'Through our CRM-powered agent portal, you can submit applications, track progress in real time, and manage your pipeline all in one organised system.',
    },
  ];
  const points = ['Performance-based rates', 'Reconciliation you can audit', 'Predictable payout cycles'];
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <R1>
          <h2 className="font-display font-semibold tracking-tight text-navy-900 text-[clamp(1.9rem,3.6vw,2.7rem)] leading-[1.1]">
            Why Partner With BHE UNI
          </h2>
          <p className="mt-4 max-w-4xl text-[16.5px] leading-relaxed text-slate-600">
            BHE UNI is a UK-registered education consultancy and AI-powered EdTech platform operating across the UK and Bangladesh. With 14+ years of recruitment experience, we support 60+ agents globally and have successfully served 3,000+ students through our partner network.
          </p>
        </R1>

        <div className="mt-12 grid lg:grid-cols-3 gap-5 lg:gap-6 items-start">
          {/* featured blue card */}
          <R1 className="h-full">
            <article className="group relative h-full overflow-hidden rounded-[22px] p-8 shadow-[0_30px_70px_-30px_rgba(31,77,200,0.6)] bg-gradient-to-br from-[#1c3f9e] via-[#2a55cf] to-[#3f74e8]">
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-125" />
              <div className="absolute -left-16 bottom-0 w-56 h-56 rounded-full bg-[#5b87f5]/30 blur-3xl" />
              <div className="relative flex flex-col h-full">
                <span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-500 text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon name="barChart" size={26} />
                </span>
                <h3 className="mt-7 font-display font-semibold text-[26px] leading-tight text-white">Fast-Track Commissions</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/75">
                  We provide competitive commission structures designed to reward performance and ensure transparent, trackable payouts across destinations and intakes.
                </p>
                <CommissionBars />
                <ul className="mt-auto pt-7 space-y-2.5">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-[14px] font-medium text-white/90">
                      <Icon name="checkCircle" size={17} className="text-white/90 shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </R1>

          {/* two right cards */}
          {right.map((c, i) => {
            const isActive = active === i + 1;
            return (
              <R1 key={c.title} delay={120 + i * 120} className="h-full">
                <article
                  onMouseEnter={() => setActive(i + 1)} onMouseLeave={() => setActive(0)}
                  className={`group h-full cursor-default rounded-[22px] p-7 transition-all duration-300 ${isActive ? 'bg-white ring-2 ring-brand-500 shadow-[0_26px_55px_-26px_rgba(244,123,32,0.35)] -translate-y-1' : 'bg-slate-50 ring-1 ring-slate-200/70'}`}>
                  <span className="grid place-items-center w-[52px] h-[52px] rounded-2xl bg-brand-500 text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:-rotate-6">
                    <Icon name={c.icon} size={24} />
                  </span>
                  <h3 className="mt-5 font-display font-semibold text-[21px] text-navy-900">{c.title}</h3>
                  <p className={`mt-2.5 text-[15px] leading-relaxed transition-colors duration-300 ${isActive ? 'text-slate-600' : 'text-slate-400'}`}>{c.body}</p>
                  <div className={`mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-600 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                    Learn more <Icon name="arrowRight" size={16} />
                  </div>
                </article>
              </R1>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- WHAT YOU GET ------------------------------ */
function WhatYouGet() {
  const items = [
    { icon: 'dashboard', title: 'Agent Portal And Workflow', body: 'Manage your student pipeline with CRM style stages, clear next actions, and consistent case handling across multiple intakes.' },
    { icon: 'route', title: 'Application Tracking And Updates', body: 'Use application tracking to follow each case from shortlist to submission to decision, with real time application updates to reduce repeated follow ups.' },
    { icon: 'listChecks', title: 'Document Checklists And Readiness Support', body: 'Support cleaner submissions using a standard document checklist, plus structured readiness guidance for visa required routes. Where applicable, this can include CAS guidance for UK routes.' },
    { icon: 'headphones', title: 'Adviser Support When You Need It', label: 'Get adviser support for:', list: ['Course and institution shortlisting', 'Document readiness and quality checks', 'Next step planning after outcomes'] },
    { icon: 'bookOpen', title: 'Partner Training And Marketing Support', body: 'Partners may receive partner training and enablement resources, plus marketing resources for agents to support recruitment campaigns. Availability can vary by partner type and destination.' },
  ];
  return (
    <section className="bg-slate-50/80 py-12 border-y border-slate-200/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <R1>
          <h2 className="text-center font-display font-semibold tracking-tight text-navy-900 text-[clamp(1.9rem,3.6vw,2.7rem)] leading-[1.1]">
            What you get as a partner
          </h2>
        </R1>
        <div className="mt-12 flex flex-wrap justify-center gap-5 lg:gap-6">
          {items.map((it, i) => (
            <R1 key={it.title} delay={(i % 3) * 100}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <article className="group h-full flex flex-col items-center text-center rounded-2xl bg-white ring-1 ring-slate-200/70 p-7 transition-all duration-300 hover:ring-brand-400/50 hover:shadow-[0_22px_48px_-26px_rgba(244,123,32,0.4)] hover:-translate-y-1">
                <span className="grid place-items-center w-14 h-14 rounded-xl bg-brand-50 text-brand-500 ring-1 ring-brand-100 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={it.icon} size={24} />
                </span>
                <h3 className="mt-5 font-display font-semibold text-[18px] leading-snug text-navy-900 text-balance">{it.title}</h3>
                {it.body && <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-600">{it.body}</p>}
                {it.list && (
                  <div className="mt-3 inline-block text-left">
                    <p className="text-[14px] font-semibold text-navy-800">{it.label}</p>
                    <ul className="mt-2.5 space-y-2">
                      {it.list.map((li) => (
                        <li key={li} className="flex items-start gap-2.5 text-[14px] text-slate-600">
                          <Icon name="checkCircle" size={17} className="text-brand-500 shrink-0 mt-0.5" /> {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </R1>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ WHO IT'S FOR ----------------------------- */
function WhoFor() {
  const who = [
    'Education agents and consultancy firms supporting study-abroad recruitment',
    'Independent counsellors providing course and university selection guidance',
    'Agencies wanting stronger pipeline management and clearer workflows',
    'Partners seeking student recruitment tools and consistent enrolment processing',
    'Ethical recruiters focused on ethical student recruitment and long-term outcomes',
    'Partners supporting visa-required routes who want visa-readiness guidance where applicable',
  ];
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
        <R1>
          <div className="max-w-md">
            <h2 className="font-display font-semibold tracking-tight text-navy-900 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]">Who this partnership is for</h2>
            <p className="mt-4 text-[18px] font-medium text-navy-900">This programme is suitable for:</p>
            <p className="mt-2 text-[16px] leading-relaxed text-slate-600">If you place students into study-abroad programmes and want a partner that brings structure, transparency, and support — this is for you.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100 px-4 py-2 text-[14px] font-semibold"><Icon name="briefcase" size={16} /> Agencies</div>
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-900/[0.05] text-navy-800 ring-1 ring-navy-900/10 px-4 py-2 text-[14px] font-semibold"><Icon name="users" size={16} /> Counsellors</div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100 px-4 py-2 text-[14px] font-semibold"><Icon name="badgeCheck" size={16} /> Ethical recruiters</div>
          </div>
        </R1>
        <R1 delay={120}>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {who.map((w, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl bg-slate-50/80 ring-1 ring-slate-200/60 p-4 transition-all duration-300 hover:ring-brand-300/70 hover:bg-brand-50/40">
                <span className="grid place-items-center w-7 h-7 rounded-full bg-brand-500 text-white shrink-0 mt-0.5"><Icon name="check" size={15} /></span>
                <span className="text-[15px] leading-snug text-navy-800 font-medium">{w}</span>
              </li>
            ))}
          </ul>
        </R1>
      </div>
    </section>
  );
}

Object.assign(window, { ValueBento, WhatYouGet, WhoFor });
