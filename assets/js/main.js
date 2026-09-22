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

    /* The sticky signature stage has to clear this bar exactly, and the bar's
       height depends on the font that ends up loading. Publishing the measured
       value beats guessing it in CSS. It only changes padding inside a stage
       that is already a fixed 100svh, so the document height never moves and no
       ScrollTrigger measurement is invalidated. */
    var navFrame = 0;
    function measureNav() {
      navFrame = 0;
      var h = Math.round(nav.getBoundingClientRect().height);
      if (h > 0) root.style.setProperty('--nav-h', h + 'px');
    }
    var queueNav = function () {
      if (navFrame) cancelAnimationFrame(navFrame);
      navFrame = requestAnimationFrame(measureNav);
    };
    measureNav();
    window.addEventListener('resize', queueNav);
    window.addEventListener('load', measureNav);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureNav);

    cleanups.push(function () {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', queueNav);
      window.removeEventListener('load', measureNav);
      if (navFrame) cancelAnimationFrame(navFrame);
    });

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
     ROOM VIDEO — a short, already-trimmed loop; no segment math needed
     --------------------------------------------------------------------- */
  function initRoomVideo() {
    var video = document.getElementById('roomVideo');
    if (!video) return;
    if (reduceMotion || saveData) return;             // poster stays, job done

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.loop = true;
    video.preload = 'auto';
    video.src = 'video/room/room-environment.mp4';

    video.addEventListener('playing', function () { video.classList.add('is-playing'); });

    function attempt() {
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { /* autoplay refused — the poster is the design */ });
      }
    }

    var io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !document.hidden) attempt();
          else video.pause();
        });
      }, { threshold: 0.2 });
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
     SIGNATURE SWITCHER — one drink on stage, the rest a keystroke away.
     Without JS every drink is simply stacked and readable, so the rail
     only appears once this has taken over.
     --------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------
     SIGNATURE SEQUENCE — scroll conducts the cream tops

     The track is a tall block of ordinary page; the stage inside it is
     sticky. Scrolling through the track moves from the first drink to the
     second to the third, then releases and the page carries on. Layout
     height is entirely CSS-driven, so nothing here can park a reveal by
     changing the document after ScrollTrigger has measured it.
     --------------------------------------------------------------------- */

  // Without GSAP, or under reduced motion, the drinks are simply a stack of
  // three articles. Strip the tab wiring so assistive technology is not told
  // about a tablist that no longer controls anything.
  function demoteSignature() {
    var block = document.querySelector('[data-signature]');
    if (!block) return;
    var rail = block.querySelector('.signature__rail');
    if (rail) rail.remove();
    block.querySelectorAll('.sig-item').forEach(function (item) {
      item.removeAttribute('role');
      item.removeAttribute('aria-labelledby');
      item.classList.remove('is-active');
    });
  }

  function initSignature() {
    var block = document.querySelector('[data-signature]');
    if (!block) return;

    if (!hasGSAP || reduceMotion) { demoteSignature(); return; }

    var stage = block.querySelector('[data-sig-stage]');
    var panels = block.querySelector('.signature__panels');
    var items = Array.prototype.slice.call(block.querySelectorAll('.sig-item'));
    var tabs = Array.prototype.slice.call(block.querySelectorAll('.sig-tab'));
    var indicator = block.querySelector('.signature__indicator');
    if (!stage || !panels || items.length < 2 || tabs.length !== items.length) {
      demoteSignature();
      return;
    }

    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    var count = items.length;
    var current = 0;
    var settleTimer = 0;

    block.classList.add('is-enhanced', 'is-sequenced');

    function moveIndicator(smooth) {
      if (!indicator) return;
      var tab = tabs[current];
      if (smooth) {
        gsap.to(indicator, {
          left: tab.offsetLeft, width: tab.offsetWidth,
          duration: 0.5, ease: 'power3.out'
        });
      } else {
        gsap.killTweensOf(indicator);
        indicator.style.left = tab.offsetLeft + 'px';
        indicator.style.width = tab.offsetWidth + 'px';
      }
    }

    /* -- the swap ------------------------------------------------------- */
    function markTabs() {
      tabs.forEach(function (tab, i) {
        var on = i === current;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
      });
    }

    // The swap is only finished once every other panel has been stood down.
    // GSAP runs on rAF, which a backgrounded tab freezes mid-transition, so a
    // timer settles it too — whichever gets there first the result is the same,
    // and running it twice is harmless.
    function settle() {
      clearTimeout(settleTimer);
      items.forEach(function (item, i) {
        if (i !== current) item.classList.remove('is-active');
      });
      gsap.set(items, { clearProps: 'opacity' });
    }

    function reveal(item, delay) {
      var media = item.querySelector('.sig-item__media img');
      var numeral = item.querySelector('.sig-item__num');
      var text = item.querySelectorAll('.sig-item__index, .sig-item__name, .sig-item__desc, .sig-item__price');
      var tl = gsap.timeline({ delay: delay || 0 });

      if (media) {
        tl.fromTo(media,
          { scale: 1.12, yPercent: 4, opacity: 0.25 },
          { scale: 1, yPercent: 0, opacity: 1, duration: 1.15, ease: 'power4.out',
            clearProps: 'transform,opacity' }, 0);
      }
      if (numeral) {
        tl.fromTo(numeral,
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out',
            clearProps: 'transform,opacity' }, 0.1);
      }
      tl.fromTo(text,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power4.out', stagger: 0.06,
          clearProps: 'transform,opacity' }, 0.12);
      return tl;
    }

    function activate(next) {
      if (next === current || next < 0 || next >= count) return;

      var outgoing = items[current];
      var incoming = items[next];

      current = next;
      markTabs();
      moveIndicator(true);

      gsap.killTweensOf(items);
      incoming.classList.add('is-active');

      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 1600);

      gsap.to(outgoing, { opacity: 0, duration: 0.4, ease: 'power2.out' });
      gsap.fromTo(incoming, { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: 'power2.out', onComplete: settle });
      reveal(incoming, 0);
    }

    /* -- scroll drives the index ---------------------------------------- */
    // While a rail press is flying the page to another slice, the drinks it
    // passes over must not flicker past: one press is one move.
    var jumping = 0;

    function sync(progress) {
      if (jumping) return;
      var i = Math.floor(progress * count);
      if (i > count - 1) i = count - 1;
      if (i < 0) i = 0;
      activate(i);
    }

    var seq = ScrollTrigger.create({
      trigger: block,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: function (self) { sync(self.progress); },
      // Every lazy image that lands below the fold fires a refresh, which moves
      // the track's start and end without firing onUpdate. Without this the
      // drink on stage stops matching the scroll position for the rest of the
      // session.
      onRefresh: function (self) { sync(self.progress); }
    });

    // The first drink gets its entrance the moment the stage arrives, so the
    // section opens with the same move that carries every later swap.
    var intro = ScrollTrigger.create({
      trigger: stage,
      start: 'top 78%',
      once: true,
      onEnter: function () { if (current === 0) reveal(items[0], 0); }
    });

    /* -- pressing a number is a request to see that drink --------------- */
    function scrollToIndex(i) {
      var travel = seq.end - seq.start;
      if (!(travel > 0)) return;
      var target = seq.start + travel * ((i + 0.5) / count);

      clearTimeout(jumping);
      // The timer, not the engine's callback, is what releases the lock: if the
      // person grabs the page mid-flight the callback may never run.
      jumping = setTimeout(function () { jumping = 0; }, 1100);

      if (lenis) lenis.scrollTo(target, { duration: 0.9 });
      else window.scrollTo(0, target);
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(i); scrollToIndex(i); });
      tab.addEventListener('keydown', function (e) {
        var last = count - 1;
        var next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = i === last ? 0 : i + 1;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = i === 0 ? last : i - 1;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = last;
        if (next === null) return;
        e.preventDefault();
        tabs[next].focus();
        activate(next);
        scrollToIndex(next);
      });
    });

    /* -- measurement ----------------------------------------------------- */
    var pending = 0;
    var measure = function () { moveIndicator(false); };
    var onResize = function () {
      if (pending) cancelAnimationFrame(pending);
      pending = requestAnimationFrame(measure);
    };
    window.addEventListener('resize', onResize);

    measure();
    window.addEventListener('load', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

    cleanups.push(function () {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', measure);
      clearTimeout(settleTimer);
      clearTimeout(jumping);
      if (pending) cancelAnimationFrame(pending);
      seq.kill();
      intro.kill();
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

    // Nothing is hidden until the code that reveals it is definitely running.
    // Under reduced motion nothing is hidden at all, so nothing can get stuck.
    if (!reduceMotion) root.classList.add('has-motion');

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

    initSignature();

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
      gsap.set('[data-motion-text],[data-reveal],[data-reveal-group],[data-image-reveal],[data-cinema-reveal],[data-panel-reveal]', { autoAlpha: 1, clearProps: 'visibility,opacity' });
      ScrollTrigger.refresh();
      return;
    }

    /* A finished reveal has to become permanent. ScrollTrigger.refresh() — which
       fires every time one of the lazy images below the fold lands — reverts the
       animations it knows about to their start values in order to measure, and a
       `once` trigger has already killed itself by then, so nothing is left to
       play them forwards again. Jumping to a section via the nav would leave its
       heading and copy sitting at opacity 0. Clearing the inline state and then
       dropping the tween means a later refresh has nothing to revert.
       The cleanup waits a frame: killing an animation inside its own
       ScrollTrigger callback throws inside ScrollTrigger and takes every other
       trigger on the page down with it. */
    function retire(anim, targets) {
      anim.eventCallback('onComplete', function () {
        requestAnimationFrame(function () {
          gsap.set(targets, { clearProps: 'transform,opacity' });
          anim.kill();
        });
      });
      return anim;
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
      var words = el.querySelectorAll('.motion-word');
      retire(gsap.fromTo(words,
        { yPercent: 112, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true }
        }), words);
    });

    gsap.utils.toArray('[data-motion-text="lines"]').forEach(function (el) {
      if (hero && hero.contains(el)) return;             // hero handled in its own timeline
      var lines = prepareLines(el);
      gsap.set(el, { autoAlpha: 1 });
      if (!lines.length) return;
      retire(gsap.fromTo(lines,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true }
        }), lines);
    });

    /* -- grouped reveals --
       fromTo, never from: a ScrollTrigger refresh fired by a late-loading
       image must not be able to leave an element parked in its start state. */
    gsap.utils.toArray('[data-reveal-group]').forEach(function (group) {
      var items = group.querySelectorAll('[data-reveal-item]');
      gsap.set(group, { autoAlpha: 1 });
      if (!items.length) return;
      retire(gsap.fromTo(items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.06,
          scrollTrigger: { trigger: group, start: 'top 84%', once: true }
        }), items);
    });

    /* -- single reveals -- */
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.set(el, { autoAlpha: 1 });
      retire(gsap.fromTo(el,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          delay: Number(el.dataset.revealDelay || 0),
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        }), el);
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
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power4.out' }, 0);
      }
      retire(tl, img ? [figure, img] : [figure]);
    });

    /* -- cinematic reveals: the signature stage and the hojicha plates get
       a slower focus-pull open instead of the standard clip wipe -- */
    gsap.utils.toArray('[data-cinema-reveal]').forEach(function (figure) {
      var img = figure.querySelector('img');
      var delay = Number(figure.dataset.revealDelay || 0);
      gsap.set(figure, { autoAlpha: 1 });
      var tl = gsap.timeline({
        delay: delay,
        scrollTrigger: { trigger: figure, start: 'top 85%', once: true }
      });
      tl.fromTo(figure,
        { clipPath: 'inset(15% 15% 15% 15%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', clearProps: 'clipPath' }, 0);
      if (img) {
        tl.fromTo(img,
          { scale: 1.24, autoAlpha: 0, filter: 'blur(16px)' },
          { scale: 1.07, autoAlpha: 1, filter: 'blur(0px)', duration: 1.35, ease: 'power4.out', clearProps: 'filter' }, 0.05)
          .to(img, { scale: 1, duration: 1, ease: 'power2.out' }, 1.05);
      }
      retire(tl, img ? [figure, img] : [figure]);
    });

    /* -- hero panel: an accent rule draws, then a shutter opens from the
          horizon line and the photograph settles out of its own scale -- */
    gsap.utils.toArray('[data-panel-reveal]').forEach(function (figure) {
      var img = figure.querySelector('img');
      var rule = figure.querySelector('.plate__rule');
      var cap = figure.querySelector('.plate__cap');
      gsap.set(figure, { autoAlpha: 1 });

      var tl = gsap.timeline({
        scrollTrigger: { trigger: figure, start: 'top 84%', once: true }
      });

      if (rule) {
        tl.fromTo(rule,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'expo.out', clearProps: 'transform' }, 0);
      }
      tl.fromTo(figure,
        { clipPath: 'inset(50% 0% 50% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.45, ease: 'expo.out', clearProps: 'clipPath' }, 0.18);
      if (img) {
        tl.fromTo(img,
          { scale: 1.3, filter: 'blur(14px)' },
          { scale: 1.06, filter: 'blur(0px)', duration: 1.9, ease: 'power4.out', clearProps: 'filter' }, 0.18)
          .to(img, { scale: 1, duration: 1.1, ease: 'power2.out' }, 1.5);
      }
      if (cap) {
        tl.fromTo(cap,
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', clearProps: 'transform' }, 0.95);
      }

      var targets = [figure];
      if (img) targets.push(img);
      if (cap) targets.push(cap);
      retire(tl, targets);
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
    initRoomVideo();

    // The signature sequence needs ScrollTrigger and Lenis, so it is built
    // inside initMotion. Without GSAP it never enhances at all.
    if (!hasGSAP) demoteSignature();

    // has-motion is applied inside initMotion, not here: rAF never fires in a
    // background tab, so a page opened in one would sit hiding its own content
    // with nothing scheduled to reveal it.
    if (hasGSAP) requestAnimationFrame(initMotion);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Motion preference can change mid-session.
  var onPrefChange = function () { window.location.reload(); };
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', onPrefChange);

  // Only tear down when the page is genuinely being discarded. A pagehide with
  // persisted=true means the browser is keeping this page alive in the back/
  // forward cache — running the teardown there restores it dead: no smooth
  // scroll, no reveals left visible, and both videos stripped of their source.
  window.addEventListener('pagehide', function (e) {
    if (e.persisted) return;
    cleanups.forEach(function (fn) { try { fn(); } catch (err) { /* no-op */ } });
    cleanups.length = 0;
  });
})();
