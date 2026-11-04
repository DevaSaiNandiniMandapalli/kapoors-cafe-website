(function () {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- header scroll state ---------- */
  const header = document.getElementById("siteHeader");
  const banner = document.querySelector(".demo-banner");
  const setBannerHeight = () => {
    if (banner) {
      document.documentElement.style.setProperty("--banner-h", banner.offsetHeight + "px");
    }
  };
  setBannerHeight();
  window.addEventListener("resize", setBannerHeight);
  window.addEventListener("load", setBannerHeight);

  const updateHeader = () => {
    if (!header) return;
    const past = window.scrollY > 40;
    header.classList.toggle("scrolled", past);
    document.body.classList.toggle("scrolled-past-banner", past);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- mobile navigation ---------- */
  const nav = document.getElementById("primaryNav");
  const toggle = document.getElementById("navToggle");
  let navOpen = false;

  const setNav = (open) => {
    navOpen = open;
    if (!nav || !toggle) return;
    nav.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (toggle) {
    toggle.addEventListener("click", () => setNav(!navOpen));
  }
  if (nav) {
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNav(false));
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navOpen) setNav(false);
  });

  /* ---------- active nav link on scroll ---------- */
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  const sections = navLinks
    .map((l) => document.getElementById(l.getAttribute("href").slice(1)))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + id)
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => revealObs.observe(el));
  }

  /* ---------- menu filtering ---------- */
  const chips = Array.from(document.querySelectorAll(".chip[data-filter]"));
  const items = Array.from(document.querySelectorAll(".menu-item"));
  const grid = document.getElementById("menuGrid");

  const applyFilter = (filter) => {
    items.forEach((item) => {
      const match = filter === "all" || item.dataset.cat === filter;
      item.classList.toggle("hide", !match);
    });
    if (!reduceMotion && grid) {
      grid.animate(
        [{ opacity: 0.35, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }],
        { duration: 420, easing: "cubic-bezier(.22,.68,.16,1)" }
      );
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-selected", String(active));
      });
      applyFilter(chip.dataset.filter);
    });
  });

  /* ---------- gallery lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCount = document.getElementById("lbCount");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");
  const lbClose = document.getElementById("lbClose");
  const galItems = Array.from(document.querySelectorAll(".gal-item"));
  let lbIndex = 0;
  let lastFocus = null;

  const showImage = (i) => {
    if (!galItems.length) return;
    lbIndex = (i + galItems.length) % galItems.length;
    const btn = galItems[lbIndex];
    const src = btn.dataset.src;
    const altImg = btn.querySelector("img");
    lbImg.src = src;
    lbImg.alt = altImg ? altImg.alt : "";
    if (lbCount) lbCount.textContent = (lbIndex + 1) + " / " + galItems.length;
  };

  const openLightbox = (i) => {
    if (!lightbox) return;
    lastFocus = document.activeElement;
    showImage(i);
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("open"));
    document.body.style.overflow = "hidden";
    lbClose && lbClose.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightbox.hidden = true;
      lbImg && lbImg.removeAttribute("src");
    }, 320);
    if (lastFocus) lastFocus.focus();
  };

  galItems.forEach((btn, i) => {
    btn.addEventListener("click", () => openLightbox(i));
  });
  lbPrev && lbPrev.addEventListener("click", () => showImage(lbIndex - 1));
  lbNext && lbNext.addEventListener("click", () => showImage(lbIndex + 1));
  lbClose && lbClose.addEventListener("click", closeLightbox);
  lightbox &&
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") showImage(lbIndex - 1);
    else if (e.key === "ArrowRight") showImage(lbIndex + 1);
    else if (e.key === "Tab") {
      const f = [lbClose, lbPrev, lbNext].filter(Boolean);
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------- reservation form validation ---------- */
  const form = document.getElementById("reserveForm");
  if (form) {
    const status = document.getElementById("formStatus");
    const fieldOf = (el) => el.closest(".field");
    const setError = (el, msg) => {
      const field = fieldOf(el);
      if (!field) return;
      field.classList.toggle("invalid", Boolean(msg));
      const err = field.querySelector(".error");
      if (err) err.textContent = msg || "";
      el.setAttribute("aria-invalid", msg ? "true" : "false");
    };

    const phoneOk = (v) => /^(?:\+?91[-\s]?)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""));

    const validate = () => {
      let ok = true;
      const name = form.querySelector("#rName");
      const phone = form.querySelector("#rPhone");
      const date = form.querySelector("#rDate");
      const time = form.querySelector("#rTime");
      const guests = form.querySelector("#rGuests");

      if (!name.value.trim() || name.value.trim().length < 2) {
        setError(name, "Please enter your name.");
        ok = false;
      } else setError(name, "");

      if (!phone.value.trim()) {
        setError(phone, "Please enter a phone number.");
        ok = false;
      } else if (!phoneOk(phone.value)) {
        setError(phone, "Enter a valid 10-digit Indian mobile number.");
        ok = false;
      } else setError(phone, "");

      if (!date.value) {
        setError(date, "Choose a date.");
        ok = false;
      } else setError(date, "");

      if (!time.value) {
        setError(time, "Choose a time.");
        ok = false;
      } else setError(time, "");

      if (!guests.value) {
        setError(guests, "Select number of guests.");
        ok = false;
      } else setError(guests, "");

      return ok;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) {
        if (status) {
          status.textContent = "Please fix the highlighted fields.";
          status.style.color = "#efa48f";
        }
        const firstInvalid = form.querySelector(".field.invalid input, .field.invalid select");
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      if (status) {
        status.style.color = "";
        status.textContent =
          "Thank you! Your enquiry has been validated. This is a demo — no reservation has been created and no data was sent.";
      }
      form.reset();
    });

    form.querySelectorAll("input, select, textarea").forEach((el) => {
      el.addEventListener("input", () => {
        if (fieldOf(el) && fieldOf(el).classList.contains("invalid")) setError(el, "");
      });
    });

    const date = form.querySelector("#rDate");
    if (date) date.min = new Date().toISOString().split("T")[0];
  }
})();
