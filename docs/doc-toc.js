(function () {
  var mq = window.matchMedia('(max-width: 959px)');

  function syncTocOpen() {
    document.querySelectorAll('.toc-details').forEach(function (details) {
      if (mq.matches) {
        details.removeAttribute('open');
      } else {
        details.setAttribute('open', '');
      }
    });
  }

  function closeMobileToc(link) {
    var details = link.closest('.toc-details');
    if (details && mq.matches) {
      details.removeAttribute('open');
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
      closeMobileToc(link);
    });
  });

  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', syncTocOpen);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(syncTocOpen);
  }

  syncTocOpen();
})();
