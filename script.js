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
    
    // Alternative navigation fix - ensure sections exist
    document.addEventListener('click', function(e) {
        if (e.target.matches('nav a[href^="#"]')) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = 80; // Approximate header height
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
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
    
    // =======================
    // SKILLS PROGRESS BARS (Dynamic)
    // =======================
    
    function addSkillsBars() {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const skillsHTML = `
                <div class="skills-section" style="margin-top: 32px;">
                    <h3 style="font-size: 1.5rem; color: var(--primary-blue); margin-bottom: 24px; font-weight: 600;">Technical Skills</h3>
                    <div class="skills-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div class="skill-item">
                            <div class="skill-label" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 600; color: var(--text-primary);">Python & Machine Learning</span>
                                <span class="skill-percent" style="color: var(--primary-blue); font-weight: 600;">95%</span>
                            </div>
                            <div class="skill-bar" style="height: 8px; background: rgba(37, 99, 235, 0.1); border-radius: 4px; overflow: hidden;">
                                <div class="skill-progress" style="height: 100%; width: 0%; background: linear-gradient(90deg, var(--primary-blue), var(--accent-blue)); border-radius: 4px; transition: width 2s ease;" data-width="95"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-label" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 600; color: var(--text-primary);">AI & Deep Learning</span>
                                <span class="skill-percent" style="color: var(--primary-blue); font-weight: 600;">90%</span>
                            </div>
                            <div class="skill-bar" style="height: 8px; background: rgba(37, 99, 235, 0.1); border-radius: 4px; overflow: hidden;">
                                <div class="skill-progress" style="height: 100%; width: 0%; background: linear-gradient(90deg, #8b5cf6, #ec4899); border-radius: 4px; transition: width 2s ease;" data-width="90"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-label" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 600; color: var(--text-primary);">Full Stack Development</span>
                                <span class="skill-percent" style="color: var(--primary-blue); font-weight: 600;">85%</span>
                            </div>
                            <div class="skill-bar" style="height: 8px; background: rgba(37, 99, 235, 0.1); border-radius: 4px; overflow: hidden;">
                                <div class="skill-progress" style="height: 100%; width: 0%; background: linear-gradient(90deg, #10b981, #3b82f6); border-radius: 4px; transition: width 2s ease;" data-width="85"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-label" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 600; color: var(--text-primary);">Data Science & Analytics</span>
                                <span class="skill-percent" style="color: var(--primary-blue); font-weight: 600;">92%</span>
                            </div>
                            <div class="skill-bar" style="height: 8px; background: rgba(37, 99, 235, 0.1); border-radius: 4px; overflow: hidden;">
                                <div class="skill-progress" style="height: 100%; width: 0%; background: linear-gradient(90deg, #f59e0b, #ef4444); border-radius: 4px; transition: width 2s ease;" data-width="92"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            aboutSection.insertAdjacentHTML('beforeend', skillsHTML);
            
            // Animate skill bars when they come into view
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillBars = entry.target.querySelectorAll('.skill-progress');
                        skillBars.forEach((bar, index) => {
                            setTimeout(() => {
                                const width = bar.getAttribute('data-width');
                                bar.style.width = width + '%';
                            }, index * 200);
                        });
                    }
                });
            });
            
            skillsObserver.observe(document.querySelector('.skills-section'));
        }
    }
    
    // =======================
    // INTERACTIVE PROJECT STATS
    // =======================
    
    function addProjectStats() {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            const statsHTML = `
                <div class="project-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; padding: 32px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(139, 92, 246, 0.05)); border-radius: 16px; border: 1px solid rgba(37, 99, 235, 0.1);">
                    <div class="stat-item" style="text-align: center; padding: 20px;">
                        <div class="stat-number" style="font-size: 2.5rem; font-weight: 800; color: var(--primary-blue); margin-bottom: 8px;" data-target="4">0</div>
                        <div class="stat-label" style="font-weight: 600; color: var(--text-secondary);">Projects Completed</div>
                    </div>
                    <div class="stat-item" style="text-align: center; padding: 20px;">
                        <div class="stat-number" style="font-size: 2.5rem; font-weight: 800; color: #8b5cf6; margin-bottom: 8px;" data-target="87">0</div>
                        <div class="stat-label" style="font-weight: 600; color: var(--text-secondary);">Max Accuracy %</div>
                    </div>
                    <div class="stat-item" style="text-align: center; padding: 20px;">
                        <div class="stat-number" style="font-size: 2.5rem; font-weight: 800; color: #ec4899; margin-bottom: 8px;" data-target="5">0</div>
                        <div class="stat-label" style="font-weight: 600; color: var(--text-secondary);">AI/ML Models</div>
                    </div>
                    <div class="stat-item" style="text-align: center; padding: 20px;">
                        <div class="stat-number" style="font-size: 2.5rem; font-weight: 800; color: #10b981; margin-bottom: 8px;" data-target="2">0</div>
                        <div class="stat-label" style="font-weight: 600; color: var(--text-secondary);">Years Experience</div>
                    </div>
                </div>
            `;
            
            projectsSection.insertAdjacentHTML('afterbegin', statsHTML);
            
            // Animate counters
            function animateCounter(element, target, duration = 2000) {
                const start = 0;
                const increment = target / (duration / 16);
                let current = start;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    element.textContent = Math.floor(current);
                }, 16);
            }
            
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counters = entry.target.querySelectorAll('.stat-number');
                        counters.forEach((counter, index) => {
                            setTimeout(() => {
                                const target = parseInt(counter.getAttribute('data-target'));
                                animateCounter(counter, target);
                            }, index * 200);
                        });
                    }
                });
            });
            
            statsObserver.observe(document.querySelector('.project-stats'));
        }
    }
    
    // =======================
    // THEME TOGGLE (Dark/Light Mode)
    // =======================
    
    function addThemeToggle() {
        const toggleHTML = `
            <button id="theme-toggle" style="
                position: fixed;
                top: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(135deg, var(--primary-blue), #8b5cf6);
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
                transition: all 0.3s ease;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            " title="Toggle Dark/Light Mode">
                🌙
            </button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', toggleHTML);
        
        const themeToggle = document.getElementById('theme-toggle');
        let isDark = false;
        
        themeToggle.addEventListener('click', function() {
            isDark = !isDark;
            
            if (isDark) {
                // Apply dark theme
                document.documentElement.style.setProperty('--bg-primary', '#1f2937');
                document.documentElement.style.setProperty('--bg-secondary', '#111827');
                document.documentElement.style.setProperty('--text-primary', '#f9fafb');
                document.documentElement.style.setProperty('--text-secondary', '#d1d5db');
                document.body.style.background = 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%)';
                themeToggle.textContent = '☀️';
                
                // Update sections background
                const sections = document.querySelectorAll('section');
                sections.forEach(section => {
                    if (section.id === 'contact') return; // Skip contact section
                    section.style.background = 'rgba(31, 41, 55, 0.95)';
                    section.style.borderColor = 'rgba(75, 85, 99, 0.2)';
                });
                
            } else {
                // Apply light theme
                document.documentElement.style.setProperty('--bg-primary', '#ffffff');
                document.documentElement.style.setProperty('--bg-secondary', '#f8fafc');
                document.documentElement.style.setProperty('--text-primary', '#1f2937');
                document.documentElement.style.setProperty('--text-secondary', '#6b7280');
                document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
                themeToggle.textContent = '🌙';
                
                // Reset sections background
                const sections = document.querySelectorAll('section');
                sections.forEach(section => {
                    if (section.id === 'contact') return; // Skip contact section
                    section.style.background = 'rgba(255, 255, 255, 0.95)';
                    section.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                });
            }
            
            // Animate button
            this.style.transform = 'scale(0.9) rotate(180deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
        
        themeToggle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
        });
        
        themeToggle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
        });
    }
    
    // =======================
    // SCROLL PROGRESS INDICATOR
    // =======================
    
    function addScrollProgress() {
        const progressHTML = `
            <div id="scroll-progress" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-blue), #8b5cf6, #ec4899);
                z-index: 1000;
                transition: width 0.1s ease;
            "></div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', progressHTML);
        
        const progressBar = document.getElementById('scroll-progress');
        
        window.addEventListener('scroll', debounce(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }, 10));
    }
    
    // =======================
    // FLOATING ACTION BUTTONS
    // =======================
    
    function addFloatingActions() {
        const fabHTML = `
            <div class="fab-container" style="
                position: fixed;
                bottom: 30px;
                right: 30px;
                display: flex;
                flex-direction: column;
                gap: 15px;
                z-index: 1000;
            ">
                <a href="#" id="scroll-top" style="
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--primary-blue), #8b5cf6);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    font-size: 1.2rem;
                    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
                    transition: all 0.3s ease;
                    opacity: 0;
                    transform: translateY(20px);
                " title="Scroll to Top">
                    ↑
                </a>
                <a href="mailto:akalemul@asu.edu" style="
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    font-size: 1.2rem;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
                    transition: all 0.3s ease;
                " title="Send Email">
                    📧
                </a>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', fabHTML);
        
        const scrollTopBtn = document.getElementById('scroll-top');
        const fabButtons = document.querySelectorAll('.fab-container a');
        
        // Show scroll to top button when scrolled
        window.addEventListener('scroll', debounce(() => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.transform = 'translateY(20px)';
            }
        }, 100));
        
        // Scroll to top functionality
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // FAB hover effects
        fabButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
    
    // =======================
    // ENHANCED CONTACT FORM
    // =======================
    
    function enhanceContactSection() {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const currentContent = contactSection.innerHTML;
            contactSection.innerHTML = `
                ${currentContent}
                <div class="contact-enhancement" style="
                    margin-top: 32px;
                    padding: 24px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                ">
                    <h3 style="color: white; margin-bottom: 16px; font-size: 1.25rem;">Let's Connect!</h3>
                    <p style="color: rgba(255, 255, 255, 0.9); margin-bottom: 20px;">
                        I'm always excited to discuss new opportunities, collaborate on interesting projects, or just have a chat about data science and AI!
                    </p>
                    <div class="social-links" style="display: flex; gap: 15px; flex-wrap: wrap;">
                        <a href="https://www.linkedin.com/in/amaan-m-5144b6123/" target="_blank" style="
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 10px 16px;
                            background: rgba(255, 255, 255, 0.2);
                            border-radius: 25px;
                            color: white;
                            text-decoration: none;
                            font-weight: 500;
                            transition: all 0.3s ease;
                        ">
                            🔗 LinkedIn
                        </a>
                        <a href="https://github.com/amaan-1234" target="_blank" style="
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 10px 16px;
                            background: rgba(255, 255, 255, 0.2);
                            border-radius: 25px;
                            color: white;
                            text-decoration: none;
                            font-weight: 500;
                            transition: all 0.3s ease;
                        ">
                            💻 GitHub
                        </a>
                        <a href="tel:+14806900972" style="
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 10px 16px;
                            background: rgba(255, 255, 255, 0.2);
                            border-radius: 25px;
                            color: white;
                            text-decoration: none;
                            font-weight: 500;
                            transition: all 0.3s ease;
                        ">
                            📞 Call Me
                        </a>
                    </div>
                </div>
            `;
            
            // Add hover effects to social links
            const socialLinks = contactSection.querySelectorAll('.social-links a');
            socialLinks.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    this.style.background = 'rgba(255, 255, 255, 0.3)';
                    this.style.transform = 'translateY(-2px) scale(1.05)';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.background = 'rgba(255, 255, 255, 0.2)';
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }
    }
    
    // Initialize all enhancements
    setTimeout(() => {
        addSkillsBars();
        addProjectStats();
        addThemeToggle();
        addScrollProgress();
        addFloatingActions();
        enhanceContactSection();
    }, 500);
    
    console.log('🚀 Portfolio enhanced successfully! All features loaded.');
});
