/* Main app — composes the page + Tweaks panel (accent, fonts, hero) */
const { useState: useStateA, useCallback: useCallbackA, useEffect: useEffectA } = React;
const { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakRadio, TweakToggle } = window;

const HERO_VARIANTS = [
  { id: 'light', label: 'Light', Comp: window.HeroLight },
  { id: 'network', label: 'Network', Comp: window.HeroNetwork },
  { id: 'portal', label: 'Portal', Comp: window.HeroPortal },
  { id: 'editorial', label: 'Editorial', Comp: window.HeroEditorial },
];

/* curated accent palettes — each applies a full brand scale via cascading CSS vars (RGB triplets) */
const ACCENTS = [
  { c: '#f47b20', s: { 50: '255 245 237', 100: '255 232 212', 200: '255 208 168', 300: '255 184 119', 400: '255 154 71', 500: '244 123 32', 600: '221 102 16', 700: '179 79 13' } },
  { c: '#3b82f6', s: { 50: '239 246 255', 100: '219 234 254', 200: '191 219 254', 300: '147 197 253', 400: '96 165 250', 500: '59 130 246', 600: '37 99 235', 700: '29 78 216' } },
  { c: '#10b981', s: { 50: '236 253 245', 100: '209 250 229', 200: '167 243 208', 300: '110 231 183', 400: '52 211 153', 500: '16 185 129', 600: '5 150 105', 700: '4 120 87' } },
  { c: '#8b5cf6', s: { 50: '245 243 255', 100: '237 233 254', 200: '221 214 254', 300: '196 181 253', 400: '167 139 250', 500: '139 92 246', 600: '124 58 237', 700: '109 40 217' } },
];
const FONTS = ['Kanit', 'Sora', 'Space Grotesk', 'Poppins', 'Manrope'];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#f47b20",
  "headingFont": "Kanit",
  "bodyFont": "Kanit",
  "hero": "light",
  "showSwitcher": true
}/*EDITMODE-END*/;

function applyTheme(t) {
  const root = document.documentElement;
  const acc = ACCENTS.find((a) => a.c === t.accent) || ACCENTS[0];
  Object.entries(acc.s).forEach(([k, v]) => root.style.setProperty(`--brand-${k}`, v));
  const stack = (f) => `"${f}", ui-sans-serif, system-ui, sans-serif`;
  root.style.setProperty('--font-display', stack(t.headingFont));
  root.style.setProperty('--font-sans', stack(t.bodyFont));
}

function HeroSwitcher({ value, onChange }) {
  return (
    <div className="fixed z-[60] bottom-5 left-1/2 -translate-x-1/2 print:hidden">
      <div className="flex items-center gap-1 rounded-full bg-navy-950/90 text-white backdrop-blur-xl ring-1 ring-white/15 shadow-2xl p-1.5 pl-3">
        <span className="hidden sm:flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-white/45 pr-1">
          <Icon name="layers" size={14} /> Hero
        </span>
        {HERO_VARIANTS.map((v) => (
          <button key={v.id} onClick={() => onChange(v.id)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all ${value === v.id ? 'bg-brand-500 text-white shadow' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectA(() => { applyTheme(t); }, [t.accent, t.headingFont, t.bodyFont]);

  const scrollToApply = useCallbackA(() => {
    const el = document.getElementById('apply');
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
    setTimeout(() => { const i = el && el.querySelector('input'); if (i) i.focus({ preventScroll: true }); }, 650);
  }, []);

  const Hero = (HERO_VARIANTS.find((v) => v.id === t.hero) || HERO_VARIANTS[0]).Comp;

  return (
    <div id="top" className="bg-white">
      <Nav onApply={scrollToApply} />
      <main>
        <Hero onApply={scrollToApply} />
        <ValueBento />
        <WhatYouGet />
        <WhoFor />
        <StepTracker onApply={scrollToApply} />
        <Destinations />
        <LeadSection />
        <ComplianceCommission />
        <CtaBand onApply={scrollToApply} />
        <FAQ />
        <NextStep onApply={scrollToApply} />
      </main>
      <Footer onApply={scrollToApply} />

      {t.showSwitcher && <HeroSwitcher value={t.hero} onChange={(v) => setTweak('hero', v)} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent} options={ACCENTS.map((a) => a.c)}
                    onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Typography" />
        <TweakSelect label="Headings" value={t.headingFont} options={FONTS}
                     onChange={(v) => setTweak('headingFont', v)} />
        <TweakSelect label="Body" value={t.bodyFont} options={FONTS}
                     onChange={(v) => setTweak('bodyFont', v)} />
        <TweakSection label="Hero" />
        <TweakRadio label="Variant" value={t.hero}
                    options={[{ value: 'light', label: 'Light' }, { value: 'network', label: 'Network' }, { value: 'portal', label: 'Portal' }, { value: 'editorial', label: 'Editorial' }]}
                    onChange={(v) => setTweak('hero', v)} />
        <TweakToggle label="Hero switcher" value={t.showSwitcher}
                     onChange={(v) => setTweak('showSwitcher', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
