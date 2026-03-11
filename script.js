// ================================================================
//  SARTHAK BACHHAR Portfolio Scripts
// ================================================================
(function () {
    'use strict';

    var nav       = document.getElementById('siteNav');
    var toggle    = document.getElementById('mobileToggle');
    var menu      = document.getElementById('navMenu');
    var themeBtn  = document.getElementById('themeToggle');
    var themeIcon = document.getElementById('themeIcon');
    var scrollBtn = document.getElementById('scrollTopBtn');
    var typed     = document.getElementById('typed');
    var form      = document.getElementById('contactForm');

    // 1. NAVIGATION scroll shadow and active link
    var allSections = document.querySelectorAll('section[id]');

    function onScroll() {
        var y = window.scrollY;
        if (y > 40) { nav.classList.add('scrolled'); }
        else { nav.classList.remove('scrolled'); }

        if (scrollBtn) {
            if (y > 500) { scrollBtn.classList.add('show'); }
            else { scrollBtn.classList.remove('show'); }
        }

        var current = '';
        for (var i = 0; i < allSections.length; i++) {
            var sec = allSections[i];
            if (y >= sec.offsetTop - sec.clientHeight / 3) {
                current = sec.getAttribute('id');
            }
        }
        var links = document.querySelectorAll('.nav-link');
        for (var j = 0; j < links.length; j++) {
            links[j].classList.remove('active');
            if (links[j].getAttribute('href') === '#' + current) {
                links[j].classList.add('active');
            }
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 2. MOBILE MENU
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('open');
            menu.classList.toggle('open');
        });
        var navLinks = document.querySelectorAll('.nav-link');
        for (var k = 0; k < navLinks.length; k++) {
            navLinks[k].addEventListener('click', function () {
                toggle.classList.remove('open');
                menu.classList.remove('open');
            });
        }
    }

    // 3. TYPEWRITER EFFECT
    var phrases = ['hunt threats.', 'analyze packets.', 'investigate incidents.', 'harden networks.'];
    var phraseIdx = 0;
    var charIdx = 0;
    var deleting = false;

    function tick() {
        var phrase = phrases[phraseIdx];
        if (!deleting) {
            typed.textContent = phrase.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === phrase.length) { deleting = true; setTimeout(tick, 1800); return; }
            setTimeout(tick, 90);
            return;
        }
        typed.textContent = phrase.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(tick, 400);
            return;
        }
        setTimeout(tick, 45);
    }
    if (typed) { setTimeout(tick, 900); }

    // 4. THEME TOGGLE
    var savedTheme = localStorage.getItem('sb_theme');
    var currentTheme = savedTheme || 'light';

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.className = (theme === 'dark') ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    applyTheme(currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
            applyTheme(currentTheme);
            localStorage.setItem('sb_theme', currentTheme);
        });
    }

    // 5. SCROLL TO TOP
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. CONTACT FORM
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            var original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            btn.disabled = true;
            setTimeout(function () {
                alert('Message sent! Thanks for reaching out.');
                form.reset();
                btn.innerHTML = original;
                btn.disabled = false;
            }, 1400);
        });
    }

    // 7. SCROLL REVEAL ANIMATIONS
    var targets = document.querySelectorAll(
        '.section-heading, .about-layout, .skill-card, .tl-entry, .project-card, .cert-card, .contact-grid, .edu-card'
    );
    for (var r = 0; r < targets.length; r++) { targets[r].classList.add('reveal'); }

    var revealObs = new IntersectionObserver(function (entries) {
        for (var e = 0; e < entries.length; e++) {
            if (entries[e].isIntersecting) {
                entries[e].target.classList.add('visible');
                revealObs.unobserve(entries[e].target);
            }
        }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    var reveals = document.querySelectorAll('.reveal');
    for (var v = 0; v < reveals.length; v++) { revealObs.observe(reveals[v]); }

    // Stagger grid children
    var grids = document.querySelectorAll('.skills-grid, .projects-grid, .certs-grid');
    for (var g = 0; g < grids.length; g++) {
        var children = grids[g].children;
        for (var c = 0; c < children.length; c++) {
            children[c].style.transitionDelay = (c * 0.08) + 's';
        }
    }

    // 8. TERMINAL TYPING ANIMATION
    var termLines = document.querySelectorAll('.terminal-body .tline');
    for (var t = 0; t < termLines.length; t++) {
        (function (line, index) {
            line.style.opacity = '0';
            line.style.transform = 'translateY(6px)';
            line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            setTimeout(function () {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 600 + index * 250);
        })(termLines[t], t);
    }

})();
