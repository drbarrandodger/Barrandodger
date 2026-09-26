(function(){
  var ROUTES = {
  "r01": "tabs/r01-master-evidence.html",
  "r02": "tabs/r02-chronology.html",
  "r03": "tabs/r03-architecture.html",
  "r04": "tabs/r04-institutional-map.html",
  "r05": "tabs/r05-contradictions.html",
  "r06": "tabs/r06-whistleblower.html",
  "r07": "tabs/r07-human-rights.html",
  "r08": "tabs/r08-financial.html",
  "r09": "tabs/r09-allegations.html",
  "r10": "tabs/r10-repository.html",
  "home": "tabs/home.html",
  "bio": "tabs/bio.html",
  "archive-about": "tabs/about-archive.html",
  "crimes": "tabs/crimes.html",
  "manifesto": "tabs/manifesto.html",
  "pids": "tabs/pids-all.html",
  "legal-brief": "legal-brief.html",
  "personal-statement-exile": "tabs/personal-statement-exile.html",
  "witness": "tabs/witness.html",
  "able-point": "tabs/able-point-exile.html",
  "official": "official.html",
  "evidence": "evidence/allegation-matrix.html",
  "sources": "SOURCES.html"
  };
  var tabsEl = document.getElementById('tabs');
  var identityEl = document.getElementById('identity');
  var content = document.getElementById('content');
  var cache = {};
  function setActive(id){
    if(tabsEl) tabsEl.querySelectorAll('button').forEach(function(b){
      var on = b.getAttribute('data-page') === id;
      b.classList.toggle('active', on);
    });
    var fEl = document.getElementById('forensic-tabs');
    if(fEl) fEl.querySelectorAll('button').forEach(function(b){
      var on = b.getAttribute('data-page') === id;
      b.classList.toggle('active', on);
    });
  }
  function extractBody(html){
    var m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    var inner = m ? m[1] : html;
    return inner.replace(/<script[\s\S]*?<\/script>/gi, '');
  }
  var req = 0;
  function showLanding(){
    req++;
    var landing = document.getElementById('landing');
    var archive = document.getElementById('archive');
    if(landing) landing.hidden = false;
    if(archive) archive.hidden = true;
    history.replaceState(null, '', location.pathname + location.search);
    window.scrollTo(0, 0);
  }
  async function show(id){
    if(id === 'archive-about' || id === 'about'){ showLanding(); return; }
    var href = ROUTES[id];
    if(!href){ return; }
    var my = ++req;
    try{
      var html = cache[href];
      if(!html){
        var res = await fetch(href, {cache: 'no-cache'});
        if(!res.ok) throw new Error(res.status + ' ' + res.statusText);
        html = await res.text();
        cache[href] = html;
      }
      if(my !== req) return;
      document.getElementById('landing').hidden = true;
      document.getElementById('archive').hidden = false;
      content.innerHTML = '<p>Full source: <a href="'+href+'">'+href+'</a></p><div>'+extractBody(html)+'</div>';
      setActive(id);
      history.replaceState(null, '', '#' + id);
      window.scrollTo(0, 0);
    } catch(err){
      document.getElementById('landing').hidden = true;
      document.getElementById('archive').hidden = false;
      content.innerHTML = '<p>Could not load in-page. <a href="'+href+'">Open '+href+'</a></p>';
      setActive(id);
    }
  }
  var fEl = document.getElementById('forensic-tabs');
  if(fEl) fEl.addEventListener('click', function(e){
    var b = e.target.closest('button[data-page]');
    if(b) show(b.getAttribute('data-page'));
  });
  if(tabsEl) tabsEl.addEventListener('click', function(e){
    var b = e.target.closest('button[data-page]');
    if(b) show(b.getAttribute('data-page'));
  });
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if(!a) return;
    var id = (a.getAttribute('href') || '').replace(/^#/, '');
    if(ROUTES[id]){ e.preventDefault(); show(id); }
  });
  window.addEventListener('hashchange', function(){
    var id = (location.hash || '').slice(1);
    if(!id || id === 'archive-about' || id === 'about') showLanding();
    else if(ROUTES[id]) show(id);
  });
  var enterBtn = document.getElementById('enter');
  if(enterBtn) enterBtn.addEventListener('click', function(){ show('r01'); });
  var start = (location.hash || '').slice(1);
  if(start && ROUTES[start] && start !== 'archive-about') show(start);
  else showLanding();
})();
