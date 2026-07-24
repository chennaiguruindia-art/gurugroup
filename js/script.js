// Counter variables (used by counter.js)
let section_counter = document.querySelector('#section_counter');
let counters = document.querySelectorAll('.counter');

// Active nav highlighting
document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  document.querySelectorAll('.navbar-main .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
