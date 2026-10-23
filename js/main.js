/* Portfolio app: hash router (one route at a time), trail navigation, mobile menu,
   project/experience explorers with pager + swipe, case-study sheet, workflow stepper,
   contact actions. No dependencies. */
(function () {
  "use strict";

  var DATA = window.PORTFOLIO;
  if (!DATA) return;

  var ROUTES = ["home", "projects", "experience", "about", "workflow", "contact"];
  var LABELS = { home: "Home", projects: "Projects", experience: "Experience", about: "About", workflow: "Workflow", contact: "Contact" };
  var STOP_LBL = { home: "Trailhead", projects: "Projects", experience: "Experience", about: "About me", workflow: "Workflow", contact: "Get in touch" };
  var NUMBERS = { projects: "01", experience: "02", about: "03", workflow: "04" };
  var TITLES = {
    home: "Benjamin Thomas | UX/UI Designer and Front-End Developer",
    projects: "Projects | Benjamin Thomas", experience: "Experience | Benjamin Thomas",
    about: "About | Benjamin Thomas", workflow: "Workflow | Benjamin Thomas", contact: "Contact | Benjamin Thomas"
  };
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var header = document.querySelector(".site-header");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var desktopMq = window.matchMedia("(min-width: 1100px)");
  var mobileMq = window.matchMedia("(max-width: 899px)");

  /* ================================================================ helpers */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function icon(name, cls) { return '<svg class="icon' + (cls ? " " + cls : "") + '" aria-hidden="true" focusable="false"><use href="#' + name + '"></use></svg>'; }
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function parseDate(iso) { var p = iso.split("-"); return { y: +p[0], m: +p[1], d: p[2] ? +p[2] : null }; }
  function monthYear(iso) { var d = parseDate(iso); return MONTHS[d.m - 1] + " " + d.y; }
  function timeTag(iso, text) { return '<time datetime="' + esc(iso) + '">' + esc(text) + "</time>"; }
  function dateRange(start, end) {
    if (!end) return timeTag(start, monthYear(start)) + " – Present";
    var s = parseDate(start), e = parseDate(end);
    if (s.d && e.d && s.y === e.y && s.m === e.m) return '<time datetime="' + start + '">' + s.d + "</time>–" + timeTag(end, e.d + " " + MONTHS[e.m - 1] + " " + e.y);
    if (s.y === e.y && s.m === e.m) return timeTag(start, monthYear(start));
    return timeTag(start, monthYear(start)) + " – " + timeTag(end, monthYear(end));
  }
  function dateText(start, end) { var t = document.createElement("span"); t.innerHTML = dateRange(start, end); return t.textContent; }
  function smooth() { return reduceMotion.matches ? "auto" : "smooth"; }
  function navH() { return header.getBoundingClientRect().height; }

  function srcset(src, sizes) {
    var small = src.replace(/\.webp$/, "-640.webp");
    return 'srcset="' + esc(small) + " 640w, " + esc(src) + ' 1200w" sizes="' + sizes + '"';
  }
  var LINK_ICONS = { live: "play", github: "b-github", figma: "b-figma-color", tableau: "b-tableau", research: "b-figma-color" };
  var NEW_TAB = '<span class="visually-hidden"> (opens in a new tab)</span>';

  /* Link group: first link is the painted primary button, the rest are outlined chips.
     compact: show each link's short label (full label stays in the accessible name). */
  function links(list, opts) {
    opts = opts || {};
    if (!list || !list.length) return "";
    var notes = [];
    var shown = opts.limit ? list.slice(0, opts.limit) : list;
    var html = shown.map(function (l, i) {
      if (l.note && notes.indexOf(l.note) === -1) notes.push(l.note);
      var full = esc(l.label);
      var label = opts.compact && l.short ? '<span aria-hidden="true">' + esc(l.short) + '</span><span class="visually-hidden">' + full + "</span>" : full;
      if (i === 0 && !opts.noPrimary) {
        return '<a class="btn btn--primary" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + icon(LINK_ICONS[l.type] || "external", l.type === "figma" || l.type === "research" ? "icon-brand" : "") +
          "<span>" + label + "</span>" + icon("arrow-ur") + NEW_TAB + "</a>";
      }
      return '<a class="link-chip" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + icon(LINK_ICONS[l.type] || "external", l.type === "figma" || l.type === "research" ? "icon-brand" : "") +
        "<span>" + label + "</span>" + icon("arrow-ur", "ext") + NEW_TAB + "</a>";
    }).join("");
    return '<div class="links">' + html + (notes.length ? '<p class="link-note">' + esc(notes.join(" ")) + "</p>" : "") + "</div>";
  }
  function cardLinks(all) {
    var hasHifi = all.some(function (l) { return /high-fidelity/i.test(l.label); });
    return hasHifi ? all.filter(function (l) { return !/wireframe/i.test(l.label); }) : all;
  }
  function moreLinks(all, shown, word) {
    var n = all.length - shown;
    return n > 0 ? '<p class="link-note">' + n + " more " + (word ? word + " " : "") + "link" + (n > 1 ? "s" : "") + " in the full case study.</p>" : "";
  }
  function list(items, cls) {
    if (!items || !items.length) return "";
    return '<ul class="' + (cls || "text-list") + '">' + items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }
  function checks(items, cls) {
    if (!items || !items.length) return "";
    return '<ul class="' + (cls || "check-list") + '">' + items.map(function (t) { return "<li>" + icon("check-sm") + "<span>" + esc(t) + "</span></li>"; }).join("") + "</ul>";
  }
  function chips(items, muted) {
    if (!items || !items.length) return "";
    return '<ul class="chips' + (muted ? " chips--muted" : "") + '">' + items.map(function (t) { return '<li class="chip">' + esc(t) + "</li>"; }).join("") + "</ul>";
  }
  function block(title, inner) { return inner ? '<div class="block"><h3 class="label">' + esc(title) + "</h3>" + inner + "</div>" : ""; }
  function paras(arr) { return (arr || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""); }
  function animateIn(el, cls) {
    if (reduceMotion.matches || !el) return;
    cls = cls || "is-entering";
    el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
  }

  /* ================================================================ toast + copy */
  var toast = $("#toast");
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(function () { toast.classList.remove("is-visible"); }, 2600);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
  var srStatus = document.createElement("p");
  srStatus.className = "visually-hidden"; srStatus.setAttribute("role", "status"); srStatus.setAttribute("aria-live", "polite");
  document.body.appendChild(srStatus);
  function announce(msg) { srStatus.textContent = ""; setTimeout(function () { srStatus.textContent = msg; }, 30); }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]");
    if (!b) return;
    var text = b.getAttribute("data-copy"), what = b.getAttribute("data-copy-label") || "Text";
    copyText(text).then(function (ok) {
      var word = $(".copy-word", b);
      if (ok) {
        if (word) { if (!b.__orig) b.__orig = word.textContent; word.textContent = "Copied"; }
        b.classList.add("is-copied");
        announce(what + " copied.");
        clearTimeout(b.__t);
        b.__t = setTimeout(function () { b.classList.remove("is-copied"); if (word) word.textContent = b.__orig; }, 2200);
      } else {
        // never claim a copy that did not happen
        showToast("Copying is not available here. " + what + ": " + text);
        announce("Copying is not available here. " + what + ": " + text);
      }
    });
  });

  /* ================================================================ tabs */
  function tabBar(id, label, defs) {
    return '<div class="tabs" role="tablist" aria-label="' + esc(label) + '">' + defs.map(function (t, i) {
      return '<button type="button" class="tab" role="tab" id="' + id + "-tab-" + t.key + '" aria-controls="' + id + "-panel-" + t.key +
        '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + (t.icon ? icon(t.icon) : "") + "<span>" + esc(t.label) + "</span></button>";
    }).join("") + "</div>";
  }
  function tabPanel(id, key, inner, first) {
    return '<div class="tab-panel" role="tabpanel" id="' + id + "-panel-" + key + '" aria-labelledby="' + id + "-tab-" + key + '" tabindex="0"' + (first ? "" : " hidden") + ">" + inner + "</div>";
  }
  function initTabs(root) {
    $$('[role="tablist"]', root).forEach(function (tl) {
      if (tl.classList.contains("wf-stops")) return;
      var tabs = $$('[role="tab"]', tl);
      function select(tab, focus) {
        // Switching to a shorter panel shrinks the page; if you had scrolled down, the
        // browser then pulls the view up ("jumps to the top"). Keep the tab bar where it
        // was, and hold the old height when needed so nothing moves.
        var sc = tl.closest(".drawer-body"), before = tl.getBoundingClientRect().top, oldH = 0, next = null;
        tabs.forEach(function (t) {
          var p = document.getElementById(t.getAttribute("aria-controls"));
          if (p && !p.hidden) oldH = p.offsetHeight;
        });
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.tabIndex = on ? 0 : -1;
          var p = document.getElementById(t.getAttribute("aria-controls"));
          if (p) { p.hidden = !on; p.style.minHeight = ""; if (on) { next = p; animateIn(p, "is-shown"); } }
        });
        var moved = tl.getBoundingClientRect().top - before;
        if (Math.abs(moved) > 1 && next) {
          if (next.offsetHeight < oldH) next.style.minHeight = oldH + "px";
          moved = tl.getBoundingClientRect().top - before;
          if (sc) sc.scrollTop += moved; else window.scrollBy(0, moved);
        }
        if (focus) tab.focus({ preventScroll: true });
      }
      tabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () { select(tab, false); });
        tab.addEventListener("keydown", function (e) {
          var n = null;
          if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
          else if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
          else if (e.key === "Home") n = tabs[0];
          else if (e.key === "End") n = tabs[tabs.length - 1];
          if (n) { e.preventDefault(); select(n, true); }
        });
      });
    });
  }

  /* ================================================================ focus trap */
  function focusables(container) {
    return $$('a[href], button:not([disabled]), [tabindex="0"], summary, select', container).filter(function (el) {
      return el.offsetParent !== null || el === document.activeElement;
    });
  }
  function trap(e, list) {
    if (e.key !== "Tab" || !list.length) return;
    var first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  /* Scroll lock that keeps the page scrollbar visible (no layout shift): instead of
     overflow:hidden, scroll input outside the open panel is cancelled. Inner panels
     (menu, case study) still scroll normally. */
  var touchY = 0;
  function scrollableArea(t) { return t && t.closest && t.closest(".mm-scroll, .drawer-body"); }
  function atEdge(sc, dy) { return (dy < 0 && sc.scrollTop <= 0) || (dy > 0 && sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 1); }
  function onWheel(e) { var sc = scrollableArea(e.target); if (!sc || atEdge(sc, e.deltaY)) e.preventDefault(); }
  function onTouchStart(e) { touchY = e.touches[0].clientY; }
  function onTouchMove(e) { var sc = scrollableArea(e.target); var dy = touchY - e.touches[0].clientY; if (!sc || atEdge(sc, dy)) e.preventDefault(); }
  var SCROLL_KEYS = { " ": 1, PageUp: -1, PageDown: 1, Home: -1, End: 1, ArrowUp: -1, ArrowDown: 1 };
  function onKey(e) {
    if (!(e.key in SCROLL_KEYS) || e.target.closest("input, textarea, select, [role=tablist], .wf-stops")) return;
    if (e.key === " " && e.target.closest("button, a, summary")) return;
    var sc = scrollableArea(document.activeElement);
    if (!sc || atEdge(sc, SCROLL_KEYS[e.key])) e.preventDefault();
  }
  var scrollLocks = 0;
  function lockScroll(on) {
    var was = scrollLocks > 0;
    scrollLocks = Math.max(0, scrollLocks + (on ? 1 : -1));
    var now = scrollLocks > 0;
    if (now === was) return;
    var fn = now ? "addEventListener" : "removeEventListener";
    document[fn]("wheel", onWheel, { passive: false });
    document[fn]("touchstart", onTouchStart, { passive: true });
    document[fn]("touchmove", onTouchMove, { passive: false });
    document[fn]("keydown", onKey);
    document.documentElement.classList.toggle("is-locked", now);
  }

  /* ================================================================ case-study sheet */
  var drawer = $("#drawer");
  var drawerBody = $("#drawer-body");
  var drawerKicker = $("#drawer-kicker");
  var drawerState = { open: false, pushed: false, returnTo: null, closing: null };

  function openDrawer(kicker, backLabel, html, returnTo) {
    clearTimeout(drawerState.closing);
    drawer.classList.remove("is-closing");
    drawerState.returnTo = returnTo || document.activeElement;
    drawerKicker.textContent = kicker;
    $(".drawer-back-label", drawer).textContent = backLabel;
    drawerBody.innerHTML = html;
    drawerBody.scrollTop = 0;
    if (!drawerState.open) lockScroll(true);
    drawer.hidden = false;
    drawerState.open = true;
    initTabs(drawerBody);
    var t = $(".drawer-title", drawerBody);
    (t || $(".drawer-close", drawer)).focus({ preventScroll: true });
  }
  function finishClose() {
    drawer.hidden = true;
    drawer.classList.remove("is-closing");
    var r = drawerState.returnTo;
    if (r && document.contains(r)) r.focus({ preventScroll: true });
  }
  function closeDrawer() {
    if (!drawerState.open) return;
    drawerState.open = false;
    drawerState.pushed = false;
    lockScroll(false);
    drawer.classList.add("is-closing");
    drawerState.closing = setTimeout(finishClose, reduceMotion.matches ? 160 : 280);
  }
  /* User-initiated close: step back through history if opening added an entry */
  function requestCloseDrawer() {
    if (!drawerState.open) return;
    if (drawerState.pushed) { history.back(); return; }
    var h = location.hash.replace(/\/case$/, "");
    try { history.replaceState(null, "", h); } catch (e) { /* ignore */ }
    lastState = { route: lastState.route, sub: lastState.sub, caseOpen: false };
    closeDrawer();
  }
  drawer.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) requestCloseDrawer(); });
  drawer.addEventListener("keydown", function (e) { trap(e, focusables(drawer)); });

  /* ================================================================ explorer */
  function Explorer(o) {
    this.items = o.items;
    this.visible = o.items.slice();
    this.route = o.route;
    this.listEl = document.getElementById(o.listId);
    this.cardEl = document.getElementById(o.cardId);
    this.statusEl = document.getElementById(o.statusId);
    this.root = this.listEl.closest(".explorer");
    this.noun = o.noun;
    this.renderCard = o.renderCard;
    this.renderPick = o.renderPick;
    this.renderCase = o.renderCase;
    this.caseKicker = o.caseKicker;
    this.endHtml = o.endHtml || "";
    this.index = 0;
    this.bind();
    this.renderList();
    this.select(0, { silent: true, noUrl: true });
  }
  Explorer.prototype.bind = function () {
    var self = this;
    // List keyboard: arrow keys move between entries
    this.listEl.addEventListener("keydown", function (e) {
      var keys = desktopMq.matches ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];
      var dir = e.key === keys[0] ? -1 : e.key === keys[1] ? 1 : 0;
      if (!dir) return;
      var btns = $$(".pick", self.listEl), i = btns.indexOf(document.activeElement);
      if (i === -1) return;
      e.preventDefault();
      var n = (i + dir + btns.length) % btns.length;
      btns[n].focus({ preventScroll: true });
      self.revealPick(n);
    });
    this.listEl.addEventListener("click", function (e) {
      if (stripDrag.moved) { e.preventDefault(); return; }
      var b = e.target.closest(".pick");
      if (b) self.select(+b.getAttribute("data-index"), {});
    });
    // Pager inside the card: arrows + clickable dots
    this.cardEl.addEventListener("click", function (e) {
      var st = e.target.closest("[data-step]");
      if (st && !st.disabled) { self.step(+st.getAttribute("data-step"), "[data-step=\"" + st.getAttribute("data-step") + "\"]"); return; }
      var more = e.target.closest(".skills-more");
      if (more) {
        var ul = more.closest(".sum-skills");
        var open = more.getAttribute("aria-expanded") !== "true";
        $$(".is-extra", ul).forEach(function (li) { li.hidden = !open; });
        more.setAttribute("aria-expanded", String(open));
        $(".skills-more-label", more).textContent = open ? "Show fewer" : "+" + more.getAttribute("data-count") + " more";
        return;
      }
      var dot = e.target.closest("[data-goto]");
      if (dot) { self.select(+dot.getAttribute("data-goto"), { refocus: '[data-goto="' + dot.getAttribute("data-goto") + '"]' }); return; }
      var cb = e.target.closest(".case-btn");
      if (cb) self.openCase(self.visible[self.index], cb);
    });
    this.cardEl.addEventListener("keydown", function (e) {
      var dot = e.target.closest("[data-goto]");
      if (!dot) return;
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = (self.index + d + self.visible.length) % self.visible.length;
      self.select(n, { refocus: '[data-goto="' + n + '"]', dir: d });
    });
    var stripDrag = { x: 0, left: 0, id: null, moved: false };
    this.listEl.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0 || desktopMq.matches) return;
      stripDrag = { x: e.clientX, left: self.listEl.scrollLeft, id: e.pointerId, moved: false };
    });
    this.listEl.addEventListener("pointermove", function (e) {
      if (stripDrag.id !== e.pointerId) return;
      var dx = e.clientX - stripDrag.x;
      if (!stripDrag.moved && Math.abs(dx) < 6) return;
      if (!stripDrag.moved) {
        stripDrag.moved = true;
        self.listEl.classList.add("is-dragging");
        try { self.listEl.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      }
      self.listEl.scrollLeft = stripDrag.left - dx;
    });
    function endStrip(e) {
      if (stripDrag.id !== e.pointerId) return;
      stripDrag.id = null;
      self.listEl.classList.remove("is-dragging");
      if (stripDrag.moved) setTimeout(function () { stripDrag.moved = false; }, 0);
    }
    this.listEl.addEventListener("pointerup", endStrip);
    this.listEl.addEventListener("pointercancel", endStrip);
    this.listEl.addEventListener("dragstart", function (e) { e.preventDefault(); });
  };
  Explorer.prototype.renderList = function () {
    var self = this;
    this.listEl.innerHTML = '<li class="pick-start" aria-hidden="true"><span class="pick-start-mark">' + icon("tent") + '</span><span class="pick-start-text">Start</span></li>' +
      this.visible.map(function (it, i) {
      return '<li><button type="button" class="pick" data-index="' + i + '" aria-controls="' + self.cardEl.id + '" aria-current="false">' +
        '<span class="pick-num">' + pad(i + 1) + "</span>" + self.renderPick(it) + "</button></li>";
    }).join("") + this.endHtml;
    $(".pc-total", this.root).textContent = pad(this.visible.length);
  };
  Explorer.prototype.revealPick = function (i) {
    // Horizontal strip only: scroll the strip, never the page
    if (desktopMq.matches) return;
    var b = $$(".pick", this.listEl)[i], li = b && b.parentNode;
    if (!li) return;
    var L = this.listEl, pad = parseInt(getComputedStyle(L).paddingLeft, 10);
    var left = li.offsetLeft - L.scrollLeft, right = left + li.offsetWidth;
    if (left >= pad && right <= L.clientWidth - 24) return;               // already in view: leave the strip alone
    var target = i === 0 ? 0 : li.offsetLeft - Math.max(pad, (L.clientWidth - li.offsetWidth) / 2);
    L.scrollTo({ left: Math.max(0, target), behavior: smooth() });
  };
  /* The trail is lit from Start to the entry you are on (vertical list and sign strip) */
  Explorer.prototype.lightPath = function () {
    var b = $$(".pick", this.listEl)[this.index], li = b && b.parentNode;
    if (!li) return;
    this.listEl.style.setProperty("--lit-y", Math.round(li.offsetTop + li.offsetHeight / 2) + "px");
    this.listEl.style.setProperty("--lit-x", Math.round(li.offsetLeft + 20) + "px");
  };
  Explorer.prototype.setVisible = function (items) {
    var cur = this.visible[this.index] && this.visible[this.index].id;
    this.visible = items;
    this.renderList();
    var keep = items.findIndex(function (p) { return p.id === cur; });
    this.select(keep === -1 ? 0 : keep, { silent: keep !== -1 });
  };
  Explorer.prototype.step = function (dir, refocus) {
    var len = this.visible.length;
    if (len < 2) return;
    this.select((this.index + dir + len) % len, { refocus: refocus, dir: dir });
  };
  Explorer.prototype.pager = function (i) {
    var self = this, len = this.visible.length;
    var Noun = this.noun.charAt(0).toUpperCase() + this.noun.slice(1);
    var dots = this.visible.map(function (it, k) {
      return '<button type="button" class="pager-dot" data-goto="' + k + '" aria-label="' + esc(Noun) + " " + (k + 1) + ": " + esc(it.shortTitle) + '"' +
        (k === i ? ' aria-current="true"' : "") + ' tabindex="' + (k === i ? 0 : -1) + '"><span></span></button>';
    }).join("");
    // The list loops: Previous on the first entry goes to the last, Next on the last goes to the first
    function stepBtn(dir) {
      var k = (i + dir + len) % len, item = this.visible[k], wrap = dir < 0 ? i === 0 : i === len - 1;
      var label = wrap ? (dir < 0 ? 'Go to last <span class="pg-noun">' + self.noun + "</span>" : 'Back to first <span class="pg-noun">' + self.noun + "</span>")
                       : (dir < 0 ? "Previous" : "Next") + ' <span class="pg-noun">' + self.noun + "</span>";
      var ic = '<span class="pager-ic">' + icon(dir < 0 ? "arrow-l" : "arrow-r") + "</span>";
      return '<button type="button" class="pager-step pager-step--' + (dir < 0 ? "prev" : "next") + (wrap ? " is-wrap" : "") + '" data-step="' + dir + '"' + (len < 2 ? " disabled" : "") +
        ' aria-label="' + (wrap ? (dir < 0 ? "Go to last " : "Back to first ") : (dir < 0 ? "Previous " : "Next ")) + self.noun + ": " + esc(item.shortTitle) + '">' +
        (dir < 0 ? ic : "") + '<span class="pager-step-text" aria-hidden="true"><small>' + label + '</small><span class="pager-step-name"><b>' + pad(k + 1) + "</b> " + esc(item.shortTitle) + "</span></span>" +
        (dir > 0 ? ic : "") + "</button>";
    }
    return '<div class="pager"><div class="pager-row">' + stepBtn.call(this, -1) + stepBtn.call(this, 1) + "</div>" +
      '<div class="pager-dots" role="group" aria-label="Choose a ' + this.noun + '">' + dots + "</div></div>";
  };
  Explorer.prototype.select = function (i, o) {
    o = o || {};
    var item = this.visible[i];
    if (!item) return;
    var dir = o.dir || (i > this.index ? 1 : i < this.index ? -1 : 0);
    this.index = i;
    $$(".pick", this.listEl).forEach(function (b, bi) {
      b.setAttribute("aria-current", bi === i ? "true" : "false");
      b.parentNode.classList.toggle("is-current", bi === i);
      b.parentNode.classList.toggle("is-passed", bi < i);
    });
    this.revealPick(i);
    this.lightPath();
    $(".pc-current", this.root).textContent = pad(i + 1);
    // Keep the card's top edge where it is so switching never jumps the page
    var before = this.cardEl.getBoundingClientRect().top;
    this.cardEl.innerHTML = this.pager(i) + '<div class="summary-body">' + this.renderCard(item) + "</div>";
    var topRow = $(".sum-top", this.cardEl);
    if (topRow) topRow.insertAdjacentHTML("beforeend", '<p class="sum-count">' + esc(this.noun.charAt(0).toUpperCase() + this.noun.slice(1)) + " <b>" + pad(i + 1) + "</b> of " + pad(this.visible.length) + "</p>");
    var body = $(".summary-body", this.cardEl);
    if (!o.silent) animateIn(body, dir < 0 ? "is-from-left" : "is-from-right");
    initTabs(this.cardEl);
    var after = this.cardEl.getBoundingClientRect().top;
    if (Math.abs(after - before) > 1 && !o.silent) window.scrollBy(0, after - before);
    if (o.refocus) {
      var f = $(o.refocus, this.cardEl);
      if (f && !f.disabled) f.focus({ preventScroll: true });
      else { var t = $("[data-card-title]", this.cardEl); if (t) t.focus({ preventScroll: true }); }
    }
    if (!o.silent && this.statusEl) this.statusEl.textContent = "Showing " + this.noun + " " + (i + 1) + " of " + this.visible.length + ": " + (item.shortTitle || item.title);
    if (!o.noUrl && currentRoute === this.route) {
      try { history.replaceState(null, "", "#/" + this.route + "/" + item.id); lastState = { route: this.route, sub: item.id, caseOpen: false }; } catch (e) { /* ignore */ }
    }
    // If the selected card is above the viewport (e.g. picked from a long page), bring its top into view
    var top = this.cardEl.getBoundingClientRect().top;
    if (!o.silent && (top < navH() - 4)) window.scrollTo({ top: window.pageYOffset + top - navH() - 12, behavior: smooth() });
  };
  Explorer.prototype.selectById = function (id, o) {
    var i = this.visible.findIndex(function (p) { return p.id === id; });
    if (i === -1) return false;
    this.select(i, o || {});
    return true;
  };
  Explorer.prototype.openCase = function (item, returnTo) {
    if (!item || !this.renderCase) return;
    var h = "#/" + this.route + "/" + item.id + "/case";
    var pushed = false;
    if (location.hash !== h) { try { history.pushState(null, "", h); pushed = true; } catch (e) { /* ignore */ } }
    lastState = { route: this.route, sub: item.id, caseOpen: true };
    openDrawer(this.caseKicker, "Back to " + this.route, this.renderCase(item), returnTo);
    drawerState.pushed = pushed;
  };

  /* ---------------------------------------------------------------- projects */
  function projectHighlights(p) { return p.highlights || (p.features || []).slice(0, 3); }
  function renderProjectSummary(p) {
    var meta = [];
    if (p.collaborative) meta.push("<span>" + icon("users") + esc(p.collaborative) + "</span>");
    if (p.role) meta.push("<span>" + icon("user") + esc(p.role) + "</span>");
    meta.push("<span>" + icon("map") + esc(p.tags.slice(0, 3).join(", ")) + "</span>");
    var extra = p.skills.length - 6;
    var skills = p.skills.map(function (s, k) { return "<li" + (k >= 6 ? ' class="is-extra" hidden' : "") + ">" + esc(s) + "</li>"; }).join("") +
      (extra > 0 ? '<li class="more-li"><button type="button" class="skills-more" aria-expanded="false" data-count="' + extra + '"><span class="skills-more-label">+' + extra + " more</span>" + icon("chev-d") + "</button></li>" : "");
    var wide = p.layout === "analytics";
    var cl = cardLinks(p.links), extraLinks = moreLinks(p.links, Math.min(3, cl.length));
    return '<div class="sum-top"><p class="sum-date">' + icon("flag") + "<span>" + dateRange(p.start, p.end) + "</span>" + (p.end ? "" : '<span class="live-dot" aria-hidden="true"></span><span class="visually-hidden">, in progress</span>') + "</p></div>" +
      '<h2 class="sum-title" id="project-card-title" tabindex="-1" data-card-title>' + esc(p.title) + "</h2>" +
      '<p class="sum-meta">' + meta.join("") + "</p>" +
      '<div class="sum-grid' + (wide ? " sum-grid--analytics" : "") + '">' +
      '<figure class="sum-figure' + (wide ? " sum-figure--wide" : "") + '"><img src="' + esc(p.image.src) + '" ' + srcset(p.image.src, wide ? "(min-width: 1100px) 760px, 92vw" : "(min-width: 1100px) 340px, (min-width: 720px) 42vw, 92vw") + ' width="' + p.image.width + '" height="' + p.image.height + '" alt="' + esc(p.image.alt) + '" loading="lazy" decoding="async"></figure>' +
      '<div><p class="sum-short">' + esc(p.short) + "</p>" + checks(projectHighlights(p), "sum-list") + "</div></div>" +
      '<div class="sum-actions">' + links(cl, { compact: true, limit: 3 }) + extraLinks +
      '<button type="button" class="case-btn">' + icon("panel") + "<span>Read the full case study</span>" + icon("arrow-r", "case-arrow") + "</button></div>" +
      '<ul class="sum-skills" aria-label="Skills and tools">' + skills + "</ul>";
  }
  function groupedLinks(all) {
    var site = all.filter(function (l) { return l.type !== "figma" && l.type !== "research"; });
    var design = all.filter(function (l) { return l.type === "figma" || l.type === "research"; });
    var siteTitle = site.some(function (l) { return l.type === "live"; }) ? "Live site and code" : site.some(function (l) { return l.type === "tableau"; }) ? "Dashboard and code" : "Code";
    return (site.length ? block(siteTitle, links(site)) : "") + (design.length ? block("Design files in Figma", links(design, { noPrimary: true })) : "");
  }
  function renderProjectCase(p) {
    var id = "case";
    var defs = [{ key: "overview", label: "Overview", icon: "list" }, { key: "role", label: "My role", icon: "user" }, { key: "skills", label: "Skills & tools", icon: "wrench" }];
    if (p.caseStudy) defs.push({ key: "case", label: p.caseStudy.title, icon: "doc-lines" });
    var overview = block("Project summary", paras(p.summary));
    if (p.layout === "analytics") {
      overview += block("Business questions", '<ol class="q-list">' + p.questions.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ol>") +
        block("Key findings", list(p.findings, "findings")) + block("Analysis covered", list(p.features));
    } else overview += block(p.compact ? "What it included" : "Key features", checks(p.features));
    if (p.note) overview += '<p class="note-box">' + esc(p.note) + "</p>";
    var role = block(p.collaborative ? "My contribution to the team" : "My contribution", list(p.contribution)) + block("Outcomes", list(p.outcomes));
    var skills = block(p.projectTech ? "My skills on this project" : "Skills and tools", chips(p.skills)) +
      (p.projectTech ? block("Project technologies (team level)", chips(p.projectTech, true) +
        '<p class="note-box">These were built and configured across the team. I did not personally implement the AI integrations, Docker set-up or back end.</p>') : "");
    var panels = tabPanel(id, "overview", overview, true) + tabPanel(id, "role", role) + tabPanel(id, "skills", skills);
    if (p.caseStudy) panels += tabPanel(id, "case", renderCaseStudy(p.caseStudy));
    return '<h2 class="drawer-title" id="drawer-title" tabindex="-1">' + esc(p.title) + "</h2>" +
      '<p class="drawer-sub">' + dateRange(p.start, p.end) + (p.collaborative ? " · " + esc(p.collaborative) : "") + "</p>" +
      '<ul class="tags">' + p.tags.map(function (t) { return '<li class="tag">' + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<figure class="drawer-figure"><img src="' + esc(p.image.src) + '" ' + srcset(p.image.src, "(min-width: 800px) 730px, 92vw") + ' width="' + p.image.width + '" height="' + p.image.height + '" alt="' + esc(p.image.alt) + '" decoding="async"></figure>' +
      '<div class="drawer-links">' + groupedLinks(p.links) + "</div>" + tabBar(id, "Case study sections", defs) + panels;
  }
  function renderCaseStudy(cs) {
    var html = cs.intro ? '<p class="sum-short case-intro">' + esc(cs.intro) + "</p>" : "";
    if (cs.pairs) {
      html += block("Problems found and what changed", '<ul class="pairs">' + cs.pairs.map(function (pr) {
        return '<li class="pair"><p><span class="pair-label">Problem</span>' + esc(pr.problem) + "</p>" + icon("arrow-r") +
          '<p class="pair-solution"><span class="pair-label">Change</span>' + esc(pr.solution) + "</p></li>";
      }).join("") + "</ul>");
    }
    html += (cs.sections || []).map(function (s) { return block(s.heading, list(s.items)); }).join("");
    if (cs.note) html += '<p class="note-box">' + esc(cs.note) + "</p>";
    if (cs.compare) html += block("Compare the versions", links(cs.compare, { noPrimary: true }));
    return html;
  }
  function projectPick(p) {
    return '<span class="pick-text"><span class="pick-title">' + esc(p.shortTitle) + '</span><span class="pick-date">' + dateText(p.start, p.end) + "</span></span>";
  }
  var projectsSorted = DATA.projects.slice().sort(function (a, b) {
    if (a.start !== b.start) return a.start < b.start ? 1 : -1;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return 0;
  });
  var currentRoute = null;
  var lastState = { route: null, sub: null, caseOpen: false };
  var projects = new Explorer({
    route: "projects", items: projectsSorted, listId: "project-list", cardId: "project-card", statusId: "project-status",
    noun: "project", endHtml: '<li class="pick-end" aria-hidden="true"><span class="pick-end-mark">' + icon("compass") + '</span><span class="pick-end-text">More on the way<small>New projects in progress</small></span></li>',
    renderCard: renderProjectSummary, renderPick: projectPick, renderCase: renderProjectCase, caseKicker: "Project case study"
  });

  /* Filters: chips on wider screens, a native select on phones (no clipping) */
  var filterDefs = [{ key: "all", label: "All projects" }].concat(Object.keys(DATA.categoryLabels).map(function (k) { return { key: k, label: DATA.categoryLabels[k] }; }));
  function filterCount(k) { return k === "all" ? projectsSorted.length : projectsSorted.filter(function (p) { return p.categories.indexOf(k) !== -1; }).length; }
  var filterWrap = $("#project-filters"), filterSelect = $("#project-filter-select");
  filterWrap.innerHTML = filterDefs.map(function (d, i) {
    return '<button type="button" class="filter-btn" data-filter="' + d.key + '" aria-pressed="' + (i === 0) + '">' + esc(d.label) + ' <span class="count">' + filterCount(d.key) + "</span></button>";
  }).join("");
  filterSelect.innerHTML = filterDefs.map(function (d) { return '<option value="' + d.key + '">' + esc(d.label) + " (" + filterCount(d.key) + ")</option>"; }).join("");
  function applyFilter(k) {
    $$(".filter-btn", filterWrap).forEach(function (x) { x.setAttribute("aria-pressed", x.getAttribute("data-filter") === k ? "true" : "false"); });
    filterSelect.value = k;
    projects.setVisible(k === "all" ? projectsSorted : projectsSorted.filter(function (p) { return p.categories.indexOf(k) !== -1; }));
    $("#project-status").textContent = "Showing " + projects.visible.length + " " + (k === "all" ? "projects" : DATA.categoryLabels[k] + " projects");
  }
  filterWrap.addEventListener("click", function (e) { var b = e.target.closest(".filter-btn"); if (b) applyFilter(b.getAttribute("data-filter")); });
  filterSelect.addEventListener("change", function () { applyFilter(filterSelect.value); });
  function resetFilters() { if (filterSelect.value !== "all") applyFilter("all"); }

  /* ---------------------------------------------------------------- experience */
  function renderExpSummary(x) {
    var id = "exp";
    var defs = [{ key: "overview", label: "Overview", icon: "user" }, { key: "highlights", label: "Highlights", icon: "doc-lines" }, { key: "skills", label: "Skills", icon: "bars" }];
    var org = x.organisation !== x.displayName ? x.organisation.replace(x.displayName + ", ", "") : "";
    var overview = '<p class="sum-short">' + esc(x.overview[0]) + "</p>" + '<dl class="guo">' +
      (x.goal ? "<div>" + icon("target") + "<dt>Goal</dt><dd>" + esc(x.goal) + "</dd></div>" : "") +
      (x.users ? "<div>" + icon("users") + "<dt>Users</dt><dd>" + esc(x.users) + "</dd></div>" : "") +
      (x.outcome ? "<div>" + icon("bars") + "<dt>Outcome</dt><dd>" + esc(x.outcome) + "</dd></div>" : "") + "</dl>";
    var hl = x.highlights || x.responsibilities.slice(0, 5);
    var highlights = checks(hl) + (x.responsibilities.length > hl.length ? '<details class="show-all"><summary><span class="sa-closed">Show all ' + x.responsibilities.length +
      ' responsibilities</span><span class="sa-open">Hide full list</span>' + icon("chev-d") + "</summary>" + list(x.responsibilities, "text-list text-list--cols") + "</details>" : "");
    var skills = (x.skillGroups || []).map(function (g) { return block(g.heading, chips(g.items)); }).join("") +
      (x.skillGroups && x.skillGroups.length > 1 ? '<p class="note-box">Design, research and evaluation skills are my own. The implementation stack was produced with AI assistance under my direction and review.</p>' : "");
    var xl = cardLinks(x.links || []), more = moreLinks(x.links || [], Math.min(3, xl.length), "design");
    var actions = (x.links && x.links.length) || x.features ? '<div class="sum-actions">' + links(xl, { compact: true, limit: 3 }) + more +
      (x.features ? '<button type="button" class="case-btn">' + icon("panel") + "<span>Read the full case study</span>" + icon("arrow-r", "case-arrow") + "</button>" : "") + "</div>" : "";
    return '<div class="sum-top"><p class="sum-date">' + icon("backpack") + "<span>" + esc(x.type) + "</span></p></div>" +
      '<h2 class="exp-title" id="experience-card-title" tabindex="-1" data-card-title>' + esc(x.displayName) + "</h2>" +
      '<p class="exp-role"><span class="exp-role-label">Job title</span><span class="exp-role-name">' + esc(x.role) + "</span></p>" +
      '<p class="sum-meta exp-meta"><span>' + icon("flag") + dateRange(x.start, x.end) + "</span>" +
      (!x.end && x.expectedEnd ? "<span>" + icon("target") + "Expected completion " + monthYear(x.expectedEnd) + "</span>" : "") +
      (org ? "<span>" + icon("map") + esc(org) + "</span>" : "") +
      (x.location ? "<span>" + icon("map") + esc(x.location) + "</span>" : "") +
      (x.hours ? "<span>" + icon("briefcase") + esc(x.hours) + "</span>" : "") + "</p>" +
      (x.context ? '<p class="exp-context">' + esc(x.context) + "</p>" : "") + actions +
      tabBar(id, "Role details", defs) + tabPanel(id, "overview", overview, true) + tabPanel(id, "highlights", highlights) + tabPanel(id, "skills", skills);
  }
  function renderExpCase(x) {
    if (!x.features) return null;
    var site = x.links.filter(function (l) { return l.type !== "figma" && l.type !== "research"; });
    var design = x.links.filter(function (l) { return l.type === "figma" || l.type === "research"; });
    return '<h2 class="drawer-title" id="drawer-title" tabindex="-1">' + esc(x.displayName) + "</h2>" +
      '<p class="drawer-sub">' + esc(x.role) + " · " + dateRange(x.start, x.end) + (!x.end && x.expectedEnd ? " (expected completion " + monthYear(x.expectedEnd) + ")" : "") + "</p>" +
      (x.image ? '<figure class="drawer-figure"><img src="' + esc(x.image.src) + '" ' + srcset(x.image.src, "(min-width: 800px) 730px, 92vw") + ' width="' + x.image.width + '" height="' + x.image.height + '" alt="' + esc(x.image.alt) + '" decoding="async"></figure>' : "") +
      '<div class="drawer-links">' + block("Live site and code", links(site)) + block("Research and design in Figma", links(design, { noPrimary: true })) + "</div>" +
      '<div class="drawer-content">' + block("Overview", paras(x.overview)) +
      block("Key platform features", '<ul class="feature-grid">' + x.features.map(function (f) { return "<li><strong>" + esc(f.title) + "</strong><span>" + esc(f.text) + "</span></li>"; }).join("") + "</ul>") +
      block("Key responsibilities", list(x.responsibilities, "text-list text-list--cols")) +
      (x.context ? '<p class="note-box">' + esc(x.context) + "</p>" : "") + "</div>";
  }
  function expPick(x) {
    return '<span class="pick-text"><span class="pick-title">' + esc(x.shortTitle) + '</span><span class="pick-date">' + dateText(x.start, x.end) + "</span></span>";
  }
  var experience = new Explorer({
    route: "experience", items: DATA.experience, listId: "experience-list", cardId: "experience-card", statusId: "experience-status",
    noun: "role", endHtml: '<li class="pick-end"><a class="pick-end-link" href="#/contact" data-hint="Contact me"><span class="pick-end-mark">' + icon("flag-chq") + '</span><span class="pick-end-text">Next role?<small>Open to opportunities</small></span></a></li>',
    renderCard: renderExpSummary, renderPick: expPick, renderCase: renderExpCase, caseKicker: "Experience case study"
  });

  /* ---------------------------------------------------------------- about */
  (function () {
    var A = DATA.about;
    $("#about-intro").textContent = A.intro;
    $("#about-more").innerHTML = paras(A.more);
    $("#about-strengths").innerHTML = A.strengths.map(function (s) {
      return "<li>" + icon(s.icon) + "<strong>" + esc(s.title) + "</strong><span>" + esc(s.text) + "</span></li>";
    }).join("");
    var BRAND = { "b-html5": "#e34f26", "b-css3": "#4a7ff5", "b-javascript": "#f7df1e", "b-shopify": "#95bf47", "b-github": "#ffffff", "b-tableau": "#6ea7e0", "b-lighthouse": "#f4683c", "b-netlify": "#32e6e2", "b-googleanalytics": "#f9ab00" };
    var id = "skills";
    $("#skill-tabs").innerHTML = tabBar(id, "Key skills", DATA.keySkillTabs) + DATA.keySkillTabs.map(function (t, i) {
      return tabPanel(id, t.key, '<ul class="skill-grid">' + t.skills.map(function (s) {
        var ic = s.icon === "b-figma" ? "b-figma-color" : s.icon;
        return '<li class="skill-tile"><svg class="icon" aria-hidden="true" focusable="false" style="color:' + (BRAND[ic] || "var(--lime)") + '"><use href="#' + ic + '"></use></svg><span>' + esc(s.name) + "</span></li>";
      }).join("") + "</ul>", i === 0);
    }).join("");
    initTabs($("#skill-tabs"));
    $("#all-skills").innerHTML = DATA.skillGroups.map(function (g) {
      return "<div><h4>" + esc(g.heading) + "</h4>" + chips(g.items, g.heading.indexOf("Foundational") === 0) + "</div>";
    }).join("");
  })();

  /* Mobile About: the panel rises gently into the scene as you scroll (no hijacking) */
  var aboutCard = $(".about-card"), aboutPhoto = $(".about-photo-m");
  function aboutParallax() {
    if (currentRoute !== "about" || !mobileMq.matches || reduceMotion.matches) {
      aboutCard.style.removeProperty("--rise"); aboutPhoto.style.removeProperty("--fade"); return;
    }
    var p = Math.max(0, Math.min(1, window.pageYOffset / (window.innerHeight * 0.45)));
    aboutCard.style.setProperty("--rise", ((1 - p) * 36).toFixed(1) + "px");
    aboutPhoto.style.setProperty("--fade", (p * 0.45).toFixed(3));
  }

  /* ---------------------------------------------------------------- workflow */
  var workflow = (function () {
    var board = $("#workflow-board");
    var W = DATA.workflow;
    var thumbs = {};
    DATA.projects.forEach(function (p) { thumbs["project:" + p.id] = p.image.src.replace(/\.webp$/, "-640.webp"); });
    DATA.experience.forEach(function (x) { if (x.image) thumbs["experience:" + x.id] = x.image.src; });
    thumbs["experience:movement-to-work"] = "images/projects/movement_to_work_banner-640.webp";
    var MTW = /movement-to-work|Movement-To-Work/;
    var phases = [];
    W.forEach(function (s) { if (phases.indexOf(s.phase) === -1) phases.push(s.phase); });

    board.innerHTML =
      '<div class="wf-trail">' +
      '<p class="wf-phases" aria-hidden="true">' + phases.map(function (p) { return "<span>" + esc(p) + "</span>"; }).join("") + "</p>" +
      '<div class="wf-track"><svg class="wf-line" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="7 7" stroke-linecap="round"/></svg>' +
      '<div class="wf-stops" role="tablist" aria-label="Workflow stages">' + W.map(function (s, i) {
        return '<button type="button" class="wf-stop' + (s.final ? " wf-stop--final" : "") + '" role="tab" id="wf-tab-' + s.n + '" aria-controls="wf-note" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-i="' + i + '">' +
          '<span class="wf-num">' + (s.final ? icon("flag-chq") + '<span class="visually-hidden">' + s.n + "</span>" : s.n) + '</span><span class="wf-name">' + esc(s.short) + (s.final ? '<span class="wf-finish">Finish</span>' : "") + "</span></button>";
      }).join("") + "</div></div></div>" +
      '<div class="wf-note" id="wf-note" role="tabpanel" tabindex="0"></div>';

    var stops = $$(".wf-stop", board), note = $("#wf-note"), path = $(".wf-line path", board), svg = $(".wf-line", board);
    var current = 0;

    function practiceItem(p) {
      if (p.url) {
        var ic = p.icon || "external";
        var visual = MTW.test(p.url)
          ? '<span class="wf-thumb"><img src="images/projects/movement_to_work_banner-640.webp" alt="" width="64" height="44" loading="lazy" decoding="async"><span class="wf-badge">' + icon(ic, ic === "b-figma-color" ? "icon-brand" : "") + "</span></span>"
          : '<span class="wf-ic">' + icon(ic, ic === "b-figma-color" ? "icon-brand" : "") + "</span>";
        return '<li><a class="wf-card" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' + visual +
          '<span class="wf-card-text"><span class="wf-card-title">' + esc(p.label) + '</span><span class="wf-card-kind">' + esc(p.kind) + "</span></span>" + icon("arrow-ur", "wf-go") + NEW_TAB + "</a></li>";
      }
      var parts = p.target.split(":"), img = thumbs[p.target];
      return '<li><a class="wf-card" href="#/' + (parts[0] === "project" ? "projects" : parts[0]) + "/" + parts[1] + '">' +
        (img ? '<span class="wf-thumb"><img src="' + esc(img) + '" alt="" width="64" height="44" loading="lazy" decoding="async"></span>' : '<span class="wf-ic">' + icon("backpack") + "</span>") +
        '<span class="wf-card-text"><span class="wf-card-title">' + esc(p.label) + '</span><span class="wf-card-kind">' + esc(p.kind) + "</span></span>" + icon("arrow-r", "wf-go") + "</a></li>";
    }

    function render(i, focusTab) {
      current = i;
      var s = W[i], last = i === W.length - 1;
      stops.forEach(function (b, bi) {
        b.setAttribute("aria-selected", bi === i ? "true" : "false");
        b.tabIndex = bi === i ? 0 : -1;
        b.classList.toggle("is-done", bi < i);
      });
      note.setAttribute("aria-labelledby", "wf-tab-" + s.n);
      note.classList.toggle("wf-note--final", !!s.final);
      note.innerHTML = '<div class="wf-note-inner">' +
        '<div class="wf-note-head"><span class="wf-note-num" aria-hidden="true">' + (s.final ? icon("flag-chq") : s.n) + "</span><div>" +
        '<p class="wf-phase">' + (s.final ? "Final stage · " : "Stage " + s.n + " of " + W.length + " · ") + esc(s.phase) + "</p>" +
        '<h2 class="wf-note-title">' + icon(s.icon) + esc(s.title) + "</h2></div></div>" +
        '<p class="wf-sum">' + esc(s.summary) + "</p>" +
        '<div class="wf-cols"><div>' +
        '<h3>How I approach it</h3><p class="wf-approach">' + esc(s.approach) + "</p>" +
        '<h3>Methods and tools</h3><ul class="wf-tools">' + s.tools.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        '</div><div><h3>See it in practice</h3><ul class="wf-practice">' + s.practice.map(practiceItem).join("") + "</ul></div></div>" +
        (s.final ? '<p class="wf-finish-note">' + icon("flag-chq") + "<span>This is the end of the route, but not of the work: evaluation and iteration carry on after launch. Every project uses these stages differently, and some take them in a different order.</span></p>" : "") +
        '<div class="wf-nav"><button type="button" class="wf-btn" data-step="-1"' + (i === 0 ? " disabled" : "") + ">" + icon("arrow-l") + "<span><small>Previous stage</small>" + (i > 0 ? esc(W[i - 1].title) : "None") + "</span></button>" +
        (last ? '<a class="wf-btn wf-btn--next" href="#/contact"><span><small>Route complete</small>Get in touch</span>' + icon("arrow-r") + "</a>"
              : '<button type="button" class="wf-btn wf-btn--next" data-step="1"><span><small>Next stage</small>' + esc(W[i + 1].title) + "</span>" + icon("arrow-r") + "</button>") +
        "</div></div>";
      animateIn(note, "is-shown");
      if (focusTab) stops[i].focus();
    }
    board.addEventListener("click", function (e) {
      var st = e.target.closest(".wf-stop");
      if (st) { render(+st.getAttribute("data-i")); return; }
      var nb = e.target.closest(".wf-btn[data-step]");
      if (nb && !nb.disabled) {
        var d = nb.getAttribute("data-step");
        render(Math.max(0, Math.min(W.length - 1, current + +d)));
        var again = $('.wf-btn[data-step="' + d + '"]', note);
        (again && !again.disabled ? again : $(".wf-btn:not([disabled])", note) || stops[current]).focus({ preventScroll: true });
      }
    });
    board.addEventListener("keydown", function (e) {
      if (!e.target.classList.contains("wf-stop")) return;
      var n = null;
      if (e.key === "ArrowRight") n = (current + 1) % W.length;
      else if (e.key === "ArrowLeft") n = (current - 1 + W.length) % W.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = W.length - 1;
      if (n !== null) { e.preventDefault(); render(n, true); }
    });
    function drawLine() {
      if (!svg.getBoundingClientRect().width) return;
      var box = svg.getBoundingClientRect();
      var pts = stops.map(function (b) { var r = $(".wf-num", b).getBoundingClientRect(); return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top]; });
      var d = "M" + pts[0][0] + " " + pts[0][1];
      for (var k = 1; k < pts.length; k++) {
        var a = pts[k - 1], b = pts[k];
        if (Math.abs(b[1] - a[1]) > 20) { var bulge = Math.max(a[0], b[0]) + 34; d += " C" + bulge + " " + a[1] + " " + bulge + " " + b[1] + " " + b[0] + " " + b[1]; }
        else { var mx = (a[0] + b[0]) / 2, wave = (k % 2 ? -7 : 7); d += " Q" + mx + " " + (a[1] + wave) + " " + b[0] + " " + b[1]; }
      }
      path.setAttribute("d", d);
    }
    if ("ResizeObserver" in window) new ResizeObserver(drawLine).observe(board);
    window.addEventListener("resize", drawLine);
    render(0);
    return { draw: drawLine };
  })();

  /* ---------------------------------------------------------------- contact: finish recap */
  (function () {
    var recap = $("#finish-recap");
    if (!recap) return;
    var rows = [["projects", "mountain", DATA.projects.length, "projects"], ["experience", "backpack", DATA.experience.length, "roles"], ["workflow", "compass", DATA.workflow.length, "workflow stages"]];
    recap.innerHTML = rows.map(function (r) {
      return '<li><a class="recap-item" href="#/' + r[0] + '" data-hint="Revisit">' + icon(r[1]) + '<span><b>' + r[2] + "</b> " + r[3] + "</span></a></li>";
    }).join("");
  })();

  /* Wide screens: the finish note stands beside the contact card. It must never cover
     the planted "journey continues" sign, so measure both: narrow the note if needed,
     or stack it under the card when there is not enough room. */
  var contactGrid = $(".contact-grid"), finishNote = $(".view--contact .finish-note"), contactSign = $(".stage--contact .sign--stage");
  function fitFinish() {
    if (!contactGrid || currentRoute !== "contact") return;
    contactGrid.classList.remove("is-stacked");
    finishNote.style.maxWidth = "";
    if (!contactSign || getComputedStyle(contactSign).display === "none") return;
    var n = finishNote.getBoundingClientRect(), c = $(".contact-card").getBoundingClientRect(), sg = contactSign.getBoundingClientRect();
    if (n.left < c.right) return;                                   // already stacked by the layout
    var signLeft = sg.left + sg.width * 0.03, room = signLeft - 40 - n.left;
    if (n.right <= signLeft - 40) return;
    if (room >= 280) finishNote.style.maxWidth = Math.floor(room) + "px";
    else contactGrid.classList.add("is-stacked");
  }
  window.addEventListener("resize", fitFinish);
  window.addEventListener("resize", function () { projects.lightPath(); experience.lightPath(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { projects.lightPath(); experience.lightPath(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitFinish);

  /* ---------------------------------------------------------------- contact: Email me
     mailto: is handed to the operating system. If no email app is configured nothing
     visible happens, so if the page keeps focus we offer copy and webmail options. */
  var mailBtn = $(".mail-btn"), mailHelp = $("#mail-help");
  if (mailBtn) {
    mailBtn.addEventListener("click", function () {
      var left = false;
      function gone() { left = true; }
      window.addEventListener("blur", gone, { once: true });
      document.addEventListener("visibilitychange", gone, { once: true });
      setTimeout(function () {
        window.removeEventListener("blur", gone);
        document.removeEventListener("visibilitychange", gone);
        if (!left) { mailHelp.hidden = false; animateIn(mailHelp, "is-shown"); }
      }, 1600);
    });
  }

  /* ================================================================ mobile menu */
  var menu = $("#mobile-menu"), menuToggle = $(".menu-toggle"), menuOpen = false, menuTimer = null;
  function setMenu(open, returnFocus) {
    if (open === menuOpen) return;
    menuOpen = open;
    clearTimeout(menuTimer);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
    lockScroll(open);
    if (open) {
      menu.hidden = false;
      menu.classList.remove("is-closing");
      var cur = $(".mm-link.is-current", menu);
      (cur || menuToggle).focus({ preventScroll: true });
    } else {
      menu.classList.add("is-closing");
      menuTimer = setTimeout(function () { menu.hidden = true; menu.classList.remove("is-closing"); }, reduceMotion.matches ? 150 : 260);
      if (returnFocus) menuToggle.focus({ preventScroll: true });
    }
  }
  menuToggle.addEventListener("click", function () { setMenu(!menuOpen, true); });
  menu.addEventListener("click", function (e) {
    var a = e.target.closest("a.mm-link");
    if (!a) return;
    var target = (a.getAttribute("href").replace(/^#\/?/, "") || "home");
    setMenu(false, false);
    if (target === currentRoute) { e.preventDefault(); window.scrollTo({ top: 0, behavior: smooth() }); focusRouteTitle(target); }
  });
  document.addEventListener("keydown", function (e) {
    if (menuOpen) trap(e, [menuToggle].concat(focusables(menu)));
  });
  mobileMq.addEventListener("change", function (e) { if (!e.matches) setMenu(false, false); });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (drawerState.open) requestCloseDrawer();
    else if (menuOpen) setMenu(false, true);
  });

  /* ================================================================ router */
  var stages = {};
  $$(".stage").forEach(function (s) { stages[s.getAttribute("data-stage")] = s; });

  function routeFromHash() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    var r = (parts[0] || "home").replace(/-(trail|intro|title)$/, "");
    if (r === "main") r = currentRoute || "home";
    if (ROUTES.indexOf(r) === -1) r = "home";
    return { route: r, sub: parts[1] || null, caseOpen: parts[2] === "case" };
  }
  function loadStage(name) { var s = stages[name]; if (s) s.classList.add("is-loaded"); }
  function focusRouteTitle(route) { var t = $('[data-view="' + route + '"] .route-title'); if (t) t.focus({ preventScroll: true }); }

  function setLink(el, route, disabledLabel) {
    var lbl = $(".tb-label", el);
    if (route) {
      el.setAttribute("href", "#/" + (route === "home" ? "" : route));
      el.removeAttribute("aria-disabled"); el.removeAttribute("tabindex"); el.classList.remove("is-disabled");
      lbl.textContent = LABELS[route];
    } else {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true"); el.setAttribute("tabindex", "-1"); el.classList.add("is-disabled");
      lbl.textContent = disabledLabel;
    }
  }
  var trailSvg = $(".trail-path");
  function drawTrail() {
    if (!trailSvg || !trailSvg.getBoundingClientRect().width) return;
    var box = trailSvg.getBoundingClientRect();
    var stops = $$(".trail-stop");
    var cur = stops.findIndex(function (li) { return li.classList.contains("is-current"); });
    var pts = stops.map(function (li) { var r = $(".trail-marker", li).getBoundingClientRect(); return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top, r.width / 2 + 6]; });
    var html = "";
    for (var k = 1; k < pts.length; k++) {
      var a = pts[k - 1], b = pts[k];
      var x1 = a[0] + a[2], x2 = b[0] - b[2], y = a[1], mx = (x1 + x2) / 2, w = k % 2 ? -3.5 : 3.5;
      html += '<path class="seg' + (k <= cur ? " is-travelled" : "") + '" d="M' + x1.toFixed(1) + " " + y.toFixed(1) + " Q" + mx.toFixed(1) + " " + (y + w).toFixed(1) + " " + x2.toFixed(1) + " " + y.toFixed(1) + '"/>';
    }
    trailSvg.innerHTML = html;
  }
  window.addEventListener("resize", drawTrail);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawTrail);

  function setNav(route) {
    var idx = ROUTES.indexOf(route);
    $$(".trail-stop").forEach(function (li) {
      var i = ROUTES.indexOf(li.getAttribute("data-stop"));
      li.classList.toggle("is-done", i < idx);
      li.classList.toggle("is-current", i === idx);
      var a = $("a", li);
      if (i === idx) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    requestAnimationFrame(drawTrail);
    var nc = $(".nav-contact");
    nc.classList.toggle("is-current", route === "contact");
    if (route === "contact") nc.setAttribute("aria-current", "page"); else nc.removeAttribute("aria-current");
    $$(".mm-link").forEach(function (a) {
      var on = a.getAttribute("data-nav") === route;
      a.classList.toggle("is-current", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    var hereText = (NUMBERS[route] ? NUMBERS[route] + " · " : "") + LABELS[route];
    $(".tb-here").textContent = route === "home" ? "Trailhead" : route === "contact" ? "The finish" : hereText;
    // desktop route bar: fixed slots; the ends show Start / Finish markers instead of a button
    var dock = $(".route-dock");
    if (dock) {
      var dp = ROUTES[idx - 1], dn = ROUTES[idx + 1];
      $(".rd-prev", dock).hidden = !dp; $(".rd-end--start", dock).hidden = !!dp;
      $(".rd-next", dock).hidden = !dn; $(".rd-end--finish", dock).hidden = !!dn;
      if (dp) { $(".rd-prev", dock).setAttribute("href", "#/" + (dp === "home" ? "" : dp)); $(".rd-prev .tb-label", dock).textContent = STOP_LBL[dp]; }
      if (dn) { $(".rd-next", dock).setAttribute("href", "#/" + dn); $(".rd-next .tb-label", dock).textContent = STOP_LBL[dn]; }
      $(".rd-here-label", dock).innerHTML = (NUMBERS[route] ? "<b>" + NUMBERS[route] + "</b> " : "") + esc(route === "home" ? "Trailhead" : route === "contact" ? "The finish" : LABELS[route]);
    }
    // bottom route navigator
    // At either end the button is replaced by a clear Start / Finish marker
    $(".tb-prev").hidden = idx === 0;
    $(".tb-end--start").hidden = idx !== 0;
    $(".tb-next").hidden = idx === ROUTES.length - 1;
    $(".tb-end--finish").hidden = idx !== ROUTES.length - 1;
    if (idx > 0) setLink($(".tb-prev"), ROUTES[idx - 1], "");
    if (idx < ROUTES.length - 1) setLink($(".tb-next"), ROUTES[idx + 1], "");
    $(".tb-trail").style.setProperty("--p", (idx / (ROUTES.length - 1)).toFixed(3));
    $$(".tb-stop").forEach(function (a) {
      var i = ROUTES.indexOf(a.getAttribute("data-stop"));
      a.classList.toggle("is-done", i < idx);
      a.classList.toggle("is-current", i === idx);
      if (i === idx) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
      a.setAttribute("aria-label", LABELS[ROUTES[i]] + (i < idx ? " (visited)" : i === idx ? " (you are here)" : ""));
    });
  }

  function show(state, userNav) {
    var route = state.route;
    var changed = route !== lastState.route;
    var subChanged = state.sub !== lastState.sub;
    var onlyCase = !changed && !subChanged && state.caseOpen !== lastState.caseOpen;
    lastState = state;

    if (onlyCase) {
      // Opening/closing the case study through history: never move the page
      if (state.caseOpen) openCaseFromState(state); else closeDrawer();
      return;
    }
    if (drawerState.open && !state.caseOpen) closeDrawer();
    if (menuOpen) setMenu(false, false);

    loadStage(route);
    $$(".view").forEach(function (v) {
      var on = v.getAttribute("data-view") === route;
      v.classList.toggle("is-active", on);
      v.hidden = !on;
    });
    Object.keys(stages).forEach(function (k) { stages[k].classList.toggle("is-active", k === route); });
    document.body.setAttribute("data-route", route);
    document.title = TITLES[route];
    currentRoute = route;
    setNav(route);

    var focusEl = null;
    if (state.sub && route === "projects") {
      if (!projects.selectById(state.sub, { silent: true, noUrl: true })) { resetFilters(); projects.selectById(state.sub, { silent: true, noUrl: true }); }
      focusEl = $("[data-card-title]", $("#project-card"));
    } else if (state.sub && route === "experience") {
      experience.selectById(state.sub, { silent: true, noUrl: true });
      focusEl = $("[data-card-title]", $("#experience-card"));
    }
    if (changed || userNav) window.scrollTo(0, 0);
    if (state.sub && focusEl && mobileMq.matches && userNav) {
      var top = focusEl.closest(".summary").getBoundingClientRect().top + window.pageYOffset - navH() - 12;
      window.scrollTo(0, Math.max(0, top));
    }
    if (route === "workflow") requestAnimationFrame(workflow.draw);
    if (route === "contact") requestAnimationFrame(fitFinish);
    if (route === "projects") requestAnimationFrame(function () { projects.lightPath(); });
    if (route === "experience") requestAnimationFrame(function () { experience.lightPath(); });
    if (changed && userNav) animateIn($('[data-view="' + route + '"]'));
    if (userNav && !state.caseOpen) {
      var target = focusEl || $('[data-view="' + route + '"] .route-title');
      if (target) target.focus({ preventScroll: true });
    }
    if (state.caseOpen) openCaseFromState(state);
    updateScroll();
    var idx = ROUTES.indexOf(route);
    var idle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 400); };
    function warm() { idle(function () { [ROUTES[idx - 1], ROUTES[idx + 1]].forEach(function (r) { if (r) loadStage(r); }); }, { timeout: 4000 }); }
    if (document.readyState === "complete") warm(); else window.addEventListener("load", function () { setTimeout(warm, 1500); }, { once: true });
  }
  function openCaseFromState(state) {
    var ex = state.route === "projects" ? projects : state.route === "experience" ? experience : null;
    if (!ex) return;
    if (state.sub) ex.selectById(state.sub, { silent: true, noUrl: true });
    var item = ex.visible[ex.index];
    var html = item && ex.renderCase(item);
    if (!html) return;
    openDrawer(ex.caseKicker, "Back to " + state.route, html, $(".case-btn", ex.cardEl));
    drawerState.pushed = false;
  }

  window.addEventListener("hashchange", function () { show(routeFromHash(), true); });
  // A link to the route you are already on returns to its top instead of doing nothing
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#/"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || a.closest(".mobile-menu")) return;
    var parts = a.getAttribute("href").replace(/^#\/?/, "").split("/");
    if ((parts[0] || "home") === currentRoute && !parts[1]) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: smooth() });
      focusRouteTitle(currentRoute);
    }
  });
  $(".skip-link").addEventListener("click", function (e) { e.preventDefault(); focusRouteTitle(currentRoute); });

  /* ---------------------------------------------------------------- scroll: header state, progress, about */
  function updateScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 4 ? Math.min(1, window.pageYOffset / max) : 0;
    header.style.setProperty("--progress", p.toFixed(3));
    header.classList.toggle("is-scrolled", window.pageYOffset > 24);
    aboutParallax();
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { updateScroll(); ticking = false; });
  }, { passive: true });
  window.addEventListener("resize", updateScroll);

  /* ---------------------------------------------------------------- pointer hint
     Decorative only (aria-hidden): every control already has a visible or
     accessible name. Mouse/trackpad only; never shown for touch. */
  (function () {
    var hint = $("#cursor-hint");
    if (!hint || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var text = $(".ch-text", hint), last = null;
    function words(el) {
      var h = el.getAttribute("data-hint");
      if (h) return h;
      var noun = el.closest("#experience-card, #experience-list") ? "role" : "project";
      if (el.matches(".pick")) return "View " + noun;
      if (el.matches(".pager-step")) return el.disabled ? "" : el.classList.contains("is-wrap") ? (el.getAttribute("data-step") === "1" ? "Back to first" : "Go to last") : (el.getAttribute("data-step") === "1" ? "Next " : "Previous ") + noun;
      if (el.matches(".pager-dot")) return "Jump here";
      if (el.matches(".case-btn")) return "Read more";
      if (el.matches(".tab")) return "Switch tab";
      if (el.matches(".filter-btn")) return "Filter projects";
      if (el.matches(".skills-more")) return el.getAttribute("aria-expanded") === "true" ? "Show fewer" : "Show skills";
      if (el.matches(".wf-stop")) return "View stage";
      if (el.matches(".wf-btn")) return el.getAttribute("data-step") === "-1" ? "Previous stage" : "Next stage";
      if (el.matches(".route-card")) return "Start route";
      if (el.matches(".rd-prev")) return "Previous stop";
      if (el.matches(".rd-next")) return "Next stop";
      if (el.matches(".drawer-close, .drawer-back")) return "Close";
      if (el.matches("summary")) return el.parentNode.open ? "Collapse" : "Expand";
      if (el.matches('a[href^="mailto:"]')) return "Send email";
      if (el.matches('a[target="_blank"]')) return "New tab";
      if (el.matches(".wf-card")) return "See example";
      if (el.matches('a[href^="#/"]')) return "Go there";
      return "";
    }
    function place(x, y) {
      var w = hint.offsetWidth, h = hint.offsetHeight, gap = 18;
      var nx = x + gap, ny = y + gap;
      if (nx + w > innerWidth - 8) nx = x - gap - w;          // flip left near the right edge
      if (ny + h > innerHeight - 8) ny = y - gap - h;          // flip up near the bottom
      nx = Math.max(8, Math.min(nx, innerWidth - w - 8));      // never clipped either side
      ny = Math.max(8, ny);
      hint.style.setProperty("--x", nx + "px");
      hint.style.setProperty("--y", ny + "px");
    }
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var el = e.target.closest && e.target.closest('[data-hint], a[href], button:not(:disabled), summary');
      var label = el && !el.closest(".cursor-hint") ? words(el) : "";
      if (label !== last) { text.textContent = label; last = label; }
      hint.classList.toggle("is-on", !!label);
      if (label) place(e.clientX, e.clientY);
    }, { passive: true });
    document.addEventListener("pointerleave", function () { hint.classList.remove("is-on"); });
    window.addEventListener("blur", function () { hint.classList.remove("is-on"); });
    document.addEventListener("keydown", function () { hint.classList.remove("is-on"); });
  })();

  show(routeFromHash(), false);
})();
