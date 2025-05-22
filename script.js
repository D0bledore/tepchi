// Load reusable header and footer
function loadPartial(id, url) {
    const container = document.getElementById(id);
    if (!container) {
        return Promise.resolve();
    }

    return fetch(url)
        .then(res => res.text())
        .then(html => {
            container.innerHTML = html;
            if (id === 'header-placeholder') {
                buildNavLinks();
                highlightActiveNav();
                setupNavToggle();
                updateNavbarHeight();
                logHeaderMetrics();
            }
        });
}

// Keep a CSS variable in sync with the header height
function updateNavbarHeight() {
    const header = document.querySelector('header');
    if (header) {
        document.documentElement.style.setProperty('--navbar-height', header.offsetHeight + 'px');
    }
}

function logHeaderMetrics() {
    const header = document.querySelector('header');
    if (!header) return;
    const style = getComputedStyle(header);
    console.log('[Header Metrics]', {
        position: style.position,
        top: style.top,
        zIndex: style.zIndex,
        width: style.width,
        background: style.backgroundColor,
        boxShadow: style.boxShadow,
        padding: style.padding,
        offsetHeight: header.offsetHeight,
        boundingRect: header.getBoundingClientRect()
    });
}

// Create navigation links based on current page
// Build a context-aware navbar so anchors only appear on the homepage
function buildNavLinks() {
    const navList = document.querySelector('.nav-links');
    if (!navList) return;

    navList.innerHTML = '';
    const current = location.pathname.split('/').pop() || 'index.html';

    const links = (current === 'index.html') ? [
        { href: '#services', text: 'Tjänster' },
        { href: '#reviews', text: 'Recensioner' },
        { href: '#visit', text: 'Besök' },
        { href: 'about.html', text: 'Om oss' },
        { href: 'contact.html', text: 'Kontakt' },
    ] : [
        { href: 'index.html', text: 'Hem' },
        { href: 'about.html', text: 'Om Oss' },
        { href: 'contact.html', text: 'Kontakt' },
    ];

    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        navList.appendChild(li);
    });
}

function highlightActiveNav() {
    const current = location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

function setupNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('header nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            nav.classList.toggle('open');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartial('header-placeholder', 'header.html');
    loadPartial('footer-placeholder', 'footer.html');
    // Register once to avoid duplicate listeners on subsequent loads
    window.addEventListener('resize', updateNavbarHeight);

    // Smooth scrolling for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Accessible contact form validation
    const form = document.getElementById('contact-form');
    if (form) {
        const successMsg = document.getElementById('form-success');

        form.addEventListener('submit', e => {
            e.preventDefault();
            let valid = true;

            const name = form.querySelector('[name="name"]');
            const email = form.querySelector('[name="email"]');
            const message = form.querySelector('[name="message"]');

            const fields = [name, email, message];
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            function showError(field, msg) {
                const error = field.nextElementSibling;
                error.textContent = msg;
                field.setAttribute('aria-invalid', 'true');
            }

            function clearError(field) {
                const error = field.nextElementSibling;
                error.textContent = '';
                field.removeAttribute('aria-invalid');
            }

            if (!name.value.trim()) {
                showError(name, 'Ange ditt namn');
                valid = false;
            } else {
                clearError(name);
            }

            if (!emailPattern.test(email.value)) {
                showError(email, 'Ange en giltig e-postadress');
                valid = false;
            } else {
                clearError(email);
            }

            if (!message.value.trim()) {
                showError(message, 'Skriv ett meddelande');
                valid = false;
            } else {
                clearError(message);
            }

            if (valid) {
                successMsg.textContent = 'Tack! Vi återkommer så snart som möjligt.';
                form.reset();
            }
        });
    }

    // Scroll-triggered animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('main section').forEach(sec => observer.observe(sec));
});
