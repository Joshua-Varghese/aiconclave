(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initReveal() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.add("is-revealed");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    if (!bar) return;

    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct + "%";
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function formatIndian(n) {
    var s = String(Math.round(n));
    var last3 = s.slice(-3);
    var rest = s.slice(0, -3);
    if (!rest) return last3;
    return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
  }

  function initCountUp() {
    var nodes = document.querySelectorAll("[data-count-to]");
    if (!nodes.length) return;

    function animate(el) {
      if (el.dataset.counted === "1") return;
      el.dataset.counted = "1";

      var target = parseFloat(el.getAttribute("data-count-to"));
      if (isNaN(target)) return;

      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";
      var indian = el.getAttribute("data-format") === "indian";

      if (reduceMotion) {
        el.textContent = prefix + (indian ? formatIndian(target) : String(target)) + suffix;
        return;
      }

      var start = performance.now();
      var duration = 1200;

      function frame(now) {
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        var value = target * eased;
        el.textContent = prefix + (indian ? formatIndian(value) : String(Math.round(value))) + suffix;
        if (t < 1) requestAnimationFrame(frame);
        else el.textContent = prefix + (indian ? formatIndian(target) : String(target)) + suffix;
      }

      requestAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(animate);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  function initScheduleTabs() {
    var buttons = document.querySelectorAll(".day-toggle-btn");
    if (!buttons.length) return;

    var day1 = document.getElementById("schedule-day1");
    var panel = document.getElementById("panel");
    var day2 = document.getElementById("schedule-day2");

    function showDay(day) {
      var is1 = String(day) === "1";
      if (day1) day1.hidden = !is1;
      if (panel) panel.hidden = !is1;
      if (day2) day2.hidden = is1;

      buttons.forEach(function (btn) {
        var active = btn.getAttribute("data-day-target") === String(day);
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        showDay(btn.getAttribute("data-day-target"));
      });
    });

    showDay(1);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function initRegisterForm() {
    var form = document.getElementById("register-form");
    if (!form) return;

    var errorEl = document.getElementById("register-error");
    var panel = document.getElementById("confirmation-panel");
    var summary = document.getElementById("confirmation-summary");
    var again = document.getElementById("register-again");
    var submitBtn = document.getElementById("register-submit");
    var submitting = false;

    function setError(message) {
      if (!errorEl) return;
      errorEl.textContent = message || "Please fill in all required fields.";
      errorEl.classList.add("is-visible");
    }

    function clearError() {
      if (!errorEl) return;
      errorEl.classList.remove("is-visible");
    }

    function setSubmitting(state) {
      submitting = state;
      if (!submitBtn) return;
      submitBtn.disabled = state;
      submitBtn.setAttribute("aria-busy", state ? "true" : "false");
      if (state) {
        submitBtn.dataset.originalHtml = submitBtn.innerHTML;
        submitBtn.textContent = "Submitting…";
      } else if (submitBtn.dataset.originalHtml) {
        submitBtn.innerHTML = submitBtn.dataset.originalHtml;
      }
    }

    function showConfirmation(formData) {
      if (summary) {
        var tracksText = formData.tracks.length ? formData.tracks.join(", ") : "None selected";
        summary.innerHTML =
          "<dt>Name</dt><dd>" +
          escapeHtml(formData.name) +
          "</dd>" +
          "<dt>Email</dt><dd>" +
          escapeHtml(formData.email) +
          "</dd>" +
          "<dt>Category</dt><dd>" +
          escapeHtml(formData.category) +
          "</dd>" +
          "<dt>Tracks</dt><dd>" +
          escapeHtml(tracksText) +
          "</dd>";
      }

      form.hidden = true;
      if (panel) {
        panel.classList.add("is-visible");
        panel.setAttribute("tabindex", "-1");
        panel.focus();
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitting) return;

      var name = form.elements.namedItem("name");
      var email = form.elements.namedItem("email");
      var phone = form.elements.namedItem("phone");
      var org = form.elements.namedItem("organisation");
      var category = form.elements.namedItem("category");

      var valid =
        name &&
        name.value.trim() &&
        email &&
        email.value.trim() &&
        phone &&
        phone.value.trim() &&
        org &&
        org.value.trim() &&
        category &&
        category.value;

      if (!valid) {
        setError("Please fill in all required fields.");
        return;
      }

      clearError();

      var tracks = Array.prototype.slice
        .call(form.querySelectorAll('input[name="tracks"]:checked'))
        .map(function (el) {
          return el.value;
        });

      var formData = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        organisation: org.value.trim(),
        category: category.value,
        tracks: tracks
      };

      setSubmitting(true);

      fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok, status: res.status, data: data || {} };
          }).catch(function () {
            return { ok: res.ok, status: res.status, data: {} };
          });
        })
        .then(function (result) {
          if (!result.ok || !result.data.ok) {
            setError(
              (result.data && result.data.error) ||
                "Could not save registration. Please try again."
            );
            return;
          }
          showConfirmation(result.data.registration || formData);
        })
        .catch(function () {
          setError("Network error. Check your connection and try again.");
        })
        .then(function () {
          setSubmitting(false);
        });
    });

    if (again) {
      again.addEventListener("click", function () {
        form.reset();
        form.hidden = false;
        if (panel) {
          panel.classList.remove("is-visible");
          panel.removeAttribute("tabindex");
        }
        if (summary) summary.innerHTML = "";
        clearError();
        var nameField = document.getElementById("field-name");
        if (nameField) nameField.focus();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initReveal();
    initScrollProgress();
    initCountUp();
    initScheduleTabs();
    initRegisterForm();
  });
})();
