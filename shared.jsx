/* Shared layout primitives for content sections */
const { useInView: useInViewS } = window;

function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const [ref, inView] = useInViewS({ threshold: 0.15 });
  const Tag = as;
  return (
    <Tag ref={ref} className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(26px)',
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}>
      {children}
    </Tag>
  );
}

function Eyebrow({ children, dark }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-brand-400' : 'text-brand-600'}`}>
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, sub, dark, center, max = 'max-w-2xl' }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} ${max}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-4 font-display font-semibold tracking-tight text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08] ${dark ? 'text-white' : 'text-navy-900'}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-[17px] leading-relaxed ${dark ? 'text-white/70' : 'text-slate-600'}`}>{sub}</p>}
    </div>
  );
}

Object.assign(window, { Reveal, Eyebrow, SectionHeading });
