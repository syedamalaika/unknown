// Notification System
function showNotification(message, type = 'success') {
    const notificationContainer = document.getElementById('notifications') || createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.id = 'notifications';
    container.className = 'notifications-container';
    document.body.appendChild(container);
    return container;
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Sign Up Button Handlers
document.querySelectorAll('.btn-signup, .btn-signup-nav, .btn-cta-signup').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('cta-email');
        if (emailInput && emailInput.value.trim()) {
            const email = emailInput.value.trim();
            if (validateEmail(email)) {
                showNotification(`Welcome! Check your email (${email}) for verification instructions.`, 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'warning');
            }
        } else {
            showNotification('Welcome to ConnectHub! Sign up to get started.', 'success');
        }
    });
});

// Login Button Handler
document.querySelector('.btn-login')?.addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('Redirecting to login page...', 'success');
});

// Newsletter Form Handler
const footerNewsletter = document.getElementById('footer-newsletter');
if (footerNewsletter) {
    footerNewsletter.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('.newsletter-input');
        const email = emailInput.value.trim();
        
        if (email) {
            if (validateEmail(email)) {
                showNotification('Thanks for subscribing! Check your email for updates.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'warning');
            }
        }
    });
}

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to cards on scroll
document.querySelectorAll('.feature-card, .step-card, .testimonial-card, .benefit-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Feature Card Hover Effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// CTA Email Input Handler
const ctaEmail = document.getElementById('cta-email');
if (ctaEmail) {
    ctaEmail.addEventListener('focus', function() {
        showNotification('Enter your email to join 50,000+ members!', 'success');
    });
}

// Learn More Button
document.querySelectorAll('.btn-secondary').forEach(button => {
    if (button.textContent.includes('Learn More')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
                showNotification('Scroll down to explore our features!', 'success');
            }
        });
    }
});

// Page Load Animation
window.addEventListener('load', function() {
    showPageLoadAnimation();
});

function showPageLoadAnimation() {
    const elements = document.querySelectorAll('.hero-content, .section-header');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Testimonial Cards Interaction
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('click', function() {
        const userName = this.querySelector('.user-info h4').textContent;
        showNotification(`Visit ${userName}'s profile to connect!`, 'success');
    });
});

// Feature Cards Info
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function() {
        const featureName = this.querySelector('h3').textContent;
        showNotification(`Exploring ${featureName} - Amazing feature!`, 'success');
    });
});

// Statistics Counter Animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 50);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }
    }, 50);
}

// Animate stats when page loads
window.addEventListener('load', function() {
    const statNumbers = document.querySelectorAll('.stat-number, .cta-stat-value');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        if (number > 0) {
            animateCounter(stat, number);
        }
    });
});

// Feature Card Click Interaction
document.querySelectorAll('.feature-card').forEach(card => {
    const stats = card.querySelector('.feature-stats');
    if (stats) {
        stats.addEventListener('click', function(e) {
            e.stopPropagation();
            const statText = stats.textContent.trim();
            showNotification(`Stat: ${statText}`, 'success');
        });
    }
});

// Step Card Interactions
document.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('click', function() {
        const stepTitle = this.querySelector('h3').textContent;
        const stepNum = this.querySelector('.step-number').textContent;
        showNotification(`Step ${stepNum}: ${stepTitle}`, 'success');
    });
});

// Testimonial Engagement Display
document.querySelectorAll('.engagement-stats').forEach(stats => {
    stats.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    stats.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Export functions for external use
window.showNotification = showNotification;
window.validateEmail = validateEmail;

console.log('🌐 ConnectHub - Social Community Platform loaded successfully!');
