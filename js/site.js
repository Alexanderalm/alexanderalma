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
    // Close after following an in-page link on small screens.
    nav.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link && nav.getAttribute('data-open') === 'true') {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* — contact form —
     No backend. The form composes a mail draft so a static host is enough.
     To switch to a real endpoint later: give the <form> an action (Formspree,
     Netlify Forms, your own handler) and delete this listener. */
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
      var subject = encodeURIComponent('Going deeper — enquiry from the website');
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
