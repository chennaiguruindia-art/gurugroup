$(document).ready(function () {
  const sections = [
    ".horticulture-section",
    ".evdot-section",
    ".tools-section",
    ".pest-section",
    ".sol-section",
  ];

  const serviceMap = {
    "horticulture-section": { cls: ".hor", text: "Horticulture" },
    "evdot-section": { cls: ".evdot", text: "EVDot" },
    "tools-section": { cls: ".toool", text: "Tools" },
    "pest-section": { cls: ".pest", text: "Pest Control" },
    "sol-section": { cls: ".sol", text: "Solar Energy" },
  };

  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");

  /* Hide all sections, show selected or default */
  $(sections.join(",")).hide();
  $(".planter_images").hide();
  $(".image-gallery").hide();
  $(".ass2, .ass3").hide();
  $(".view").not(":first").hide();
  $(".vieww").not(":first").hide();
  $(".pg-1").show();
  $(".pg-2, .pg-3, .pg-4, .pg-5, .pg-6").hide();

  if (view && $("." + view).length) {
    $("." + view).show();
  } else {
    $(".horticulture-section").show();
  }

  /* Active badge state */
  $(".service").removeClass("service-active");
  if (view && serviceMap[view]) {
    $(serviceMap[view].cls).addClass("service-active");
    $(".dropdown-toggle").html(serviceMap[view].text);
  } else {
    $(".hor").addClass("service-active");
  }

  /* Pagination */
  let page = 1;
  function showPage(p) {
    $(".pg-1, .pg-2, .pg-3, .pg-4, .pg-5, .pg-6").hide();
    $(".pg-" + p).show();
    $(".prev").toggleClass("disable", p === 1);
    $(".next").toggleClass("disable", p === 6);
  }

  window.next = function () {
    if (page < 6) page++;
    showPage(page);
  };

  window.prev = function () {
    if (page > 1) page--;
    showPage(page);
  };

  /* Section switcher */
  const btnClassMap = {
    ".horticulture-section": ".hor",
    ".evdot-section": ".evdot",
    ".tools-section": ".toool",
    ".pest-section": ".pest",
    ".sol-section": ".sol",
  };

  function switchSection(section, text) {
    $(sections.join(",")).hide();
    $(section).show();
    $(".dropdown-toggle").html(text);
    $(".service").removeClass("service-active");
    if (btnClassMap[section]) $(btnClassMap[section]).addClass("service-active");
    $("html, body").animate({ scrollTop: $(".what-we-do").offset().top - 100 }, 400);
  }

  $(".horticulture-btn").click(function (e) {
    e.preventDefault();
    switchSection(".horticulture-section", "Horticulture");
  });
  $(".evdot-btn").click(function (e) {
    e.preventDefault();
    switchSection(".evdot-section", "EVDot");
  });
  $(".tools-btn").click(function (e) {
    e.preventDefault();
    switchSection(".tools-section", "Tools");
  });
  $(".pest-btn").click(function (e) {
    e.preventDefault();
    switchSection(".pest-section", "Pest Control");
  });
  $(".ren-sol").click(function (e) {
    e.preventDefault();
    switchSection(".sol-section", "Solar Energy");
  });

  /* Mega menu links */
  $(".mega-menu-link").click(function (e) {
    e.preventDefault();
    const target = $(this).data("section");
    const text = $(this).data("label") || $(this).find("strong").text().trim();
    if (target) switchSection(target, text);
    $(".nav-mega-item").removeClass("mega-open");
  });

  /* View toggles */
  $(".view-selectors button").click(function () {
    const id = $(this).attr("id").replace("select-", "");
    $(".view").hide();
    $("#" + id).show();
  });

  $(".vieww-selectors button").click(function () {
    const id = $(this).attr("id").replace("select-", "");
    $(".vieww").hide();
    $("#" + id).show();
  });

  /* View more */
  $(".view-more button").each(function (index) {
    $(this).click(function () {
      $(".image-gallery").eq(index).slideToggle();
      $(this).html(
        $(this).html().includes("View More")
          ? 'View Less <i class="fa-solid fa-chevron-up"></i>'
          : 'View More <i class="fa-solid fa-chevron-down"></i>'
      );
    });
  });

  /* Active states */
  $(".sub-title").click(function () {
    $(".sub-title").removeClass("sub-active");
    $(this).addClass("sub-active");
  });

  $(".service").click(function () {
    $(".service").removeClass("service-active");
    $(this).addClass("service-active");
  });

  $(".navigation .link").click(function () {
    $(".navigation .link").removeClass("active");
    $(this).addClass("active");
  });

  $(".one").click(() => $(".assesment_container").hide().filter(".ass1").show());
  $(".two").click(() => $(".assesment_container").hide().filter(".ass2").show());
  $(".three").click(() => $(".assesment_container").hide().filter(".ass3").show());

  /* Mega menu hover (desktop) */
  const megaItem = $(".nav-mega-item");
  let megaTimer;
  megaItem.on("mouseenter", function () {
    clearTimeout(megaTimer);
    $(this).addClass("mega-open");
  });
  megaItem.on("mouseleave", function () {
    megaTimer = setTimeout(() => $(this).removeClass("mega-open"), 200);
  });
});
