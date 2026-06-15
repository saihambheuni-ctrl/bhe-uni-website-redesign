/* Stats + lead form · Compliance & commission · FAQ · Footer */
const { useState: useStateS3 } = React;
const { Reveal: R3, SectionHeading: SH3, useInView: useInView3, useCountUp: useCountUp3 } = window;

/* ------------------------- STATS + LEAD FORM ----------------------------- */
function StatCounter({ target, suffix, label, decimals = 0, start }) {
  const v = useCountUp3(target, start, 1800);
  const display = target >= 1000 ? Math.round(v).toLocaleString() : v.toFixed(decimals);
  return (
    <div>
      <div className="font-display font-semibold text-white text-[clamp(2.2rem,4.5vw,3.1rem)] leading-none">
        {display}<span className="text-brand-400">{suffix}</span>
      </div>
      <div className="mt-2 text-[14px] font-medium text-white/60">{label}</div>
    </div>
  );
}

function LeadSection() {
  const [statsRef, statsIn] = useInView3({ threshold: 0.3 });
  const [form, setForm] = useStateS3({ agency: '', email: '', region: '', volume: '' });
  const [errors, setErrors] = useStateS3({});
  const [sent, setSent] = useStateS3(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };
  const validate = () => {
    const er = {};
    if (form.agency.trim().length < 2) er.agency = 'Please enter your agency name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'Enter a valid business email';
    if (!form.region) er.region = 'Select a target region';
    setErrors(er);
    return Object.keys(er).length === 0;
  };
  const submit = (e) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <section id="apply" className="relative overflow-hidden bg-navy-950 py-12 scroll-mt-20">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_15%_30%,rgba(244,123,32,0.16),transparent_55%),radial-gradient(60%_60%_at_90%_70%,rgba(20,184,166,0.16),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT — stats */}
        <div ref={statsRef}>
          <h2 className="font-display font-semibold tracking-tight text-white text-[clamp(2rem,4vw,3rem)] leading-[1.08]">
            Apply to become an agent
          </h2>
          <p className="mt-4 text-[20px] font-medium text-white/90">
            Join a network that delivers
          </p>
          <p className="mt-3 max-w-md text-[17px] leading-relaxed text-white/70">
            With 14+ years of recruitment experience, BHE UNI supports 60+ agents globally and has served 3,000+ students through our partner network.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 max-w-md">
            <StatCounter target={14} suffix="+" label="Years of experience" start={statsIn} />
            <StatCounter target={60} suffix="+" label="Agents globally" start={statsIn} />
            <StatCounter target={3000} suffix="+" label="Students served" start={statsIn} />
            <StatCounter target={7} suffix="" label="Study destinations" start={statsIn} />
          </div>
          <div className="mt-10 flex items-center gap-4 rounded-2xl bg-white/5 ring-1 ring-inset ring-white/10 px-5 py-4 max-w-md">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-teal-500/15 text-teal-300 ring-1 ring-teal-400/20 shrink-0"><Icon name="shieldCheck" size={22} /></span>
            <p className="text-[14px] leading-snug text-white/75">GDPR-aligned data handling. Your details are used only to assess your partnership application.</p>
          </div>
        </div>

        {/* RIGHT — form card */}
        <R3 delay={120}>
          <div className="relative rounded-[24px] bg-white p-7 sm:p-9 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
            {!sent ? (
              <form onSubmit={submit} noValidate>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-brand-600">
                  <Icon name="sparkles" size={16} /> Step 1 of onboarding
                </div>
                <h3 className="mt-2 font-display font-semibold text-[24px] text-navy-900">Start your agent application</h3>
                <p className="mt-1.5 text-[14.5px] text-slate-500">Tell us about your agency. Our B2B team replies within two working days.</p>

                <ul className="mt-5 space-y-2 rounded-xl bg-slate-50 ring-1 ring-inset ring-slate-200/70 px-4 py-3.5">
                  {['Enter details exactly as shown on registration documents', 'Upload clear scans of verification documents to avoid delays', 'We may contact references as part of review'].map((g) => (
                    <li key={g} className="flex items-start gap-2.5 text-[12.5px] leading-snug text-slate-500">
                      <Icon name="check" size={14} className="text-teal-500 shrink-0 mt-0.5" /> {g}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-5">
                  <Field label="Agency name" error={errors.agency}>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="building" size={18} /></span>
                      <input value={form.agency} onChange={set('agency')} placeholder="e.g. Horizon Education Consultants"
                             className={inputCls(errors.agency)} />
                    </div>
                  </Field>
                  <Field label="Primary contact email" error={errors.email}>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="mail" size={18} /></span>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@agency.com"
                             className={inputCls(errors.email)} />
                    </div>
                  </Field>
                  <Field label="Target recruitment region" error={errors.region}>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icon name="mapPin" size={18} /></span>
                      <select value={form.region} onChange={set('region')}
                              className={`${inputCls(errors.region)} appearance-none pr-10 ${form.region ? 'text-navy-900' : 'text-slate-400'}`}>
                        <option value="" disabled>Select a destination</option>
                        {DESTINATIONS.map((d) => <option key={d.code} value={d.name} className="text-navy-900">{d.name}</option>)}
                        <option value="Multiple destinations" className="text-navy-900">Multiple destinations</option>
                      </select>
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icon name="chevronDown" size={18} /></span>
                    </div>
                  </Field>
                </div>

                <button type="submit"
                        className="mt-7 w-full inline-flex items-center justify-center px-6 py-4 rounded-full text-[16px] font-semibold text-white bg-gradient-to-r from-[#f7a823] to-[#f47b20] shadow-[0_14px_34px_-12px_rgba(244,123,32,0.6)] hover:shadow-[0_18px_40px_-10px_rgba(244,123,32,0.85)] hover:-translate-y-0.5 transition-all">
                  Submit application
                </button>
                <p className="mt-4 text-center text-[12.5px] text-slate-400">By applying you agree to our partner terms and privacy policy.</p>
              </form>
            ) : (
              <div className="text-center py-6 animate-[fadeUp_.5s_ease]">
                <span className="mx-auto grid place-items-center w-20 h-20 rounded-full bg-teal-50 text-teal-600 ring-8 ring-teal-50/60">
                  <Icon name="checkCircle" size={40} />
                </span>
                <h3 className="mt-6 font-display font-semibold text-[26px] text-navy-900">Application received</h3>
                <p className="mt-2 max-w-sm mx-auto text-[15.5px] text-slate-600">
                  Thanks, <span className="font-semibold text-navy-900">{form.agency}</span>. Our B2B team will review your details for <span className="font-semibold text-navy-900">{form.region}</span> and reply to <span className="font-semibold text-navy-900">{form.email}</span> within two working days.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="mailto:ask@bheuni.io" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[15px] font-semibold text-navy-800 ring-1 ring-slate-200 hover:bg-slate-50 transition"><Icon name="mail" size={17} /> ask@bheuni.io</a>
                  <button onClick={() => { setSent(false); setForm({ agency: '', email: '', region: '', volume: '' }); }}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[15px] font-semibold text-brand-600 hover:bg-brand-50 transition"><Icon name="refresh" size={17} /> Submit another</button>
                </div>
              </div>
            )}
          </div>
        </R3>
      </div>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between mb-1.5">
        <span className="text-[13.5px] font-semibold text-navy-800">{label}</span>
        {error && <span className="text-[12.5px] font-medium text-red-500">{error}</span>}
      </span>
      {children}
    </label>
  );
}
function inputCls(error) {
  return `w-full h-[52px] pl-11 pr-4 rounded-xl bg-slate-50 text-[15px] text-navy-900 placeholder:text-slate-400 ring-1 ring-inset transition outline-none focus:bg-white focus:ring-2 ${error ? 'ring-red-300 focus:ring-red-400' : 'ring-slate-200 focus:ring-brand-400'}`;
}

/* ---------------------- COMPLIANCE + COMMISSION -------------------------- */
function ComplianceCommission() {
  return (
    <section className="bg-slate-50/80 py-12 border-y border-slate-200/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-6">
        <R3>
          <div className="group h-full rounded-[22px] bg-white ring-1 ring-slate-200/70 p-8 lg:p-9 transition-all duration-300 hover:ring-brand-300/70 hover:shadow-[0_26px_55px_-26px_rgba(244,123,32,0.35)] hover:-translate-y-1">
            <span className="grid place-items-center w-[52px] h-[52px] rounded-2xl bg-brand-500 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6"><Icon name="lock" size={24} /></span>
            <h3 className="mt-6 font-display font-semibold text-[22px] text-navy-900">Compliance, quality & student protection</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
              We take student outcomes and data privacy seriously. BHE UNI aligns with GDPR, data-protection principles, and published privacy policies across our platform.
            </p>
            <ul className="mt-6 space-y-3">
              {['Ethical student recruitment practices', 'Accurate information at every stage', 'Responsible handling of student records'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14.5px] font-medium text-navy-800">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-brand-500 text-white shrink-0"><Icon name="check" size={14} /></span>{t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] text-slate-400">Partner access may be reviewed if quality or compliance standards are not met — this protects students, universities, and your reputation.</p>
          </div>
        </R3>
        <R3 delay={120}>
          <div className="group h-full rounded-[22px] bg-navy-950 ring-1 ring-navy-900/10 p-8 lg:p-9 text-white relative overflow-hidden transition-all duration-300 hover:ring-brand-400/40 hover:shadow-[0_26px_55px_-26px_rgba(244,123,32,0.45)] hover:-translate-y-1">
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-brand-500/20 blur-2xl transition-transform duration-700 group-hover:scale-125" />
            <span className="relative grid place-items-center w-[52px] h-[52px] rounded-2xl bg-brand-500 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6"><Icon name="trendingUp" size={24} /></span>
            <h3 className="relative mt-6 font-display font-semibold text-[22px]">Commission & earnings</h3>
            <p className="relative mt-3 text-[15.5px] leading-relaxed text-white/70">
              A transparent, trackable commission model. Terms vary by destination, institution, programme, intake, and partner agreement — so we don't publish fixed percentages.
            </p>
            <div className="relative mt-6 grid sm:grid-cols-2 gap-3">
              {['How commission is calculated', 'Tracking & reconciliation steps', 'When payouts are processed', 'Verification documents needed'].map((t) => (
                <div key={t} className="flex items-start gap-2.5 rounded-xl bg-white/5 ring-1 ring-inset ring-white/10 px-4 py-3 transition-colors duration-300 group-hover:bg-white/[0.07]">
                  <Icon name="check" size={16} className="text-brand-400 shrink-0 mt-0.5" />
                  <span className="text-[13.5px] font-medium text-white/90">{t}</span>
                </div>
              ))}
            </div>
            <p className="relative mt-5 text-[13px] text-white/45">When you apply, our team will walk you through the full commission structure.</p>
          </div>
        </R3>
      </div>
    </section>
  );
}

/* -------------------------------- FAQ ------------------------------------ */
const FAQS = [
  { q: 'How Do I Apply To Become An Agent?', a: 'Use the education agent application form on this page to submit company details, director information, references, and agent verification documents.' },
  { q: 'Do You Work With Individual Counsellors Or Only Companies?', a: 'We can consider both, depending on partner type and verification. Submit the form and we will advise the most suitable onboarding route.' },
  { q: 'Which Destinations Can I Recruit For?', a: 'You can recruit for our targeted destinations: UK, USA, Canada, Australia, Ireland, China, and New Zealand. Availability depends on student profile and intake.' },
  { q: 'Do You Provide Visa Support?', a: 'We provide visa-readiness guidance and checklist support for visa-required routes. For UK routes, we can provide CAS guidance where applicable. Final decisions are made by relevant authorities.' },
  { q: 'How Do I Track My Students?', a: 'Approved partners use the agent portal with application tracking and structured stages to keep pipelines organised and reduce repeated follow-ups.' },
  { q: 'Is There A Minimum Number Of Students Required?', a: 'Requirements vary by partner type. If you are new, we focus on quality, process, and compliance first.' },
  { q: 'How Long Does Approval Take?', a: 'Approval times vary depending on how quickly verification documents are completed. Submitting complete information helps speed up review.' },
  { q: 'Do You Provide Training?', a: 'Yes — approved partners can receive partner training and updates to support counselling quality and consistent processes.' },
];

function FAQ() {
  const [open, setOpen] = useStateS3(0);
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <R3>
          <h2 className="font-display font-semibold tracking-tight text-navy-900 text-[clamp(1.9rem,3.6vw,2.7rem)] leading-[1.1]">FAQs</h2>
        </R3>
        <div className="mt-10 space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <R3 key={i} delay={Math.min(i, 4) * 60}>
                <div className={`rounded-[18px] transition-all duration-300 ${isOpen ? 'bg-gradient-to-br from-white via-white to-slate-50/60 ring-1 ring-slate-200/60 shadow-[0_22px_55px_-28px_rgba(10,26,51,0.28)]' : 'bg-white ring-1 ring-slate-200/80 hover:ring-slate-300'}`}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} className="group w-full flex items-center gap-4 sm:gap-5 text-left px-5 sm:px-7 py-5">
                    <span className={`grid place-items-center w-11 h-11 rounded-full shrink-0 font-display font-semibold text-[15px] text-navy-900 transition-all duration-300 ${isOpen ? 'bg-white ring-1 ring-slate-200/80 shadow-[0_5px_14px_-4px_rgba(10,26,51,0.18)]' : 'bg-gradient-to-br from-sky-50 via-white to-brand-50 ring-1 ring-slate-200/70'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-display font-semibold text-[16px] sm:text-[17px] text-navy-900">{f.q}</span>
                    <span className="shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-110">
                      <Icon name={isOpen ? 'minus' : 'plus'} size={22} strokeWidth={2.5} />
                    </span>
                  </button>
                  <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                    <div className="overflow-hidden">
                      <p className="pl-5 sm:pl-[76px] pr-5 sm:pr-16 pb-6 -mt-1 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-500">{f.a}</p>
                    </div>
                  </div>
                </div>
              </R3>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- FOOTER ---------------------------------- */
/* ----------------------- CTA BAND (apply) -------------------------------- */
function CtaBand({ onApply }) {
  return (
    <section className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="font-display font-semibold tracking-tight text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.08]">
              Apply to become an agent
            </h2>
            <p className="mt-4 max-w-lg text-[16.5px] text-white/65">Ready to join BHE UNI? Complete the form and our team will contact you with next steps.</p>
            <div className="mt-7">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-brand-400">Recommended form guidance</p>
              <ul className="mt-4 space-y-3">
                {[
                  'Please enter details exactly as shown on registration documents',
                  'Upload clear scans of verification documents to avoid delays',
                  'We may contact references as part of review',
                ].map((g) => (
                  <li key={g} className="flex items-start gap-3 text-[15px] leading-snug text-white/80">
                    <span className="grid place-items-center w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 shrink-0 mt-0.5"><Icon name="check" size={13} /></span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={onApply}
                    className="mt-9 inline-flex items-center justify-center px-8 py-3.5 rounded-full text-[16px] font-semibold text-white bg-gradient-to-r from-[#f7a823] to-[#f47b20] shadow-[0_14px_34px_-12px_rgba(244,123,32,0.6)] hover:shadow-[0_18px_40px_-10px_rgba(244,123,32,0.8)] hover:-translate-y-0.5 transition-all">
              Apply to Become an Agent
            </button>
          </div>
          <div className="lg:justify-self-end w-full max-w-sm rounded-[22px] bg-white/[0.04] ring-1 ring-inset ring-white/10 p-7">
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-500/15 text-brand-400 ring-1 ring-brand-400/20"><Icon name="messageSquare" size={22} /></span>
            <h3 className="mt-5 font-display font-semibold text-[20px] text-white">Prefer to talk first?</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">Speak to our B2B team about how the partnership works before you apply.</p>
            <a href="mailto:ask@bheuni.io" className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-white hover:text-brand-300 transition">
              <Icon name="mail" size={17} className="text-brand-400" /> ask@bheuni.io
            </a>
          </div>
      </div>
    </section>
  );
}

/* ------------------------------- FOOTER ---------------------------------- */
function NextStep({ onApply }) {
  const opts = [
    { icon: 'badgeCheck', label: 'Apply to become an agent', primary: true, onClick: onApply },
    { icon: 'messageSquare', label: 'Speak to B2B support', href: 'mailto:ask@bheuni.io' },
    { icon: 'mail', label: 'Email B2B support', href: 'mailto:ask@bheuni.io' },
    { icon: 'phone', label: 'Call us', href: 'tel:+442033189380' },
  ];
  return (
    <section className="bg-slate-50/80 border-t border-slate-200/70 py-12">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <R3>
          <h2 className="font-display font-semibold tracking-tight text-navy-900 text-[clamp(1.9rem,3.6vw,2.7rem)] leading-[1.1]">Next step</h2>
          <p className="mt-4 text-[17px] text-slate-600">Choose the fastest option for your team:</p>
        </R3>
        <R3 delay={100}>
          <div className="mt-9 flex flex-wrap md:flex-nowrap justify-center gap-3">
            {opts.map((o) => {
              const base = 'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14.5px] font-semibold whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5';
              const inner = (
                <React.Fragment>
                  <Icon name={o.icon} size={18} className={o.primary ? 'text-white' : 'text-brand-500'} />
                  {o.label}
                </React.Fragment>
              );
              return o.primary ? (
                <button key={o.label} onClick={o.onClick}
                        className={`${base} text-white bg-gradient-to-r from-[#f7a823] to-[#f47b20] shadow-[0_14px_30px_-12px_rgba(244,123,32,0.6)] hover:shadow-[0_18px_38px_-10px_rgba(244,123,32,0.85)]`}>
                  {inner}
                </button>
              ) : (
                <a key={o.label} href={o.href}
                   className={`${base} text-navy-800 bg-white ring-1 ring-slate-200 hover:ring-brand-300/70 hover:text-brand-600 hover:shadow-[0_14px_30px_-16px_rgba(244,123,32,0.4)]`}>
                  {inner}
                </a>
              );
            })}
          </div>
        </R3>
        <R3 delay={180}>
          <div className="mt-10 inline-flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-3">
            <a href="mailto:ask@bheuni.io" className="inline-flex items-center gap-2 text-[15px] font-medium text-navy-800 hover:text-brand-600 transition">
              <Icon name="mail" size={17} className="text-brand-500" /> ask@bheuni.io
            </a>
            <span className="hidden sm:block w-px h-4 bg-slate-300" />
            <a href="tel:+442033189380" className="inline-flex items-center gap-2 text-[15px] font-medium text-navy-800 hover:text-brand-600 transition">
              <Icon name="phone" size={17} className="text-brand-500" /> +44 (0) 20 3318 9380
            </a>
          </div>
          <p className="mt-5 inline-flex items-center justify-center gap-2 text-[14.5px] text-slate-500">
            <Icon name="mapPin" size={16} className="text-brand-500 shrink-0" />
            For in-person support, visit our London or Manchester offices.
          </p>
        </R3>
      </div>
    </section>
  );
}

/* filled brand glyphs */
const SOCIAL = {
  facebook: 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6 4.39 10.97 10.13 11.85v-8.38H7.08v-3.47h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.47h-2.8v8.38C19.61 23.04 24 18.07 24 12.07z',
  linkedin: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45C23.2 24 24 23.22 24 22.27V1.73C24 .77 23.2 0 22.22 0z',
  youtube: 'M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12z',
  instagram: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.86 5.86 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
  whatsapp: 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12 0a12 12 0 0 0-10.3 18.07L0 24l6.07-1.59A12 12 0 1 0 12 0zm0 21.82a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.6.94.96-3.51-.23-.36A9.82 9.82 0 1 1 12 21.82z',
  tiktok: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .58.05.86.13V9.4a6.33 6.33 0 0 0-1-.05A6.34 6.34 0 0 0 5.6 20.87a6.34 6.34 0 0 0 10.86-4.43V8.5a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.64-.02z',
  x: 'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93zM17.61 20.64h2.04L6.49 3.24H4.3z',
};
function SocialIcon({ name, size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={SOCIAL[name]} />
    </svg>
  );
}

function StoreBadge({ kind }) {
  const apple = (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.05 12.04c-.03-2.5 2.04-3.7 2.13-3.76-1.16-1.7-2.97-1.93-3.61-1.96-1.54-.16-3 .9-3.78.9-.78 0-1.97-.88-3.24-.86-1.67.02-3.21.97-4.07 2.46-1.73 3-.44 7.45 1.24 9.89.82 1.19 1.8 2.53 3.08 2.48 1.24-.05 1.71-.8 3.2-.8 1.5 0 1.92.8 3.23.77 1.33-.02 2.18-1.21 3-2.41.94-1.38 1.33-2.72 1.35-2.79-.03-.01-2.6-1-2.63-3.95zM14.6 4.7c.68-.83 1.14-1.98 1.01-3.13-.98.04-2.17.65-2.88 1.48-.63.73-1.19 1.9-1.04 3.02 1.1.09 2.22-.55 2.91-1.37z"/></svg>
  );
  const play = (
    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M3.5 2.2c-.3.2-.5.6-.5 1.1v17.4c0 .5.2.9.5 1.1l9.3-9.8z" fill="#34d399"/><path d="M16.4 8.5 13 12l3.4 3.5 4-2.3c.7-.4.7-1.5 0-1.9z" fill="#fbbf24"/><path d="M3.5 2.2 12.8 12l3.6-3.5L5.4 1.7c-.7-.4-1.4-.1-1.9.5z" fill="#60a5fa"/><path d="M3.5 21.8 12.8 12l3.6 3.5L5.4 22.3c-.7.4-1.4.1-1.9-.5z" fill="#f87171"/></svg>
  );
  return (
    <a href="#top" className="inline-flex items-center gap-2.5 rounded-xl bg-white/5 ring-1 ring-inset ring-white/15 px-4 py-2.5 hover:bg-white/10 transition">
      <span className="text-white">{kind === 'apple' ? apple : play}</span>
      <span className="text-left leading-none">
        <span className="block text-[9px] uppercase tracking-wide text-white/55">{kind === 'apple' ? 'Download on the' : 'Get it on'}</span>
        <span className="block text-[15px] font-semibold text-white mt-0.5">{kind === 'apple' ? 'App Store' : 'Google Play'}</span>
      </span>
    </a>
  );
}

function Office({ city, address, phone, email }) {
  return (
    <div>
      <h4 className="font-display font-semibold text-[18px] text-brand-500">{city}</h4>
      <p className="mt-3 text-[13.5px] leading-relaxed text-white/65"><span className="font-semibold text-white/90">Address:</span> {address}</p>
      <p className="mt-3 text-[13.5px] text-white/65"><span className="font-semibold text-white/90">Phone:</span> {phone}</p>
      <p className="mt-2.5 text-[13.5px] text-white/65"><span className="font-semibold text-white/90">Email:</span> <a href={`mailto:${email}`} className="hover:text-brand-400 transition">{email}</a></p>
    </div>
  );
}

function Footer({ onApply }) {
  const socials = ['facebook', 'linkedin', 'youtube', 'instagram', 'whatsapp', 'tiktok', 'x'];
  const cols = [
    { title: 'Student Services', links: ['Free Consultation', 'Study Abroad Destinations', 'Education Consultancy Services', 'Scholarships', 'Student Reviews', 'Accommodation'] },
    { title: 'About & Resources', links: ['Who We Are', 'About Us', 'Study Abroad', 'Blog', 'Resources', 'Contact Us'] },
    { title: 'Partners & Support', links: ['Refer a Friend & Family', 'Become an Agent', 'Agent / Staff Login', 'Support', 'Privacy Policy', 'Terms & Conditions'] },
  ];
  const offices = [
    { city: 'London', address: '11 Beaufort Court, Admirals Way, Canary Wharf, London, E14 9XL', phone: '+44 (0) 20 3318 9380', email: 'ask@bheuni.io' },
    { city: 'Manchester', address: '3rd Floor, Pleer House, 1 Fennel St, Manchester, M4 3DU', phone: '+44 (0) 7305 314412', email: 'ask@bheuni.io' },
    { city: 'Milton Keynes', address: 'Unit 23B, Lloyds Court, 33 North 10th Street, Milton Keynes, Buckinghamshire, MK9 3EH', phone: '+44 7359 323132', email: 'ask@bheuni.io' },
    { city: 'Dhaka', address: '4th Floor, Cube Holdings Plot 07, Road 17, Block D Banani, Dhaka 1213, Bangladesh', phone: '+88 0140 709 3812', email: 'ask@bheuni.io' },
    { city: 'Badda', address: '14 Floor, Tropical Molla Tower, 15/1-4 Bir Uttam Rafiqul Islam Ave, Middle Badda, Dhaka, Bangladesh', phone: '+88 0140 709 3812', email: 'ask@bheuni.io' },
    { city: 'Sylhet', address: 'Suite 914, 9th Floor, Al Hamra Shopping City Zindabazar, Sylhet', phone: '+88 0140 709 3816', email: 'ask@bheuni.io' },
  ];
  return (
    <footer className="bg-navy-950 text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-12">
        {/* top: about + link columns */}
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          <div>
            <h4 className="font-display font-semibold text-[19px] text-brand-500">About BHE UNI</h4>
            <p className="mt-5 text-[14px] leading-relaxed text-white/65 max-w-sm">
              BHE UNI is a trusted education consultancy supporting international, EU, and UK Home students with course selection, university admissions, scholarships, and visa-ready documentation where applicable. With offices in Bangladesh and the UK, we provide local expertise with global reach.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a key={s} href="#top" aria-label={s}
                   className="grid place-items-center w-9 h-9 rounded-full ring-1 ring-brand-500/40 text-brand-500 hover:bg-brand-500 hover:text-white hover:ring-brand-500 transition-colors">
                  <SocialIcon name={s} size={15} />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display font-semibold text-[19px] text-brand-500">{c.title}</h4>
              <ul className="mt-5 space-y-3.5">
                {c.links.map((l) => (
                  <li key={l}><a href="#top" className="text-[14.5px] text-white/75 hover:text-brand-400 hover:pl-1 transition-all">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* divider */}
        <div className="my-12 h-px bg-white/10" />

        {/* offices */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {offices.map((o) => <Office key={o.city} {...o} />)}
        </div>

        {/* logo + app badges */}
        <div className="mt-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <img src={(window.__resources && window.__resources.logoWhite) || 'assets/bhe-uni-logo-white.png'} alt="BHE UNI" className="h-12 w-auto" />
          <div className="flex items-center gap-3">
            <StoreBadge kind="apple" />
            <StoreBadge kind="play" />
          </div>
        </div>
      </div>

      {/* copyright bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex items-center justify-center gap-4 text-[13px] text-white/45">
          <p>Copyright © {new Date().getFullYear()} <span className="text-brand-500 font-semibold">BHE UNI</span></p>
          <span className="inline-flex items-center overflow-hidden rounded-[5px] ring-1 ring-white/15 text-[10px] font-bold">
            <span className="bg-white/10 text-white px-2 py-1 tracking-wide">DMCA</span>
            <span className="bg-emerald-500/90 text-white px-2 py-1 tracking-wide">PROTECTED</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { LeadSection, ComplianceCommission, CtaBand, FAQ, NextStep, Footer });
