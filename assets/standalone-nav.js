(function () {
  var TABS = [
    { href: "home.html", label: "Home" },
    { href: "exhibits.html", label: "Exhibits" },
    { href: "who.html", label: "Who" },
    { href: "techniques.html", label: "How they did it" },
    { href: "pid-act-protections.html", label: "PID Act" },
    { href: "crimes.html", label: "Crimes 1–150" },
    { href: "personal-statement-exile.html", label: "Exile" }
  ];
  var here = (location.pathname.split("/").pop() || "").toLowerCase();
  if (!document.getElementById("permanent-status-banner")) {
    var ban = document.createElement("div");
    ban.id = "permanent-status-banner";
    ban.innerHTML =
      '<p><strong>Contact</strong> \u00b7 Dr Richard William McLean / Barran Dodger \u00b7 <a href="tel:+61431300940">+61 431 300 940</a></p>' +
      '<p><strong>Current status \u2014 author\u2019s account.</strong> He states he is presently trapped in coercive kidnapping, unable to leave; and that he is subject to abuse, neglect, surveillance, imposed poverty, electronic harassment, alleged V2K, and constant libel and slander.</p>' +
      '<p><strong>Alleged goal \u2014 author\u2019s interpretation.</strong> To devalue him; destroy his character; block anyone from acknowledging the facts of this testimony and its evidence; by character assassination built on reprehensible allegations that have not been tested by charge, arrest or legal process; extra-judicial societal punishment without a pathway to justice.</p>' +
      '<p><strong>Significance \u2014 author\u2019s interpretation, not a finding.</strong> In what he describes as 35 years of targeting he was not supposed to survive. He says his mere existence is proof of the malice, and that by speaking and publishing he places the master manipulators in a state of panic. That is his claim of significance. It is not a court finding that a named person intended his death or is now in panic.</p>' +
      '<p>If someone is in immediate danger in Australia, call <a href="tel:000">000</a>.</p>';
    document.body.insertBefore(ban, document.body.firstChild);
  }
  var nav = document.getElementById("standalone-tabs");
  if (!nav) {
    nav = document.createElement("nav");
    nav.id = "standalone-tabs";
    document.body.insertBefore(nav, document.body.firstChild);
  }
  var html = "";
  for (var i = 0; i < TABS.length; i++) {
    var t = TABS[i];
    html += '<a class="' + (here === t.href ? "active" : "") + '" href="' + t.href + '">' + t.label + "</a>";
  }
  html += '<a href="../index.html">original site</a>';
  nav.innerHTML = html;
  if (!document.getElementById("standalone-nav-css")) {
    var s = document.createElement("style");
    s.id = "standalone-nav-css";
    s.textContent =
      "#standalone-tabs{position:sticky;top:0;z-index:40;display:flex;overflow-x:auto;gap:6px;padding:8px 10px;background:#120c0c;border-bottom:2px solid #c9a227}" +
      "#standalone-tabs a{flex:0 0 auto;color:#e8e6e3;text-decoration:none;padding:8px 12px;border:1px solid #2a3038;border-radius:8px;white-space:nowrap;font:600 13px/1.2 sans-serif}" +
      "#standalone-tabs a.active{background:#3a1a1a;border-color:#c45c5c;color:#ffd0d0}" +
      "#permanent-status-banner{background:#1a1210;border-bottom:2px solid #c44;color:#e8e6e3;padding:12px 14px;font:15px/1.5 sans-serif}" +
      "#permanent-status-banner a{color:#7eb8da}" +
      "#permanent-status-banner strong{color:#f0a080}";
    document.head.appendChild(s);
  }
})();
