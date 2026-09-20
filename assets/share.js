/** Barran Dodger Archive — share bar with pre-filled URL + hashtags (platform limits respected) */
(function () {
  var BASE = 'https://wezzo72.github.io/Barrandodger/';
  var DEFAULT_TAGS = [
    'BarranDodger',
    'PublicRecord',
    'TruthShouldBeFree',
    'InstitutionalMobbing',
    'AdministrativeAnnihilation',
    'EvidenceArchive',
    'NotACourt'
  ];

  function encode(s) {
    return encodeURIComponent(s || '');
  }

  function buildTags(extra) {
    var tags = DEFAULT_TAGS.slice();
    if (extra) {
      String(extra).split(/[,\s]+/).forEach(function (t) {
        t = t.replace(/^#/, '').trim();
        if (t && tags.indexOf(t) === -1) tags.push(t);
      });
    }
    return tags;
  }

  function hashString(tags, max) {
    var s = tags.map(function (t) { return '#' + t; }).join(' ');
    if (max && s.length > max) {
      var out = [];
      var len = 0;
      for (var i = 0; i < tags.length; i++) {
        var piece = '#' + tags[i];
        if (len + piece.length + 1 > max) break;
        out.push(piece);
        len += piece.length + 1;
      }
      return out.join(' ');
    }
    return s;
  }

  function shareUrls(title, url, tags) {
    var text = title + ' — Barran Dodger Archive. Truth should be free. Not a court.';
    var hashX = hashString(tags, 100);
    var hashLong = hashString(tags, 200);
    return {
      x: 'https://twitter.com/intent/tweet?text=' + encode(text + ' ' + hashX) + '&url=' + encode(url),
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encode(url),
      linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encode(url),
      reddit: 'https://www.reddit.com/submit?url=' + encode(url) + '&title=' + encode(title),
      whatsapp: 'https://wa.me/?text=' + encode(text + ' ' + url + ' ' + hashLong),
      telegram: 'https://t.me/share/url?url=' + encode(url) + '&text=' + encode(text + ' ' + hashLong),
      email: 'mailto:?subject=' + encode(title + ' | Barran Dodger Archive') + '&body=' + encode(text + '\n\n' + url + '\n\n' + hashLong),
      bluesky: 'https://bsky.app/intent/compose?text=' + encode(text + ' ' + url + ' ' + hashX)
    };
  }

  function copyLink(url, btn) {
    function done() {
      if (btn) {
        var old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1500);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(function () {
        window.prompt('Copy link:', url);
      });
    } else {
      window.prompt('Copy link:', url);
    }
  }

  function renderBar(el) {
    var title = el.getAttribute('data-share-title') || document.title || 'Barran Dodger Archive';
    var path = el.getAttribute('data-share-path') || '';
    var url = el.getAttribute('data-share-url') || (path ? BASE + path.replace(/^\//, '') : window.location.href.split('#')[0]);
    var tags = buildTags(el.getAttribute('data-share-tags') || '');
    var urls = shareUrls(title, url, tags);
    var hashDisplay = hashString(tags, 160);

    el.className = (el.className ? el.className + ' ' : '') + 'share-bar';
    el.innerHTML =
      '<div class="share-label">Share this record</div>' +
      '<div class="share-buttons">' +
      '<a class="share-btn share-x" href="' + urls.x + '" target="_blank" rel="noopener noreferrer">X</a>' +
      '<a class="share-btn share-fb" href="' + urls.facebook + '" target="_blank" rel="noopener noreferrer">Facebook</a>' +
      '<a class="share-btn share-li" href="' + urls.linkedin + '" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
      '<a class="share-btn share-rd" href="' + urls.reddit + '" target="_blank" rel="noopener noreferrer">Reddit</a>' +
      '<a class="share-btn share-wa" href="' + urls.whatsapp + '" target="_blank" rel="noopener noreferrer">WhatsApp</a>' +
      '<a class="share-btn share-tg" href="' + urls.telegram + '" target="_blank" rel="noopener noreferrer">Telegram</a>' +
      '<a class="share-btn share-bsky" href="' + urls.bluesky + '" target="_blank" rel="noopener noreferrer">Bluesky</a>' +
      '<a class="share-btn share-em" href="' + urls.email + '">Email</a>' +
      '<button type="button" class="share-btn share-copy" data-copy-url="' + url.replace(/"/g, '"') + '">Copy link</button>' +
      '</div>' +
      '<p class="share-tags" title="Pre-loaded hashtags (within platform limits)">' + hashDisplay + '</p>' +
      '<p class="share-link-meta"><a href="' + url + '">' + url + '</a></p>';

    var copyBtn = el.querySelector('.share-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        copyLink(copyBtn.getAttribute('data-copy-url') || url, copyBtn);
      });
    }
  }

  function autoInject() {
    if (document.querySelector('[data-share]')) return;
    var body = document.body;
    if (!body) return;
    var title = body.getAttribute('data-share-title') || document.title || 'Barran Dodger Archive';
    var tags = body.getAttribute('data-share-tags') || '';
    var path = body.getAttribute('data-share-path') || '';
    var main = document.querySelector('main');
    if (!main) return;
    var el = document.createElement('div');
    el.setAttribute('data-share', '');
    el.setAttribute('data-share-title', title);
    if (path) el.setAttribute('data-share-path', path);
    if (tags) el.setAttribute('data-share-tags', tags);
    var caution = main.querySelector('.caution');
    if (caution && caution.nextSibling) {
      caution.parentNode.insertBefore(el, caution.nextSibling);
    } else if (main.firstChild) {
      main.insertBefore(el, main.firstChild.nextSibling);
    } else {
      main.appendChild(el);
    }
  }

  function init() {
    autoInject();
    var nodes = document.querySelectorAll('[data-share]');
    for (var i = 0; i < nodes.length; i++) renderBar(nodes[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.BDShare = { init: init, renderBar: renderBar };
})();
