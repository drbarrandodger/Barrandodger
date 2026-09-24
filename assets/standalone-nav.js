(function () {
  if (!document.getElementById('bd-global-look')) {
    var g = document.createElement('style');
    g.id = 'bd-global-look';
    g.textContent = "html{background:#08090c}body{background:#08090c;color:#f3efe6;font-family:'Palatino Linotype',Palatino,'Iowan Old Style',serif;line-height:1.7;font-size:18px}h1,h2,h3{font-family:'Avenir Next','Segoe UI',sans-serif;color:#d4a017}h1{color:#fff6e8}a{color:#8ec4e6}.now,.disclaimer,.ai,.notice{background:#160e0c;border-left:4px solid #c4452f}";
    document.head.appendChild(g);
  }
  if (window.self !== window.top) return;
  var TABS = [
    { href: "home.html", label: "Home" },
    { href: "exhibits.html", label: "Exhibits" },
    { href: "who.html", label: "Who" },
    { href: "techniques.html", label: "How they did it" },
    { href: "pid-act-protections.html", label: "PID Act" },
    { href: "crimes.html", label: "Crimes 1–150" },
    { href: "personal-statement-exile.html", label: "Exile" },
    { href: "the-good-bits.html", label: "The Good Bits" }
  ];
  var here = (location.pathname.split("/").pop() || "").toLowerCase();
  if (!document.getElementById("permanent-status-banner")) {
    var ban = document.createElement("div");
    ban.id = "permanent-status-banner";
    ban.innerHTML =
      '<p><strong>Contact</strong> \u00b7 Dr Richard William McLean / Barran Dodger \u00b7 <a href="tel:+61431300940">+61 431 300 940</a></p>' +
      '<p><strong>Current status \u2014 my account, not a police or court finding.</strong> I am presently trapped in coercive kidnapping, unable to leave; and I am subject to abuse, neglect, surveillance, imposed poverty, electronic harassment, alleged V2K, and constant libel and slander.</p>' +
      '<p><strong>I am coercively kidnapped by Able Point in political exile.</strong></p>' +
      '<p><strong>Able Point / political exile \u2014 my account, not a finding.</strong> I am in political exile with Able Point as NDIS provider; the provider benefits financially while feigning help and participating in my continued harm, barely pretending it is not aligned with master manipulators and targeting; denial of legal aid is used to close the pathway to justice; death threats sit with a matter before Wyong court while mandatory reporting is refused, which I read as tacit approval of maximising damage; detriment is sustained in a way designed to facilitate desperation and/or suicide; I am then blamed as mentally ill for harm those actors consciously and actively participate in causing; there is a total blackout and stonewalling of accusations; I am banned from calling management; and this is total political, social and physical house arrest \u2014 social death, administrative annihilation and psychological warfare.</p>' +
      '<p>Full landing: <a href="home.html">home.html</a> \u00b7 <a href="../portal.html">portal.html</a> \u00b7 <a href="the-good-bits.html">The Good Bits</a></p>' +
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
      "#standalone-tabs{position:sticky;top:0;z-index:40;display:flex;overflow-x:auto;gap:6px;padding:8px 10px;background:#050608;border-bottom:3px solid #c4452f}" +
      "#standalone-tabs a{flex:0 0 auto;color:#f3efe6;text-decoration:none;padding:8px 12px;border:1px solid #2a323c;white-space:nowrap;font:650 13px/1.2 'Avenir Next','Segoe UI',sans-serif}" +
      "#standalone-tabs a.active{background:#3a1612;border-color:#c4452f;color:#ffd2c6}" +
      "#permanent-status-banner{background:#160e0c;border-bottom:3px solid #c4452f;color:#f3efe6;padding:12px 14px;font:17px/1.55 'Palatino Linotype',Palatino,serif}" +
      "#permanent-status-banner a{color:#8ec4e6}" +
      "#permanent-status-banner strong{color:#e8b07a}";
    document.head.appendChild(s);
  }
})();
