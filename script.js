// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu && navMenu.contains(event.target);
        const isClickOnHamburger = hamburger && hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    });
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const fitnessGoal = document.getElementById('fitnessGoal').value;
            const message = document.getElementById('message').value.trim();

            // Validate form
            if (!validateForm(name, phone, email, fitnessGoal, message)) {
                return;
            }

            // If validation passes, prepare WhatsApp message and redirect
            const whatsappMessage = encodeURIComponent(
                `Hello Rocky Fitness Team!\n\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Email: ${email || 'Not provided'}\n` +
                `Fitness Goal: ${fitnessGoal}\n` +
                `Message: ${message}\n\n` +
                `Please contact me soon. Thank you!`
            );

            // Create WhatsApp link
            const whatsappLink = `https://wa.me/918983315058?text=${whatsappMessage}`;

            // Store form data in localStorage for thank you page
            localStorage.setItem('contactFormSubmitted', 'true');
            localStorage.setItem('contactName', name);

            // Redirect to WhatsApp
            window.location.href = whatsappLink;

            // Fallback: If WhatsApp doesn't open, redirect to thank you page after 2 seconds
            setTimeout(function() {
                window.location.href = 'thank-you.html';
            }, 2000);
        });
    }
});

// ==========================================
// FORM VALIDATION
// ==========================================

function validateForm(name, phone, email, goal, message) {
    let isValid = true;

    // Clear all error messages
    clearAllErrors();

    // Name validation
    if (name === '') {
        showError('nameError', 'Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Phone validation
    if (phone === '') {
        showError('phoneError', 'Please enter your phone number');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    // Email validation (optional but if provided, must be valid)
    if (email !== '' && !isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Goal validation
    if (goal === '') {
        showError('goalError', 'Please select your fitness goal');
        isValid = false;
    }

    // Message validation
    if (message === '') {
        showError('messageError', 'Please enter a message');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

// ==========================================
// VALIDATION HELPER FUNCTIONS
// ==========================================

function isValidPhone(phone) {
    // Accept phone numbers with +91 prefix or without
    const phoneRegex = /^(\+91[-\s]?)?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// NAVBAR BACKGROUND ON SCROLL
// ==========================================

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.15)';
        }
    }
});

// ==========================================
// ANIMATE ELEMENTS ON SCROLL
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.card, .service-card, .highlight-card, .plan-card, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ==========================================
// ADD FADEINU ANIMATION
// ==========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// THANK YOU PAGE DISPLAY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const thankYouSection = document.querySelector('.thank-you-section');
    if (thankYouSection) {
        const formSubmitted = localStorage.getItem('contactFormSubmitted');
        const contactName = localStorage.getItem('contactName');

        if (formSubmitted && contactName) {
            // Form was submitted, display success message
            console.log('Contact form submitted by:', contactName);
            // Clear localStorage
            localStorage.removeItem('contactFormSubmitted');
            localStorage.removeItem('contactName');
        }
    }
});

// ==========================================
// LAZY LOADING FOR IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
} else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
    });
}

// ==========================================
// FORM INPUT CLEAR ERROR ON FOCUS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Find the corresponding error message
            const errorElement = this.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.classList.remove('show');
                errorElement.textContent = '';
            }
        });
    });
});

// ==========================================
// PHONE NUMBER FORMATTING (Optional)
// ==========================================

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 10) {
                value = value;
            } else if (value.startsWith('91') && value.length <= 12) {
                value = '+' + value;
            } else {
                value = value.substring(0, 12);
            }
        }
        
        e.target.value = value;
    });
}

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Rocky Health & Fitness Website Loaded');
    
    // Check if service worker is available (for PWA)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/rocky-health-and-fitness/sw.js').catch(err => {
            console.log('Service worker registration failed:', err);
        });
    }
});