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

// Google Form Integration - SIMPLE AND RELIABLE METHOD
const GOOGLE_FORM_SUBMIT_URL = 'https://docs.google.com/forms/d/1FAIpQLSdzpB3pIaHRaH12GnVnfLxkRcOsMYUVzRrbnzgjshUUdFCISA/formResponse';

// Form handling
const joinForm = document.getElementById('joinForm');
if (joinForm) {
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('=== FORM SUBMISSION STARTED ===');
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-primary');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Log form data for debugging
        const formData = new FormData(this);
        console.log('Form data to submit:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // SIMPLE METHOD: Let the form submit naturally to Google Forms
        try {
            console.log('Submitting form to Google Forms...');
            
            // Set the form properties
            this.action = GOOGLE_FORM_SUBMIT_URL;
            this.method = 'POST';
            this.target = 'hidden-iframe';
            
            console.log('Form configured:', {
                action: this.action,
                method: this.method,
                target: this.target
            });
            
            // Submit the form
            this.submit();
            console.log('Form submitted!');
            
            // Show success message after delay
            setTimeout(() => {
                // Hide form and show thank you card
                const formContainer = document.querySelector('.join-form');
                const thankYouCard = document.getElementById('thankYouCard');
                
                if (formContainer && thankYouCard) {
                    formContainer.style.display = 'none';
                    thankYouCard.style.display = 'block';
                    thankYouCard.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Reset button
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                showNotification('Application submitted successfully! Check your Google Form responses.', 'success');
                console.log('Form submission completed successfully');
                
            }, 3000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Reset button
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
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

// Add test function to debug Google Form connection
function testGoogleFormConnection() {
    console.log('=== Testing Google Form Connection ===');
    console.log('Form URL:', GOOGLE_FORM_SUBMIT_URL);
    console.log('Form ID:', '1FAIpQLSdzpB3pIaHRaH12GnVnfLxkRcOsMYUVzRrbnzgjshUUdFCISA');
    
    // Test if we can access the form
    fetch(GOOGLE_FORM_SUBMIT_URL, {
        method: 'GET',
        mode: 'no-cors' // This is necessary for cross-origin requests
    })
    .then(response => {
        console.log('Form accessibility test completed');
        console.log('Note: Due to CORS restrictions, we cannot read the response, but this confirms the endpoint exists');
    })
    .catch(error => {
        console.error('Error testing form accessibility:', error);
    });
    
    // Log form field information
    const form = document.getElementById('joinForm');
    if (form) {
        console.log('Form found in DOM');
        console.log('Form action:', form.action);
        console.log('Form method:', form.method);
        console.log('Form target:', form.target);
        
        // Log all form fields
        const fields = form.querySelectorAll('input, select, textarea');
        console.log('Form fields found:', fields.length);
        fields.forEach((field, index) => {
            console.log(`Field ${index + 1}:`, {
                name: field.name,
                type: field.type,
                id: field.id,
                required: field.required
            });
        });
    } else {
        console.error('Form not found in DOM');
    }
}

// Function to test form submission with different field name patterns
function testFormSubmission() {
    console.log('=== Testing Form Submission ===');
    
    // Test data
    const testData = {
        'entry.1375978796': 'Test User',
        'entry.1604746565': '+91 98765 43210',
        'entry.239972610': 'CSE',
        'entry.1619717035': '2nd Year',
        'entry.998193003': 'Technical Team',
        'entry.1025821786': 'Test experience description',
        'entry.804257283': 'Test motivation description'
    };
    
    console.log('Test data to submit:', testData);
    
    // Create a test form submission
    const testForm = document.createElement('form');
    testForm.method = 'POST';
    testForm.action = GOOGLE_FORM_SUBMIT_URL;
    testForm.target = 'hidden-iframe';
    testForm.style.display = 'none';
    
    // Add test data to form
    Object.entries(testData).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        testForm.appendChild(input);
    });
    
    // Submit test form
    document.body.appendChild(testForm);
    testForm.submit();
    
    console.log('Test form submitted');
    
    // Remove test form
    setTimeout(() => {
        if (testForm.parentNode) {
            testForm.parentNode.removeChild(testForm);
        }
    }, 1000);
}

// Function to analyze Google Form and find correct field names
async function analyzeGoogleForm() {
    console.log('=== Analyzing Google Form Structure ===');
    
    try {
        // Try to fetch the form page to analyze its structure
        const formViewUrl = 'https://docs.google.com/forms/d/1FAIpQLSdzpB3pIaHRaH12GnVnfLxkRcOsMYUVzRrbnzgjshUUdFCISA/viewform';
        
        console.log('Attempting to analyze form at:', formViewUrl);
        
        // Note: Due to CORS restrictions, we can't directly read the form content
        // But we can provide guidance on how to find the correct field names
        
        console.log(`
=== GOOGLE FORM FIELD NAME GUIDE ===
To find the correct field names for your Google Form:

1. Open your Google Form in edit mode
2. Click on each field/question
3. Look at the URL - it will show something like:
   https://docs.google.com/forms/d/1FAIpQLSdzpB3pIaHRaH12GnVnfLxkRcOsMYUVzRrbnzgjshUUdFCISA/edit#question=1234567890

4. The question ID (1234567890) corresponds to entry.1234567890
5. Update your HTML form field names to match these IDs

Current field names in your form:
- Full Name: entry.1375978796
- Phone: entry.1604746565  
- Branch: entry.239972610
- Year: entry.1619717035
- Profile Image: entry.640950664
- Team Selection: entry.998193003
- Experience: entry.1025821786
- Motivation: entry.804257283

If these don't match your actual Google Form, update them accordingly.
        `);
        
    } catch (error) {
        console.error('Error analyzing form:', error);
    }
}

// Run the test when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for everything to load, then run the test
    setTimeout(testGoogleFormConnection, 1000);
    
    // Also add a manual test button for debugging
    const testButton = document.createElement('button');
    testButton.textContent = 'Test Form Connection';
    testButton.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 10000;
        padding: 10px;
        background: #ff6b6b;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
    `;
    testButton.addEventListener('click', testGoogleFormConnection);
    document.body.appendChild(testButton);
    
    // Add a second test button for form submission
    const testSubmitButton = document.createElement('button');
    testSubmitButton.textContent = 'Test Form Submit';
    testSubmitButton.style.cssText = `
        position: fixed;
        top: 60px;
        left: 20px;
        z-index: 10000;
        padding: 10px;
        background: #4ecdc4;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
    `;
    testSubmitButton.addEventListener('click', testFormSubmission);
    document.body.appendChild(testSubmitButton);
    
    // Add a third test button for form analysis
    const analyzeButton = document.createElement('button');
    analyzeButton.textContent = 'Analyze Form';
    analyzeButton.style.cssText = `
        position: fixed;
        top: 100px;
        left: 20px;
        z-index: 10000;
        padding: 10px;
        background: #45b7d1;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
    `;
    analyzeButton.addEventListener('click', analyzeGoogleForm);
    document.body.appendChild(analyzeButton);
    
    // Remove test buttons after 30 seconds
    setTimeout(() => {
        if (testButton.parentNode) {
            testButton.parentNode.removeChild(testButton);
        }
        if (testSubmitButton.parentNode) {
            testSubmitButton.parentNode.removeChild(testSubmitButton);
        }
        if (analyzeButton.parentNode) {
            analyzeButton.parentNode.removeChild(analyzeButton);
        }
    }, 30000);
});
