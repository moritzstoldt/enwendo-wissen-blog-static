document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('header');
  var menuButton = document.getElementById('headerMenuButton');
  var backdrop = document.getElementById('headerDrawerBackdrop');
  var progress = document.getElementById('readingProgress');

  if (!header) return;

  function checkScreenSize() {
    if (window.innerWidth <= 700) {
      header.classList.add('header--withDrawer');
    } else {
      header.classList.remove('header--withDrawer');
      header.classList.remove('header--drawerOpen');
    }
  }

  function toggleMenu() {
    header.classList.toggle('header--drawerOpen');
  }

  function closeMenu() {
    header.classList.remove('header--drawerOpen');
  }

  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);

  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Reading progress bar
  if (progress) {
    function updateProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = percent + '%';
    }
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }
});


