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
  const megaItem = document.querySelector('.nav-mega-item');
  const megaPanel = document.querySelector('.mega-menu-panel');
  const backdrop = document.getElementById('megaBackdrop');
  const trigger = document.querySelector('.nav-mega-trigger');
  if (!megaItem || !megaPanel) return;

  let closeTimer;
  const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;

  function openMega() {
    clearTimeout(closeTimer);
    megaItem.classList.add('mega-open');
    document.body.classList.add('mega-menu-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  }

  function closeMega() {
    megaItem.classList.remove('mega-open');
    document.body.classList.remove('mega-menu-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(closeMega, 180);
  }

  megaItem.addEventListener('mouseenter', () => {
    if (isDesktop()) openMega();
  });

  megaItem.addEventListener('mouseleave', () => {
    if (isDesktop()) scheduleClose();
  });

  megaPanel.addEventListener('mouseenter', () => {
    if (isDesktop()) openMega();
  });

  megaPanel.addEventListener('mouseleave', () => {
    if (isDesktop()) scheduleClose();
  });

  if (trigger) {
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', (e) => {
      if (!isDesktop()) {
        e.preventDefault();
        megaItem.classList.contains('mega-open') ? closeMega() : openMega();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMega);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMega();
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
