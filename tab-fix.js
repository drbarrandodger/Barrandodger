(function(){
  var tabs = document.getElementById('tabs');
  if(!tabs) return;
  Array.from(tabs.querySelectorAll('button')).forEach(function(btn){
    if(/claymore/i.test(btn.textContent||'')) btn.remove();
  });
  var order = ['home','crimes','legal-brief','pids','personal-statement-exile','witness','able-point','who','timeline','evidence','official','declarations','legal-affidavits','police-statement','manifesto','good-bits','tv-recording','record-essay','ahrc-letter','family-notice'];
  var map = {};
  Array.from(tabs.querySelectorAll('button')).forEach(function(btn){
    map[btn.getAttribute('data-page')] = btn;
  });
  if(!map['legal-brief']){
    var b = document.createElement('button');
    b.className = 'tab';
    b.setAttribute('aria-selected','false');
    b.setAttribute('data-page','legal-brief');
    b.textContent = 'Legal Brief';
    b.addEventListener('click', function(){ window.location.href = 'legal-brief.html'; });
    map['legal-brief'] = b;
  }
  var frag = document.createDocumentFragment();
  var seen = {};
  order.forEach(function(dp){
    if(map[dp] && !seen[dp]){ frag.appendChild(map[dp]); seen[dp]=1; }
  });
  Object.keys(map).forEach(function(dp){
    if(!seen[dp]){ frag.appendChild(map[dp]); seen[dp]=1; }
  });
  tabs.innerHTML = '';
  tabs.appendChild(frag);
})();
