// Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Add pulse animation to clicked nav item
                this.style.animation = 'pulse 0.3s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
                
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
        const scrollPos = window.scrollY + 100;
        
        sections.forEach((section, index) => {
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

    window.addEventListener('scroll', updateActiveNav);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for project cards
                if (entry.target.classList.contains('project')) {
                    const projects = entry.target.parentElement.querySelectorAll('.project');
                    projects.forEach((project, index) => {
                        setTimeout(() => {
                            project.classList.add('animate-in');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections and projects
    sections.forEach(section => observer.observe(section));
    document.querySelectorAll('.project').forEach(project => observer.observe(project));

    // Profile picture interactive effects
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        let tiltTimeout;
        
        profilePic.addEventListener('mousemove', function(e) {
            clearTimeout(tiltTimeout);
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        profilePic.addEventListener('mouseleave', function() {
            tiltTimeout = setTimeout(() => {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }, 100);
        });
    }

    // Typing animation for header text
    const headerTitle = document.querySelector('.header-text h1');
    const headerSubtitle = document.querySelector('.header-text p');
    
    if (headerTitle && headerSubtitle) {
        const originalTitle = headerTitle.textContent;
        const originalSubtitle = headerSubtitle.textContent;
        
        function typeWriter(element, text, speed = 50) {
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-blue)';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 500);
                }
            }, speed);
        }
        
        // Start typing animation after a short delay
        setTimeout(() => {
            typeWriter(headerTitle, originalTitle, 80);
            setTimeout(() => {
                typeWriter(headerSubtitle, originalSubtitle, 30);
            }, originalTitle.length * 80 + 300);
        }, 500);
    }

    // Dynamic background particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.8) 0%, rgba(139, 92, 246, 0.6) 50%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}vw;
            top: 100vh;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 20000);
    }

    // Create particles periodically
    setInterval(createParticle, 3000);

    // Project card hover effects
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(12px) scale(1.02)';
            this.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.15)';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Contact links animation
    const contactLinks = document.querySelectorAll('#contact a');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.05)';
            this.style.textShadow = '0 2px 8px rgba(255, 255, 255, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.textShadow = 'none';
        });
    });

    // Scroll progress indicator
    function createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'scroll-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-blue), var(--accent-blue), var(--purple));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);
    }
    
    createScrollIndicator();
    
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-indicator').style.width = scrolled + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);

    // Resume link enhancement
    const resumeLink = document.querySelector('#resume a');
    if (resumeLink) {
        resumeLink.addEventListener('click', function(e) {
            // Add download animation
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }

    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const nextSection = getNextSection(currentSection);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const prevSection = getPrevSection(currentSection);
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    function getCurrentSection() {
        const scrollPos = window.scrollY + 100;
        let current = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section;
            }
        });
        
        return current;
    }

    function getNextSection(currentSection) {
        if (!currentSection) return sections[0];
        
        const sectionsArray = Array.from(sections);
        const currentIndex = sectionsArray.indexOf(currentSection);
        return sectionsArray[currentIndex + 1] || null;
    }

    function getPrevSection(currentSection) {
        if (!currentSection) return null;
        
        const sectionsArray = Array.from(sections);
        const currentIndex = sectionsArray.indexOf(currentSection);
        return sectionsArray[currentIndex - 1] || null;
    }

    // Performance optimization: debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedScrollUpdate = debounce(() => {
        updateActiveNav();
        updateScrollProgress();
    }, 10);

    window.addEventListener('scroll', debouncedScrollUpdate);

    console.log('🚀 Portfolio interactive features loaded successfully!');
});

// CSS animations to be injected
const additionalStyles = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes animate-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-in {
        animation: animate-in 0.8s ease-out forwards;
    }

    nav a.active {
        background: linear-gradient(135deg, var(--primary-blue), var(--purple));
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    }

    .project {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        transform: translateY(30px);
    }

    .project.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .profile-pic {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Enhanced button styles */
    #resume .btn {
        display: inline-block;
        background: linear-gradient(135deg, var(--primary-blue), var(--purple));
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.2);
    }

    #resume .btn:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    }

    /* Responsive enhancements */
    @media (prefers-reduced-motion: reduce) {
        .profile-pic,
        .project,
        nav a,
        #contact a {
            transition: none;
        }
        
        .animate-in {
            animation: none;
            opacity: 1;
            transform: none;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);