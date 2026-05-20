(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var hero = document.querySelector('.hero');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');

  if (header) {
    if (!hero) {
      header.classList.add('is-scrolled');
    } else {
      function updateHeader() {
        var threshold = Math.max(80, hero.offsetHeight * 0.12);
        header.classList.toggle('is-scrolled', window.scrollY > threshold);
      }
      window.addEventListener('scroll', updateHeader, { passive: true });
      updateHeader();
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open && header && !header.classList.contains('is-scrolled')) {
        header.classList.add('is-scrolled');
      }
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var fadeEls = document.querySelectorAll('.fade-up, .stagger-children');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );
    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeEls.forEach(function (el) {
      el.classList.add('is-inview');
    });
  }
})();
