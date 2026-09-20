/* Site-wide download / open counters for PDF links.
   Uses localStorage (per browser) + optional public countapi hit when available.
   Label elements: <span class="dl-count" data-dl-id="unique-id"></span>
   Links: <a class="btn dl-track" data-dl-id="unique-id" href="..."> */
(function () {
  var PREFIX = 'bd_dl_';
  function getLocal(id) {
    try { return parseInt(localStorage.getItem(PREFIX + id) || '0', 10) || 0; } catch (e) { return 0; }
  }
  function setLocal(id, n) {
    try { localStorage.setItem(PREFIX + id, String(n)); } catch (e) {}
  }
  function renderAll() {
    document.querySelectorAll('.dl-count[data-dl-id]').forEach(function (el) {
      var id = el.getAttribute('data-dl-id');
      var n = getLocal(id);
      el.textContent = n === 1 ? '1 open' : n + ' opens';
      el.title = 'Opens recorded in this browser (plus any shared counter when available)';
    });
  }
  function bump(id) {
    var n = getLocal(id) + 1;
    setLocal(id, n);
    renderAll();
    // Best-effort shared counter (fails silently if blocked/offline)
    try {
      var img = new Image();
      img.src = 'https://api.countapi.xyz/hit/barrandodger-archive/' + encodeURIComponent(id);
    } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.dl-track[data-dl-id]');
    if (!a) return;
    bump(a.getAttribute('data-dl-id'));
  }, true);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }
  window.BD_DL = { get: getLocal, bump: bump, render: renderAll };
})();
