// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = this.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (this.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
}

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

// Enhanced form validation
function enhanceFormValidation() {
    const form = document.getElementById('joinForm');
    if (form) {
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
            
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    }
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    enhanceFormValidation();
    
    console.log('✅ Website initialized successfully');
    console.log('📝 Form validation ready');
    console.log('🎨 Styling and animations loaded');
});

// Google Form Integration
const GOOGLE_FORM_SUBMIT_URL = 'https://docs.google.com/forms/d/1VeoJ6daMYyjpDsEJTaurWX0gHrfTD5_TtRxlwnPPr2Y/formResponse';

// Form submission handler
const joinForm = document.getElementById('joinForm');
if (joinForm) {
    console.log('✅ Form found and event listener attached');
    
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('🚀 Form submission started');
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-primary');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(this);
        console.log('📝 Form data collected:', formData);
        
        // Log what we're about to submit
        console.log('🎯 Submitting to Google Form URL:', GOOGLE_FORM_SUBMIT_URL);
        
        // Create a background form submission (no redirect, no new tab)
        const backgroundForm = document.createElement('form');
        backgroundForm.method = 'POST';
        backgroundForm.action = GOOGLE_FORM_SUBMIT_URL;
        backgroundForm.target = 'background-iframe';
        backgroundForm.style.display = 'none';
        
        // Add all form fields to the background form
        const fields = {
            'entry.1375978796': formData.get('entry.1375978796'),        // Full Name
            'entry.239972610': formData.get('entry.239972610'),          // Branch
            'entry.1619717035': formData.get('entry.1619717035'),        // Year
            'entry.1604746565': formData.get('entry.1604746565'),        // Phone Number
            'entry.998193003': formData.getAll('entry.998193003'),       // Preferred options (checkboxes)
            'entry.804257283': formData.get('entry.804257283'),          // Why should you be selected
            'entry.1025821786': formData.get('entry.1025821786'),        // Prior experience
            'entry.1310789224': formData.get('entry.1310789224')         // Google drive photo link
        };
        
        console.log('🔍 Fields to submit:', fields);
        
        // Add each field to the background form
        Object.keys(fields).forEach(fieldId => {
            if (fields[fieldId]) {
                if (Array.isArray(fields[fieldId])) {
                    // Handle checkboxes (multiple values)
                    fields[fieldId].forEach(value => {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = fieldId;
                        input.value = value;
                        backgroundForm.appendChild(input);
                        console.log(`✅ Added checkbox field: ${fieldId} = ${value}`);
                    });
                } else {
                    // Handle single value fields
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = fieldId;
                    input.value = fields[fieldId];
                    backgroundForm.appendChild(input);
                    console.log(`✅ Added field: ${fieldId} = ${fields[fieldId]}`);
                }
            } else {
                console.log(`⚠️ Field ${fieldId} is empty, skipping`);
            }
        });
        
        // Create a hidden iframe that will receive the response
        const backgroundIframe = document.createElement('iframe');
        backgroundIframe.name = 'background-iframe';
        backgroundIframe.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px; border: none;';
        document.body.appendChild(backgroundIframe);
        console.log('✅ Background iframe created');
        
        // Add the form to the page
        document.body.appendChild(backgroundForm);
        console.log('✅ Background form added to page');
        
        // Submit the form
        try {
            console.log('🚀 Submitting background form...');
            backgroundForm.submit();
            console.log('✅ Form submitted to Google Forms successfully!');
            
            // Show success message and thank you card
            setTimeout(() => {
                console.log('⏰ Timeout completed, showing thank you card');
                
                // Clean up the form and iframe
                document.body.removeChild(backgroundForm);
                document.body.removeChild(backgroundIframe);
                
                // Hide the form and show thank you card
                const formContainer = document.querySelector('.join-form');
                const thankYouCard = document.getElementById('thankYouCard');
                
                if (formContainer && thankYouCard) {
                    formContainer.style.display = 'none';
                    thankYouCard.style.display = 'block';
                    thankYouCard.scrollIntoView({ behavior: 'smooth' });
                    console.log('✅ Thank you card displayed');
                } else {
                    console.error('❌ Could not find form container or thank you card');
                }
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Show success notification
                showNotification('Application submitted successfully! Check your Google Form responses.', 'success');
                
            }, 2000);
            
        } catch (error) {
            console.error('❌ Error submitting form:', error);
            
            // Clean up on error
            if (backgroundForm.parentNode) document.body.removeChild(backgroundForm);
            if (backgroundIframe.parentNode) document.body.removeChild(backgroundIframe);
            
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Show error notification
            showNotification('Error submitting form. Please try again.', 'error');
        }
    });
} else {
    console.error('❌ Form not found! Check if element with ID "joinForm" exists');
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
