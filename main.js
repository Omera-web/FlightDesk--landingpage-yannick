(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var hero = document.querySelector('.hero');
  var heroMedia = document.querySelector('.hero-media');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  var heroIframe = null;
  var heroShield = heroMedia ? heroMedia.querySelector('.hero-media-shield') : null;

  var widthQuery = window.matchMedia('(min-width: 768px)');
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function shouldLoadHeroAnimation() {
    return widthQuery.matches && !motionQuery.matches;
  }

  function syncHeroAnimation() {
    if (!heroMedia || !hero) return;

    if (shouldLoadHeroAnimation()) {
      if (!heroIframe) {
        heroIframe = document.createElement('iframe');
        heroIframe.src = 'jet-animation.html?embed=1&v=3';
        heroIframe.title = 'Animation FlightDesk';
        heroIframe.loading = 'eager';
        heroIframe.tabIndex = -1;
        heroIframe.referrerPolicy = 'strict-origin-when-cross-origin';
        heroMedia.insertBefore(heroIframe, heroShield);
      }
      hero.classList.add('hero--animated');
    } else {
      if (heroIframe) {
        heroIframe.remove();
        heroIframe = null;
      }
      hero.classList.remove('hero--animated');
    }
  }

  if (heroMedia) {
    syncHeroAnimation();
    if (typeof widthQuery.addEventListener === 'function') {
      widthQuery.addEventListener('change', syncHeroAnimation);
      motionQuery.addEventListener('change', syncHeroAnimation);
    } else {
      widthQuery.addListener(syncHeroAnimation);
      motionQuery.addListener(syncHeroAnimation);
    }
    window.addEventListener('orientationchange', syncHeroAnimation);
  }

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

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNavOpen(!nav.classList.contains('is-open'));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setNavOpen(false);
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
