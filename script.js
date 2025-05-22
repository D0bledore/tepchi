// Load reusable header and footer
function loadPartial(id, url) {
    const container = document.getElementById(id);
    if (container) {
        fetch(url)
            .then(res => res.text())
            .then(html => {
                container.innerHTML = html;
                if (id === 'header-placeholder') highlightActiveNav();
            });
    }
}

function highlightActiveNav() {
    const current = location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartial('header-placeholder', 'header.html');
    loadPartial('footer-placeholder', 'footer.html');

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

    // Simple contact form validation
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            const name = form.querySelector('[name="name"]');
            const email = form.querySelector('[name="email"]');
            const message = form.querySelector('[name="message"]');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!name.value.trim() || !emailPattern.test(email.value) || !message.value.trim()) {
                e.preventDefault();
                alert('Vänligen fyll i alla fält med en giltig e-postadress.');
            }
        });
    }
});
