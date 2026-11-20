(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const lang = document.documentElement.lang || 'nl';

  /* ---------- filmopening (een keer per sessie) ---------- */
  let seen = null; try { seen = sessionStorage.getItem('jt-intro'); } catch (e) {}
  const startPage = () => {
    document.body.classList.add('ready');
    $$('.hero .reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), 700 + i * 160));
  };
  if (reduce || seen || document.body.hasAttribute('data-no-intro')) {
    document.body.classList.add('ready');
    $$('.hero .reveal').forEach(el => el.classList.add('in'));
  } else {
    try { sessionStorage.setItem('jt-intro', '1'); } catch (e) {}
    const top = document.createElement('div'); top.className = 'letterbox top';
    const bot = document.createElement('div'); bot.className = 'letterbox bottom';
    const lg = document.createElement('div'); lg.className = 'intro-logo';
    lg.innerHTML = `<div class="intro-name"><b>Jochen Thoelen</b><small>${document.body.dataset.introSub || ''}</small><span class="sweep"></span></div>`;
    document.body.append(top, bot, lg);
    setTimeout(startPage, 2300);
    setTimeout(() => { top.remove(); bot.remove(); lg.remove(); }, 5200);
  }

  /* ---------- navigatie ---------- */
  const nav = $('.nav');
  const onScrollNav = () => nav.classList.toggle('scrolled', scrollY > 40);
  addEventListener('scroll', onScrollNav, { passive: true }); onScrollNav();

  /* ---------- binnenkomen bij scrollen ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.cards, .projects, .promise-grid, .stats').forEach(g => $$('.reveal', g).forEach((el, i) => el.style.setProperty('--d', (i % 4) * .1 + 's')));
  $$('.reveal').forEach(el => { if (!el.closest('.hero')) io.observe(el); });

  /* ---------- cijfers tellen vloeiend ---------- */
  const fmt = new Intl.NumberFormat('nl-BE');
  const countIo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countIo.unobserve(e.target);
      const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '';
      if (reduce) { el.textContent = fmt.format(end) + suf; return; }
      const t0 = performance.now(), dur = 1800;
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - k, 4)));
        el.textContent = fmt.format(v) + suf;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: .6 });
  $$('[data-count]').forEach(el => countIo.observe(el));

  /* ---------- statement licht woord per woord op ---------- */
  const st = $('.statement');
  if (st) {
    const wrapWords = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part.trim()) { frag.append(part); return; }
            const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.append(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) wrapWords(n);
      });
    };
    wrapWords(st);
    const words = $$('.w', st);
    const lightWords = () => {
      const r = st.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('lit', i < n));
    };
    addEventListener('scroll', lightWords, { passive: true }); lightWords();
  }

  /* ---------- loopbaanlijn vult bij scrollen ---------- */
  const cr = $('.career');
  if (cr) {
    const jobs = $$('.job', cr);
    const fill = () => {
      const r = cr.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height));
      cr.style.setProperty('--p', p.toFixed(3));
      jobs.forEach(j => j.classList.toggle('on', j.getBoundingClientRect().top < innerHeight * .6));
    };
    addEventListener('scroll', fill, { passive: true }); addEventListener('resize', fill); fill();
  }

  /* ---------- meer taken tonen ---------- */
  $$('.more').forEach(b => b.addEventListener('click', () => {
    const body = b.closest('.job-body'), open = body.classList.toggle('open');
    b.setAttribute('aria-expanded', open);
    b.querySelector('span').textContent = open ? b.dataset.less : b.dataset.more;
  }));

  /* ---------- lichtspot op kaarten, kanteling op projecten ---------- */
  if (!reduce && matchMedia('(hover:hover)').matches) {
    $$('.card').forEach(c => c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', e.clientX - r.left + 'px');
      c.style.setProperty('--my', e.clientY - r.top + 'px');
    }));
    $$('.project').forEach(p => {
      p.addEventListener('pointermove', e => {
        const r = p.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        p.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
      });
      p.addEventListener('pointerleave', () => { p.style.transform = ''; });
    });
  }

  /* ---------- contactformulier (Formspree) ---------- */
  const form = $('#contactForm');
  if (form) {
    const status = $('.form-status', form);
    const say = (cls, txt) => { status.className = 'form-status ' + cls; status.textContent = txt; };
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = $('button', form); btn.disabled = true;
      say('wait', form.dataset.wait);
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(res.status);
        form.reset(); say('ok', form.dataset.ok);
      } catch (err) { say('err', form.dataset.err); }
      btn.disabled = false;
    });
  }

  /* ---------- held schuift weg bij scrollen ---------- */
  const hc = $('.hero-content');
  if (hc && !reduce) addEventListener('scroll', () => {
    const y = scrollY, h = innerHeight;
    if (y > h) return;
    hc.style.transform = `translateY(${y * .35}px) scale(${1 - y / h * .06})`;
    hc.style.opacity = String(1 - y / (h * .75));
  }, { passive: true });

  /* ---------- lichtveld: stromen en een draaiende netwerkbol ---------- */
  const cv = $('#field');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H, DPR, parts = [], nodes = [], links = [], pulses = [], t = 0, running = true, visible = true;
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  const C1 = [79, 224, 255], C2 = [90, 168, 255], C3 = [180, 92, 255];
  const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));

  function size() {
    DPR = Math.min(devicePixelRatio || 1, 1.5);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const n = Math.min(800, Math.floor(W * H / 2900));
    parts = Array.from({ length: n }, () => spawn(true));
    // bol: punten verdeeld volgens de gulden hoek
    const N = W > 900 ? 260 : 170;
    nodes = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996;
      return { x: Math.cos(th) * r, y, z: Math.sin(th) * r, k: Math.random() };
    });
    links = [];
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = nodes[i], b = nodes[j], d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
      if (d < (W > 900 ? .052 : .08)) links.push([i, j]);
    }
    pulses = [];
    ctx.fillStyle = '#03060e'; ctx.fillRect(0, 0, W, H);
  }
  function spawn(any) {
    return { x: any ? Math.random() * W : -10, y: Math.random() * H, v: .6 + Math.random() * 1.3, life: 200 + Math.random() * 400, k: Math.random(), w: .4 + Math.random() * 1.1 };
  }
  const field = (x, y) => Math.sin(x * .0016 + t * .25) * 1.2 + Math.cos(y * .0022 - t * .18) * 1.1 + Math.sin((x + y) * .0009 + t * .1);
  const hcEl = $('.hero-content');

  function step() {
    t += .006;
    mouse.x += (mouse.tx - mouse.x) * .08; mouse.y += (mouse.ty - mouse.y) * .08;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(3,6,14,0.13)'; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    for (const p of parts) {
      const a = field(p.x, p.y) * .55;
      let vx = Math.cos(a) * p.v + .5, vy = Math.sin(a) * p.v * .7;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 32000) { const f = (1 - d2 / 32000) * 2.4; vx += (-dy / 120) * f + dx / 160 * f; vy += (dx / 120) * f + dy / 160 * f; }
      const ox = p.x, oy = p.y;
      p.x += vx; p.y += vy; p.life--;
      const c = p.k < .5 ? mix(C1, C2, p.k * 2) : mix(C2, C3, (p.k - .5) * 2);
      ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${.26 * p.w})`; ctx.lineWidth = p.w;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(p.x, p.y); ctx.stroke();
      if (p.x > W + 20 || p.y < -20 || p.y > H + 20 || p.life < 0) Object.assign(p, spawn(false), { x: Math.random() < .5 ? -10 : Math.random() * W });
    }

    // netwerkbol
    const wide = W > 980;
    const top = hcEl ? hcEl.getBoundingClientRect().top - cv.getBoundingClientRect().top : H * .4;
    if (!wide && top < 250) return;                     // geen plaats boven de tekst: enkel lichtstromen
    const R = wide ? Math.min(W * .19, H * .33, 330) : Math.max(70, Math.min(W * .34, (top - 90) / 2.3));
    const cx = wide ? W * .75 : W * .5, cy = wide ? H * .5 : 80 + R * 1.1;
    const ry = t * .9 + (mouse.x > -999 ? (mouse.x / W - .5) * .6 : 0), rx = -.35 + (mouse.y > -999 ? (mouse.y / H - .5) * .3 : 0);
    const cyR = Math.cos(ry), syR = Math.sin(ry), cxR = Math.cos(rx), sxR = Math.sin(rx);
    const P = nodes.map(n => {
      const x1 = n.x * cyR + n.z * syR, z1 = -n.x * syR + n.z * cyR;
      const y2 = n.y * cxR - z1 * sxR, z2 = n.y * sxR + z1 * cxR;
      const s = 1.6 / (2.6 - z2);
      return { x: cx + x1 * R * s, y: cy + y2 * R * s, z: z2, k: n.k };
    });
    // gloed achter de bol
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.5);
    g.addColorStop(0, 'rgba(90,130,255,.07)'); g.addColorStop(1, 'rgba(90,130,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, 6.283); ctx.fill();
    ctx.lineWidth = .7;
    for (const [i, j] of links) {
      const a = P[i], b = P[j], depth = ((a.z + b.z) / 2 + 1) / 2;
      const c = mix(C1, C3, (a.x - cx) / (2 * R) + .5);
      ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${.03 + depth * .2})`;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    for (const p of P) {
      const depth = (p.z + 1) / 2, c = mix(C1, C3, p.k);
      ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${.12 + depth * .7})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, .5 + depth * 1.9, 0, 6.283); ctx.fill();
    }
    // signalen die over de verbindingen lopen
    if (pulses.length < 14 && Math.random() < .12) pulses.push({ l: links[(Math.random() * links.length) | 0], k: 0, v: .015 + Math.random() * .02 });
    for (const q of pulses) {
      q.k += q.v;
      const a = P[q.l[0]], b = P[q.l[1]], x = a.x + (b.x - a.x) * q.k, y = a.y + (b.y - a.y) * q.k;
      const depth = ((a.z + b.z) / 2 + 1) / 2;
      ctx.fillStyle = `rgba(220,245,255,${.25 + depth * .7})`;
      ctx.beginPath(); ctx.arc(x, y, 1.2 + depth * 1.6, 0, 6.283); ctx.fill();
    }
    pulses = pulses.filter(q => q.k < 1);
  }
  function frame() { if (!running) return; step(); requestAnimationFrame(frame); }

  size();
  addEventListener('resize', () => { clearTimeout(size.t); size.t = setTimeout(size, 150); });
  addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; }, { passive: true });
  document.addEventListener('pointerleave', () => { mouse.tx = mouse.ty = -9999; });

  if (reduce) { running = false; for (let i = 0; i < 160; i++) step(); return; }
  const resume = () => { const go = visible && !document.hidden; if (go && !running) { running = true; requestAnimationFrame(frame); } else if (!go) running = false; };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; resume(); }).observe(cv);
  document.addEventListener('visibilitychange', resume);
  requestAnimationFrame(frame);
})();
