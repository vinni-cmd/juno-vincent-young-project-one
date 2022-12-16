const navToggle = document.querySelector('.toggle-button');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-hidden')
})

// add event handler for keyboard users