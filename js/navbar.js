/**
 * Shared site navbar – injects consistent markup with mega-menu paths per page.
 */
(function () {
  function getPaths() {
    const path = window.location.pathname.replace(/\\/g, "/").toLowerCase();
    const inServices = path.includes("/services/");
    const inSubfolder =
      /\/(services|contact|clients|gallery|who-we-are|career)\//.test(path) ||
      path.includes("/services/services.html");

    const root = inSubfolder ? "../" : "";
    const svc = inServices ? "services.html" : root + "services/services.html";
    const assets = inSubfolder ? "../assets/" : "assets/";

    return { root, svc, assets };
  }

  function serviceLink(svc, view, label, icon, desc, iconClass) {
    return (
      `<a class="mega-menu-link" href="${svc}?view=${view}" data-section=".${view}" data-label="${label}">` +
      `<div class="mega-icon ${iconClass}"><img src="${icon}" alt="${label}"></div>` +
      `<div><strong>${label}</strong><span>${desc}</span></div></a>`
    );
  }

  function buildNavbar() {
    const { root, svc, assets } = getPaths();

    const services = [
      ["horticulture-section", "Horticulture", assets + "gallery/icon/hartidot.jpg", "Landscaping, Garden Design & Plant Care", "horti"],
      ["evdot-section", "EVDot", assets + "gallery/icon/evdot.jpg", "Smart EV Charging Solutions by Guru Living Assets", "evdot"],
      ["sol-section", "Solar Energy", assets + "gallery/icon/solardot.jpg", "Clean Power for Homes, Industry & Agriculture", "solar"],
      ["pest-section", "Pest Control", assets + "gallery/icon/pest_control.png", "Safe, Effective Pest Management Solutions", "pest"],
      ["tools-section", "Tools", assets + "gallery/icon/tools.png", "Professional Garden & Landscaping Equipment", "tools"],
    ]
      .map(([view, label, icon, desc, cls]) => serviceLink(svc, view, label, icon, desc, cls))
      .join("");

    return (
      `<nav class="navbar navbar-expand-lg fixed-top navbar-main">` +
      `<div class="container-fluid">` +
      `<a class="navbar-brand" href="${root}index.html">` +
      `<img alt="Guru Living Assets" loading="lazy" src="${assets}guru.png" height="48"></a>` +
      `<button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">` +
      `<i class="fa-solid fa-bars fs-4"></i></button>` +
      `<div class="collapse navbar-collapse" id="mainNav">` +
      `<ul class="navbar-nav ms-auto align-items-lg-center gap-1">` +
      `<li class="nav-item"><a class="nav-link" href="${root}index.html">Home</a></li>` +
      `<li class="nav-item"><a class="nav-link" href="${root}who-we-are/aboutus.html">Who We Are</a></li>` +
      `<li class="nav-item nav-mega-item">` +
      `<a class="nav-link nav-mega-trigger" href="${svc}">What We Do <i class="fa-solid fa-chevron-down mega-chevron"></i></a>` +
      `<div class="mega-menu-panel" role="menu" aria-label="Our Services">` +
      `<div class="mega-menu-inner">` +
      `<div class="mega-menu-header">Our Services — Guru Living Assets</div>` +
      `<div class="mega-menu-grid">${services}</div>` +
      `<div class="mega-menu-footer">` +
      `<a href="${svc}" class="mega-menu-all"><i class="fa-solid fa-arrow-right"></i> View All Services</a>` +
      `</div></div></div></li>` +
      `<li class="nav-item"><a class="nav-link" href="${root}clients/clients.html">Clients</a></li>` +
      `<li class="nav-item"><a class="nav-link" href="${root}gallery/gallery.html">Gallery</a></li>` +
      `<li class="nav-item"><a class="nav-link" href="${root}contact/contact.html">Contact</a></li>` +
      `</ul></div></div></nav>` +
      `<div class="mega-menu-backdrop" id="megaBackdrop" aria-hidden="true"></div>`
    );
  }

  function inject() {
    const el = document.getElementById("site-navbar");
    if (!el) return;
    el.outerHTML = buildNavbar();
    document.dispatchEvent(new CustomEvent("navbar:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
