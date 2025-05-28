
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

// Setup responsive header navigation
function setupHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const navToggle = header.querySelector('.nav-toggle');
    const nav = header.querySelector('nav');

    const updateNavbarHeight = () => {
        document.documentElement.style.setProperty('--navbar-height', header.offsetHeight + 'px');
    };
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navToggle.textContent = expanded ? '☰' : '✕';
            nav.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.textContent = '☰';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.textContent = '☰';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Setup responsive header
    setupHeader();

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