// Portfolio Enhancement JavaScript
// Professional features and animations for Amaan's portfolio

document.addEventListener('DOMContentLoaded', function() {
    
    // =======================
    // SMOOTH SCROLLING & NAVIGATION
    // =======================
    
    // Enhanced smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add active state animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // =======================
    // TYPING ANIMATION
    // =======================
    
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Apply typing effect to the main heading
    const mainHeading = document.querySelector('.header-text h1');
    if (mainHeading) {
        const originalText = mainHeading.textContent;
        setTimeout(() => {
            typeWriter(mainHeading, originalText, 80);
        }, 500);
    }
    
    // =======================
    // SCROLL ANIMATIONS
    // =======================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for project items
                if (entry.target.classList.contains('project')) {
                    const projectItems = entry.target.querySelectorAll('li');
                    projectItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and projects
    const sectionsToAnimate = document.querySelectorAll('section, .project');
    sectionsToAnimate.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(section);
    });
    
    // =======================
    // PROJECT HOVER EFFECTS
    // =======================
    
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        // Add project card styling
        project.style.background = 'rgba(248, 250, 252, 0.8)';
        project.style.borderRadius = '12px';
        project.style.padding = '24px';
        project.style.margin = '20px 0';
        project.style.borderLeft = '4px solid var(--primary-blue)';
        project.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        project.style.cursor = 'pointer';
        project.style.position = 'relative';
        project.style.overflow = 'hidden';
        
        // Style project titles
        const projectTitle = project.querySelector('h3');
        if (projectTitle) {
            projectTitle.style.fontSize = '1.25rem';
            projectTitle.style.fontWeight = '600';
            projectTitle.style.color = 'var(--primary-blue)';
            projectTitle.style.marginBottom = '8px';
        }
        
        // Style project dates
        const projectDate = project.querySelector('.project-date');
        if (projectDate) {
            projectDate.style.fontSize = '0.9rem';
            projectDate.style.color = 'var(--text-secondary)';
            projectDate.style.fontStyle = 'italic';
            projectDate.style.marginBottom = '12px';
        }
        
        // Add hover effects
        project.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(248, 250, 252, 1)';
            this.style.transform = 'translateX(8px) translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
            
            // Animate list items
            const listItems = this.querySelectorAll('li');
            listItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.color = 'var(--primary-blue)';
                }, index * 50);
            });
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(248, 250, 252, 0.8)';
            this.style.transform = 'translateX(0) translateY(0)';
            this.style.boxShadow = 'none';
            
            // Reset list items
            const listItems = this.querySelectorAll('li');
            listItems.forEach(item => {
                item.style.color = 'var(--text-secondary)';
            });
        });
        
        // Style list items initially
        const listItems = project.querySelectorAll('li');
        listItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.3s ease, color 0.3s ease';
        });
    });
    
    // =======================
    // HEADER SCROLL EFFECT
    // =======================
    
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px) saturate(180%)';
            header.style.boxShadow = '0 8px 16px -4px rgba(37, 99, 235, 0.15)';
        } else {
            header.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(230, 245, 255, 1) 100%)';
            header.style.boxShadow = '0 8px 16px -4px rgba(37, 99, 235, 0.15), 0 4px 8px -2px rgba(37, 99, 235, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // =======================
    // PROFILE PICTURE EFFECTS
    // =======================
    
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        // Add click effect
        profilePic.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
        
        // Add loading effect
        const img = profilePic.querySelector('img') || profilePic;
        img.addEventListener('load', function() {
            profilePic.style.opacity = '0';
            profilePic.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                profilePic.style.transition = 'all 0.5s ease';
                profilePic.style.opacity = '1';
                profilePic.style.transform = 'scale(1)';
            }, 100);
        });
    }
    
    // =======================
    // CONTACT LINK ANIMATIONS
    // =======================
    
    const contactLinks = document.querySelectorAll('#contact a');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.textShadow = '0 2px 4px rgba(255, 255, 255, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.textShadow = 'none';
        });
        
        // Click animation
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }, 150);
        });
    });
    
    // =======================
    // RESUME BUTTON ENHANCEMENT
    // =======================
    
    const resumeLink = document.querySelector('#resume a');
    if (resumeLink) {
        // Style the resume button
        resumeLink.style.display = 'inline-block';
        resumeLink.style.padding = '12px 32px';
        resumeLink.style.background = 'linear-gradient(135deg, var(--primary-blue) 0%, #8b5cf6 100%)';
        resumeLink.style.color = 'white';
        resumeLink.style.borderRadius = '50px';
        resumeLink.style.textDecoration = 'none';
        resumeLink.style.fontWeight = '600';
        resumeLink.style.transition = 'all 0.3s ease';
        resumeLink.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
        resumeLink.style.position = 'relative';
        resumeLink.style.overflow = 'hidden';
        
        resumeLink.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
        });
        
        resumeLink.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
        });
    }
    
    // =======================
    // PARTICLE CURSOR EFFECT
    // =======================
    
    let particles = [];
    const maxParticles = 15;
    
    function createParticle(x, y) {
        return {
            x: x,
            y: y,
            size: Math.random() * 3 + 1,
            opacity: 1,
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            }
        };
    }
    
    function updateParticles() {
        particles.forEach((particle, index) => {
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.opacity -= 0.02;
            particle.size *= 0.98;
            
            if (particle.opacity <= 0 || particle.size <= 0.1) {
                particles.splice(index, 1);
            }
        });
    }
    
    function renderParticles() {
        const existingParticles = document.querySelectorAll('.cursor-particle');
        existingParticles.forEach(p => p.remove());
        
        particles.forEach(particle => {
            const element = document.createElement('div');
            element.className = 'cursor-particle';
            element.style.cssText = `
                position: fixed;
                left: ${particle.x}px;
                top: ${particle.y}px;
                width: ${particle.size}px;
                height: ${particle.size}px;
                background: radial-gradient(circle, rgba(37, 99, 235, ${particle.opacity}) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(element);
        });
        
        updateParticles();
        requestAnimationFrame(renderParticles);
    }
    
    let isMouseMoving = false;
    document.addEventListener('mousemove', function(e) {
        if (particles.length < maxParticles && Math.random() > 0.7) {
            particles.push(createParticle(e.clientX, e.clientY));
        }
        isMouseMoving = true;
    });
    
    renderParticles();
    
    // =======================
    // FOOTER ANIMATION
    // =======================
    
    const footer = document.querySelector('footer');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        });
        
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(20px)';
        footerObserver.observe(footer);
    }
    
    // =======================
    // PERFORMANCE OPTIMIZATION
    // =======================
    
    // Debounce scroll events
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
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
        
        // Trigger initial animations
        setTimeout(() => {
            sectionsToAnimate.forEach((section, index) => {
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 300);
    });
    
    // Add error handling for missing elements
    function safeQuerySelector(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            console.warn(`Element not found: ${selector}`);
            return null;
        }
    }
    
    console.log('🚀 Portfolio enhanced successfully! All features loaded.');
});
