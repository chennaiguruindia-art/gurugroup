// Counter variables (used by counter.js)
let section_counter = document.querySelector('#section_counter');
let counters = document.querySelectorAll('.counter');

function initActiveNav() {
  const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();

  document.querySelectorAll('.navbar-main .nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase().split('?')[0];
    link.classList.remove('active');

    if (path.endsWith('/index.html') || path.endsWith('/') && !path.includes('/services/') && !path.includes('/contact/') && !path.includes('/clients/') && !path.includes('/gallery/') && !path.includes('/who-we-are/') && !path.includes('/career/')) {
      if (href === 'index.html' || href.endsWith('/index.html')) link.classList.add('active');
    } else if (path.includes('/who-we-are/') && href.includes('aboutus')) {
      link.classList.add('active');
    } else if (path.includes('/services/') && href.includes('services.html') && link.classList.contains('nav-mega-trigger')) {
      link.classList.add('active');
    } else if (path.includes('/clients/') && href.includes('clients')) {
      link.classList.add('active');
    } else if (path.includes('/gallery/') && href.includes('gallery') && !href.includes('icon')) {
      link.classList.add('active');
    } else if (path.includes('/contact/') && href.includes('contact')) {
      link.classList.add('active');
    } else if (path.includes('/career/') && href.includes('career')) {
      link.classList.add('active');
    }
  });
}

function initMegaMenu() {
  const megaItems = document.querySelectorAll('.nav-mega-item');
  const backdrop = document.getElementById('megaBackdrop');
  if (!megaItems.length) return;

  const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;

  function closeAllMegas() {
    megaItems.forEach(item => {
      item.classList.remove('mega-open');
      const t = item.querySelector('.nav-mega-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
    document.body.classList.remove('mega-menu-open');
  }

  megaItems.forEach(megaItem => {
    const trigger = megaItem.querySelector('.nav-mega-trigger');
    const panel = megaItem.querySelector('.mega-menu-panel');
    if (!panel) return;

    let closeTimer;

    function openThis() {
      clearTimeout(closeTimer);
      // Close other mega menus first
      megaItems.forEach(other => {
        if (other !== megaItem) {
          other.classList.remove('mega-open');
          const ot = other.querySelector('.nav-mega-trigger');
          if (ot) ot.setAttribute('aria-expanded', 'false');
        }
      });
      megaItem.classList.add('mega-open');
      document.body.classList.add('mega-menu-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
    }

    function closeThis() {
      megaItem.classList.remove('mega-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      // Check if any mega is still open
      const anyOpen = document.querySelector('.nav-mega-item.mega-open');
      if (!anyOpen) document.body.classList.remove('mega-menu-open');
    }

    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(closeThis, 180);
    }

    megaItem.addEventListener('mouseenter', () => {
      if (isDesktop()) openThis();
    });

    megaItem.addEventListener('mouseleave', () => {
      if (isDesktop()) scheduleClose();
    });

    panel.addEventListener('mouseenter', () => {
      if (isDesktop()) openThis();
    });

    panel.addEventListener('mouseleave', () => {
      if (isDesktop()) scheduleClose();
    });

    if (trigger) {
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', (e) => {
        if (!isDesktop()) {
          e.preventDefault();
          megaItem.classList.contains('mega-open') ? closeThis() : openThis();
        }
      });
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeAllMegas);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMegas();
  });

  window.addEventListener('resize', () => {
    if (!isDesktop()) document.body.classList.remove('mega-menu-open');
  });
}

function initNavbar() {
  initActiveNav();
  initMegaMenu();
}

document.addEventListener('DOMContentLoaded', initNavbar);
document.addEventListener('navbar:ready', initNavbar);
