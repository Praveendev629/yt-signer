/* YT Signer — site interactions */
(function () {
  "use strict";

  var body = document.body;

  /* ---------------- Welcome intro ---------------- */
  var intro = document.getElementById("intro");
  var introSkip = document.getElementById("introSkip");
  var INTRO_MS = 5600;
  var introTimer = null;

  function endIntro() {
    if (!intro || intro.classList.contains("is-done")) return;
    clearTimeout(introTimer);
    intro.classList.add("is-done");
    intro.setAttribute("aria-hidden", "true");
    body.classList.remove("intro-open");
    window.setTimeout(function () {
      if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
    }, 800);
  }

  if (intro) {
    body.classList.add("intro-open");
    introTimer = window.setTimeout(endIntro, INTRO_MS);
    if (introSkip) introSkip.addEventListener("click", endIntro);

    // Safety: let keyboard users through immediately
    intro.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Enter") endIntro();
    });

    // Reduced motion users skip the wait
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      endIntro();
    }
  }

  /* ---------------- Navbar ---------------- */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------- Toast ---------------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 3600);
  }

  /* ---------------- Download button ----------------
     Buttons link straight to the GitHub release asset.
     GitHub serves it with Content-Disposition: attachment,
     so the file downloads while the visitor stays on this page. */
  document.querySelectorAll(".js-download").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showToast("Download started — YT.Signer.apk (~108 MB)");
    });
  });

  /* ---------------- FAQ: one open at a time ---------------- */
  var faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
