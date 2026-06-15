/* Nav header + 3 hero variations */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

const DESTINATIONS = [
  { code: 'UK', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'IE', name: 'Ireland' },
  { code: 'CN', name: 'China' },
  { code: 'NZ', name: 'New Zealand' },
];

/* ---------------------------------- NAV ---------------------------------- */
function Nav({ onApply }) {
  const [scrolled, setScrolled] = useStateH(false);
  const [menuOpen, setMenuOpen] = useStateH(false);
  const [portalOpen, setPortalOpen] = useStateH(false);
  const [authMode, setAuthMode] = useStateH(null); // null | 'signin' | 'signup'
  const portalRef = useRefH(null);
  useEffectH(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffectH(() => {
    if (!portalOpen) return;
    const onDown = (e) => { if (portalRef.current && !portalRef.current.contains(e.target)) setPortalOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setPortalOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [portalOpen]);
  const openAuth = (mode) => { setPortalOpen(false); setMenuOpen(false); setAuthMode(mode); };
  const links = [
    { label: 'Home', active: true },
    { label: 'About Us', caret: true },
    { label: 'Study Abroad', caret: true },
    { label: 'Scholarships', caret: true },
    { label: 'Services', caret: true },
    { label: 'Resources', caret: true },
    { label: 'Locations', caret: true },
    { label: 'Contact Us' },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 border-slate-200/80 shadow-[0_4px_30px_-12px_rgba(10,26,51,0.18)]' : 'bg-white/70 border-white/40'} backdrop-blur-xl border-b`}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <a href="#top" className="flex items-center shrink-0">
            <img src={(window.__resources && window.__resources.logo) || 'assets/bhe-uni-logo.png'} alt="BHE UNI" className="h-9 w-auto" />
          </a>
          <nav className="hidden xl:flex items-center gap-0.5">
            {links.map((l) => (
              <a key={l.label} href="#top"
                 className={`group relative flex items-center gap-1 px-3.5 py-2 text-[15px] rounded-lg transition-colors whitespace-nowrap ${l.active ? 'text-brand-600 font-semibold' : 'text-navy-800/85 font-medium hover:text-navy-900'}`}>
                {l.label}
                {l.caret && <Icon name="chevronDown" size={15} className="text-current opacity-70 transition-transform group-hover:translate-y-0.5" />}
                {l.active && <span className="absolute left-3.5 right-3.5 -bottom-[19px] h-[3px] rounded-full bg-brand-500" />}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1 rounded-full ring-1 ring-navy-900/15 px-1.5 py-1.5">
              <button aria-label="Search" className="grid place-items-center w-9 h-9 rounded-full text-navy-800 hover:bg-navy-900/[0.06] hover:text-brand-600 transition-colors">
                <Icon name="search" size={19} />
              </button>
              <button onClick={onApply} aria-label="Apply" className="grid place-items-center w-9 h-9 rounded-full text-navy-800 hover:bg-navy-900/[0.06] hover:text-brand-600 transition-colors">
                <Icon name="fileApply" size={19} />
              </button>
              <div ref={portalRef} className="relative">
                <button onClick={() => setPortalOpen((v) => !v)} aria-label="Account"
                        className={`grid place-items-center w-9 h-9 rounded-full transition-colors ${portalOpen ? 'bg-brand-500 text-white' : 'text-navy-800 hover:bg-navy-900/[0.06] hover:text-brand-600'}`}>
                  <Icon name="user" size={19} />
                </button>
                <StudentPortalPopup open={portalOpen} onSignIn={() => openAuth('signin')} onSignUp={() => openAuth('signup')} />
              </div>
            </div>
            <button onClick={() => setMenuOpen((v) => !v)} className="xl:hidden p-2 -mr-2 text-navy-900">
              <Icon name={menuOpen ? 'x' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white/97 backdrop-blur-xl px-5 py-3">
          {links.map((l) => (
            <a key={l.label} href="#top" onClick={() => setMenuOpen(false)}
               className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${l.active ? 'text-brand-600 bg-brand-50' : 'text-navy-800'}`}>
              {l.label}
              {l.caret && <Icon name="chevronDown" size={17} className="opacity-60" />}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-3 mt-2 border-t border-slate-100">
            <button aria-label="Search" className="grid place-items-center w-11 h-11 rounded-full ring-1 ring-navy-900/15 text-navy-800"><Icon name="search" size={19} /></button>
            <button onClick={() => { setMenuOpen(false); onApply(); }} aria-label="Apply" className="grid place-items-center w-11 h-11 rounded-full ring-1 ring-navy-900/15 text-navy-800"><Icon name="fileApply" size={19} /></button>
            <button onClick={() => openAuth('signin')} aria-label="Account" className="grid place-items-center w-11 h-11 rounded-full ring-1 ring-navy-900/15 text-navy-800"><Icon name="user" size={19} /></button>
          </div>
          <div className="flex gap-2.5 pt-3 mt-3 border-t border-slate-100">
            <button onClick={() => openAuth('signin')} className="flex-1 py-2.5 rounded-full text-[15px] font-semibold text-navy-800 ring-1 ring-navy-900/15">Sign in</button>
            <button onClick={() => openAuth('signup')} className="flex-1 py-2.5 rounded-full text-[15px] font-semibold text-white bg-gradient-to-r from-[#f7a823] to-[#f47b20]">Sign up</button>
          </div>
        </div>
      )}
      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onSwitch={setAuthMode} />
    </header>
  );
}

/* ----------------------- STUDENT PORTAL POPUP ---------------------------- */
function PortalArt() {
  return (
    <div className="relative grid place-items-center w-[88px] h-[88px] rounded-full bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] ring-1 ring-indigo-100 shrink-0 overflow-hidden">
      <div className="absolute -right-1 top-3 w-8 h-8 rounded-lg bg-brand-100 rotate-12" />
      <svg viewBox="0 0 64 64" className="relative w-[58px] h-[58px]" fill="none">
        {/* grad cap */}
        <path d="M32 12 8 21l24 9 24-9-24-9z" fill="#1f3a8a" />
        <path d="M18 27v9c0 3 6.3 5.5 14 5.5S46 39 46 36v-9l-14 5.2L18 27z" fill="#2a55cf" />
        <path d="M56 21v10" stroke="#1f3a8a" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="56" cy="33" r="2.4" fill="#f47b20" />
        {/* face */}
        <circle cx="32" cy="46" r="10" fill="#fcd9bd" />
        <path d="M22 56a10 10 0 0 1 20 0z" fill="#f47b20" />
      </svg>
    </div>
  );
}

function StudentPortalPopup({ open, onSignIn, onSignUp }) {
  return (
    <div className={`absolute right-0 top-[calc(100%+14px)] w-[380px] origin-top-right transition-all duration-200 ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
      {/* arrow */}
      <div className="absolute -top-1.5 right-7 w-3 h-3 rotate-45 bg-white ring-1 ring-slate-200/70 border-b-0 border-r-0" />
      <div className="relative rounded-[20px] bg-white ring-1 ring-slate-200/70 shadow-[0_30px_70px_-24px_rgba(10,26,51,0.4)] p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-[21px] text-navy-900">Student Portal</h3>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-500">
              Login or Sign up to access the <span className="font-semibold text-brand-600">BHE Uni</span> student portal
            </p>
          </div>
          <PortalArt />
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={onSignIn}
                  className="flex-1 py-3 rounded-full text-[15px] font-semibold text-navy-800 ring-1 ring-navy-900/15 hover:ring-navy-900/30 hover:bg-navy-900/[0.03] transition">
            Sign in
          </button>
          <button onClick={onSignUp}
                  className="flex-1 py-3 rounded-full text-[15px] font-semibold text-white bg-gradient-to-r from-[#f7a823] to-[#f47b20] shadow-[0_12px_26px_-10px_rgba(244,123,32,0.7)] hover:-translate-y-0.5 transition-all">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- AUTH MODAL ---------------------------------- */
function AuthModal({ mode, onClose, onSwitch }) {
  const [show, setShow] = useStateH(false);
  const [data, setData] = useStateH({ name: '', email: '', password: '' });
  const [done, setDone] = useStateH(false);
  useEffectH(() => {
    if (mode) { setShow(true); setDone(false); setData({ name: '', email: '', password: '' }); }
  }, [mode]);
  useEffectH(() => {
    const onKey = (e) => { if (e.key === 'Escape' && mode) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mode]);
  if (!mode) return null;
  const isSignup = mode === 'signup';
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setDone(true); };
  return (
    <div className={`fixed inset-0 z-[80] flex items-center justify-center p-4 transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-navy-950/55 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-[440px] rounded-[24px] bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200 ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'}`}>
        {/* brand header */}
        <div className="relative px-7 pt-7 pb-6 bg-gradient-to-br from-[#1c3f9e] via-[#2a55cf] to-[#3f74e8] text-white overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid place-items-center w-9 h-9 rounded-full text-white/80 hover:bg-white/15 transition">
            <Icon name="x" size={19} />
          </button>
          <div className="relative flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-white/70">
            <Icon name="gradCap" size={16} /> BHE UNI Student Portal
          </div>
          <h3 className="relative mt-3 font-display font-semibold text-[26px] leading-tight">
            {done ? (isSignup ? 'Account created' : 'Welcome back') : (isSignup ? 'Create your account' : 'Sign in to your account')}
          </h3>
          <p className="relative mt-1.5 text-[14px] text-white/70">
            {done ? 'You are all set to access the portal.' : (isSignup ? 'Start your study-abroad journey with BHE UNI.' : 'Access applications, tracking and resources.')}
          </p>
        </div>

        {done ? (
          <div className="px-7 py-9 text-center">
            <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-teal-50 text-teal-600 ring-8 ring-teal-50/60"><Icon name="checkCircle" size={34} /></span>
            <p className="mt-5 text-[15px] text-slate-600">
              {isSignup ? <React.Fragment>Welcome aboard, <span className="font-semibold text-navy-900">{data.name || 'student'}</span>! Check <span className="font-semibold text-navy-900">{data.email}</span> to verify your account.</React.Fragment>
                        : <React.Fragment>Signed in as <span className="font-semibold text-navy-900">{data.email}</span>.</React.Fragment>}
            </p>
            <button onClick={onClose} className="mt-6 w-full py-3.5 rounded-full text-[15px] font-semibold text-white bg-gradient-to-r from-[#f7a823] to-[#f47b20] hover:-translate-y-0.5 transition-all">Continue to portal</button>
          </div>
        ) : (
          <form onSubmit={submit} className="px-7 py-6">
            {/* social */}
            <button type="button" className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl ring-1 ring-slate-200 text-[14.5px] font-semibold text-navy-800 hover:bg-slate-50 transition">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.97 10.97 0 0 0 12 1 11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"/></svg>
              Continue with Google
            </button>
            <div className="flex items-center gap-3 my-5">
              <span className="flex-1 h-px bg-slate-200" />
              <span className="text-[12px] font-medium text-slate-400">or</span>
              <span className="flex-1 h-px bg-slate-200" />
            </div>

            {isSignup && (
              <label className="block mb-4">
                <span className="block mb-1.5 text-[13.5px] font-semibold text-navy-800">Full name</span>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="user" size={18} /></span>
                  <input value={data.name} onChange={set('name')} required placeholder="Jordan Ahmed"
                         className="w-full h-[50px] pl-11 pr-4 rounded-xl bg-slate-50 text-[15px] text-navy-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-brand-400 transition" />
                </div>
              </label>
            )}
            <label className="block mb-4">
              <span className="block mb-1.5 text-[13.5px] font-semibold text-navy-800">Email address</span>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="mail" size={18} /></span>
                <input type="email" value={data.email} onChange={set('email')} required placeholder="you@email.com"
                       className="w-full h-[50px] pl-11 pr-4 rounded-xl bg-slate-50 text-[15px] text-navy-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-brand-400 transition" />
              </div>
            </label>
            <label className="block">
              <span className="flex items-center justify-between mb-1.5">
                <span className="text-[13.5px] font-semibold text-navy-800">Password</span>
                {!isSignup && <a href="#top" onClick={(e) => e.preventDefault()} className="text-[13px] font-semibold text-brand-600 hover:text-brand-700">Forgot?</a>}
              </span>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="lock" size={18} /></span>
                <input type="password" value={data.password} onChange={set('password')} required placeholder="••••••••"
                       className="w-full h-[50px] pl-11 pr-4 rounded-xl bg-slate-50 text-[15px] text-navy-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-brand-400 transition" />
              </div>
            </label>

            <button type="submit" className="mt-6 w-full py-3.5 rounded-full text-[15.5px] font-semibold text-white bg-gradient-to-r from-[#f7a823] to-[#f47b20] shadow-[0_14px_30px_-12px_rgba(244,123,32,0.7)] hover:-translate-y-0.5 transition-all">
              {isSignup ? 'Create account' : 'Sign in'}
            </button>
            <p className="mt-5 text-center text-[14px] text-slate-500">
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <button type="button" onClick={() => onSwitch(isSignup ? 'signin' : 'signup')} className="font-semibold text-brand-600 hover:text-brand-700">
                {isSignup ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* --------------------------- shared hero pieces -------------------------- */
function HeroCTAs({ onApply, light }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3.5">
      <button onClick={onApply}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[14px] text-[16px] font-semibold text-white bg-brand-500 hover:bg-brand-600 shadow-[0_16px_40px_-12px_rgba(244,123,32,0.65)] hover:shadow-[0_20px_46px_-10px_rgba(244,123,32,0.8)] hover:-translate-y-0.5 transition-all">
        Apply as an Agent
        <Icon name="arrowRight" size={19} className="transition-transform group-hover:translate-x-1" />
      </button>
      <a href="#process" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[14px] text-[16px] font-semibold text-white ring-1 ring-inset ring-white/25 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition">
        <Icon name="messageSquare" size={18} /> Speak to B2B Support
      </a>
    </div>
  );
}

function TrustRow() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
      {[
        { icon: 'clock', t: '14+ years' },
        { icon: 'users', t: '60+ agents globally' },
        { icon: 'shieldCheck', t: 'GDPR-aligned' },
      ].map((x) => (
        <div key={x.t} className="flex items-center gap-2 text-white/70 text-[14px] font-medium">
          <Icon name={x.icon} size={16} className="text-teal-400" /> {x.t}
        </div>
      ))}
    </div>
  );
}

function GlassPill() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 ring-1 ring-inset ring-white/20 backdrop-blur-md pl-2 pr-4 py-1.5 mb-7">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/90 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-wide text-white whitespace-nowrap">
        <Icon name="sparkles" size={13} /> B2B Partner
      </span>
      <span className="text-[14px] font-medium text-white/85 whitespace-nowrap">UK-registered EdTech recruitment platform</span>
    </div>
  );
}

/* --------------------------- abstract orbit art -------------------------- */
function OrbitArt() {
  const nodes = [
    { d: DESTINATIONS[0], a: -90, r: 1 }, { d: DESTINATIONS[1], a: -25, r: 1 },
    { d: DESTINATIONS[2], a: 35, r: 1 }, { d: DESTINATIONS[3], a: 95, r: 1 },
    { d: DESTINATIONS[4], a: 155, r: 1 }, { d: DESTINATIONS[5], a: 200, r: 1 },
    { d: DESTINATIONS[6], a: 250, r: 1 },
  ];
  const R = 41; // percent radius
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto">
      {/* glow */}
      <div className="absolute inset-[12%] rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute inset-[26%] rounded-full bg-brand-500/20 blur-2xl" />
      {/* rotating rings */}
      <div className="absolute inset-0 animate-[spin_38s_linear_infinite]">
        <div className="absolute inset-[8%] rounded-full border border-dashed border-white/15" />
      </div>
      <div className="absolute inset-[20%] rounded-full border border-white/10 animate-[spin_28s_linear_infinite_reverse]" />
      <div className="absolute inset-[33%] rounded-full border border-white/[0.07]" />
      {/* connecting lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
        {nodes.map((n, i) => {
          const x = 50 + R * Math.cos((n.a * Math.PI) / 180);
          const y = 50 + R * Math.sin((n.a * Math.PI) / 180);
          return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="url(#lg)" strokeWidth="0.4" />;
        })}
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2dd4bf" stopOpacity="0.7" />
            <stop offset="1" stopColor="#2dd4bf" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
      {/* center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26%] aspect-square rounded-full bg-gradient-to-br from-navy-700 to-navy-900 ring-1 ring-white/15 shadow-2xl grid place-items-center">
        <div className="text-center">
          <Icon name="globe" size={34} className="text-teal-300 mx-auto" strokeWidth={1.5} />
          <div className="mt-1 text-[11px] font-semibold tracking-wide text-white/80">7 NATIONS</div>
        </div>
      </div>
      {/* nodes */}
      {nodes.map((n, i) => {
        const x = 50 + R * Math.cos((n.a * Math.PI) / 180);
        const y = 50 + R * Math.sin((n.a * Math.PI) / 180);
        return (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 animate-[float_var(--d)_ease-in-out_infinite]"
               style={{ left: `${x}%`, top: `${y}%`, '--d': `${4 + i * 0.4}s` }}>
            <div className="flex items-center gap-1.5 rounded-full bg-white/10 ring-1 ring-inset ring-white/20 backdrop-blur-md pl-1.5 pr-3 py-1.5 shadow-lg">
              <span className="grid place-items-center w-6 h-6 rounded-full bg-navy-900 text-[10px] font-semibold text-teal-300">{n.d.code}</span>
              <span className="text-[12px] font-semibold text-white whitespace-nowrap">{n.d.name}</span>
            </div>
          </div>
        );
      })}
      {/* floating stat chip */}
      <div className="absolute -left-2 bottom-[14%] rounded-2xl bg-white/10 ring-1 ring-inset ring-white/20 backdrop-blur-xl px-4 py-3 shadow-xl animate-[float_5s_ease-in-out_infinite]">
        <div className="text-2xl font-display font-semibold text-white">3,000<span className="text-brand-400">+</span></div>
        <div className="text-[11px] font-medium text-white/70">students served</div>
      </div>
    </div>
  );
}

/* ---------------------------- portal preview ----------------------------- */
function PortalPreview() {
  const stages = [
    { label: 'Shortlist', n: 18, c: 'bg-slate-400' },
    { label: 'Submitted', n: 11, c: 'bg-teal-500' },
    { label: 'Decision', n: 7, c: 'bg-brand-500' },
  ];
  const rows = [
    { n: 'A. Rahman', dest: 'UK', st: 'CAS issued', tone: 'text-teal-600 bg-teal-50' },
    { n: 'M. Chen', dest: 'CA', st: 'In review', tone: 'text-amber-600 bg-amber-50' },
    { n: 'S. Okafor', dest: 'AU', st: 'Offer', tone: 'text-brand-600 bg-brand-50' },
  ];
  return (
    <div className="relative w-full max-w-[540px] mx-auto [perspective:1600px]">
      <div className="absolute -inset-8 bg-teal-500/15 blur-3xl rounded-full" />
      <div className="relative rounded-2xl bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)] ring-1 ring-black/5 overflow-hidden [transform:rotateY(-9deg)rotateX(4deg)]">
        {/* window bar */}
        <div className="flex items-center gap-2 px-4 h-10 bg-slate-50 border-b border-slate-100">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="ml-3 text-[11px] font-medium text-slate-400">portal.bheuni.io / pipeline</span>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[12px] text-slate-400 font-medium">Agent Dashboard</div>
              <div className="text-[17px] font-display font-semibold text-navy-900">My Pipeline</div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" /> Live tracking
            </span>
          </div>
          {/* stage bars */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {stages.map((s) => (
              <div key={s.label} className="rounded-xl bg-slate-50 ring-1 ring-slate-100 p-3">
                <div className="text-2xl font-display font-semibold text-navy-900">{s.n}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${s.c}`} />
                  <span className="text-[11px] font-medium text-slate-500">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
          {/* rows */}
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.n} className="flex items-center justify-between rounded-xl ring-1 ring-slate-100 px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-navy-900 text-[10px] font-semibold text-white">{r.dest}</span>
                  <span className="text-[13px] font-semibold text-navy-800">{r.n}</span>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-1 rounded-md ${r.tone}`}>{r.st}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* floating commission card */}
      <div className="absolute -right-3 -bottom-5 rounded-2xl bg-navy-900 text-white px-4 py-3 shadow-2xl ring-1 ring-white/10 animate-[float_5s_ease-in-out_infinite]">
        <div className="flex items-center gap-2 text-[11px] text-white/60 font-medium"><Icon name="trendingUp" size={14} className="text-teal-300" /> Commission this intake</div>
        <div className="text-xl font-display font-semibold mt-0.5">Transparent · Tracked</div>
      </div>
    </div>
  );
}

/* -------------------------------- HEROES --------------------------------- */
function HeroNetwork({ onApply }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-28 pb-12 lg:pt-32">
      <HeroBg />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center">
        <div>
          <GlassPill />
          <h1 className="font-display font-semibold tracking-tight text-white text-[clamp(2.6rem,5.4vw,4.2rem)] leading-[1.04]">
            Partner with Us to<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-300">Shape Global Futures</span>
          </h1>
          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/75">
            Grow your recruitment business with a tech-enabled education agent partnership built around speed, clarity, and trust — backed by an agent portal, real-time application tracking, and dedicated adviser support.
          </p>
          <div className="mt-8"><HeroCTAs onApply={onApply} /></div>
          <div className="mt-7"><TrustRow /></div>
        </div>
        <OrbitArt />
      </div>
    </section>
  );
}

function HeroPortal({ onApply }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-28 pb-12 lg:pt-32">
      <HeroBg />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
        <div>
          <GlassPill />
          <h1 className="font-display font-semibold tracking-tight text-white text-[clamp(2.6rem,5.4vw,4.2rem)] leading-[1.04]">
            Recruit smarter with a <span className="text-teal-400">real-time</span> agent portal
          </h1>
          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/75">
            Partner with BHE UNI to shape global futures. Submit applications, track every case from shortlist to decision, and manage your entire pipeline in one organised CRM-powered system.
          </p>
          <div className="mt-8"><HeroCTAs onApply={onApply} /></div>
          <div className="mt-7"><TrustRow /></div>
        </div>
        <PortalPreview />
      </div>
    </section>
  );
}

function HeroEditorial({ onApply }) {
  const stats = [
    { v: '14+', l: 'Years of experience' },
    { v: '60+', l: 'Agents globally' },
    { v: '3,000+', l: 'Students served' },
    { v: '7', l: 'Study destinations' },
  ];
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-28 pb-12 lg:pt-32 text-center">
      <HeroBg editorial />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex justify-center"><GlassPill /></div>
        <h1 className="font-display font-semibold tracking-tight text-white text-[clamp(2.8rem,7vw,5.4rem)] leading-[1.02]">
          Become an Agent<br />Partner with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-300 to-teal-300">BHE UNI</span>
        </h1>
        <p className="mt-7 max-w-2xl mx-auto text-[18px] leading-relaxed text-white/75">
          Grow your recruitment business with a tech-enabled education agent partnership built around speed, clarity, and trust. BHE UNI supports agents with an agent portal, application tracking, and adviser support for student applications to our targeted destinations.
        </p>
        <p className="mt-3 max-w-xl mx-auto text-[14.5px] text-white/55">
          Targeted destinations: UK, USA, Canada, Australia, Ireland, China &amp; New Zealand.
        </p>
        <div className="mt-9 flex justify-center"><HeroCTAs onApply={onApply} /></div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/10">
          {stats.map((s) => (
            <div key={s.l} className="bg-navy-950/60 backdrop-blur-sm px-5 py-7">
              <div className="font-display font-semibold text-white text-[clamp(1.8rem,4vw,2.6rem)]">{s.v}</div>
              <div className="mt-1 text-[13px] font-medium text-white/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroBg({ editorial }) {
  return (
    <React.Fragment>
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_0%,rgba(20,184,166,0.18),transparent_60%),radial-gradient(60%_50%_at_15%_20%,rgba(244,123,32,0.14),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.4] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(80%_70%_at_50%_30%,black,transparent)]" />
      <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-teal-600/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </React.Fragment>
  );
}

/* ----------------------------- LIGHT HERO -------------------------------- */
function LightStat({ target, suffix, label, decimals = 0 }) {
  const v = window.useCountUp(target, true, 1700);
  const display = target >= 1000 ? Math.round(v).toLocaleString() : v.toFixed(decimals);
  return (
    <div className="px-4 sm:px-6 py-1 text-center">
      <div className="font-display font-semibold text-navy-900 text-[clamp(1.9rem,4vw,2.7rem)] leading-none">
        {display}<span className="text-brand-500">{suffix}</span>
      </div>
      <div className="mt-2 text-[13.5px] font-medium text-slate-500">{label}</div>
    </div>
  );
}

function HeroLight({ onApply }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32 text-center
                        bg-[linear-gradient(125deg,#eaf2fb_0%,#f6f9fc_38%,#f4f9f1_72%,#edf6e8_100%)]">
      {/* faint grid */}
      <div className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(15,39,71,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,39,71,0.05)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(90%_80%_at_50%_25%,black,transparent)]" />
      {/* soft color blooms */}
      <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-brand-300/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 w-[460px] h-[460px] rounded-full bg-teal-400/15 blur-3xl" />
      {/* decorative swirl, right side */}
      <svg className="pointer-events-none absolute right-0 top-0 h-full w-[42%] text-navy-900/[0.07]" viewBox="0 0 600 760" fill="none" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
        <path d="M640 70C420 120 540 300 360 360 180 420 300 600 120 690" stroke="currentColor" strokeWidth="1.5" />
        <path d="M690 150C470 200 590 380 410 440 230 500 350 680 170 770" stroke="currentColor" strokeWidth="1.5" />
        <path d="M700 -10C500 60 600 230 430 300 250 370 380 520 210 620" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {/* top accent tick */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-b-full bg-brand-500" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <h1 className="font-display font-semibold tracking-tight text-navy-900 text-[2.5rem] sm:text-[56px] leading-[1.1]">
          Become an Agent Partner with BHE UNI
        </h1>

        {/* description */}
        <p className="mt-7 mx-auto max-w-4xl text-[18.5px] leading-relaxed text-slate-600">
          Grow your recruitment business with a tech-enabled education agent partnership built around speed, clarity, and trust. BHE UNI supports agents with an agent portal, application tracking, and adviser support for student applications to our targeted destinations.
        </p>
        <p className="mt-6 text-[17px] text-slate-500">
          Targeted study destinations include the <span className="font-semibold text-navy-900">UK, USA, Canada, Australia, Ireland, China, and New Zealand</span>.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onApply}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-[16px] font-semibold text-white bg-gradient-to-r from-[#f7a823] to-[#f47b20] shadow-[0_14px_34px_-12px_rgba(244,123,32,0.6)] hover:shadow-[0_18px_40px_-10px_rgba(244,123,32,0.8)] hover:-translate-y-0.5 transition-all">
            Apply to Become an Agent
          </button>
          <a href="#process"
             className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-[16px] font-semibold text-white bg-gradient-to-r from-[#2a55cf] to-[#1c3f9e] shadow-[0_14px_34px_-14px_rgba(28,63,158,0.7)] hover:shadow-[0_18px_40px_-10px_rgba(28,63,158,0.85)] hover:-translate-y-0.5 transition-all">
            <span className="whitespace-nowrap">Speak to B2B Support</span>
          </a>
        </div>

        {/* stat card */}
        <div className="mt-12 mx-auto max-w-3xl rounded-[22px] bg-white/65 backdrop-blur-xl ring-1 ring-slate-200/80 shadow-[0_24px_60px_-30px_rgba(10,26,51,0.25)] px-2 sm:px-4 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <LightStat target={14} suffix="+" label="Years of experience" />
            <LightStat target={60} suffix="+" label="Agents globally" />
            <LightStat target={3000} suffix="+" label="Students served" />
            <LightStat target={7} suffix="" label="Study destinations" />
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, HeroLight, HeroNetwork, HeroPortal, HeroEditorial, DESTINATIONS });
