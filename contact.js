// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeAnimations();
    initializeForm();
    initializeFAB();
    initializePhoneValidation();
    initializeSmoothScrolling();
});

// Animation Observer for scroll-triggered animations
function initializeAnimations() {
    // Simple animation trigger on scroll
    const animateElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Title glow effect enhancement
    const title = document.querySelector('.section-title');
    if (title) {
        let glowIntensity = 0;
        let increasing = true;
        
        setInterval(() => {
            if (increasing) {
                glowIntensity += 0.01;
                if (glowIntensity >= 1) increasing = false;
            } else {
                glowIntensity -= 0.01;
                if (glowIntensity <= 0) increasing = true;
            }
            
            const opacity = 0.3 + (glowIntensity * 0.3);
            title.style.textShadow = `0 0 ${30 + glowIntensity * 20}px rgba(255, 0, 0, ${opacity})`;
        }, 50);
    }
}

// Form handling
function initializeForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input[required], select[required], textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Form validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';

    // Remove previous error
    removeFieldError(field);

    // Check if field is empty
    if (field.hasAttribute('required') && value === '') {
        errorMessage = 'Це поле є обов\'язковим';
        isValid = false;
    }
    // Email validation
    else if (fieldType === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Введіть коректний email';
            isValid = false;
        }
    }
    // Phone validation
    else if (fieldType === 'tel' && value !== '') {
        const phoneRegex = /^[\+]?[0-9\s\(\)\-]{10,}$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Введіть коректний номер телефону';
            isValid = false;
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element
    const errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    errorEl.style.cssText = `
        color: #ff4444;
        font-size: 0.8rem;
        position: absolute;
        bottom: -20px;
        left: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    field.parentNode.style.position = 'relative';
    field.parentNode.appendChild(errorEl);
    
    // Animate error message
    setTimeout(() => {
        errorEl.style.opacity = '1';
    }, 10);

    // Add error styles to field
    field.style.borderBottomColor = '#ff4444';
}

function removeFieldError(field) {
    field.classList.remove('error');
    field.style.borderBottomColor = '';
    
    const errorEl = field.parentNode.querySelector('.error-message');
    if (errorEl) {
        errorEl.remove();
    }
}

// Form submission
function submitForm() {
    const submitBtn = document.querySelector('.submit-btn');
    const form = document.getElementById('contactForm');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Show success message
        showNotification('Дякуємо! Ваша заявка успішно відправлена. Ми зв\'яжемося з вами найближчим часом.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset all labels
        const labels = form.querySelectorAll('label');
        labels.forEach(label => {
            label.style.transform = '';
            label.style.fontSize = '';
            label.style.color = '';
        });
        
    }, 2000);
}

// Phone validation enhancement
function initializePhoneValidation() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('380')) {
                value = '+' + value;
            } else if (value.startsWith('80')) {
                value = '+3' + value;
            } else if (value.startsWith('0')) {
                value = '+38' + value;
            }
            
            // Format phone number
            if (value.length > 3) {
                value = value.substring(0, 3) + ' (' + value.substring(3, 6) + ') ' + 
                       value.substring(6, 9) + '-' + value.substring(9, 11) + '-' + value.substring(11, 13);
            }
            
            e.target.value = value;
        });
    }
}

// Floating Action Button
function initializeFAB() {
    const fabButton = document.getElementById('fabButton');
    const fabOptions = document.getElementById('fabOptions');
    let isOpen = false;

    if (fabButton && fabOptions) {
        fabButton.addEventListener('click', function() {
            isOpen = !isOpen;
            
            if (isOpen) {
                fabOptions.classList.add('active');
                fabButton.style.transform = 'rotate(45deg)';
                fabButton.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                fabOptions.classList.remove('active');
                fabButton.style.transform = 'rotate(0deg)';
                fabButton.innerHTML = '<i class="fas fa-phone"></i>';
            }
        });

        // Close FAB when clicking outside
        document.addEventListener('click', function(e) {
            if (!fabButton.contains(e.target) && !fabOptions.contains(e.target) && isOpen) {
                isOpen = false;
                fabOptions.classList.remove('active');
                fabButton.style.transform = 'rotate(0deg)';
                fabButton.innerHTML = '<i class="fas fa-phone"></i>';
            }
        });
    }
}

// Phone call function
function makeCall(phoneNumber) {
    if (confirm('Зателефонувати на номер ' + phoneNumber + '?')) {
        window.location.href = 'tel:' + phoneNumber;
    }
}

// Smooth scrolling for internal links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #28a745, #20c997)' : 
                     type === 'error' ? 'linear-gradient(45deg, #dc3545, #e74c3c)' : 
                     'linear-gradient(45deg, #007bff, #0056b3)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 300px;
        font-size: 0.9rem;
        line-height: 1.4;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 5000);

    // Click to dismiss
    notification.addEventListener('click', function() {
        this.style.opacity = '0';
        this.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (this.parentNode) {
                this.remove();
            }
        }, 400);
    });
}

// Parallax effect for background elements
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Contact card hover effects
function initializeCardEffects() {
    const cards = document.querySelectorAll('.info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation to other cards
            cards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.8';
                    otherCard.style.transform = 'scale(0.98)';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            // Reset all cards
            cards.forEach(otherCard => {
                otherCard.style.opacity = '';
                otherCard.style.transform = '';
            });
        });
    });
}

// Initialize additional effects
setTimeout(() => {
    initializeParallax();
    initializeCardEffects();
}, 100);

// Social media link tracking
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.dataset.social;
        console.log(`User clicked on ${platform} social link`);
        
        // Here you could add analytics tracking
        // gtag('event', 'social_click', { 'platform': platform });
    });
});

// Form field focus effects
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentNode.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        this.parentNode.classList.remove('focused');
        if (this.value.trim() !== '') {
            this.parentNode.classList.add('has-value');
        } else {
            this.parentNode.classList.remove('has-value');
        }
    });
});

// Window resize handler
window.addEventListener('resize', function() {
    // Recalculate animations and positions on resize
    const cards = document.querySelectorAll('.info-card');
    cards.forEach(card => {
        card.style.transform = '';
    });
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Handle scroll-based animations here
    const scrollTop = window.pageYOffset;
    
    // Update FAB visibility based on scroll position
    const fabContainer = document.querySelector('.fab-container');
    if (fabContainer) {
        if (scrollTop > 300) {
            fabContainer.style.opacity = '1';
            fabContainer.style.visibility = 'visible';
        } else {
            fabContainer.style.opacity = '0.7';
        }
    }
}, 100));