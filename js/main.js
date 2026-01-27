// Mobile header dropdown toggle
const headerToggle = document.querySelector('.header__toggle');
const headerMenu = document.getElementById('header-menu');

if (headerToggle && headerMenu) {
    headerToggle.addEventListener('click', () => {
        const isExpanded = headerToggle.getAttribute('aria-expanded') === 'true';
        headerToggle.setAttribute('aria-expanded', !isExpanded);
        headerMenu.setAttribute('data-visible', !isExpanded);
    });

    // Close menu when a link is clicked
    const headerLinks = headerMenu.querySelectorAll('.header__link');
    headerLinks.forEach(link => {
        link.addEventListener('click', () => {
            headerToggle.setAttribute('aria-expanded', 'false');
            headerMenu.setAttribute('data-visible', 'false');
        });
    });

    // Close menu when mobile Login button is clicked
    const mobileLoginBtn = headerMenu.querySelector('.header__btn-mobile');
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', () => {
            headerToggle.setAttribute('aria-expanded', 'false');
            headerMenu.setAttribute('data-visible', 'false');
        });
    }
}

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
});