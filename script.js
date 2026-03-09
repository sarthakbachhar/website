// Navigation scroll effect
const navbar = document.querySelector('.glass-nav');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Add specific classes on scroll for styling
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active link switching based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
        if (navLink.getAttribute('href').includes(current)) {
            navLink.classList.add('active');
        }
    });
});

// Mobile menu toggle
mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileBtn.querySelector('i');
    if(navLinks.classList.contains('active')){
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});

// Typewriter Effect for Hero Section
const phrases = [
    "Cybersecurity Student.",
    "Network Defender.",
    "System Investigator.",
    "Future Security Analyst."
];
let currentPhraseIndex = 0;
let isDeleting = false;
let charIndex = 0;
const typewriterElement = document.getElementById('typewriter');
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenPhrases = 2000;

function typeEffect() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        // Remove character
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add character
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let timeoutSpeed = isDeleting ? deletingSpeed : typingSpeed;

    // Logic for deciding next action
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing phrase, wait then delete
        timeoutSpeed = delayBetweenPhrases;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next phrase
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        timeoutSpeed = 500; // Small pause before typing next
    }

    setTimeout(typeEffect, timeoutSpeed);
}

// Start typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    if(typewriterElement) {
        setTimeout(typeEffect, 1000); // Initial delay
    }
});

// Simple form handling
document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate API call
    setTimeout(() => {
        alert("Transmission Successful! Your message has been sent to Sarthak.");
        this.reset();
        btn.innerHTML = originalText;
    }, 1500);
});

// Smooth reveal animation for sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Set initial states for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});