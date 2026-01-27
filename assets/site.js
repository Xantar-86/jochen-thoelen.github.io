(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* ---------------------------
       Reveal on scroll
    --------------------------- */
    var items = document.querySelectorAll(".reveal");
    if (items.length) {
      var mq =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq && mq.matches) {
        for (var r = 0; r < items.length; r++)
          items[r].classList.add("in-view");
      } else if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(
          function (entries) {
            for (var i = 0; i < entries.length; i++) {
              if (entries[i].isIntersecting) {
                entries[i].target.classList.add("in-view");
                io.unobserve(entries[i].target);
              }
            }
          },
          { threshold: 0.12 }
        );
        for (var j = 0; j < items.length; j++) io.observe(items[j]);
      } else {
        for (var k = 0; k < items.length; k++)
          items[k].classList.add("in-view");
      }
    }

    /* ---------------------------
       Active nav highlight
    --------------------------- */
    var path = window.location.pathname.replace(/\/+$/, "/");
    var navLinks = document.querySelectorAll(".nav-link");
    for (var n = 0; n < navLinks.length; n++) {
      var href = navLinks[n].getAttribute("href");
      if (!href) continue;
      var a = document.createElement("a");
      a.href = href;
      var target = a.pathname.replace(/\/+$/, "/");
      if (target === path) navLinks[n].classList.add("active");
    }

    /* ---------------------------
       Back to top
    --------------------------- */
    var btn = document.querySelector(".to-top");
    if (btn) {
      btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      function onScroll() {
        if (window.scrollY > 500) btn.classList.add("show");
        else btn.classList.remove("show");
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* ---------------------------
       Card glow follows mouse
    --------------------------- */
    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion) {
      document.addEventListener("mousemove", function (e) {
        var card = e.target.closest
          ? e.target.closest(".card")
          : null;
        if (!card) return;

        var rect = card.getBoundingClientRect();
        var mx = ((e.clientX - rect.left) / rect.width) * 100;
        var my = ((e.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--mx", mx + "%");
        card.style.setProperty("--my", my + "%");
      });
    }
  });
})();

/* ---------------------------
   Lightbox for screenshots
--------------------------- */
(function () {
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var closeBtn = document.querySelector(".lightbox-close");

  if (!lb || !lbImg || !closeBtn) return;

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "Screenshot";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    var img = e.target.closest
      ? e.target.closest(".shot-grid img")
      : null;
    if (img) {
      e.preventDefault();
      openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
      return;
    }

    if (e.target === lb || e.target.closest(".lightbox-close")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
})();
