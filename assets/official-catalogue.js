(function(){
  var root = document.getElementById('official-catalogue') || document.getElementById('list');
  if(!root) return;
  var GROUPS = [
    ["Prime Minister · Attorney-General · Parliament", /(pm|prime.?minister|albanese|attorney|parliament|opmc|pmc|governor.?general|cabinet|ministerial|mcallister|jeff.?tricker|social.?services.?minister)/i],
    ["Public Interest Disclosure (PID)", /(\bpid\b|public.?interest.?disclos|krypton|not to allocate|allocation.?decision)/i],
    ["FOI · OAIC · information access", /(\bfoi\b|oaic|information.?commissioner|documents.?for.?release|ic.?review|mr22)/i],
    ["Commonwealth Ombudsman", /(commonwealth.?ombudsman|ombudsman.?complaint|service.?restriction|2021103546|2021705589)/i],
    ["Victorian Ombudsman · IBAC · VOCAT · LECC", /(vic.?ombudsman|victorian.?ombudsman|ibac|vocat|lecc)/i],
    ["NSW Ombudsman · NCAT · Legal Aid NSW", /(nsw.?ombudsman|ncat|legal.?aid|guardianship)/i],
    ["NDIS · NDIA · DSS · Quality & Safeguards", /(ndis|ndia|dss|quality.?and.?safeguard|not an employee|plan.?approval|disabilityadvocacy)/i],
    ["Comcare · AAT / ART · WorkCover", /(comcare|\baat\b|\bart\b|work.?cover|subsection.?41)/i],
    ["AHRC · human rights", /(ahrc|human.?rights)/i],
    ["APRA · AFCA · ASBFEO · ASIC", /(apra|afca|asbfeo|asic|micron21)/i],
    ["Police · AFP · CDDA", /(police|\bafp\b|\bcdda\b)/i],
    ["Disability Royal Commission", /(royal.?commission|sub001)/i],
    ["Other official / agency-titled files", null]
  ];
  function classify(name){
    for (var i=0;i<GROUPS.length-1;i++){ if (GROUPS[i][1].test(name)) return GROUPS[i][0]; }
    return GROUPS[GROUPS.length-1][0];
  }
  function enc(p){ return p.split('/').map(encodeURIComponent).join('/'); }
  function raw(repo,p){ return 'https://github.com/'+repo+'/raw/main/'+enc(p); }
  function blob(repo,p){ return 'https://github.com/'+repo+'/blob/main/'+enc(p); }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return ({'&':'&','<':'<','>':'>','"':'"'}[c]); }); }
  var OFFICIAL_DRIVE = ["docs/official-drive/2020-04-09-IBAC-CASE-2020712-Outcome-letter.pdf","docs/official-drive/2021-03-OAIC-Micron21-Privacy-CP2102752.pdf","docs/official-drive/2021-05-20-NDIA-work-safe-EVIDENCE-REJECTED-ACA-letter-FOI.pdf","docs/official-drive/2021-05-25-Comcare-Claim-1326583-SEC-OFFICIAL.pdf","docs/official-drive/2021-05-PID-Ombudsman-Rejected-Acknowledgement.pdf","docs/official-drive/2021-06-03-NDIS-Quality-Safeguards-Commission-not-an-employee.pdf","docs/official-drive/2021-10-15-ASBFEO-Small-Business-Ombudsman-Micron21-rejection.pdf","docs/official-drive/2021-10-22-APRA-OAIC-PID-whistleblower-response-SEC-OFFICIAL.pdf","docs/official-drive/2021-10-22-PID-whistleblower-intentions-multiple-agencies-SEC-OFFICIAL.pdf","docs/official-drive/2021-11-13-APRA-reject-Whistleblower-Status.pdf","docs/official-drive/2021-11-15-Commonwealth-Ombudsman-Complaint-2021103546.pdf","docs/official-drive/2021-11-18-IBAC-PID-Rejection-400008R.pdf","docs/official-drive/2022-01-25-AAT-Comcare-prehearing-check.pdf","docs/official-drive/2022-04-02-EVIDENCE-letter-to-AAT.pdf","docs/official-drive/2022-04-12-Assessment-outcome-CASE-20213522-and-CASE-20215102.pdf","docs/official-drive/2022-06-14-Vic-Ombudsman-Rejects-FOI-s29A.pdf","docs/official-drive/2022-08-14-statement-to-police.pdf","docs/official-drive/2022-10-05-VOCAT-Ombudsman-BenCalder-ComplaintRejection.pdf","docs/official-drive/2023-07-04-AHRC-contact-SECOFFICIALSensitive.pdf","docs/official-drive/2023-10-29-IBAC-CASE-20231101-CASE-20233846.pdf","docs/official-drive/2025-02-06-AG-Department-correspondence.pdf","docs/official-drive/2025-08-08-Commonwealth-Ombudsman-Service-Restriction.pdf","docs/official-drive/2025-11-14-FOI-2022-045IC-Revised-Decision.pdf","docs/official-drive/APRA-PID-rejection-Peter-Dunstan-EVIDENCE.pdf","docs/official-drive/ART-2021-7478-McLean-and-Comcare-Decision-12-July-2023.pdf","docs/official-drive/Comcare-claim-13265831-determination-outcome-SEC-OFFICIAL.pdf","docs/official-drive/Commonwealth-Ombudsman-Complaint-2021705589.pdf","docs/official-drive/Commonwealth-Ombudsman-PID-notification-not-to-allocate.pdf","docs/official-drive/Disability-Royal-Commission-submission-SUB00101440-SEC-OFFICIAL.pdf","docs/official-drive/EVIDENCE-NDIS-SOCIAL-SERVICES-MINISTER-JEFF-TRICKER-URGENT-SECOFFICIAL.pdf","docs/official-drive/EVIDENCE-disabilityadvocacy-dss-gov-au-URGENT.pdf","docs/official-drive/FINAL-EVIDENTIARY-NOTICE-OBJECTION-REQUEST-FORMAL-INVESTIGATION.pdf","docs/official-drive/FOI-2022-045-Decision.pdf","docs/official-drive/FOI-2022-045IC-Documents-for-release.pdf","docs/official-drive/FOI-22-01-IR-decision-letter-6-May-2022.pdf","docs/official-drive/FOI-appeal-MR2200677-FOI-2022045-Finalisation-IC-review.pdf","docs/official-drive/Letter-to-PM-and-Attorney-General-response-directing-to-Ombudsman.pdf","docs/official-drive/McLean-and-Comcare-FINAL-Decision.pdf","docs/official-drive/McLean-determination-Comcare-rejection-26May2021.pdf","docs/official-drive/My-PID-for-commonwealth-Ombudsman.pdf","docs/official-drive/NDIS-PID-response-not-in-time-appeal-to-ombudsman-2023Krypton.pdf","docs/official-drive/NDIS-Summary-of-FOI-Decision-Letter.pdf","docs/official-drive/Notice-of-FOI-decision-R-Mclean-FOI-ref-2023-0072.pdf","docs/official-drive/OAIC-43704714.pdf","docs/official-drive/OAIC-IC-review-Department-Prime-Minister-Cabinet.pdf","docs/official-drive/Ombudsman-AFCA-referral-loop-evidence.pdf","docs/official-drive/Outcome-of-complaint-to-NSW-Ombudsman-NSWO10704000690.pdf"];
  var ROOT_HINT = /(foi|pid|ombuds|ndis|ndia|ahrc|comcare|legal.?aid|ibac|lecc|oaic|apra|afca|cdda|afp|police|minister|pm|albanese|attorney|parliament|nacc|ncat|aat|art|federal.?court|worksafe|work.?cover|governor|opmc|pmc|dss|asic|asbfeo|vocat|guardianship)/i;
  async function load(){
    var items=[]; var ge=0;
    OFFICIAL_DRIVE.forEach(function(p){ items.push({repo:'wezzo72/Barrandodger',path:p,name:p.split('/').pop(),source:'Barrandodger / official-drive'}); });
    try{
      var res=await fetch('https://api.github.com/repos/wezzo72/Backup/git/trees/main?recursive=1');
      var data=await res.json();
      (data.tree||[]).forEach(function(t){
        var p=t.path||'';
        if(t.type!=='blob'||!/\.pdf$/i.test(p)) return;
        if(p.indexOf('client/public/documents/')!==0) return;
        var name=p.split('/').pop();
        if(p.indexOf('/government-evidence/')!==-1){ ge++; items.push({repo:'wezzo72/Backup',path:p,name:name,source:'Backup / government-evidence'}); }
        else if(p.split('/').length===4 && ROOT_HINT.test(name)){ items.push({repo:'wezzo72/Backup',path:p,name:name,source:'Backup / documents'}); }
      });
    }catch(e){
      root.insertAdjacentHTML('beforeend','<p class="meta">Could not read the Backup GitHub tree here. Use the folder links. Official-drive copies from this repo are still listed.</p>');
    }
    var nTotal=document.getElementById('n-total'); if(nTotal) nTotal.textContent=items.length;
    var nGe=document.getElementById('n-ge'); if(nGe) nGe.textContent=ge;
    var buckets={}; GROUPS.forEach(function(g){ buckets[g[0]]=[]; });
    items.forEach(function(it){ buckets[classify(it.name)].push(it); });
    var toc=document.getElementById('toc');
    var html='', tocH='', n=0;
    GROUPS.forEach(function(g){
      var rows=buckets[g[0]]||[]; if(!rows.length) return;
      rows.sort(function(a,b){ return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); });
      var sid=g[0].toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      tocH += '<a href="#'+sid+'">'+esc(g[0])+' ('+rows.length+')</a>';
      html += '<h2 id="'+sid+'">'+esc(g[0])+' <span class="count">('+rows.length+')</span></h2>';
      rows.forEach(function(it){
        n++;
        var id='OG-'+String(n).padStart(3,'0');
        var q=(it.name+' '+it.path+' '+g[0]).toLowerCase();
        html += '<div class="row" data-q="'+esc(q)+'"><div class="t"><span class="n">'+id+'</span> '+esc(it.name)+'</div><div class="src">'+esc(it.source)+' · '+esc(it.path)+'</div><div><a href="'+raw(it.repo,it.path)+'" target="_blank" rel="noopener">Open PDF</a><a href="'+blob(it.repo,it.path)+'" target="_blank" rel="noopener">GitHub source</a></div></div>';
      });
    });
    if(toc) toc.innerHTML=tocH;
    var list=document.getElementById('list')||root;
    list.innerHTML=html;
    var foot=document.getElementById('foot'); if(foot) foot.textContent='Listed: '+n+' public GitHub paths. Duplicate copies across folders are listed separately so each location can be checked.';
    var q=document.getElementById('q');
    if(q && !q._bound){ q._bound=true; q.addEventListener('input', function(e){ var f=(e.target.value||'').toLowerCase(); document.querySelectorAll('.row').forEach(function(el){ el.style.display=(!f||(el.getAttribute('data-q')||'').indexOf(f)!==-1)?'':'none'; }); }); }
  }
  load();
})();
