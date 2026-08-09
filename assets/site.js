/* ==========================================================================
   AI Tools for Business Research — interaction layer

   Vanilla, no dependencies, no build step. Everything here is an enhancement:
   with JS off the page is complete and readable, and nothing is left hidden.
   Motion respects prefers-reduced-motion — the guard is checked once, and the
   effects that are purely decorative are skipped entirely.
   ========================================================================== */
(function () {
  'use strict';

  var calm = window.matchMedia &&
             window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- i. ink toggle: explicit choice beats the OS ---------------------- */

  function theme() {
    var btn = document.querySelector('.inktoggle');
    if (!btn) return;

    function label() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.hasAttribute('data-theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      btn.textContent = dark ? 'Light' : 'Dark';
      btn.setAttribute('aria-label', 'Switch to ' + (dark ? 'light' : 'dark') + ' ink');
    }

    btn.hidden = false;
    label();
    btn.addEventListener('click', function () {
      var now = document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.hasAttribute('data-theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      var next = now ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('ink', next); } catch (e) { /* private mode */ }
      label();
    });
  }

  /* --- b. reading progress — the deck's seal bar, at the top ------------ */

  function progress() {
    var bar = document.querySelector('.progress > i');
    if (!bar) return;
    var raf = null;
    function paint() {
      raf = null;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? (window.scrollY / h) : 0;
      bar.style.width = Math.min(100, Math.max(0, pct * 100)).toFixed(2) + '%';
    }
    window.addEventListener('scroll', function () {
      if (raf === null) raf = requestAnimationFrame(paint);
    }, { passive: true });
    window.addEventListener('resize', paint, { passive: true });
    paint();
  }

  /* --- a. the enso paints itself --------------------------------------- */

  function enso() {
    var box = document.querySelector('.enso');
    if (!box || calm) return;
    // the SVG carries its own --len (the centreline path length)
    requestAnimationFrame(function () { box.classList.add('is-drawing'); });
  }

  /* --- c. the hero prompt types itself --------------------------------- */

  function typer() {
    var pre = document.querySelector('[data-type] pre');
    if (!pre) return;
    var caret = pre.querySelector('.caret');
    var full = pre.getAttribute('data-text') || '';
    if (!full) return;

    if (calm) return;                      // leave the server-rendered text alone

    var body = document.createElement('span');
    var cursor = document.createElement('span');
    cursor.className = 'cursor';

    // clear everything after the caret, then retype it
    while (pre.lastChild && pre.lastChild !== caret) pre.removeChild(pre.lastChild);
    pre.appendChild(body);
    pre.appendChild(cursor);
    pre.parentNode.classList.add('is-typing');

    var i = 0;
    (function step() {
      if (i >= full.length) {
        pre.parentNode.classList.remove('is-typing');
        if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
        return;
      }
      // emit whole runs of whitespace at once so indentation does not crawl
      var chunk = 1;
      while (i + chunk < full.length && /\s/.test(full[i + chunk - 1]) &&
             /\s/.test(full[i + chunk])) chunk++;
      body.appendChild(document.createTextNode(full.substr(i, chunk)));
      i += chunk;
      setTimeout(step, 18);
    })();
  }

  /* --- d. ink-wash reveal, and f. scrollspy — one observer each -------- */

  function reveal() {
    if (calm || !('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    // only now is it safe to hide things: the observer exists to show them again
    document.documentElement.classList.add('js-reveal');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseInt(el.getAttribute('data-stagger') || '0', 10);
        setTimeout(function () { el.classList.add('is-inked'); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

    Array.prototype.forEach.call(targets, function (el) {
      // stagger rows within a timeline
      var list = el.parentNode;
      if (list && list.classList.contains('timeline')) {
        var n = Array.prototype.indexOf.call(list.children, el);
        el.setAttribute('data-stagger', String(Math.min(n, 6) * 60));
      }
      io.observe(el);
    });

    // anything already on screen at load should not wait for a scroll
    requestAnimationFrame(function () {
      Array.prototype.forEach.call(targets, function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85) el.classList.add('is-inked');
      });
    });
  }

  function scrollspy() {
    if (!('IntersectionObserver' in window)) return;

    var links = [].filter.call(document.querySelectorAll('.nav a[href^="#"]'),
      function (a) { return document.querySelector(a.getAttribute('href')); });
    if (!links.length) return;

    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-here'); });
        var a = byId[e.target.id];
        if (a) a.classList.add('is-here');
      });
    }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

    Object.keys(byId).forEach(function (id) {
      io.observe(document.getElementById(id));
    });
  }

  /* --- h. copy the prompt --------------------------------------------- */

  function copy() {
    if (!navigator.clipboard) return;
    Array.prototype.forEach.call(document.querySelectorAll('figure.prompt'), function (fig) {
      var pre = fig.querySelector('pre');
      if (!pre) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy';
      btn.textContent = 'Copy';
      btn.addEventListener('click', function () {
        var text = (pre.getAttribute('data-text') || pre.textContent)
          .replace(/^[>$]\s?/gm, '');
        navigator.clipboard.writeText(text.trim()).then(function () {
          btn.textContent = 'Copied';
          btn.classList.add('is-done');
          setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('is-done');
          }, 1200);
        });
      });
      fig.appendChild(btn);
    });
  }

  theme();
  progress();
  enso();
  typer();
  reveal();
  scrollspy();
  copy();
})();
