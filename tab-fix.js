(function(){
  var tabs = document.getElementById('tabs');
  if(!tabs) return;
  Array.from(tabs.querySelectorAll('button')).forEach(function(btn){
    var t = (btn.textContent||'').trim();
    if(/claymore/i.test(t)) btn.remove();
  });
})();
