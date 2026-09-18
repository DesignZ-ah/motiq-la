/* =========================================================================
   MOTIQ — motion + behaviour
   One smooth-scroll engine (Lenis). GSAP + ScrollTrigger for choreography.
   Everything degrades: no JS, no GSAP, reduced motion and Save-Data all
   leave a complete, readable page.
   ========================================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var coarseQuery = window.matchMedia('(pointer: coarse)');
  var reduceMotion = motionQuery.matches;

  var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var saveData = !!(conn && (conn.saveData || /^(slow-)?2g$/.test(conn.effectiveType || '')));

  var lenis = null;
  var cleanups = [];

  /* ---------------------------------------------------------------------
     NAV — works with or without GSAP
     --------------------------------------------------------------------- */
  function initNav() {
    var nav = document.getElementById('nav');
    var toggle = document.getElementById('navToggle');
    var panel = document.getElementById('navPanel');
    if (!nav || !toggle || !panel) return;

    var open = false;

    function setOpen(next) {
      open = next;
      toggle.setAttribute('aria-expanded', String(next));
      toggle.querySelector('.sr-only').textContent = next ? 'Close menu' : 'Open menu';
      panel.hidden = !next;
      document.body.style.overflow = next ? 'hidden' : '';
      if (lenis) { next ? lenis.stop() : lenis.start(); }
      if (next) {
        var first = panel.querySelector('a');
        if (first) first.focus();
      }
    }

    toggle.addEventListener('click', function () { setOpen(!open); });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) { setOpen(false); toggle.focus(); }
    });

    var onScroll = function () {
      nav.classList.toggle('nav--solid', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    cleanups.push(function () { window.removeEventListener('scroll', onScroll); });

    // Anchor links routed through Lenis so smooth scroll and ScrollTrigger agree.
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -1, duration: 1.15 });
        } else {
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
        if (history.replaceState) history.replaceState(null, '', id);
      });
    });
  }

  /* ---------------------------------------------------------------------
     HERO VIDEO — poster first, clip second, and only when it is welcome
     --------------------------------------------------------------------- */
  function initHeroVideo() {
    var video = document.getElementById('heroVideo');
    if (!video) return;
    if (reduceMotion || saveData) return;               // poster stays, job done

    var IN = 21.1, OUT = 27.05;                          // the pour segment
    var started = false;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.loop = false;
    video.preload = 'auto';
    video.src = 'video/hero/weekend-at-motiq.mp4';

    video.addEventListener('loadedmetadata', function () {
      try { video.currentTime = IN; } catch (err) { /* seek unsupported, play from 0 */ }
    });

    video.addEventListener('timeupdate', function () {
      if (video.currentTime >= OUT || video.currentTime < IN - 0.5) {
        try { video.currentTime = IN; } catch (err) { /* no-op */ }
      }
    });

    video.addEventListener('playing', function () {
      if (!started) { started = true; video.classList.add('is-playing'); }
    });

    function attempt() {
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { /* autoplay refused — the poster is the design */ });
      }
    }

    // Only run while the hero is actually on screen.
    var io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !document.hidden) attempt();
          else video.pause();
        });
      }, { threshold: 0.12 });
      io.observe(video);
    } else {
      attempt();
    }

    var onVisibility = function () {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().bottom > 0) attempt();
    };
    document.addEventListener('visibilitychange', onVisibility);

    cleanups.push(function () {
      document.removeEventListener('visibilitychange', onVisibility);
      if (io) io.disconnect();
      video.pause();
      video.removeAttribute('src');
      video.load();
    });
  }

  /* ---------------------------------------------------------------------
     TEXT SPLITTING — decorative copies only, accessible name preserved
     --------------------------------------------------------------------- */
  function splitWords(el) {
    if (el.dataset.motionSplit === 'true') return;
    var text = (el.textContent || '').trim();
    if (!text) return;

    el.setAttribute('aria-label', text);
    el.textContent = '';

    text.split(/(\s+)/).forEach(function (part) {
      if (!part.trim()) { el.appendChild(document.createTextNode(part)); return; }
      var mask = document.createElement('span');
      var word = document.createElement('span');
      mask.className = 'motion-word-mask';
      mask.setAttribute('aria-hidden', 'true');
      word.className = 'motion-word';
      word.textContent = part;
      mask.appendChild(word);
      el.appendChild(mask);
    });

    el.dataset.motionSplit = 'true';
  }

  function prepareLines(el) {
    // Lines are authored in the markup so breaks are art-directed, not guessed.
    var lines = el.querySelectorAll('.motion-line');
    if (!lines.length) return [];
    if (!el.hasAttribute('aria-label')) {
      var label = Array.prototype.map.call(lines, function (l) { return l.textContent.trim(); }).join(' ');
      el.setAttribute('aria-label', label);
    }
    el.querySelectorAll('.motion-line-mask').forEach(function (m) {
      m.setAttribute('aria-hidden', 'true');
    });
    return lines;
  }

  /* ---------------------------------------------------------------------
     MOTION
     --------------------------------------------------------------------- */
  function initMotion() {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out', duration: 0.85 });

    /* -- smooth scroll (exactly one engine) -- */
    if (!reduceMotion && typeof window.Lenis !== 'undefined') {
      lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      cleanups.push(function () { if (lenis) { lenis.destroy(); lenis = null; } });
    }

    /* -- ground colour follows the photography -- */
    var themed = gsap.utils.toArray('[data-theme]');
    var nav = document.getElementById('nav');

    function applyTheme(el) {
      var bg = el.getAttribute('data-bg');
      var fg = el.getAttribute('data-fg');
      if (!bg || !fg) return;
      if (reduceMotion) {
        root.style.setProperty('--page-bg', bg);
        root.style.setProperty('--page-fg', fg);
      } else {
        gsap.to(root, {
          '--page-bg': bg,
          '--page-fg': fg,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: true
        });
      }
      if (nav) {
        nav.style.color = fg;
        nav.style.setProperty("--fg", fg);
        nav.style.setProperty("--accent", el.getAttribute("data-accent") || "");
      }
    }

    themed.forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 14%',
        end: 'bottom 14%',
        onEnter: function () { applyTheme(el); },
        onEnterBack: function () { applyTheme(el); }
      });
    });
    if (themed.length) applyTheme(themed[0]);

    if (reduceMotion) {
      gsap.set('[data-motion-text],[data-reveal],[data-reveal-group],[data-image-reveal]', { autoAlpha: 1, clearProps: 'visibility,opacity' });
      ScrollTrigger.refresh();
      return;
    }

    /* -- hero intro: media, then lines, then copy, then actions -- */
    var hero = document.querySelector('.hero');
    if (hero) {
      var heroTitle = hero.querySelector('[data-motion-text="lines"]');
      var heroLines = heroTitle ? prepareLines(heroTitle) : [];
      var intro = gsap.timeline({ delay: 0.15 });

      gsap.set(heroTitle, { autoAlpha: 1 });
      intro.from(hero.querySelector('.hero__media'), { autoAlpha: 0, scale: 1.04, duration: 1.4, ease: 'power2.out' }, 0);
      intro.from(hero.querySelector('.hero__eyebrow'), { y: 16, autoAlpha: 0, duration: 0.8 }, 0.25);
      if (heroLines.length) {
        intro.from(heroLines, { yPercent: 108, autoAlpha: 0, duration: 1.05, ease: 'power4.out', stagger: 0.085 }, 0.35);
      }
      intro.from(hero.querySelector('.hero__lede'), { y: 18, autoAlpha: 0, duration: 0.9 }, 0.62);
      intro.from(hero.querySelector('.hero__actions'), { y: 18, autoAlpha: 0, duration: 0.9 }, 0.74);
      intro.from(hero.querySelectorAll('.hero__facts > div'), { y: 14, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 0.86);
    }

    /* -- headings, word by word -- */
    gsap.utils.toArray('[data-motion-text="words"]').forEach(function (el) {
      splitWords(el);
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(el.querySelectorAll('.motion-word'),
        { yPercent: 112, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true }
        });
    });

    gsap.utils.toArray('[data-motion-text="lines"]').forEach(function (el) {
      if (hero && hero.contains(el)) return;             // hero handled in its own timeline
      var lines = prepareLines(el);
      gsap.set(el, { autoAlpha: 1 });
      if (!lines.length) return;
      gsap.fromTo(lines,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true }
        });
    });

    /* -- grouped reveals --
       fromTo, never from: a ScrollTrigger refresh fired by a late-loading
       image must not be able to leave an element parked in its start state. */
    gsap.utils.toArray('[data-reveal-group]').forEach(function (group) {
      var items = group.querySelectorAll('[data-reveal-item]');
      gsap.set(group, { autoAlpha: 1 });
      if (!items.length) return;
      gsap.fromTo(items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.06,
          clearProps: 'opacity',
          scrollTrigger: { trigger: group, start: 'top 84%', once: true }
        });
    });

    /* -- single reveals -- */
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(el,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          delay: Number(el.dataset.revealDelay || 0),
          clearProps: 'opacity',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        });
    });

    /* -- image reveals: the frame opens, the picture settles -- */
    gsap.utils.toArray('[data-image-reveal]').forEach(function (figure) {
      var img = figure.querySelector('img');
      gsap.set(figure, { autoAlpha: 1 });
      var tl = gsap.timeline({ scrollTrigger: { trigger: figure, start: 'top 86%', once: true } });
      tl.fromTo(figure,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power4.out', clearProps: 'clipPath' }, 0);
      if (img) {
        tl.fromTo(img,
          { scale: 1.07, opacity: 0.75 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power4.out', clearProps: 'opacity' }, 0);
      }
    });

    /* -- restrained parallax inside a few frames only -- */
    gsap.utils.toArray('[data-parallax-image]').forEach(function (img) {
      var section = img.closest('[data-parallax-section]') || img;
      gsap.to(img, {
        yPercent: -9,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1,
          invalidateOnRefresh: true
        }
      });
    });

    /* -- measurements settle after fonts and lazy media -- */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      img.addEventListener('load', function () { ScrollTrigger.refresh(); }, { once: true });
    });

    cleanups.push(function () {
      ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
      gsap.globalTimeline.clear();
    });
  }

  /* ---------------------------------------------------------------------
     BOOT
     --------------------------------------------------------------------- */
  function boot() {
    initNav();
    initHeroVideo();

    if (hasGSAP) {
      // has-motion is what hides elements before their reveal, so it is only
      // ever applied when we are actually going to animate them. Under reduced
      // motion nothing is hidden in the first place, so nothing can get stuck.
      if (!reduceMotion) root.classList.add('has-motion');
      requestAnimationFrame(initMotion);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Motion preference can change mid-session.
  var onPrefChange = function () { window.location.reload(); };
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', onPrefChange);

  window.addEventListener('pagehide', function () {
    cleanups.forEach(function (fn) { try { fn(); } catch (e) { /* no-op */ } });
    cleanups.length = 0;
  });
})();
