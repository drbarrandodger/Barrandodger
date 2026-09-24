/* Shared top menu for /tabs/*.html
 * Add a tab: append one object here, then create tabs/your-id.html from tabs/_template.html
 */
(function () {
  var TABS = [
    { id: "crimes", href: "crimes.html", label: "Crimes 1–150" },
    { id: "pids", href: "pids-all.html", label: "PIDs" },
    { id: "lagos", href: "pids-sia-lagos.html", label: "Lagos / Tredwell" },
    { id: "exile", href: "personal-statement-exile.html", label: "Exile statement" },
    { id: "home", href: "home.html", label: "Home" },
    { id: "who", href: "who.html", label: "Who" },
    { id: "witness", href: "witness.html", label: "Witness" },
    { id: "timeline", href: "timeline.html", label: "Timeline" },
    { id: "sources", href: "sources.html", label: "Sources" },
    { id: "method", href: "method.html", label: "Method" },
    { id: "challenge", href: "challenge.html", label: "Challenge" }
  ];

  var here = (location.pathname.split("/").pop() || "home.html").toLowerCase();
  var nav = document.getElementById("standalone-tabs");
  if (!nav) {
    nav = document.createElement("nav");
    nav.id = "standalone-tabs";
    document.body.insertBefore(nav, document.body.firstChild);
  }
  nav.setAttribute("aria-label", "Standalone tabs");
  nav.innerHTML = TABS.map(function (t) {
    var on = here === t.href.toLowerCase() || here === t.id + ".html";
    return '<a class="" + (on ? "active" : "") + '" href="' + t.href + '">' + t.label + "</a>";
  }).join("") +
    '<a href="../index.html">master site</a>';

  if (!document.getElementById("standalone-nav-css")) {
    var s = document.createElement("style");
    s.id = "standalone-nav-css";
    s.textContent =
      "#standalone-tabs{position:sticky;top:0;z-index:40;display:flex;flex-wrap:nowrap;overflow-x:auto;gap:6px;padding:8px 10px;background:#120c0c;border-bottom:2px solid #c9a227}" +
      "#standalone-tabs a{flex:0 0 auto;color:#e8e6e3;text-decoration:none;padding:8px 12px;border:1px solid #2a3038;border-radius:8px;white-space:nowrap;font:600 13px/1.2 sans-serif}" +
      "#standalone-tabs a.active{background:#3a1a1a;border-color:#c45c5c;color:#ffd0d0}";
    document.head.appendChild(s);
  }
})();
