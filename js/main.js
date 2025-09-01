
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu').querySelector('ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Optional: Cart functionality
// Example: increase/decrease quantity, update total price dynamically
