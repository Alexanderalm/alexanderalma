/* Alexander — site behaviour. Small, dependency-free, progressive.
   Everything here is an enhancement: the site works with JS disabled. */
(function () {
  'use strict';

  /* — mobile nav — */
  var nav = document.querySelector('.site-nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    nav.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link && nav.getAttribute('data-open') === 'true') {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* — header over the hero photograph —
     Transparent while the hero is behind it, solid once the page scrolls on. */
  var header = document.querySelector('.site-header-over');
  var hero = document.querySelector('.hero');
  if (header && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { rootMargin: '-72px 0px 0px 0px', threshold: 0 }).observe(hero);
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
      var to = form.getAttribute('data-to') || 'hello@alexander.art';
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

  /* — footer year — */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
