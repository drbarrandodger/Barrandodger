/**
 * Sitewide phrase → source/PDF linker
 * Applied to each loaded tab. Longer phrases first. Skips existing links.
 * Also mounts the per-tab evidence catalogue from GitHub.
 */
(function(global){
  var LINKS = [
    ["THE RECORD THAT REFUSED TO DISAPPEAR", "tabs/record-that-refused-to-disappear.html"],
    ["Personal Statement of Exile, Institutional Detriment and the Search", "Personal%20Statement%20of%20Exile%2C%20Institutional%20Detriment%20and%20the%20Search%E2%80%A6.pdf"],
    ["Personal Statement of Exile", "Personal%20Statement%20of%20Exile%2C%20Institutional%20Detriment%20and%20the%20Search%E2%80%A6.pdf"],
    ["THE MANIFESTO OF THE UNERASED", "THE%20MANIFESTO%20OF%20THE%20UNERASED.pdf"],
    ["THE WITNESS REMAINS", "THE%20WITNESS%20REMAINS%20-%20A%20FINAL%20RECORD%20OF%20ERASURE%2C%20SURVIVAL%20AND%20ACCOUNTABILITY.pdf"],
    ["I SURVIVED WHAT WAS SUPPOSED TO ERASE ME", "I%20SURVIVED%20WHAT%20WAS%20SUPPOSED%20TO%20ERASE%20ME.pdf"],
    ["DIGITAL APOCALYPSE", "THE-DIGITAL-APOCALYPSE-OF-ADMINISTRATIVE-ANNIHILATION.pdf"],
    ["allegation matrix", "evidence/allegation-matrix.html"],
    ["Allegation Matrix", "evidence/allegation-matrix.html"],
    ["Crimes 1–150", "tabs/crimes.html"],
    ["Crimes 1-150", "tabs/crimes.html"],
    ["itemised crime list", "tabs/crimes.html"],
    ["Statement to police", "Statement%20to%20police.pdf"],
    ["statement to police", "docs/official-drive/2022-08-14-statement-to-police.pdf"],
    ["Wyong court", "docs/official-drive/2022-08-14-statement-to-police.pdf"],
    ["threat to kill", "docs/official-drive/2022-08-14-statement-to-police.pdf"],
    ["PID Act", "tabs/pid-act-protections.html"],
    ["whistleblower", "tabs/pids-all.html"],
    ["Public Interest Disclosure", "tabs/pids-all.html"],
    ["PID refusals", "tabs/n02-pids-recorded-outcomes.html"],
    ["PIDs and Responses", "tabs/pids-all.html"],
    ["Commonwealth Ombudsman", "docs/official-drive/Commonwealth-Ombudsman-Complaint-2021705589.pdf"],
    ["service restriction", "docs/official-drive/2025-08-08-Commonwealth-Ombudsman-Service-Restriction.pdf"],
    ["AHRC", "docs/official-drive/2023-07-04-AHRC-contact-SECOFFICIALSensitive.pdf"],
    ["Australian Human Rights Commission", "docs/official-drive/2023-07-04-AHRC-contact-SECOFFICIALSensitive.pdf"],
    ["IBAC", "docs/official-drive/2021-11-18-IBAC-PID-Rejection-400008R.pdf"],
    ["Comcare", "docs/official-drive/McLean-and-Comcare-FINAL-Decision.pdf"],
    ["AAT", "docs/official-drive/2022-01-25-AAT-Comcare-prehearing-check.pdf"],
    ["Federal Court", "tabs/n03-federal-court-dss-comcare.html"],
    ["NDIS Quality", "docs/official-drive/2021-06-03-NDIS-Quality-Safeguards-Commission-not-an-employee.pdf"],
    ["NDIS", "docs/official-drive/EVIDENCE-NDIS-SOCIAL-SERVICES-MINISTER-JEFF-TRICKER-URGENT-SECOFFICIAL.pdf"],
    ["Able Point", "tabs/able-point-exile.html"],
    ["Ablepoint Australia", "tabs/able-point-exile.html"],
    ["Able point", "tabs/able-point-exile.html"],
    ["able point", "tabs/able-point-exile.html"],
    ["SAHARA DISABILITY", "https://abr.business.gov.au/ABN/View?abn=31650183681"],
    ["ABN Lookup", "https://abr.business.gov.au/ABN/View?abn=31650183681"],
    ["31 650 183 681", "https://abr.business.gov.au/ABN/View?abn=31650183681"],
    ["torture program", "tabs/home.html#able-point-ndis-statement"],
    ["hit job", "tabs/home.html#hit-job-video"],
    ["hit has failed", "tabs/home.html#hit-job-video"],
    ["political exile", "tabs/personal-statement-exile.html"],
    ["character assassination", "evidence/allegation-matrix.html"],
    ["audio harassment", "tabs/tv-wifi-audio.html"],
    ["V2K", "tabs/tv-wifi-audio.html"],
    ["electronic harassment", "tabs/tv-wifi-audio.html"],
    ["gang stalking", "tabs/ahrc-gangstalking-significance.html"],
    ["Community Treatment Order", "tabs/personal-statement-exile.html"],
    ["NSW Trustee and Guardian", "tabs/personal-statement-exile.html"],
    ["Legal Aid", "legal-brief.html"],
    ["legal brief", "legal-brief.html"],
    ["Legal Brief", "legal-brief.html"],
    ["forensic command", "tabs/forensic-command.html"],
    ["Forensic command", "tabs/forensic-command.html"],
    ["official-drive", "https://github.com/wezzo72/Barrandodger/tree/main/docs/official-drive"],
    ["primary evidence", "SOURCES.html"],
    ["documentary record", "SOURCES.html"],
    ["the archive", "SOURCES.html"],
    ["SOURCES", "SOURCES.html"]
  ];

  function linkify(root){
    if(!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node){
        var p = node.parentElement;
        if(!p) return NodeFilter.FILTER_REJECT;
        var tag = p.tagName;
        if(tag === 'A' || tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'CODE') return NodeFilter.FILTER_REJECT;
        if(p.closest && p.closest('a')) return NodeFilter.FILTER_REJECT;
        if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while(walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function(textNode){
      var text = textNode.nodeValue;
      var changed = false;
      var i = 0;
      var out = document.createDocumentFragment();
      while(i < text.length){
        var matched = null;
        var matchLen = 0;
        var matchUrl = null;
        for(var L=0; L<LINKS.length; L++){
          var phrase = LINKS[L][0];
          var url = LINKS[L][1];
          if(text.substr(i, phrase.length).toLowerCase() === phrase.toLowerCase()){
            if(phrase.length > matchLen){
              matched = text.substr(i, phrase.length);
              matchLen = phrase.length;
              matchUrl = url;
            }
          }
        }
        if(matched){
          changed = true;
          var a = document.createElement('a');
          a.href = matchUrl;
          a.textContent = matched;
          a.className = 'src-link';
          a.title = 'Source / evidence: ' + matchUrl;
          if(/^https?:\/\//i.test(matchUrl) || /\.pdf$/i.test(matchUrl)){
            a.target = '_blank';
            a.rel = 'noopener';
          }
          out.appendChild(a);
          i += matchLen;
        } else {
          var start = i;
          i++;
          while(i < text.length){
            var hit = false;
            for(var L2=0; L2<LINKS.length; L2++){
              if(text.substr(i, LINKS[L2][0].length).toLowerCase() === LINKS[L2][0].toLowerCase()){
                hit = true; break;
              }
            }
            if(hit) break;
            i++;
          }
          out.appendChild(document.createTextNode(text.slice(start, i)));
        }
      }
      if(changed && textNode.parentNode){
        textNode.parentNode.replaceChild(out, textNode);
      }
    });

    var old = document.getElementById('tab-ev-script');
    if(old && old.parentNode) old.parentNode.removeChild(old);
    var s = document.createElement('script');
    s.id = 'tab-ev-script';
    s.src = 'assets/tab-evidence.js';
    (document.getElementById('content') || document.body).appendChild(s);
  }

  global.linkifySources = linkify;
})(window);
