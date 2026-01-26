(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    helpsReducedMotion(items);

    if (!("IntersectionObserver" in window)) {
      // Fallback: show everything
      for (var i = 0; i < items.length; i++) items[i].classList.add("in-view");
      return;
    }

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
  });

  function helpsReducedMotion(items) {
    var mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("in-view");
    }
  }
})();
