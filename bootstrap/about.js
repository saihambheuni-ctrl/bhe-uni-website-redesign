/* ===========================================================
   BHE UNI — We Are BHE UNI (About)  ·  Bootstrap interactions
   =========================================================== */
(function () {
  'use strict';
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  if ($('#year')) $('#year').textContent = new Date().getFullYear();

  /* ---------- data (from content spec) ---------- */
  const IMPACT = [
    { count: 1000, suffix: '', label: 'Students supported yearly', icon: 'bi-mortarboard-fill' },
    { count: 300, suffix: '', label: 'University & institutional partnerships', icon: 'bi-building-fill' },
    { count: 50, suffix: '', label: 'Certified industry experts', icon: 'bi-people-fill' },
    { count: 50000, suffix: '', label: 'Website visitors', icon: 'bi-graph-up-arrow' },
  ];

  const LEADERS = [
    { name: 'Dr Mohammad Shafiq', role: 'Director', img: 'assets/team/shafiq.png' },
    { name: 'S M Saiful Islam', role: 'Head of Operation BD', img: 'assets/team/saiful.png' },
    { name: 'Valentina Bouzo', role: 'Head of Operation UK', img: 'assets/team/valentina.png' },
    { name: 'Isabella Micu', role: 'Business Development and Partnership Manager', img: 'assets/team/isabella.png' },
  ];

  const SOCIALS = [
    { i: 'bi-facebook', url: 'https://www.facebook.com/bheuni' },
    { i: 'bi-linkedin', url: 'https://www.linkedin.com/company/bheuniuk/' },
    { i: 'bi-youtube', url: 'https://www.youtube.com/@bheuni2' },
    { i: 'bi-instagram', url: 'https://www.instagram.com/bhe_uni/' },
    { i: 'bi-whatsapp', url: 'https://wa.me/447305319797' },
    { i: 'bi-tiktok', url: 'https://www.tiktok.com/@bhe_uni' },
    { i: 'bi-twitter-x', url: 'https://twitter.com/bhe_uni' },
  ];

  const FOOTER_OFFICES = [
    { city: 'London', address: '11 & 12 Beaufort Court, Admirals Way, Canary Wharf, London, E14 9XL', phone: '+44 (0) 20 3318 9380' },
    { city: 'Manchester', address: '3rd Floor, Pleer House, 1 Fennel St, Manchester M4 3DU', phone: '+44 (0) 7305 314412' },
    { city: 'Milton Keynes', address: 'Unit 23B, Lloyds Court, 33 North 10th Street, Milton Keynes, Buckinghamshire, MK9 3EH', phone: '+44 7359 323132' },
    { city: 'Dhaka (Banani)', address: '4th Floor, Cube Holdings, Plot 07, Road 17, Block D, Banani, Dhaka 1213, Bangladesh', phone: '+88 0140 709 3812' },
    { city: 'Dhaka (Badda)', address: '14 Floor, Tropical Molla Tower, 15/1-4 Bir Uttam Rafiqul Islam Ave, Middle Badda, Dhaka, Bangladesh', phone: '+88 0140 709 3812' },
    { city: 'Sylhet', address: 'Suite 914, 9th Floor, Al Hamra Shopping City Zindabazar, Sylhet', phone: '+88 0140 709 3816' },
  ];

  /* ---------- nav scroll ---------- */
  const header = $('#siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- smooth scroll ---------- */
  $$('[data-scroll]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = $(el.getAttribute('data-scroll'));
      if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
  });

  /* ---------- mobile menu ---------- */
  const menu = $('#mobileMenu');
  if (menu) $('#menuToggle').addEventListener('click', () => {
    const open = menu.style.display === 'block';
    menu.style.setProperty('display', open ? 'none' : 'block', 'important');
  });

  /* ---------- portal popup ---------- */
  const pop = $('#portalPop');
  const accountBtn = $('#accountBtn');
  if (pop && accountBtn) {
    accountBtn.addEventListener('click', (e) => { e.stopPropagation(); const open = pop.classList.toggle('show'); accountBtn.classList.toggle('active', open); });
    document.addEventListener('click', (e) => { if (!pop.contains(e.target) && e.target !== accountBtn) { pop.classList.remove('show'); accountBtn.classList.remove('active'); } });
  }

  /* ---------- auth modal ---------- */
  const authModalEl = $('#authModal');
  if (authModalEl) {
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
    }
    $$('[data-auth]').forEach((b) => b.addEventListener('click', () => {
      if (pop) { pop.classList.remove('show'); accountBtn.classList.remove('active'); }
      if (menu) menu.style.setProperty('display', 'none', 'important');
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
        (signup ? 'Welcome aboard, <span class="fw-semi text-navy">' + (data.name || 'student') + '</span>! Check <span class="fw-semi text-navy">' + data.email + '</span> to verify your account.'
                : 'Signed in as <span class="fw-semi text-navy">' + data.email + '</span>.') +
        '</p><button class="btn btn-brand w-100 py-3" data-bs-dismiss="modal">Continue to portal</button></div>';
      $('#authTitle').textContent = signup ? 'Account created' : 'Welcome back';
      $('#authSub').textContent = 'You are all set to access the portal.';
    });
  }

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

  /* ---------- reveal + counters via IO ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('reveal')) el.classList.add('in');
      if (el.dataset.countGroup) $$('[data-count]', el).forEach(animateCount);
      io.unobserve(el);
    });
  }, { threshold: 0.18 });

  /* ---------- impact ---------- */
  const impactGrid = $('#impactGrid');
  if (impactGrid) impactGrid.innerHTML = IMPACT.map((s) => (
    '<div class="col-6 col-lg-3">' +
      '<div class="impact-cell text-center">' +
        '<span class="chip mx-auto" style="width:56px;height:56px;background:rgba(244,123,32,.12);color:var(--brand-400);"><i class="bi ' + s.icon + '" style="font-size:24px;"></i></span>' +
        '<div class="stat-num text-white mt-3" data-count="' + s.count + '" data-suffix="' + s.suffix + '">0</div>' +
        '<div class="mt-2" style="font-size:14px;color:rgba(255,255,255,.6);">' + s.label + '</div>' +
      '</div>' +
    '</div>'
  )).join('');

  /* ---------- leadership ---------- */
  const leaderGrid = $('#leaderGrid');
  if (leaderGrid) leaderGrid.innerHTML = LEADERS.map((p) => (
    '<div class="col-sm-6 col-lg-3 reveal">' +
      '<div class="bhe-card lift text-center h-100 overflow-hidden">' +
        '<div class="leader-photo"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy" /></div>' +
        '<div class="p-4 pt-3">' +
          '<h3 class="font-display fw-semi mb-1" style="font-size:18px;color:var(--navy-900);">' + p.name + '</h3>' +
          '<p class="mb-0 fw-semi text-brand" style="font-size:13.5px;">' + p.role + '</p>' +
        '</div>' +
      '</div>' +
    '</div>'
  )).join('');

  /* ---------- footer offices + socials ---------- */
  const officeGrid = $('#officeGrid');
  if (officeGrid) officeGrid.innerHTML = FOOTER_OFFICES.map((o) => (
    '<div class="col-sm-6 col-lg-4">' +
      '<h4 class="office-city">' + o.city + '</h4>' +
      '<p class="mt-3 mb-0" style="font-size:13.5px;line-height:1.6;color:rgba(255,255,255,.65);"><span class="fw-semi" style="color:rgba(255,255,255,.9);">Address:</span> ' + o.address + '</p>' +
      '<p class="mt-3 mb-0" style="font-size:13.5px;color:rgba(255,255,255,.65);"><span class="fw-semi" style="color:rgba(255,255,255,.9);">Phone:</span> ' + o.phone + '</p>' +
      '<p class="mt-2 mb-0" style="font-size:13.5px;color:rgba(255,255,255,.65);"><span class="fw-semi" style="color:rgba(255,255,255,.9);">Email:</span> <a href="mailto:ask@bheuni.io" class="footer-link">ask@bheuni.io</a></p>' +
    '</div>'
  )).join('');
  const socialRow = $('#socialRow');
  if (socialRow) socialRow.innerHTML = SOCIALS.map((s) => (
    '<a href="' + s.url + '" target="_blank" rel="noopener" class="social-btn" aria-label="social"><i class="bi ' + s.i + '" style="font-size:15px;"></i></a>'
  )).join('');

  /* ---------- faq accordion ---------- */
  const faqList = $('#faqList');
  if (faqList) {
    $$('.faq-item', faqList).forEach((item) => {
      item.querySelector('.faq-q').addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        $$('.faq-item', faqList).forEach((o) => {
          o.classList.remove('open');
          o.querySelector('.faq-toggle i').className = 'bi bi-plus-lg';
        });
        if (!isOpen) {
          item.classList.add('open');
          item.querySelector('.faq-toggle i').className = 'bi bi-dash-lg';
        }
      });
    });
  }

  /* ---------- location panel data ---------- */
  const OFFICES = [
    { city: 'London', tag: 'Head Office', addr: '11 & 12 Beaufort Court, Admirals Way, Canary Wharf, London E14 9XL', phone: '+44 (0) 20 3318 9380', tel: '+442033189380', q: '11 Beaufort Court, Admirals Way, Canary Wharf, London E14 9XL' },
    { city: 'Manchester', tag: 'Branch Office', addr: '3rd Floor, Pleer House, 1 Fennel St, Manchester M4 3DU', phone: '+44 (0) 7305 314412', tel: '+447305314412', q: 'Pleer House, 1 Fennel St, Manchester M4 3DU' },
    { city: 'Dhaka', tag: 'Regional Office', addr: '4th Floor, Cube Holdings, Plot 07, Road 17, Block D, Banani, Dhaka 1213', phone: '+88 0140 709 3812', tel: '+8801407093812', q: 'Cube Holdings, Road 17, Block D, Banani, Dhaka 1213' },
    { city: 'Sylhet', tag: 'Branch Office', addr: 'Suite 914, 9th Floor, Al Hamra Shopping City, Zindabazar, Sylhet', phone: '+88 0140 709 3816', tel: '+8801407093816', q: 'Al Hamra Shopping City, Zindabazar, Sylhet' },
  ];
  const officeList = $('#officeList');
  if (officeList) {
    const mapEl = $('#officeMap');
    const detailEl = $('#officeDetail');
    const mapUrl = (q) => 'https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&t=&z=15&ie=UTF8&iwloc=&output=embed';
    const dirUrl = (q) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
    officeList.innerHTML = OFFICES.map((o, i) => (
      '<button type="button" class="office-item' + (i === 0 ? ' active' : '') + '" data-office="' + i + '">' +
        '<span class="pin"><i class="bi bi-geo-alt-fill"></i></span>' +
        '<span class="flex-grow-1">' +
          '<span class="o-tag">' + o.tag + '</span>' +
          '<span class="o-city d-block">' + o.city + '</span>' +
          '<span class="o-addr d-block">' + o.addr + '</span>' +
        '</span>' +
        '<span class="o-chev"><i class="bi bi-chevron-right"></i></span>' +
      '</button>'
    )).join('');
    function selectOffice(i) {
      const o = OFFICES[i];
      $$('.office-item', officeList).forEach((b) => b.classList.toggle('active', b.dataset.office === String(i)));
      mapEl.src = mapUrl(o.q);
      detailEl.innerHTML =
        '<div class="d-flex align-items-center justify-content-between mb-3">' +
          '<div class="font-display fw-semi" style="font-size:18px;color:var(--navy-900);">' + o.city + ' Office</div>' +
          '<span class="badge-tag">' + o.tag + '</span>' +
        '</div>' +
        '<div class="d-flex flex-column gap-2">' +
          '<div class="d-row"><i class="bi bi-geo-alt-fill"></i><span>' + o.addr + '</span></div>' +
          '<div class="d-row"><i class="bi bi-telephone-fill"></i><a href="tel:' + o.tel + '">' + o.phone + '</a></div>' +
          '<div class="d-row"><i class="bi bi-envelope-fill"></i><a href="mailto:ask@bheuni.io">ask@bheuni.io</a></div>' +
        '</div>' +
        '<div class="d-flex flex-column flex-sm-row gap-2 mt-3">' +
          '<a href="tel:' + o.tel + '" class="btn btn-brand flex-fill py-2" style="font-size:14px;"><i class="bi bi-telephone"></i> Call Now</a>' +
          '<a href="' + dirUrl(o.q) + '" target="_blank" rel="noopener" class="btn btn-ghost-navy flex-fill py-2" style="font-size:14px;"><i class="bi bi-signpost-2"></i> Get Directions</a>' +
        '</div>';
    }
    $$('.office-item', officeList).forEach((b) => b.addEventListener('click', () => selectOffice(parseInt(b.dataset.office, 10))));
    selectOffice(0);
  }

  /* ---------- how-it-works timeline fill ---------- */
  const tlWrap = $('#tlWrap');
  const tlFill = $('#tlFill');

  /* ---------- contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.classList.add('was-validated'); return; }
      const data = Object.fromEntries(new FormData(contactForm));
      const card = document.getElementById('contactFormCard');
      if (card) {
        card.innerHTML =
          '<div class="text-center py-4">' +
          '<span class="mx-auto d-grid" style="width:72px;height:72px;place-items:center;border-radius:999px;background:#ecfdf5;color:#0d9488;box-shadow:0 0 0 10px rgba(236,253,245,.55);"><i class="bi bi-check-circle-fill" style="font-size:38px;"></i></span>' +
          '<h3 class="font-display fw-semi mt-4 mb-2" style="font-size:24px;color:var(--navy-900);">Message sent</h3>' +
          '<p class="mb-4" style="font-size:15px;line-height:1.6;color:#5b6b82;max-width:380px;margin-inline:auto;">Thanks, <span class="fw-semi" style="color:var(--navy-900);">' + (data.name || 'there') + '</span>. Our team will reply to <span class="fw-semi" style="color:var(--navy-900);">' + (data.email || 'you') + '</span> within one working day.</p>' +
          '<button type="button" class="btn btn-ghost-navy" id="contactReset"><i class="bi bi-arrow-left"></i> Send another message</button>' +
          '</div>';
        const rb = document.getElementById('contactReset');
        if (rb) rb.addEventListener('click', () => location.reload());
      }
    });
  }

  /* ---------- observe ---------- */
  $$('.reveal').forEach((el) => io.observe(el));
  $$('#impactGrid').forEach((el) => { el.dataset.countGroup = '1'; io.observe(el); });

  if (tlWrap && tlFill) {
    const tlObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { tlFill.style.width = (window.innerWidth < 768 ? '0' : '84%'); tlObs.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    tlObs.observe(tlWrap);
  }
})();
