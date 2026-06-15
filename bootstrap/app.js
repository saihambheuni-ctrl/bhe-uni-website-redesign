/* ===========================================================
   BHE UNI — Become an Agent  ·  Bootstrap build interactions
   =========================================================== */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ---------- year ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- data ---------- */
  const DESTINATIONS = [
    { code: 'UK', cc: 'gb', name: 'United Kingdom', note: 'CAS guidance available' },
    { code: 'US', cc: 'us', name: 'United States', note: 'F-1 pathways' },
    { code: 'CA', cc: 'ca', name: 'Canada', note: 'Study permit routes' },
    { code: 'AU', cc: 'au', name: 'Australia', note: 'Subclass 500' },
    { code: 'IE', cc: 'ie', name: 'Ireland', note: 'EU study routes' },
    { code: 'CN', cc: 'cn', name: 'China', note: 'Scholarship options' },
    { code: 'NZ', cc: 'nz', name: 'New Zealand', note: 'Fern programmes' },
  ];

  const STEPS = [
    { icon: 'bi-file-text', kicker: 'Step 1', title: 'Submit your application',
      body: 'Submit your company details and required agent verification documents using the education agent application form on this page.',
      meta: ['Company & director details', 'References', 'Verification documents'] },
    { icon: 'bi-shield-check', kicker: 'Step 2', title: 'Partner review & onboarding',
      body: 'We review your submission and contact you with next steps. Approved partners receive onboarding guidance for portal access and workflow setup.',
      meta: ['Compliance & quality check', 'Agreement signed', 'Portal access granted'] },
    { icon: 'bi-signpost-split', kicker: 'Step 3', title: 'Submit students & track',
      body: 'After onboarding, submit student profiles, upload documents, and track every case in real time using the agent portal.',
      meta: ['CRM-style pipeline', 'Document checklists', 'Live application updates'] },
    { icon: 'bi-award', kicker: 'Step 4', title: 'Ongoing support & training',
      body: 'Partners receive updates, guidance, and training opportunities to improve counselling quality and the student experience.',
      meta: ['Monthly training', 'Product updates', 'Dedicated B2B manager'] },
  ];

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

  const OFFICES = [
    { city: 'London', address: '11 Beaufort Court, Admirals Way, Canary Wharf, London, E14 9XL', phone: '+44 (0) 20 3318 9380' },
    { city: 'Manchester', address: '3rd Floor, Pleer House, 1 Fennel St, Manchester, M4 3DU', phone: '+44 (0) 7305 314412' },
    { city: 'Milton Keynes', address: 'Unit 23B, Lloyds Court, 33 North 10th Street, Milton Keynes, Buckinghamshire, MK9 3EH', phone: '+44 7359 323132' },
    { city: 'Dhaka', address: '4th Floor, Cube Holdings Plot 07, Road 17, Block D Banani, Dhaka 1213, Bangladesh', phone: '+88 0140 709 3812' },
    { city: 'Badda', address: '14 Floor, Tropical Molla Tower, 15/1-4 Bir Uttam Rafiqul Islam Ave, Middle Badda, Dhaka, Bangladesh', phone: '+88 0140 709 3812' },
    { city: 'Sylhet', address: 'Suite 914, 9th Floor, Al Hamra Shopping City Zindabazar, Sylhet', phone: '+88 0140 709 3816' },
  ];

  const SOCIALS = [
    { n: 'facebook', i: 'bi-facebook' }, { n: 'linkedin', i: 'bi-linkedin' },
    { n: 'youtube', i: 'bi-youtube' }, { n: 'instagram', i: 'bi-instagram' },
    { n: 'whatsapp', i: 'bi-whatsapp' }, { n: 'tiktok', i: 'bi-tiktok' },
    { n: 'x', i: 'bi-twitter-x' },
  ];

  /* ---------- nav scroll state ---------- */
  const header = $('#siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- smooth scroll to apply ---------- */
  $$('[data-scroll]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = $(el.getAttribute('data-scroll'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        setTimeout(() => { const inp = target.querySelector('input'); if (inp) inp.focus({ preventScroll: true }); }, 650);
      }
    });
  });

  /* ---------- mobile menu ---------- */
  const menu = $('#mobileMenu');
  $('#menuToggle').addEventListener('click', () => {
    const open = menu.style.display === 'block';
    menu.style.setProperty('display', open ? 'none' : 'block', 'important');
  });

  /* ---------- student portal popup ---------- */
  const pop = $('#portalPop');
  const accountBtn = $('#accountBtn');
  accountBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = pop.classList.toggle('show');
    accountBtn.classList.toggle('active', open);
  });
  document.addEventListener('click', (e) => {
    if (!pop.contains(e.target) && e.target !== accountBtn) {
      pop.classList.remove('show'); accountBtn.classList.remove('active');
    }
  });

  /* ---------- auth modal ---------- */
  const authModalEl = $('#authModal');
  const authModal = new bootstrap.Modal(authModalEl);
  const authForm = $('#authForm');
  const nameField = $('#nameField');
  let authMode = 'signin';

  function setAuthMode(mode) {
    authMode = mode;
    const signup = mode === 'signup';
    $('#authTitle').textContent = signup ? 'Create your account' : 'Sign in to your account';
    $('#authSub').textContent = signup ? 'Start your study-abroad journey with BHE UNI.' : 'Access applications, tracking and resources.';
    nameField.style.setProperty('display', signup ? 'block' : 'none', 'important');
    nameField.querySelector('input').required = signup;
    $('#authSubmit').textContent = signup ? 'Create account' : 'Sign in';
    $('#forgotLink').style.visibility = signup ? 'hidden' : 'visible';
    $('#authSwitchText').textContent = signup ? 'Already have an account? ' : "Don't have an account? ";
    $('#authSwitch').textContent = signup ? 'Sign in' : 'Sign up';
    authForm.reset();
    authForm.classList.remove('was-validated');
  }
  $$('[data-auth]').forEach((b) => b.addEventListener('click', () => {
    pop.classList.remove('show'); accountBtn.classList.remove('active');
    menu.style.setProperty('display', 'none', 'important');
    setAuthMode(b.getAttribute('data-auth'));
    authModal.show();
  }));
  $('#authSwitch').addEventListener('click', () => setAuthMode(authMode === 'signup' ? 'signin' : 'signup'));
  $('#forgotLink').addEventListener('click', (e) => e.preventDefault());
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!authForm.checkValidity()) { authForm.classList.add('was-validated'); return; }
    const data = Object.fromEntries(new FormData(authForm));
    const signup = authMode === 'signup';
    $('#authBody').innerHTML =
      '<div class="text-center py-3">' +
      '<span class="mx-auto d-grid" style="width:64px;height:64px;place-items:center;border-radius:999px;background:#ecfdf5;color:#0d9488;box-shadow:0 0 0 8px rgba(236,253,245,.6);"><i class="bi bi-check-circle-fill" style="font-size:34px;"></i></span>' +
      '<p class="mt-4" style="font-size:15px;color:#5b6b82;">' +
      (signup
        ? 'Welcome aboard, <span class="fw-semi text-navy">' + (data.name || 'student') + '</span>! Check <span class="fw-semi text-navy">' + data.email + '</span> to verify your account.'
        : 'Signed in as <span class="fw-semi text-navy">' + data.email + '</span>.') +
      '</p>' +
      '<button class="btn btn-brand w-100 py-3" data-bs-dismiss="modal">Continue to portal</button>' +
      '</div>';
    $('#authTitle').textContent = signup ? 'Account created' : 'Welcome back';
    $('#authSub').textContent = 'You are all set to access the portal.';
  });

  /* ---------- count-up ---------- */
  function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1700, t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const v = target * easeOutExpo(p);
      el.textContent = (target >= 1000 ? Math.round(v).toLocaleString() : Math.round(v)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = (target >= 1000 ? target.toLocaleString() : target) + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* ---------- bars ---------- */
  function fillBars(container) {
    $$('.bar', container).forEach((bar, i) => {
      setTimeout(() => { bar.style.height = bar.dataset.h + '%'; }, i * 80);
    });
  }

  /* ---------- reveal + triggers via IntersectionObserver ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('reveal')) el.classList.add('in');
      if (el.dataset.countGroup) { $$('[data-count]', el).forEach(animateCount); }
      if (el.id === 'commissionBars') fillBars(el);
      io.unobserve(el);
    });
  }, { threshold: 0.18 });

  $$('.reveal').forEach((el) => io.observe(el));
  $$('#heroStats, #applyStats').forEach((el) => { el.dataset.countGroup = '1'; io.observe(el); });
  io.observe($('#commissionBars'));

  /* ---------- destinations grid ---------- */
  $('#destGrid').innerHTML = DESTINATIONS.map((d, i) => (
    '<div class="col-6 col-sm-4 col-lg-3 reveal">' +
      '<div class="dest-card">' +
        '<div class="topbar"></div>' +
        '<div class="d-flex align-items-center justify-content-between pt-1">' +
          '<span class="dest-flag"><img src="assets/flags/' + d.cc + '.png" alt="' + d.name + ' flag" loading="lazy" /></span>' +
          '<i class="bi bi-arrow-up-right" style="font-size:18px;color:#cbd5e1;"></i>' +
        '</div>' +
        '<h3 class="font-display fw-semi mt-3" style="font-size:17px;color:var(--navy-900);">' + d.name + '</h3>' +
        '<p class="mt-1 mb-0 d-inline-flex align-items-center gap-1" style="font-size:12.5px;font-weight:500;color:#64748b;"><i class="bi bi-geo-alt-fill text-brand" style="font-size:13px;"></i> ' + d.note + '</p>' +
      '</div>' +
    '</div>'
  )).join('');
  $$('#destGrid .reveal').forEach((el) => io.observe(el));

  /* ---------- region select ---------- */
  const regionSel = $('select[name="region"]');
  DESTINATIONS.forEach((d) => { const o = document.createElement('option'); o.value = d.name; o.textContent = d.name; regionSel.appendChild(o); });
  const multi = document.createElement('option'); multi.value = 'Multiple destinations'; multi.textContent = 'Multiple destinations'; regionSel.appendChild(multi);

  /* ---------- step tracker ---------- */
  let active = 0, auto = true;
  function setFill(fraction) {
    const el = document.getElementById('stepLine');
    if (el) el.style.transform = 'scaleX(' + fraction + ')';
  }
  function renderStep(i) {
    active = i;
    const s = STEPS[i];
    $$('#stepBtns .step-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === i);
      btn.classList.toggle('done', idx < i);
      const dot = $('.step-dot i', btn);
      dot.className = idx < i ? 'bi bi-check-lg' : 'bi ' + STEPS[idx].icon;
    });
    setFill(i / (STEPS.length - 1));
    $('#stepIcon').className = 'bi ' + s.icon;
    $('#stepIcon').style.fontSize = '20px';
    const kicker = $('#stepKicker');
    if (kicker) kicker.textContent = s.kicker + ' of ' + STEPS.length;
    $('#stepTitle').textContent = s.title;
    $('#stepBody').textContent = s.body;
    $('#stepMeta').innerHTML = s.meta.map((m) => '<span class="meta-chip"><i class="bi bi-check text-brand"></i> ' + m + '</span>').join('');
    $('#stepBack').disabled = i === 0;
    const next = $('#stepNext');
    next.innerHTML = i < STEPS.length - 1 ? 'Next step <i class="bi bi-arrow-right"></i>' : 'Apply now <i class="bi bi-arrow-right"></i>';
  }
  function pick(i) { auto = false; renderStep(Math.max(0, Math.min(STEPS.length - 1, i))); }
  $$('#stepBtns .step-btn').forEach((btn) => btn.addEventListener('click', () => pick(parseInt(btn.dataset.step, 10))));
  $('#stepBack').addEventListener('click', () => pick(active - 1));
  $('#stepNext').addEventListener('click', () => {
    if (active < STEPS.length - 1) pick(active + 1);
    else { const t = $('#apply'); window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' }); }
  });
  renderStep(0);
  setInterval(() => { if (auto) renderStep((active + 1) % STEPS.length); }, 4200);

  /* ---------- FAQ ---------- */
  const faqList = $('#faqList');
  faqList.innerHTML = FAQS.map((f, i) => (
    '<div class="faq-item reveal' + (i === 0 ? ' open' : '') + '" data-i="' + i + '">' +
      '<button class="faq-q" type="button">' +
        '<span class="faq-badge">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="faq-q-text">' + f.q + '</span>' +
        '<span class="faq-toggle"><i class="bi ' + (i === 0 ? 'bi-dash-lg' : 'bi-plus-lg') + '" style="font-size:22px;"></i></span>' +
      '</button>' +
      '<div class="faq-a"><div class="faq-a-inner"><p>' + f.a + '</p></div></div>' +
    '</div>'
  )).join('');
  $$('.faq-item').forEach((item) => {
    io.observe(item);
    $('.faq-q', item).addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      $$('.faq-item').forEach((it) => {
        it.classList.remove('open');
        $('.faq-toggle i', it).className = 'bi bi-plus-lg';
        $('.faq-toggle i', it).style.fontSize = '22px';
      });
      if (!isOpen) {
        item.classList.add('open');
        const ic = $('.faq-toggle i', item); ic.className = 'bi bi-dash-lg'; ic.style.fontSize = '22px';
      }
    });
  });

  /* ---------- offices ---------- */
  $('#officeGrid').innerHTML = OFFICES.map((o) => (
    '<div class="col-sm-6 col-lg-4">' +
      '<h4 class="office-city">' + o.city + '</h4>' +
      '<p class="mt-3 mb-0" style="font-size:13.5px;line-height:1.6;color:rgba(255,255,255,.65);"><span class="fw-semi" style="color:rgba(255,255,255,.9);">Address:</span> ' + o.address + '</p>' +
      '<p class="mt-3 mb-0" style="font-size:13.5px;color:rgba(255,255,255,.65);"><span class="fw-semi" style="color:rgba(255,255,255,.9);">Phone:</span> ' + o.phone + '</p>' +
      '<p class="mt-2 mb-0" style="font-size:13.5px;color:rgba(255,255,255,.65);"><span class="fw-semi" style="color:rgba(255,255,255,.9);">Email:</span> <a href="mailto:ask@bheuni.io" class="footer-link">ask@bheuni.io</a></p>' +
    '</div>'
  )).join('');

  /* ---------- socials ---------- */
  $('#socialRow').innerHTML = SOCIALS.map((s) => (
    '<a href="#top" class="social-btn" aria-label="' + s.n + '"><i class="bi ' + s.i + '" style="font-size:15px;"></i></a>'
  )).join('');

  /* ---------- apply form ---------- */
  const form = $('#applyForm');
  function setErr(name, msg) {
    const span = $('[data-err="' + name + '"]');
    if (span) span.textContent = msg || '';
    const input = form.querySelector('[name="' + name + '"]');
    if (input) input.classList.toggle('invalid', !!msg);
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    let ok = true;
    if (!data.agency || data.agency.trim().length < 2) { setErr('agency', 'Please enter your agency name'); ok = false; } else setErr('agency', '');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || '')) { setErr('email', 'Enter a valid business email'); ok = false; } else setErr('email', '');
    if (!data.region) { setErr('region', 'Select a target region'); ok = false; } else setErr('region', '');
    if (!ok) return;
    $('#successMsg').innerHTML = 'Thanks, <span class="fw-semi text-navy">' + data.agency + '</span>. Our B2B team will review your details for <span class="fw-semi text-navy">' + data.region + '</span> and reply to <span class="fw-semi text-navy">' + data.email + '</span> within two working days.';
    form.style.display = 'none';
    $('#applySuccess').style.display = 'block';
  });
  $('#resetForm').addEventListener('click', () => {
    form.reset();
    ['agency', 'email', 'region'].forEach((n) => setErr(n, ''));
    $('#applySuccess').style.display = 'none';
    form.style.display = 'block';
  });
})();
