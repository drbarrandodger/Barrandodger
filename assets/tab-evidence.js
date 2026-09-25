(function(){
  var page = (location.hash || '#home').replace(/^#/, '');
  var FILTERS = {
    home: /./,
    bio: /mclean|barran|declaration|sovereign/i,
    'archive-about': /./,
    crimes: /crime|allegation|matrix|ablecare|murder|threat|police|ibac|pid/i,
    manifesto: /manifesto|trust|declaration|sovereign/i,
    pids: /pid|krypton|whistleblower|not to allocate|allocation|lagos|federal.court/i,
    'legal-brief': /legal|brief|court|affidavit|comcare|aat|art/i,
    'personal-statement-exile': /exile|able.?point|werribee|guardian|ncat|legal.?aid/i,
    paradox: /paradox|worth/i,
    conditions: /werribee|weribee|condition|exile|2021|ipu|discharge/i,
    witness: /witness|email|able.?point|threat/i,
    'able-point': /able.?point|ablepoint|ablecare|sahara|ndis|provider/i,
    who: /./,
    timeline: /./,
    evidence: /./,
    official: /./,
    declarations: /declaration|sovereign|integrity|sacred/i,
    'legal-affidavits': /affidavit|declaration|court|statement/i,
    'police-statement': /police|statement|afp|cdda|ibac/i,
    'good-bits': /good|beauty|art|catalogue/i,
    'tv-recording': /tv|wifi|audio|recording|rumble/i,
    'record-essay': /record|refused|disappear/i,
    'ahrc-letter': /ahrc|human.?right/i,
    'family-notice': /family|notice/i,
    documents: /./,
    primary: /./,
    'named-evidence': /./,
    'video-exhibit': /tv|wifi|audio|recording|transcript|ablecare/i,
    legal: /legal|court|brief|international|human.?right|ahrc/i,
    fedcourt: /federal.?court|aat|art|comcare|dss|lagos/i,
    ndis: /ndis|ndia|dss|able.?point|quality|safeguard|plan.?approval/i,
    pm: /pm|prime|albanese|attorney|parliament|minister|opmc|pmc|cabinet/i,
    ombudsman: /ombudsman|igis|pid|not to allocate|service.?restriction/i,
    legalaid: /legal.?aid|guardian|ncat/i,
    coag: /./,
    archive: /./,
    significance: /ahrc|significance|gang/i,
    opening: /./,
    reckoning: /record|reckoning/i,
    aiarchive: /./,
    methods: /technique|method|architecture|erase|annihilat/i,
    digital: /apocalypse|digital|annihilat|architecture/i,
    prophecy: /prophecy|gospel|god|chosen/i,
    destroy: /soul|destroy/i,
    gospels: /gospel|prophecy|god/i,
    essays: /essay|paper|architecture/i,
    entities: /./,
    doctrine: /doctrine|complicit|method/i,
    god: /god|gospel|prophecy|chosen/i,
    chosen: /chosen|witness|god/i,
    soul: /soul|destroy/i,
    architectureerase: /architecture|eras|technique/i,
    aliens: /alien|species|codex/i,
    methodology: /method|technique/i,
    verification: /verif|exhibit|source/i,
    open: /challenge|open/i,
    architecture: /architecture|annihilat/i,
    trust: /trust|fund|abn|declaration/i,
    'source-record': /./,
    species: /species|alien|codex/i,
    forensic: /forensic|command|claymore/i,
    sources: /./
  };

  var OFFICIAL_DRIVE = ["docs/official-drive/2020-04-09-IBAC-CASE-2020712-Outcome-letter.pdf","docs/official-drive/2021-03-OAIC-Micron21-Privacy-CP2102752.pdf","docs/official-drive/2021-05-20-NDIA-work-safe-EVIDENCE-REJECTED-ACA-letter-FOI.pdf","docs/official-drive/2021-05-25-Comcare-Claim-1326583-SEC-OFFICIAL.pdf","docs/official-drive/2021-05-PID-Ombudsman-Rejected-Acknowledgement.pdf","docs/official-drive/2021-06-03-NDIS-Quality-Safeguards-Commission-not-an-employee.pdf","docs/official-drive/2021-10-15-ASBFEO-Small-Business-Ombudsman-Micron21-rejection.pdf","docs/official-drive/2021-10-22-APRA-OAIC-PID-whistleblower-response-SEC-OFFICIAL.pdf","docs/official-drive/2021-10-22-PID-whistleblower-intentions-multiple-agencies-SEC-OFFICIAL.pdf","docs/official-drive/2021-11-13-APRA-reject-Whistleblower-Status.pdf","docs/official-drive/2021-11-15-Commonwealth-Ombudsman-Complaint-2021103546.pdf","docs/official-drive/2021-11-18-IBAC-PID-Rejection-400008R.pdf","docs/official-drive/2022-01-25-AAT-Comcare-prehearing-check.pdf","docs/official-drive/2022-04-02-EVIDENCE-letter-to-AAT.pdf","docs/official-drive/2022-04-12-Assessment-outcome-CASE-20213522-and-CASE-20215102.pdf","docs/official-drive/2022-06-14-Vic-Ombudsman-Rejects-FOI-s29A.pdf","docs/official-drive/2022-08-14-statement-to-police.pdf","docs/official-drive/2022-10-05-VOCAT-Ombudsman-BenCalder-ComplaintRejection.pdf","docs/official-drive/2023-07-04-AHRC-contact-SECOFFICIALSensitive.pdf","docs/official-drive/2023-10-29-IBAC-CASE-20231101-CASE-20233846.pdf","docs/official-drive/2025-02-06-AG-Department-correspondence.pdf","docs/official-drive/2025-08-08-Commonwealth-Ombudsman-Service-Restriction.pdf","docs/official-drive/2025-11-14-FOI-2022-045IC-Revised-Decision.pdf","docs/official-drive/APRA-PID-rejection-Peter-Dunstan-EVIDENCE.pdf","docs/official-drive/ART-2021-7478-McLean-and-Comcare-Decision-12-July-2023.pdf","docs/official-drive/Comcare-claim-13265831-determination-outcome-SEC-OFFICIAL.pdf","docs/official-drive/Commonwealth-Ombudsman-Complaint-2021705589.pdf","docs/official-drive/Commonwealth-Ombudsman-PID-notification-not-to-allocate.pdf","docs/official-drive/Disability-Royal-Commission-submission-SUB00101440-SEC-OFFICIAL.pdf","docs/official-drive/EVIDENCE-NDIS-SOCIAL-SERVICES-MINISTER-JEFF-TRICKER-URGENT-SECOFFICIAL.pdf","docs/official-drive/EVIDENCE-disabilityadvocacy-dss-gov-au-URGENT.pdf","docs/official-drive/FINAL-EVIDENTIARY-NOTICE-OBJECTION-REQUEST-FORMAL-INVESTIGATION.pdf","docs/official-drive/FOI-2022-045-Decision.pdf","docs/official-drive/FOI-2022-045IC-Documents-for-release.pdf","docs/official-drive/FOI-22-01-IR-decision-letter-6-May-2022.pdf","docs/official-drive/FOI-appeal-MR2200677-FOI-2022045-Finalisation-IC-review.pdf","docs/official-drive/Letter-to-PM-and-Attorney-General-response-directing-to-Ombudsman.pdf","docs/official-drive/McLean-and-Comcare-FINAL-Decision.pdf","docs/official-drive/McLean-determination-Comcare-rejection-26May2021.pdf","docs/official-drive/My-PID-for-commonwealth-Ombudsman.pdf","docs/official-drive/NDIS-PID-response-not-in-time-appeal-to-ombudsman-2023Krypton.pdf","docs/official-drive/NDIS-Summary-of-FOI-Decision-Letter.pdf","docs/official-drive/Notice-of-FOI-decision-R-Mclean-FOI-ref-2023-0072.pdf","docs/official-drive/OAIC-43704714.pdf","docs/official-drive/OAIC-IC-review-Department-Prime-Minister-Cabinet.pdf","docs/official-drive/Ombudsman-AFCA-referral-loop-evidence.pdf","docs/official-drive/Outcome-of-complaint-to-NSW-Ombudsman-NSWO10704000690.pdf"];

  function enc(p){ return p.split('/').map(encodeURIComponent).join('/'); }
  function raw(repo,p){ return 'https://github.com/'+repo+'/raw/main/'+enc(p); }
  function blob(repo,p){ return 'https://github.com/'+repo+'/blob/main/'+enc(p); }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return ({'&':'&','<':'<','>':'>','"':'"'}[c]); }); }

  var rx = FILTERS[page] || /pid|foi|ombudsman|ndis|comcare|ahrc|court|police/i;
  var host = document.querySelector('#content .src-root') || document.getElementById('content') || document.body;
  if(!host) return;
  if(document.getElementById('tab-evidence-mount')) return;
  var mount = document.createElement('div');
  mount.id = 'tab-evidence-mount';
  mount.innerHTML = '<h2 style="color:#f1c75b;margin:2rem 0 .6rem">Evidence files for this tab</h2><p style="color:#a9b4bf;font-size:.9rem">Full itemised paths from the public GitHub stores. A filename is not a verdict. Open Official Government Documents for the unfiltered catalogue.</p><p id="tab-ev-status" style="color:#a9b4bf">Loading evidence list…</p><ol id="tab-ev-list" style="padding-left:1.2rem"></ol>';
  host.appendChild(mount);

  async function run(){
    var items = [];
    OFFICIAL_DRIVE.forEach(function(p){
      var name = p.split('/').pop();
      if(rx.test(name) || rx.test(p)) items.push({repo:'wezzo72/Barrandodger', path:p, name:name, source:'official-drive'});
    });
    try{
      var res = await fetch('https://api.github.com/repos/wezzo72/Backup/git/trees/main?recursive=1');
      var data = await res.json();
      (data.tree||[]).forEach(function(t){
        var p = t.path || '';
        if(t.type !== 'blob' || !/\.pdf$/i.test(p)) return;
        if(p.indexOf('client/public/documents/') !== 0) return;
        var name = p.split('/').pop();
        var inGov = p.indexOf('/government-evidence/') !== -1;
        var inRoot = p.split('/').length === 4;
        if(!inGov && !inRoot) return;
        if(rx.test(name) || rx.test(p)) items.push({repo:'wezzo72/Backup', path:p, name:name, source: inGov ? 'Backup / government-evidence' : 'Backup / documents'});
      });
    }catch(e){}
    items.sort(function(a,b){ return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); });
    var seen = {}; var uniq = [];
    items.forEach(function(it){ var k=it.repo+'/'+it.path; if(seen[k]) return; seen[k]=1; uniq.push(it); });
    var ol = document.getElementById('tab-ev-list');
    var st = document.getElementById('tab-ev-status');
    if(!ol) return;
    if(!uniq.length){
      st.textContent = 'No filename in the public trees matched this tab\u2019s keywords. Use Official Government Documents for the complete catalogue.';
      return;
    }
    st.textContent = uniq.length + ' public files matching this tab. Each line is a GitHub path.';
    ol.innerHTML = uniq.map(function(it){
      return '<li style="margin:0 0 .55rem"><strong>'+esc(it.name)+'</strong><br/><span style="color:#a9b4bf;font-size:.78rem">'+esc(it.source)+' \u00b7 '+esc(it.path)+'</span><br/><a href="'+raw(it.repo,it.path)+'" target="_blank" rel="noopener">Open PDF</a> \u00b7 <a href="'+blob(it.repo,it.path)+'" target="_blank" rel="noopener">GitHub source</a></li>';
    }).join('');
  }
  run();
})();
