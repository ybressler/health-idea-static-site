// ========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// FORM SUBMISSION HANDLER
// ========================================

const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = this.querySelector('.email-input');
        const email = emailInput.value;

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            // In a real application, this would send data to a server
            alert(`Thank you for your interest! We'll send you more information at ${email}`);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// ========================================
// ADD SCROLL EFFECT TO NAVIGATION
// ========================================

let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.06)';
    }

    lastScroll = currentScroll;
});

// ========================================
// ANIMATE ELEMENTS ON SCROLL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate in
const animateElements = document.querySelectorAll('.step, .feature-card, .testimonial-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// MOBILE MENU (for future enhancement)
// ========================================

// This is a placeholder for when you want to add a mobile hamburger menu
// For now, the navigation hides non-essential links on mobile

console.log('CareCompass website loaded successfully! 🎯');
