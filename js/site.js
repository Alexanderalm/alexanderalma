/* Alexander — site behaviour. Small, dependency-free, progressive.
   Everything here is an enhancement: the site works with JS disabled. */
(function () {
  'use strict';

  /* — mobile nav —
     The menu button owns the state (data-open on the nav, aria-expanded on
     the button); CSS does the unfolding. It closes on a link, on Escape (focus
     returns to the button), on a click or focus outside the bar, and when
     the window widens back to the desktop layout. */
  var nav = document.querySelector('.site-nav');
  var toggle = nav && nav.querySelector('.nav-toggle');
  if (nav && toggle) {
    var isOpen = function () { return nav.getAttribute('data-open') === 'true'; };
    var setOpen = function (open, returnFocus) {
      nav.setAttribute('data-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
      if (!open && returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', function () { setOpen(!isOpen()); });
    nav.addEventListener('click', function (e) {
      if (isOpen() && e.target.closest('.nav-collapse a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) setOpen(false, true);
    });
    document.addEventListener('click', function (e) {
      if (isOpen() && !nav.contains(e.target)) setOpen(false);
    });
    nav.addEventListener('focusout', function (e) {
      if (isOpen() && e.relatedTarget && !nav.contains(e.relatedTarget)) setOpen(false);
    });
    var desktop = window.matchMedia('(min-width: 1000px)');
    var onWiden = function () { if (desktop.matches && isOpen()) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onWiden);
    else if (desktop.addListener) desktop.addListener(onWiden);
  }

  /* — header over the hero photograph —
     Clear glass while the hero is behind the bar, frosted stone once the
     hero has scrolled out from under it. JS only flips .is-scrolled; the
     cross-fade lives in CSS. The observer's top margin is the header's own
     height, so the switch happens exactly as the photo leaves the bar. */
  var header = document.querySelector('.site-header-over');
  var hero = document.querySelector('.hero');
  if (header && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { rootMargin: '-' + header.offsetHeight + 'px 0px 0px 0px', threshold: 0 }).observe(hero);
  } else if (header) {
    header.classList.add('is-scrolled');
  }

  /* — the lantern —
     Walking into the night forest, the cursor carries a light. Rather than
     restyling every row on each mousemove, we write the pointer position to
     two custom properties per row and let CSS do the rest; the work is
     batched into one animation frame so a fast pointer cannot outrun it. */
  var scope = document.querySelector('.lantern-scope');
  if (scope && window.matchMedia('(hover: hover)').matches) {
    var rows = Array.prototype.slice.call(scope.querySelectorAll('.index-row'));
    var pending = null;

    var paint = function (clientX, clientY) {
      pending = null;
      for (var i = 0; i < rows.length; i++) {
        var box = rows[i].getBoundingClientRect();
        rows[i].style.setProperty('--mx', (clientX - box.left) + 'px');
        rows[i].style.setProperty('--my', (clientY - box.top) + 'px');
      }
    };

    scope.addEventListener('mousemove', function (e) {
      var x = e.clientX, y = e.clientY;
      if (pending === null) {
        pending = window.requestAnimationFrame(function () { paint(x, y); });
      }
    });
    scope.addEventListener('mouseenter', function () { scope.setAttribute('data-lit', 'true'); });
    scope.addEventListener('mouseleave', function () {
      scope.setAttribute('data-lit', 'false');
      if (pending !== null) { window.cancelAnimationFrame(pending); pending = null; }
    });
    /* Keyboard users get the light too — it follows focus instead of a cursor. */
    rows.forEach(function (row) {
      row.addEventListener('focus', function () {
        scope.setAttribute('data-lit', 'true');
        var box = row.getBoundingClientRect();
        paint(box.left + box.width / 2, box.top + box.height / 2);
      });
    });
  }

  /* — the lantern, site-wide —
     A soft warm light follows the cursor across every page. One fixed
     element, moved with a transform once per animation frame; CSS does the
     glow. Touch screens have no cursor, and reduced-motion users have asked
     not to be followed, so neither gets it. */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var glow = document.createElement('div');
    glow.className = 'lantern-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
    var gx = 0, gy = 0, glowFrame = null;
    document.addEventListener('pointermove', function (e) {
      gx = e.clientX; gy = e.clientY;
      if (glowFrame === null) {
        glowFrame = window.requestAnimationFrame(function () {
          glowFrame = null;
          glow.style.transform = 'translate3d(' + gx + 'px,' + gy + 'px,0)';
          glow.classList.add('is-on');
        });
      }
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { glow.classList.remove('is-on'); });
  }

  /* — contact form —
     No backend. The form composes a mail draft so a static host is enough.
     To switch to a real endpoint: give the <form> an action (Formspree,
     Netlify Forms, your own handler) and this listener stands down. */
  var form = document.querySelector('.contact-form');
  if (form && !form.getAttribute('action')) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var field = form.querySelector('input[type="email"]');
      var status = document.querySelector('.form-status');
      var value = field ? field.value.trim() : '';
      if (!value) {
        if (status) status.textContent = 'Pop your email in first and I will write back.';
        if (field) field.focus();
        return;
      }
      var to = form.getAttribute('data-to') || 'presence@alexanderalma.com';
      var subject = encodeURIComponent('Enquiry from the website');
      var body = encodeURIComponent(
        'Hi Alexander,\n\n[Tell me what you are holding — a date, a room, a group.]\n\nReply to: ' + value + '\n'
      );
      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
      if (status) status.textContent = 'Opening your mail app — if nothing happens, write to ' + to + '.';
    });
  }

  /* — audio teaser placeholder —
     Replace the .audio-strip button with a SoundCloud / Bandcamp / Spotify
     embed when the recording is ready. Until then it explains itself. */
  var audio = document.querySelector('.audio-strip');
  if (audio) {
    audio.addEventListener('click', function () {
      var note = document.querySelector('.audio-note');
      if (note) note.textContent = 'No recording wired up yet — drop a SoundCloud, Bandcamp or Spotify embed in here.';
    });
  }

  /* — Cal.com booking —
     Any link with data-cal-link opens Cal.com's booking popup in place.
     Its href already points at the same cal.com page, so without JS (or if
     the embed script is blocked) the link simply opens the booking page.
     This is the embed, not API v2 — v2 needs a secret key and a server. */
  if (document.querySelector('[data-cal-link]')) {
    (function (C, A, L) {
      var p = function (a, ar) { a.q.push(ar); };
      var d = C.document;
      C.Cal = C.Cal || function () {
        var cal = C.Cal, ar = arguments;
        if (!cal.loaded) {
          cal.ns = {}; cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          var api = function () { p(api, arguments); };
          var namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');
    window.Cal('init', { origin: 'https://app.cal.com' });
    window.Cal('ui', {
      theme: 'light',
      cssVarsPerTheme: { light: { 'cal-brand': '#80490b' } },
      hideEventTypeDetails: false
    });
  }

  /* — footer year — */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
