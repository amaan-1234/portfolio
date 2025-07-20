// Simple Portfolio Enhancements
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav a');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(nav => nav.classList.remove('active'));
                const activeNav = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeNav) {
                    activeNav.classList.add('active');
                }
            }
        });
    }

    // Throttled scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Simple fade-in animation for sections when they come into view
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Contact links - copy to clipboard functionality
    const emailLink = document.querySelector('a[href^="mailto:"]');
    const phoneLink = document.querySelector('a[href^="tel:"]');

    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            copyToClipboard(email, 'Email copied to clipboard!');
        });
    }

    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = this.getAttribute('href').replace('tel:', '');
            copyToClipboard(phone, 'Phone number copied to clipboard!');
        });
    }

    // Copy to clipboard function with simple notification
    function copyToClipboard(text, message) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification(message);
        }).catch(function() {
            // Fallback for older browsers
            const tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            showNotification(message);
        });
    }

    // Simple notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-blue);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            transform: translateX(300px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Slide out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2500);
    }

    // Resume download tracking
    const resumeLink = document.querySelector('#resume a');
    if (resumeLink) {
        resumeLink.addEventListener('click', function() {
            // Simple visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Resume download initiated');
        });
    }

    console.log('✨ Portfolio enhanced with professional interactions');
});

// Simple CSS additions for the JavaScript features
const styles = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in-section.visible {
        opacity: 1;
        transform: translateY(0);
    }

    nav a.active {
        background: linear-gradient(135deg, var(--primary-blue), var(--purple));
        color: white;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }

    nav a {
        transition: all 0.3s ease;
    }

    #resume .btn {
        transition: transform 0.15s ease;
    }

    #contact a {
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
    }

    #contact a:hover {
        transform: translateX(2px);
    }

    /* Smooth scroll behavior */
    html {
        scroll-behavior: smooth;
    }

    @media (prefers-reduced-motion: reduce) {
        .fade-in-section,
        nav a,
        #resume .btn,
        #contact a {
            transition: none;
        }
        
        html {
            scroll-behavior: auto;
        }
        
        .fade-in-section {
            opacity: 1;
            transform: none;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
