(function () {
  var mq = window.matchMedia('(max-width: 959px)');
  var NAV_TOP = 72;

  function isMobile() {
    return mq.matches;
  }

  function ensureSentinel(toc) {
    var sentinel = toc.querySelector('.toc-sentinel');
    if (!sentinel) {
      sentinel = document.createElement('span');
      sentinel.className = 'toc-sentinel';
      sentinel.setAttribute('aria-hidden', 'true');
      toc.appendChild(sentinel);
    }
    return sentinel;
  }

  function initMobileToc(toc) {
    var details = toc.querySelector('.toc-details');
    if (!details) return;

    if (toc._tocObserver) {
      toc._tocObserver.disconnect();
    }

    var sentinel = ensureSentinel(toc);
    details.setAttribute('open', '');
    toc.classList.remove('toc-auto-collapsed');

    toc._tocObserver = new IntersectionObserver(
      function (entries) {
        if (!isMobile()) return;
        entries.forEach(function (entry) {
          if (entry.target !== sentinel) return;
          var rect = entry.boundingClientRect;
          var scrolledPast = rect.top < NAV_TOP && !entry.isIntersecting;

          if (scrolledPast) {
            details.removeAttribute('open');
            toc.classList.add('toc-auto-collapsed');
          } else {
            details.setAttribute('open', '');
            toc.classList.remove('toc-auto-collapsed');
          }
        });
      },
      {
        root: null,
        rootMargin: '-' + NAV_TOP + 'px 0px 0px 0px',
        threshold: 0
      }
    );

    toc._tocObserver.observe(sentinel);
  }

  function teardownMobileTocs() {
    document.querySelectorAll('.toc').forEach(function (toc) {
      if (toc._tocObserver) {
        toc._tocObserver.disconnect();
        toc._tocObserver = null;
      }
      toc.classList.remove('toc-auto-collapsed');
      var details = toc.querySelector('.toc-details');
      if (details && !isMobile()) {
        details.setAttribute('open', '');
      }
    });
  }

  function setupAllTocs() {
    if (isMobile()) {
      document.querySelectorAll('.toc').forEach(initMobileToc);
    } else {
      teardownMobileTocs();
      document.querySelectorAll('.toc-details').forEach(function (d) {
        d.setAttribute('open', '');
      });
    }
  }

  document.querySelectorAll('.toc a').forEach(function (link) {
    link.addEventListener('click', function () {
      document.querySelectorAll('.toc a').forEach(function (x) {
        x.style.fontWeight = '';
        x.style.color = '';
      });
      link.style.fontWeight = '600';
      link.style.color = 'var(--accent)';

      if (!isMobile()) return;
      var details = link.closest('.toc-details');
      var toc = link.closest('.toc');
      if (details && toc) {
        details.removeAttribute('open');
        toc.classList.add('toc-auto-collapsed');
      }
    });
  });

  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', setupAllTocs);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(setupAllTocs);
  }

  setupAllTocs();
})();
