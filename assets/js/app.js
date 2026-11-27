/* =========================================================
   Panabo City – Student Redesign Prototype
   Shared behaviour: site chrome (GOVPH bar, masthead, menus,
   footer), accessibility prefs, carousel, search, filters,
   demo downloads, forms.
   ========================================================= */
(function () {
  "use strict";

  var OFFICIAL = "https://panabocity.gov.ph/";

  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }

  /* ---------- Accessibility preferences ---------- */
  var root = document.documentElement;
  function applySize(size) {
    root.classList.remove("ts-sm", "ts-lg");
    if (size === "sm") root.classList.add("ts-sm");
    if (size === "lg") root.classList.add("ts-lg");
    document.querySelectorAll(".ts-btn").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.size === size)); });
  }
  function applyContrast(on) {
    root.classList.toggle("hc", on);
    document.querySelectorAll(".hc-toggle").forEach(function (b) {
      b.setAttribute("aria-pressed", String(on));
      var s = b.querySelector(".hc-state"); if (s) s.textContent = on ? "On" : "Off";
    });
  }
  applySize(store("pp-size") || "md");
  applyContrast(store("pp-hc") === "1");

  /* ---------- Icons ---------- */
  var I = {
    charter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z"/><path d="M16 6h2a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2"/><path d="m9 14 2 2 4-4"/></svg>',
    forms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M12 11v6"/><path d="m9 14 3 3 3-3"/></svg>',
    directory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M9 21v-6h6v6"/><path d="M9 11h.01M15 11h.01"/></svg>',
    hotline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    faq: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    menu: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    chev: '<svg class="chev-d" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'
  };
  window.PP_ICONS = I;

  /* ---------- Navigation model (mirrors the official site's menu) ---------- */
  var NAV = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "services", label: "Services", overview: ["All services", "services.html"], children: [
      ["e-Government Portal (eBOSS)", "https://www.filipizen.com/partners/ddn_panabo", true],
      ["Emergency Hotlines", "hotlines.html"],
      ["Downloadable Forms", "forms.html"],
      ["Frequently Asked Questions", "faqs.html"] ] },
    { id: "government", label: "Government", overview: ["All government pages", "sitemap.html#government"], children: [
      ["Citizen’s Charter", "citizens-charter.html"],
      ["Executive Department", OFFICIAL, true],
      ["Sangguniang Panlungsod", OFFICIAL, true],
      ["Vision, Mission and Goals", "transparency.html#mission"],
      ["GAD Corner", "https://gad.panabocity.gov.ph/", true],
      ["Executive Orders", "executive-orders.html"],
      ["City Directory", "directory.html"] ] },
    { id: "transparency", label: "Transparency", overview: ["Transparency Seal", "transparency.html"], children: [
      ["Public Documents", "public-documents.html"],
      ["Bidding, Awards, RFQ and Other Documents", "public-documents.html?cat=procurement"] ] },
    { id: "city", label: "The City", overview: ["All pages about the city", "sitemap.html#the-city"], children: [
      ["City Profile", OFFICIAL, true],
      ["Getting Here", OFFICIAL, true],
      ["Panabo Hymn", OFFICIAL, true],
      ["History", OFFICIAL, true],
      ["Barangays", "directory.html#barangays"] ] },
    { id: "invest", label: "Invest", overview: ["All investment pages", "sitemap.html#invest"], children: [
      ["Panabo Investment and Incentive Code", OFFICIAL, true],
      ["Cost of Doing Business", OFFICIAL, true],
      ["Socio-Economic Profile", OFFICIAL, true] ] },
    { id: "contact", label: "Contact Us", href: "contact.html" }
  ];
  var active = document.body.getAttribute("data-nav") || "";
  var here = (location.pathname.split("/").pop() || "index.html") + location.search;

  function cur(href) { return href.split("#")[0] === here ? ' aria-current="page"' : ""; }
  function extMark(ext) { return ext ? ' <span class="ext-ico" aria-hidden="true">↗</span><span class="visually-hidden"> (official website)</span>' : ""; }

  function desktopNav() {
    return NAV.map(function (n, i) {
      var cls = "nav-item" + (n.id === active ? " is-active" : "");
      if (!n.children) return '<li class="' + cls + '"><a href="' + n.href + '"' + (n.id === active ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
      var id = "dd-" + n.id;
      return '<li class="' + cls + '"><button type="button" class="nav-toggle" aria-expanded="false" aria-controls="' + id + '">' + n.label + I.chev + "</button>" +
        '<ul class="dropdown" id="' + id + '" hidden>' +
          '<li><a class="dd-overview" href="' + n.overview[1] + '"' + cur(n.overview[1]) + ">" + n.overview[0] + "</a></li>" +
          n.children.map(function (c) { return '<li><a href="' + c[1] + '"' + cur(c[1]) + ">" + c[0] + extMark(c[2]) + "</a></li>"; }).join("") +
        "</ul></li>";
    }).join("");
  }
  function mobileNav() {
    return NAV.map(function (n) {
      var cls = n.id === active ? ' class="is-active"' : "";
      if (!n.children) return "<li" + cls + '><a href="' + n.href + '"' + (n.id === active ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
      return "<li" + cls + "><details" + (n.id === active ? " open" : "") + "><summary>" + n.label + "</summary>" +
        '<ul class="mobile-sub"><li><a href="' + n.overview[1] + '"' + cur(n.overview[1]) + ">" + n.overview[0] + "</a></li>" +
        n.children.map(function (c) { return '<li><a href="' + c[1] + '"' + cur(c[1]) + ">" + c[0] + extMark(c[2]) + "</a></li>"; }).join("") +
        "</ul></details></li>";
    }).join("");
  }

  var headerHost = document.getElementById("site-header");
  if (headerHost) {
    var latest = document.body.hasAttribute("data-latest")
      ? '<div class="latest"><div class="container latest-inner"><span class="latest-label">Latest</span>' +
        '<a href="news.html#vaw">Kick-off ceremony of the 18-day campaign to end violence against women held in Panabo</a>' +
        '<time datetime="2026-11-26">Nov 26, 2026</time></div></div>'
      : "";
    headerHost.outerHTML =
      '<div class="govbar"><div class="container govbar-inner">' +
        '<div class="govbar-left"><a class="govph-mark" href="https://www.gov.ph/">GOVPH</a>' +
          '<span class="pst"><span class="pst-label">Philippine Standard Time: </span><strong id="pst-clock">–</strong></span></div>' +
        '<div class="govbar-right"><ul class="govbar-links">' +
          '<li><a href="transparency.html">Transparency Seal</a></li>' +
          '<li><a href="https://www.foi.gov.ph/">Freedom of Information</a></li>' +
          '<li><a href="sitemap.html">Site Map</a></li></ul>' +
          '<div class="a11y-menu">' +
            '<button type="button" class="a11y-trigger" aria-expanded="false" aria-controls="a11y-panel">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4.5" r="2"/><path d="M4 8.5 12 10l8-1.5M12 10v5m0 0-3.5 6.5M12 15l3.5 6.5"/></svg>' +
              '<span>Accessibility</span></button>' +
            '<div class="a11y-panel" id="a11y-panel" role="group" aria-labelledby="a11y-title" hidden>' +
              '<p class="a11y-title" id="a11y-title">Display settings</p>' +
              '<div class="a11y-row"><span class="a11y-label" id="ts-label">Text size</span>' +
                '<div class="ts-buttons" role="group" aria-labelledby="ts-label">' +
                  '<button type="button" class="ts-btn" data-size="sm" aria-pressed="false"><span aria-hidden="true">A−</span><span class="visually-hidden">Smaller text</span></button>' +
                  '<button type="button" class="ts-btn" data-size="md" aria-pressed="false"><span aria-hidden="true">A</span><span class="visually-hidden">Default text size</span></button>' +
                  '<button type="button" class="ts-btn" data-size="lg" aria-pressed="false"><span aria-hidden="true">A+</span><span class="visually-hidden">Larger text</span></button>' +
                "</div></div>" +
              '<div class="a11y-row"><span class="a11y-label">Contrast</span>' +
                '<button type="button" class="hc-toggle" aria-pressed="false"><span class="switch" aria-hidden="true"></span>High contrast <span class="hc-state" aria-hidden="true">Off</span></button></div>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div></div>" +
      '<header class="site-header">' +
        '<div class="container header-inner">' +
          '<a class="brand" href="index.html">' +
            '<img src="assets/img/seal.svg" width="76" height="76" alt="Seal of Panabo City (placeholder graphic for this student prototype)">' +
            '<span><span class="brand-eyebrow">Republic of the Philippines · Province of Davao del Norte</span>' +
            '<span class="brand-name">City Government of Panabo</span>' +
            '<span class="brand-tagline">Service to Panaboans, Service to God!</span></span>' +
          "</a>" +
          '<button type="button" class="menu-btn" aria-expanded="false" aria-controls="mobile-menu">' + I.menu + "Menu</button>" +
        "</div>" +
      "</header>" +
      '<nav class="main-nav" aria-label="Main menu"><ul class="container nav-list">' + desktopNav() + "</ul></nav>" +
      latest +
      '<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-labelledby="mm-title" hidden>' +
        '<div class="mobile-menu-head"><h2 id="mm-title">Main menu</h2>' +
          '<button type="button" class="close-btn">' + I.close + "Close</button></div>" +
        '<nav aria-label="Main menu (mobile)"><ul class="mobile-nav-list">' + mobileNav() + "</ul></nav>" +
        '<div class="mobile-menu-foot"><p class="small muted">Student prototype. For official information visit <a href="' + OFFICIAL + '">panabocity.gov.ph</a>.</p>' +
          '<p class="small"><a href="sitemap.html">Site Map</a> · <a href="transparency.html">Transparency Seal</a></p></div>' +
      "</div>";
  }

  /* Philippine Standard Time clock */
  var clock = document.getElementById("pst-clock");
  if (clock) {
    var fmt;
    try { fmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit" }); } catch (e) { fmt = null; }
    var tick = function () { clock.textContent = fmt ? fmt.format(new Date()) : new Date().toLocaleString(); };
    tick(); setInterval(tick, 1000);
  }

  /* Accessibility panel in the GOVPH bar */
  var a11yBtn = document.querySelector(".a11y-trigger");
  var a11yPanel = document.getElementById("a11y-panel");
  if (a11yBtn && a11yPanel) {
    var setA11y = function (open, refocus) {
      a11yPanel.hidden = !open; a11yBtn.setAttribute("aria-expanded", String(open));
      if (open) a11yPanel.querySelector("button").focus(); else if (refocus) a11yBtn.focus();
    };
    a11yBtn.addEventListener("click", function () { setA11y(a11yPanel.hidden, false); });
    a11yPanel.parentElement.addEventListener("keydown", function (e) { if (e.key === "Escape" && !a11yPanel.hidden) setA11y(false, true); });
    a11yPanel.parentElement.addEventListener("focusout", function (e) { if (e.relatedTarget && !a11yPanel.parentElement.contains(e.relatedTarget)) setA11y(false, false); });
    document.addEventListener("click", function (e) { if (!e.target.closest(".a11y-menu") && !a11yPanel.hidden) setA11y(false, false); });
  }

  /* Desktop dropdowns (disclosure pattern) */
  var toggles = document.querySelectorAll(".nav-toggle");
  function closeAll(except) {
    toggles.forEach(function (t) {
      if (t === except) return;
      t.setAttribute("aria-expanded", "false");
      document.getElementById(t.getAttribute("aria-controls")).hidden = true;
    });
  }
  toggles.forEach(function (t) {
    var panel = document.getElementById(t.getAttribute("aria-controls"));
    var item = t.parentElement;
    t.addEventListener("click", function () {
      var open = t.getAttribute("aria-expanded") !== "true";
      closeAll(t);
      t.setAttribute("aria-expanded", String(open)); panel.hidden = !open;
    });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); t.setAttribute("aria-expanded", "true"); panel.hidden = false; closeAll(t); panel.querySelector("a").focus(); }
    });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) { panel.hidden = true; t.setAttribute("aria-expanded", "false"); t.focus(); }
      if ((e.key === "ArrowDown" || e.key === "ArrowUp") && panel.contains(document.activeElement)) {
        e.preventDefault();
        var links = Array.prototype.slice.call(panel.querySelectorAll("a"));
        var i = links.indexOf(document.activeElement) + (e.key === "ArrowDown" ? 1 : -1);
        links[(i + links.length) % links.length].focus();
      }
    });
    item.addEventListener("focusout", function (e) { if (!item.contains(e.relatedTarget)) { panel.hidden = true; t.setAttribute("aria-expanded", "false"); } });
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".nav-item")) closeAll(null); });

  /* ---------- Footer ---------- */
  var footerHost = document.getElementById("site-footer");
  if (footerHost) {
    footerHost.outerHTML =
      '<footer class="site-footer">' +
        '<div class="container footer-main">' +
          '<div><div class="footer-brand"><img src="assets/img/seal.svg" width="60" height="60" alt="">' +
            '<div><h2>City Government of Panabo</h2><p class="small" style="margin:0">Province of Davao del Norte<br>Service to Panaboans, Service to God!</p></div></div>' +
            '<p class="small" style="margin-top:16px">This is a proposed student redesign prototype. It is not affiliated with or endorsed by the City Government of Panabo. For official services visit <a href="' + OFFICIAL + '">panabocity.gov.ph</a>.</p></div>' +
          '<div><h2>About this site</h2><ul>' +
            '<li><a href="sitemap.html">Site Map</a></li>' +
            '<li><a href="privacy.html">Privacy Notice</a></li>' +
            '<li><a href="transparency.html">Transparency Seal</a></li>' +
            '<li><a href="citizens-charter.html">Citizen’s Charter</a></li>' +
            '<li><a href="contact.html">Contact Us</a></li></ul></div>' +
          '<div><h2>Services</h2><ul>' +
            '<li><a href="forms.html">Downloadable Forms</a></li>' +
            '<li><a href="hotlines.html">Emergency Hotlines</a></li>' +
            '<li><a href="directory.html">City Directory</a></li>' +
            '<li><a href="faqs.html">FAQs</a></li>' +
            '<li><a href="https://www.filipizen.com/partners/ddn_panabo">e-Government Portal (eBOSS)</a></li></ul></div>' +
          '<div><h2>Transparency</h2><ul>' +
            '<li><a href="executive-orders.html">Executive Orders</a></li>' +
            '<li><a href="public-documents.html">Public Documents</a></li>' +
            '<li><a href="public-documents.html?cat=procurement">Bids and Awards</a></li>' +
            '<li><a href="https://www.facebook.com/panabocityPIO">City Information Office on Facebook</a></li></ul></div>' +
        "</div>" +
        '<div class="govph"><div class="container govph-inner">' +
          '<div class="govph-seal"><svg viewBox="0 0 64 64" role="img" aria-label="Republic of the Philippines emblem (simplified placeholder)"><circle cx="32" cy="32" r="30" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="32" cy="32" r="9" fill="#F2C94C"/><g stroke="#F2C94C" stroke-width="3" stroke-linecap="round"><path d="M32 12v8M32 44v8M12 32h8M44 32h8M18 18l5 5M41 41l5 5M46 18l-5 5M23 41l-5 5"/></g></svg>' +
            '<div><h2>Republic of the Philippines</h2><p class="small" style="margin:0">All content is in the public domain unless otherwise stated.</p></div></div>' +
          '<div><h2>About GOVPH</h2><ul>' +
            '<li><a href="https://www.gov.ph/">GOV.PH</a></li>' +
            '<li><a href="https://data.gov.ph/">Open Data Portal</a></li>' +
            '<li><a href="https://www.officialgazette.gov.ph/">Official Gazette</a></li></ul></div>' +
          '<div><h2>Government Links</h2><ul>' +
            '<li><a href="https://op-proper.gov.ph/">Office of the President</a></li>' +
            '<li><a href="https://www.ovp.gov.ph/">Office of the Vice President</a></li>' +
            '<li><a href="https://web.senate.gov.ph/">Senate of the Philippines</a></li>' +
            '<li><a href="https://www.congress.gov.ph/">House of Representatives</a></li></ul></div>' +
          '<div><h2>Judiciary</h2><ul>' +
            '<li><a href="https://sc.judiciary.gov.ph/">Supreme Court</a></li>' +
            '<li><a href="https://ca.judiciary.gov.ph/">Court of Appeals</a></li>' +
            '<li><a href="https://sb.judiciary.gov.ph/">Sandiganbayan</a></li></ul></div>' +
        "</div>" +
        '<div class="container footer-bottom"><p>© 2026 Student design concept for the City Government of Panabo, Davao del Norte.</p>' +
          '<p>Official website: <a href="' + OFFICIAL + '">panabocity.gov.ph</a></p></div>' +
        "</div>" +
      "</footer>" +
      '<div class="toast" role="status" aria-live="polite" id="toast"></div>';
  }

  applySize(store("pp-size") || "md");
  applyContrast(store("pp-hc") === "1");

  document.querySelectorAll(".ts-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      applySize(b.dataset.size); store("pp-size", b.dataset.size);
      toast("Text size set to " + ({ sm: "smaller", md: "default", lg: "larger" })[b.dataset.size] + ".");
    });
  });
  document.querySelectorAll(".hc-toggle").forEach(function (b) {
    b.addEventListener("click", function () {
      var on = !root.classList.contains("hc");
      applyContrast(on); store("pp-hc", on ? "1" : "0");
      toast("High contrast " + (on ? "on." : "off."));
    });
  });

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = document.getElementById("toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3500);
  }
  window.PP_TOAST = toast;

  /* ---------- Mobile menu (focus-trapped dialog) ---------- */
  var menu = document.getElementById("mobile-menu");
  var menuBtn = document.querySelector(".menu-btn");
  if (menu && menuBtn) {
    var closeBtn = menu.querySelector(".close-btn");
    var openMenu = function () { menu.hidden = false; document.body.classList.add("menu-open"); menuBtn.setAttribute("aria-expanded", "true"); closeBtn.focus(); };
    var closeMenu = function () { menu.hidden = true; document.body.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false"); menuBtn.focus(); };
    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    menu.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeMenu(); return; }
      if (e.key !== "Tab") return;
      var f = Array.prototype.filter.call(menu.querySelectorAll("a, button, summary"), function (el) { return el.offsetParent !== null; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { document.body.classList.remove("menu-open"); }); });
    window.addEventListener("resize", function () { if (window.innerWidth > 960 && !menu.hidden) closeMenu(); });
  }

  /* ---------- Demo download buttons ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-demo]");
    if (!b) return;
    e.preventDefault();
    toast("Demo only: “" + b.getAttribute("data-demo") + "” is sample content, so no file is available in this prototype.");
  });

  /* ---------- Coverflow carousel ---------- */
  var car = document.querySelector("[data-carousel]");
  if (car) {
    var slides = car.querySelectorAll("[data-slide]");
    var dots = car.querySelectorAll(".c-dot");
    var playBtn = car.querySelector("[data-play]");
    var live = car.querySelector("[aria-live]");
    var altOut = car.querySelector("[data-alt-out]");
    var n = slides.length, idx = Math.floor(n / 2), timer = null;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var playing = !reduce;

    var show = function (k, announce) {
      idx = (k + n) % n;
      slides.forEach(function (s, i) {
        var d = ((i - idx + n + Math.floor(n / 2)) % n) - Math.floor(n / 2); /* -2..2, wraps around */
        s.setAttribute("data-pos", String(d));
        var on = d === 0;
        s.classList.toggle("is-active", on);
        s.setAttribute("aria-hidden", String(!on));
        s.querySelectorAll("a").forEach(function (a) { a.tabIndex = on ? 0 : -1; });
      });
      dots.forEach(function (dt, i) { dt.setAttribute("aria-current", i === idx ? "true" : "false"); });
      if (altOut) altOut.textContent = "“" + slides[idx].getAttribute("data-alt") + "”";
      if (announce && live) live.textContent = "Slide " + (idx + 1) + " of " + n + ": " + slides[idx].querySelector("h3").textContent;
    };
    var setPlaying = function (p) {
      playing = p; clearInterval(timer);
      if (p) timer = setInterval(function () { show(idx + 1, false); }, 6000);
      playBtn.innerHTML = p
        ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg><span class="lbl">Pause</span>'
        : '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg><span class="lbl">Play</span>';
      playBtn.setAttribute("aria-label", p ? "Pause slideshow" : "Play slideshow");
      if (live) live.setAttribute("aria-live", p ? "off" : "polite");
    };
    var restart = function () { if (playing) setPlaying(true); };
    car.querySelector("[data-prev]").addEventListener("click", function () { show(idx - 1, true); restart(); });
    car.querySelector("[data-next]").addEventListener("click", function () { show(idx + 1, true); restart(); });
    playBtn.addEventListener("click", function () { setPlaying(!playing); toast(playing ? "Slideshow playing." : "Slideshow paused."); });
    dots.forEach(function (d, i) { d.addEventListener("click", function () { show(i, true); restart(); }); });
    /* clicking a side slide brings it to the centre */
    slides.forEach(function (s, i) { s.addEventListener("click", function (e) { if (i !== idx) { e.preventDefault(); show(i, true); restart(); } }); });
    /* swipe on touch screens */
    var x0 = null;
    car.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    car.addEventListener("touchend", function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { show(idx + (dx < 0 ? 1 : -1), true); restart(); }
    });
    car.addEventListener("focusin", function () { clearInterval(timer); });
    car.addEventListener("focusout", function (e) { if (!car.contains(e.relatedTarget)) restart(); });
    car.addEventListener("mouseenter", function () { clearInterval(timer); });
    car.addEventListener("mouseleave", restart);
    show(idx, false); setPlaying(playing);
  }

  /* ---------- Homepage service search ---------- */
  var INDEX = [
    ["Citizen’s Charter", "citizens-charter.html", "Service"],
    ["Downloadable Forms", "forms.html", "Service"],
    ["Business Permit Application Form", "forms.html?q=business", "Form"],
    ["Barangay Clearance Request", "forms.html?q=barangay", "Form"],
    ["Civil Registry Document Request", "forms.html?q=civil", "Form"],
    ["Building Permit Application", "forms.html?q=building", "Form"],
    ["Cedula (Community Tax Certificate) Request", "forms.html?q=cedula", "Form"],
    ["Health Certificate Application", "forms.html?q=health", "Form"],
    ["City Directory", "directory.html", "Service"],
    ["Emergency Hotlines", "hotlines.html", "Service"],
    ["Frequently Asked Questions (FAQs)", "faqs.html", "Service"],
    ["Contact Us", "contact.html", "Page"],
    ["Executive Orders", "executive-orders.html", "Transparency"],
    ["Public Documents", "public-documents.html", "Transparency"],
    ["Bids, Awards and Procurement", "public-documents.html?cat=procurement", "Transparency"],
    ["Transparency Seal", "transparency.html", "Transparency"],
    ["e-Government Portal (eBOSS) – business permits online", "https://www.filipizen.com/partners/ddn_panabo", "Online service"],
    ["Business Permits and Licensing Office (BPLO)", "directory.html#bplo", "Office"],
    ["City Civil Registry Office", "directory.html#ccro", "Office"],
    ["Office of the City Treasurer", "directory.html#treasurer", "Office"],
    ["Office of the Building Official", "directory.html#obo", "Office"],
    ["City Health Office", "directory.html#cho", "Office"],
    ["City Disaster Risk Reduction and Management Office (CDRRMO)", "hotlines.html", "Office"],
    ["Office of the City Mayor", "directory.html#mayor", "Office"],
    ["Site Map", "sitemap.html", "Page"],
    ["Privacy Notice", "privacy.html", "Page"]
  ];
  var sForm = document.querySelector("[data-site-search]");
  if (sForm) {
    var sInput = sForm.querySelector("input");
    var sOut = document.getElementById("search-results");
    var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    var runSearch = function (q) {
      q = q.trim().toLowerCase();
      if (!q) { sOut.innerHTML = ""; return; }
      var words = q.split(/\s+/);
      var hits = INDEX.filter(function (r) { var t = (r[0] + " " + r[2]).toLowerCase(); return words.every(function (w) { return t.indexOf(w) > -1; }); });
      sOut.innerHTML = '<div class="results-box"><h2>' + (hits.length ? hits.length + " result" + (hits.length > 1 ? "s" : "") + " for “" + esc(q) + "”" : "No results for “" + esc(q) + "”") + "</h2>" +
        (hits.length
          ? "<ul>" + hits.slice(0, 8).map(function (r) { return '<li><a href="' + r[1] + '">' + esc(r[0]) + '</a><span class="type">' + r[2] + "</span></li>"; }).join("") + "</ul>"
          : '<p>Try a shorter word such as “permit”, “clearance” or “health”, or browse the <a href="sitemap.html">Site Map</a>.</p>') + "</div>";
    };
    sForm.addEventListener("submit", function (e) { e.preventDefault(); runSearch(sInput.value); });
    sInput.addEventListener("input", function () { if (sInput.value.trim().length >= 2 || !sInput.value) runSearch(sInput.value); });
    document.querySelectorAll("[data-suggest]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); sInput.value = a.dataset.suggest; runSearch(a.dataset.suggest); sInput.focus(); });
    });
  }

  /* ---------- Generic list filter (forms, executive orders, docs) ---------- */
  document.querySelectorAll("[data-filter-list]").forEach(function (wrap) {
    var text = wrap.querySelector("[data-filter-text]");
    var sel = wrap.querySelector("[data-filter-select]");
    var rows = wrap.querySelectorAll("[data-row]");
    var count = wrap.querySelector("[data-count]");
    var empty = wrap.querySelector("[data-empty]");
    var emptyMsg = wrap.querySelector("[data-empty-msg]");
    var listEl = wrap.querySelector("[data-list]");
    var noun = wrap.getAttribute("data-noun") || "items";

    var params = new URLSearchParams(location.search);
    if (params.get("q") && text) text.value = params.get("q");
    if (params.get("cat") && sel) { sel.value = params.get("cat"); if (sel.selectedIndex < 0) sel.value = ""; }

    function apply() {
      var q = text ? text.value.trim().toLowerCase() : "";
      var f = sel ? sel.value : "";
      var n = 0;
      rows.forEach(function (r) {
        var ok = (!q || r.getAttribute("data-search").toLowerCase().indexOf(q) > -1) && (!f || r.getAttribute("data-group") === f);
        r.hidden = !ok; if (ok) n++;
      });
      if (count) count.textContent = "Showing " + n + " of " + rows.length + " " + noun + (q ? " matching “" + text.value.trim() + "”" : "") + (f && sel ? " in " + sel.options[sel.selectedIndex].text : "") + ".";
      if (empty) {
        empty.hidden = n > 0;
        if (listEl) listEl.hidden = n === 0;
        if (emptyMsg && n === 0) {
          var tmpl = sel && sel.selectedOptions[0] && sel.selectedOptions[0].getAttribute("data-empty");
          emptyMsg.textContent = (!q && tmpl) ? tmpl : "No " + noun + " match your search. Check the spelling or choose a different filter.";
        }
      }
    }
    if (text) text.addEventListener("input", apply);
    if (sel) sel.addEventListener("change", apply);
    wrap.querySelectorAll("[data-filter-reset]").forEach(function (r) {
      r.addEventListener("click", function () { if (text) text.value = ""; if (sel) sel.value = ""; apply(); (text || sel).focus(); });
    });
    var frm = wrap.querySelector("form"); if (frm) frm.addEventListener("submit", function (e) { e.preventDefault(); apply(); });
    apply();
  });

  /* ---------- Document preview (always fails in prototype) ---------- */
  document.querySelectorAll("[data-preview]").forEach(function (b) {
    b.addEventListener("click", function () {
      var area = document.getElementById("preview-area");
      var name = b.getAttribute("data-preview");
      area.innerHTML = '<p class="muted">Loading preview of ' + name + "…</p>";
      area.focus();
      setTimeout(function () {
        area.innerHTML = '<div class="preview-error" role="alert"><strong aria-hidden="true">!</strong><div><p style="margin:0 0 6px"><strong>This document could not be displayed. Download the PDF instead.</strong></p>' +
          '<p class="small" style="margin:0">Document: ' + name + '. <button type="button" class="btn btn-outline" style="margin-top:8px" data-demo="' + name + '">Download PDF: ' + name + " (demo)</button></p></div></div>";
      }, 700);
    });
  });

  /* ---------- Contact form validation ---------- */
  var cForm = document.querySelector("[data-contact-form]");
  if (cForm) {
    cForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      cForm.querySelectorAll("[required]").forEach(function (f) {
        var err = document.getElementById(f.id + "-err");
        var bad = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
        f.setAttribute("aria-invalid", String(bad));
        if (err) err.textContent = bad ? (f.type === "email" && f.value.trim() ? "Enter a valid email address, like juan@example.com." : "This field is required.") : "";
        if (bad && !firstBad) firstBad = f;
      });
      if (firstBad) { firstBad.focus(); return; }
      var ok = document.getElementById("contact-success");
      ok.hidden = false; cForm.reset(); ok.focus();
    });
  }
})();
