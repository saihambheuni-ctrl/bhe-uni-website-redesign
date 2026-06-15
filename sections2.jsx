/* Interactive onboarding step tracker · Destinations grid */
const { useState: useStateS2, useEffect: useEffectS2 } = React;
const { Reveal: R2, SectionHeading: SH2 } = window;

/* --------------------------- STEP TRACKER -------------------------------- */
const STEPS = [
  {
    icon: 'fileText', kicker: 'Step 1',
    title: 'Submit your application',
    body: 'Submit your company details and required agent verification documents using the education agent application form on this page.',
    meta: ['Company & director details', 'References', 'Verification documents'],
  },
  {
    icon: 'shieldCheck', kicker: 'Step 2',
    title: 'Partner review & onboarding',
    body: 'We review your submission and contact you with next steps. Approved partners receive onboarding guidance for portal access and workflow setup.',
    meta: ['Compliance & quality check', 'Agreement signed', 'Portal access granted'],
  },
  {
    icon: 'route', kicker: 'Step 3',
    title: 'Submit students & track',
    body: 'After onboarding, submit student profiles, upload documents, and track every case in real time using the agent portal.',
    meta: ['CRM-style pipeline', 'Document checklists', 'Live application updates'],
  },
  {
    icon: 'award', kicker: 'Step 4',
    title: 'Ongoing support & training',
    body: 'Partners receive updates, guidance, and training opportunities to improve counselling quality and the student experience.',
    meta: ['Monthly training', 'Product updates', 'Dedicated B2B manager'],
  },
];

function StepTracker({ onApply }) {
  const [active, setActive] = useStateS2(0);
  const [auto, setAuto] = useStateS2(true);
  useEffectS2(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 4200);
    return () => clearInterval(id);
  }, [auto]);
  const pick = (i) => { setAuto(false); setActive(i); };
  const s = STEPS[active];
  const pct = (active / (STEPS.length - 1)) * 100;
  return (
    <section id="process" className="relative overflow-hidden bg-slate-50/80 border-y border-slate-200/70 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(244,123,32,0.07),transparent_60%)]" />
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(15,39,71,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,39,71,0.04)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <R2><SH2 center title="How the partnership works" sub="From application to active recruiting in four steps." max="max-w-2xl" /></R2>

        {/* tracker rail */}
        <div className="mt-14">
          <div className="relative">
            {/* base line */}
            <div className="hidden md:block absolute left-0 right-0 top-7 h-[3px] bg-slate-200 rounded-full" />
            <div className="hidden md:block absolute left-0 top-7 h-[3px] rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700 ease-out"
                 style={{ width: `${pct}%` }} />
            <div className="grid md:grid-cols-4 gap-6 md:gap-4">
              {STEPS.map((st, i) => {
                const done = i < active, isActive = i === active;
                return (
                  <button key={i} onClick={() => pick(i)} className="relative flex md:flex-col items-center md:text-center text-left gap-4 md:gap-3 group">
                    <span className={`relative z-10 grid place-items-center w-14 h-14 rounded-full shrink-0 transition-all duration-300
                      ${isActive ? 'bg-brand-500 text-white scale-110 shadow-[0_12px_30px_-8px_rgba(244,123,32,0.8)]'
                        : done ? 'bg-brand-500 text-white' : 'bg-white text-slate-400 ring-1 ring-slate-200 group-hover:text-navy-700 group-hover:ring-brand-300'}`}>
                      <Icon name={done ? 'check' : st.icon} size={24} />
                    </span>
                    <span className="md:mt-1">
                      <span className={`block text-[12px] font-semibold uppercase tracking-wider ${isActive ? 'text-brand-600' : 'text-slate-400'}`}>{st.kicker}</span>
                      <span className={`block text-[15px] font-semibold leading-tight mt-0.5 ${isActive || done ? 'text-navy-900' : 'text-slate-500'}`}>{st.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* detail panel */}
          <div className="mt-10 rounded-[24px] bg-white ring-1 ring-slate-200/80 shadow-[0_30px_70px_-40px_rgba(10,26,51,0.25)] p-7 lg:p-10 overflow-hidden">
            <div key={active} className="grid lg:grid-cols-[1fr_auto] gap-8 items-center animate-[fadeUp_.5s_ease]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-50 text-brand-500 ring-1 ring-brand-100"><Icon name={s.icon} size={22} /></span>
                  <span className="text-[13px] font-semibold uppercase tracking-wider text-brand-600 whitespace-nowrap">{s.kicker} of {STEPS.length}</span>
                </div>
                <h3 className="mt-5 font-display font-semibold text-[26px] lg:text-[30px] text-navy-900 leading-tight">{s.title}</h3>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600">{s.body}</p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {s.meta.map((m) => (
                    <span key={m} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 ring-1 ring-inset ring-brand-100 px-3.5 py-1.5 text-[13px] font-medium text-navy-800">
                      <Icon name="check" size={14} className="text-brand-500" /> {m}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex lg:flex-col gap-3">
                <button onClick={() => pick(Math.max(0, active - 1))} disabled={active === 0}
                        className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full text-[14px] font-semibold text-navy-800 ring-1 ring-inset ring-navy-900/15 hover:bg-navy-900/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition">Back</button>
                {active < STEPS.length - 1 ? (
                  <button onClick={() => pick(active + 1)}
                          className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full text-[14px] font-semibold text-white bg-gradient-to-r from-brand-400 to-brand-600 shadow-[0_10px_26px_-10px_rgba(244,123,32,0.7)] hover:-translate-y-0.5 transition-all whitespace-nowrap">
                    Next step <Icon name="arrowRight" size={16} />
                  </button>
                ) : (
                  <button onClick={onApply}
                          className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full text-[14px] font-semibold text-white bg-gradient-to-r from-brand-400 to-brand-600 shadow-[0_10px_26px_-10px_rgba(244,123,32,0.7)] hover:-translate-y-0.5 transition-all whitespace-nowrap">
                    Apply now <Icon name="arrowRight" size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- DESTINATIONS ------------------------------ */
function Destinations() {
  const meta = {
    UK: { cc: 'gb', note: 'CAS guidance available' },
    US: { cc: 'us', note: 'F-1 pathways' },
    CA: { cc: 'ca', note: 'Study permit routes' },
    AU: { cc: 'au', note: 'Subclass 500' },
    IE: { cc: 'ie', note: 'EU study routes' },
    CN: { cc: 'cn', note: 'Scholarship options' },
    NZ: { cc: 'nz', note: 'Fern programmes' },
  };
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <R2>
          <SH2 center title="Destinations you can recruit for" sub="We support recruitment for these targeted study destinations:" max="max-w-2xl" />
        </R2>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {DESTINATIONS.map((d, i) => {
            const m = meta[d.code];
            return (
              <R2 key={d.code} delay={(i % 4) * 80}>
                <article className="group relative h-full overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-26px_rgba(244,123,32,0.4)] hover:ring-brand-300/70">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 to-brand-600" />
                  <div className="flex items-center justify-between pt-1">
                    <span className="grid place-items-center w-12 h-12 rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <img src={(window.__resources && window.__resources['flag_' + m.cc]) || `assets/flags/${m.cc}.png`} alt={`${d.name} flag`} className="w-full h-full object-cover" loading="lazy" />
                    </span>
                    <Icon name="arrowUpRight" size={18} className="text-slate-300 transition-all duration-300 group-hover:text-brand-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-[17px] text-navy-900">{d.name}</h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500"><Icon name="mapPin" size={13} className="text-brand-500" /> {m.note}</p>
                </article>
              </R2>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { StepTracker, Destinations });
