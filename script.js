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

// Setup image upload functionality
function setupImageUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('image-upload');
    const resultDiv = document.getElementById('upload-result');
    
    if (!uploadArea || !fileInput || !resultDiv) return;
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Check if file is an image
            if (!file.type.match('image.*')) {
                resultDiv.innerHTML = '<p>Vänligen ladda upp en bild (JPG, PNG, etc).</p>';
                resultDiv.className = 'upload-result error';
                return;
            }
            
            // Display the uploaded image
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadArea.innerHTML = `<img src="${event.target.result}" alt="Uppladdad bild" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
                
                // Simulate AI analysis (in a real app, this would be an API call)
                setTimeout(() => {
                    resultDiv.innerHTML = `
                        <h3>AI-analys klar!</h3>
                        <p>Vi har identifierat att ditt plagg behöver lagning av sömmen.</p>
                        <p>Uppskattat pris: 150 kr (75 kr efter RUT-avdrag)</p>
                        <button id="confirm-repair" class="confirm-button">Bekräfta reparation</button>
                    `;
                    resultDiv.className = 'upload-result success';
                    
                    // Add event listener to the confirm button
                    document.getElementById('confirm-repair').addEventListener('click', () => {
                        resultDiv.innerHTML = `
                            <h3>Tack för din beställning!</h3>
                            <p>Vi kommer att kontakta dig inom kort för att arrangera upphämtning.</p>
                        `;
                    });
                }, 1500);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('highlight');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('highlight');
        }, false);
    });
    
    uploadArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            fileInput.files = files;
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
        }
    }, false);
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartial('header-placeholder', 'header.html');
    loadPartial('footer-placeholder', 'footer.html');
    // Register once to avoid duplicate listeners on subsequent loads
    window.addEventListener('resize', updateNavbarHeight);
    
    // Setup image upload functionality
    setupImageUpload();

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