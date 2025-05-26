import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import './style.css';

// Create a root element for React to render into
document.addEventListener('DOMContentLoaded', () => {
  const headerPlaceholder = document.getElementById('header-placeholder');
  
  if (headerPlaceholder) {
    ReactDOM.createRoot(headerPlaceholder).render(
      <React.StrictMode>
        <Header />
      </React.StrictMode>
    );
  }
  
  // Setup other functionality from the original script
  setupImageUpload();
  setupSmoothScrolling();
  setupContactForm();
  setupScrollAnimations();
});

// Image upload functionality
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

// Smooth scrolling for in-page anchors
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Contact form validation
function setupContactForm() {
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
}

// Scroll-triggered animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('main section').forEach(sec => observer.observe(sec));
}