// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
        }
    });
}, observerOptions);

// Observe sections for scroll animations
sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Parallax effect for floating robots
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const robots = document.querySelectorAll('.robot');
    
    robots.forEach((robot, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        robot.style.transform = `translateY(${yPos}px)`;
    });
});

// Tech sphere rotation on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const techSphere = document.querySelector('.tech-sphere');
    
    if (techSphere) {
        const rotation = scrolled * 0.1;
        techSphere.style.transform = `rotate(${rotation}deg)`;
    }
});

// Circuit board animation on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circuitBoard = document.querySelector('.circuit-board');
    
    if (circuitBoard) {
        const opacity = Math.max(0.3, 1 - (scrolled * 0.001));
        circuitBoard.style.opacity = opacity;
    }
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature cards hover effect
const features = document.querySelectorAll('.feature');
features.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
        feature.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    feature.addEventListener('mouseleave', () => {
        feature.style.transform = 'translateY(0) scale(1)';
    });
});

// Social links hover effect
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.1) rotate(360deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Particle effect for background
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: #00ffff;
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        animation: particle-float 10s linear infinite;
    `;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 10000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Image Upload Functionality
function initializeImageUpload() {
    const fileInput = document.getElementById('profileImage');
    const imagePreview = document.getElementById('imagePreview');
    const removeBtn = document.getElementById('removeImage');
    
    if (fileInput && imagePreview && removeBtn) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    showNotification('Please select a valid image file.', 'error');
                    return;
                }
                
                // Validate file size (2MB)
                if (file.size > 2 * 1024 * 1024) {
                    showNotification('Image size should be less than 2MB.', 'error');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
                    imagePreview.classList.add('has-image');
                    removeBtn.style.display = 'inline-flex';
                };
                reader.readAsDataURL(file);
                
                showNotification('Profile image uploaded successfully!', 'success');
            }
        });
        
        removeBtn.addEventListener('click', function() {
            fileInput.value = '';
            imagePreview.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span>No image selected</span>
            `;
            imagePreview.classList.remove('has-image');
            removeBtn.style.display = 'none';
            showNotification('Profile image removed.', 'info');
        });
    }
}

// Google Form Integration - ACTUAL SUBMISSION TO GOOGLE FORMS
// We'll submit the form data directly to Google Forms using the formResponse endpoint

// The user's actual Google Form submission URL (this is the endpoint that receives data)
const GOOGLE_FORM_SUBMIT_URL = 'https://docs.google.com/forms/d/1VeoJ6daMYyjpDsEJTaurWX0gHrfTD5_TtRxlwnPPr2Y/formResponse';

// Form handling
const joinForm = document.getElementById('joinForm');
if (joinForm) {
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-primary');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(this);
        
        // Create a hidden form to submit to Google Forms
        const hiddenForm = document.createElement('form');
        hiddenForm.method = 'POST';
        hiddenForm.action = GOOGLE_FORM_SUBMIT_URL;
        hiddenForm.target = 'hidden-iframe';
        hiddenForm.style.display = 'none';
        
        // Add all form fields to the hidden form
        // We'll use the actual field names from your HTML form
        const fields = {
            'entry.1375978796': formData.get('entry.1375978796'),        // Full Name
            'entry.1604746565': formData.get('entry.1604746565'),        // Phone Number
            'entry.239972610': formData.get('entry.239972610'),          // Branch
            'entry.1619717035': formData.get('entry.1619717035'),        // Year of Study
            'entry.1025821786': formData.get('entry.1025821786'),        // Experience
            'entry.804257283': formData.get('entry.804257283'),          // Motivation
            'entry.998193003': formData.getAll('entry.998193003')        // Interests (checkboxes)
        };
        
        // Add each field to the hidden form
        Object.keys(fields).forEach(fieldId => {
            if (fields[fieldId]) {
                if (Array.isArray(fields[fieldId])) {
                    // Handle checkboxes (multiple values)
                    fields[fieldId].forEach(value => {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = fieldId;
                        input.value = value;
                        hiddenForm.appendChild(input);
                    });
                } else {
                    // Handle single value fields
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = fieldId;
                    input.value = fields[fieldId];
                    hiddenForm.appendChild(input);
                }
            }
        });
        
        // Create hidden iframe to receive the response
        const hiddenIframe = document.createElement('iframe');
        hiddenIframe.name = 'hidden-iframe';
        hiddenIframe.style.display = 'none';
        document.body.appendChild(hiddenIframe);
        
        // Add the hidden form to the page
        document.body.appendChild(hiddenForm);
        
        // Submit the form
        try {
            hiddenForm.submit();
            console.log('Form submitted to Google Forms successfully!');
            
            // Show success message and thank you card
            setTimeout(() => {
                // Clean up hidden elements
                document.body.removeChild(hiddenForm);
                document.body.removeChild(hiddenIframe);
                
                // Hide the form and show thank you card
                const formContainer = document.querySelector('.join-form');
                const thankYouCard = document.getElementById('thankYouCard');
                
                if (formContainer && thankYouCard) {
                    formContainer.style.display = 'none';
                    thankYouCard.style.display = 'block';
                    thankYouCard.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Show success notification
                showNotification('Application submitted successfully! Check your Google Form responses.', 'success');
                
            }, 2000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Clean up on error
            if (hiddenForm.parentNode) document.body.removeChild(hiddenForm);
            if (hiddenIframe.parentNode) document.body.removeChild(hiddenIframe);
            
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Show error notification
            showNotification('Error submitting form. Please try again.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let icon, background;
    switch(type) {
        case 'success':
            icon = 'fa-check-circle';
            background = 'linear-gradient(45deg, #00ff88, #00cc6a)';
            break;
        case 'error':
            icon = 'fa-exclamation-circle';
            background = 'linear-gradient(45deg, #ff4444, #cc0000)';
            break;
        case 'info':
            icon = 'fa-info-circle';
            background = 'linear-gradient(45deg, #00ffff, #0088cc)';
            break;
        default:
            icon = 'fa-info-circle';
            background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${background};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Form validation enhancement
function enhanceFormValidation() {
    const inputs = document.querySelectorAll('.join-form input, .join-form select, .join-form textarea');
    
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

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Check if required field is empty
    if (isRequired && !value) {
        field.classList.add('error');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    return true;
}

// Initialize form validation and image upload
document.addEventListener('DOMContentLoaded', function() {
    enhanceFormValidation();
    initializeImageUpload();
});

// Form validation and enhancement
const formIframe = document.querySelector('.form-wrapper iframe');
if (formIframe) {
    formIframe.addEventListener('load', () => {
        // Add loading animation
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `;
        
        formIframe.parentNode.style.position = 'relative';
        formIframe.parentNode.appendChild(loadingDiv);
        
        // Remove loading animation when iframe loads
        setTimeout(() => {
            if (loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
            }
        }, 2000);
    });
}

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(45deg, #00ffff, #ff00ff);
    border: none;
    border-radius: 50%;
    color: #000000;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.boxShadow = '0 10px 25px rgba(0, 255, 255, 0.5)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.3)';
});

// Performance optimization: Throttle scroll events
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
window.addEventListener('scroll', throttle(() => {
    // Navbar background effect
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Scroll to top button visibility
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
}, 16)); // ~60fps

// Initialize page with fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu with Escape key
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for additional functionality
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for additional functionality
            console.log('Swipe down detected');
        }
    }
}

// Add loading state for better UX
window.addEventListener('load', () => {
    // Remove any loading indicators
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
    
    // Add success animation
    const successAnimation = document.createElement('div');
    successAnimation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background: linear-gradient(45deg, #00ffff, #ff00ff);
        border-radius: 50%;
        z-index: 9999;
        animation: success-pulse 1s ease-out forwards;
    `;
    
    document.body.appendChild(successAnimation);
    
    setTimeout(() => {
        if (successAnimation.parentNode) {
            successAnimation.parentNode.removeChild(successAnimation);
        }
    }, 1000);
});

// Add CSS for success animation
const successStyle = document.createElement('style');
successStyle.textContent = `
    @keyframes success-pulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(successStyle);
