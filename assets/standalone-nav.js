(function () {
  if (!document.getElementById('bd-global-look')) {
    var g = document.createElement('style');
    g.id = 'bd-global-look';
    g.textContent = "html{background:#08090c}body{margin:0;background:#08090c;color:#f3efe6;font-family:'Palatino Linotype',Palatino,'Iowan Old Style','Times New Roman',serif;line-height:1.7;font-size:18px}h1,h2,h3,h4,.eyebrow,.tab,.brand{font-family:'Avenir Next','Segoe UI',Helvetica,Arial,sans-serif}h1{color:#fff6e8;letter-spacing:.01em;line-height:1.12}h2,h3{color:#d4a017}a{color:#8ec4e6}a:hover{color:#d7eef8}.now,.disclaimer,.ai,.notice{background:#160e0c;border-left:4px solid #c4452f}.box,.card,.sig{background:#10151c;border:1px solid #2a323c}.video-wrap{border:1px solid #2a323c}";
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
      '<p><strong>Current status \u2014 author\u2019s account.</strong> He states he is presently trapped in coercive kidnapping, unable to leave; and that he is subject to abuse, neglect, surveillance, imposed poverty, electronic harassment, alleged V2K, and constant libel and slander.</p>' +
      '<p>Full statement: <a href="home.html">home.html</a> \u00b7 <a href="the-good-bits.html">The Good Bits</a></p>' +
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
      "#standalone-tabs a{flex:0 0 auto;color:#f3efe6;text-decoration:none;padding:8px 12px;border:1px solid #2a323c;border-radius:2px;white-space:nowrap;font:650 13px/1.2 'Avenir Next','Segoe UI',sans-serif}" +
      "#standalone-tabs a.active{background:#3a1612;border-color:#c4452f;color:#ffd2c6}" +
      "#permanent-status-banner{background:#160e0c;border-bottom:3px solid #c4452f;color:#f3efe6;padding:12px 14px;font:17px/1.55 'Palatino Linotype',Palatino,serif}" +
      "#permanent-status-banner a{color:#8ec4e6}" +
      "#permanent-status-banner strong{color:#e8b07a}";
    document.head.appendChild(s);
  }
})();
