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
