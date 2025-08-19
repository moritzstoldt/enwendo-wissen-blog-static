document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('header');
  var menuButton = document.getElementById('headerMenuButton');
  var backdrop = document.getElementById('headerDrawerBackdrop');
  var progress = document.getElementById('readingProgress');

  if (!header) return;

  function checkScreenSize() {
    if (window.innerWidth <= 800) {
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



  // FAQ functionality
  function initFAQ() {
    var faqSections = document.querySelectorAll('.schema-faq-section');
    
    faqSections.forEach(function(section) {
      var question = section.querySelector('.schema-faq-question');
      var answer = section.querySelector('.schema-faq-answer');
      
      if (question && answer) {
        // Make question clickable
        question.style.cursor = 'pointer';
        
        question.addEventListener('click', function() {
          // Toggle active state
          section.classList.toggle('active');
          
          // Close other FAQ sections (optional - remove if you want multiple open)
          faqSections.forEach(function(otherSection) {
            if (otherSection !== section) {
              otherSection.classList.remove('active');
            }
          });
        });
      }
    });
  }

  // Initialize FAQ after DOM is loaded
  initFAQ();
});


