// Custom cursor
document.addEventListener('DOMContentLoaded', function() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    // Custom cursor movement
    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add slight delay to cursor outline for smooth effect
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 80);
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--accent-color)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--primary-color)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (mobileMenuBtn.classList.contains('active')) {
            // Transform spans into X shape
            mobileMenuBtn.children[0].style.transform = 'translateY(9px) rotate(45deg)';
            mobileMenuBtn.children[1].style.opacity = '0';
            mobileMenuBtn.children[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            // Reset spans
            mobileMenuBtn.children[0].style.transform = 'none';
            mobileMenuBtn.children[1].style.opacity = '1';
            mobileMenuBtn.children[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a nav link
    const mobileNavLinks = document.querySelectorAll('.mobile-menu a');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Reset spans
            mobileMenuBtn.children[0].style.transform = 'none';
            mobileMenuBtn.children[1].style.opacity = '1';
            mobileMenuBtn.children[2].style.transform = 'none';
        });
    });
    
    // Add some parallax effects to decorative elements
    const decorElements = document.querySelectorAll('.dec-element');
    
    window.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        decorElements.forEach(element => {
            const speed = element.classList.contains('sun') ? 2 : 
                          element.classList.contains('star-1') ? 4 : 3;
            
            const moveX = (mouseX - 0.5) * speed;
            const moveY = (mouseY - 0.5) * speed;
            
            element.style.transform = `translate(${moveX}rem, ${moveY}rem) rotate(${element.classList.contains('sun') ? 0 : element.classList.contains('star-1') ? 15 : -10}deg)`;
        });
    });
    
    // Add scroll animations with IntersectionObserver
    const observerElements = document.querySelectorAll('.hero-text, .hero-image');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observerElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
});
// About section animations
document.addEventListener('DOMContentLoaded', function() {
    // Animation for about section elements using Intersection Observer
    const aboutElements = document.querySelectorAll('.about-image, .about-bio, .about-stats, .skills-container, .about-cta');
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a staggered delay based on the index
                const index = Array.from(aboutElements).indexOf(entry.target);
                const delay = index * 0.15; // 150ms delay between each element
                
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('animate-in');
                
                // Remove the observer after animation
                aboutObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    aboutElements.forEach(element => {
        element.classList.add('will-animate');
        aboutObserver.observe(element);
    });
    
    // Skill card hover effects
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle rotation to icons on hover
            const icon = card.querySelector('.skill-icon');
            icon.style.transform = 'rotate(5deg) scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.skill-icon');
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });
    
    // Add counter animation to stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
    
    // Create an observer for the stats section
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(animateCounter);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the stats section
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Add this CSS to your stylesheet or append it to the head
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .will-animate {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-icon {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(animationStyle);
// Portfolio section functionality
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Initial animation delay for items
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Apply staggered animations to filtered items
            let visibleIndex = 0;
            
            // Filter items
            portfolioItems.forEach(item => {
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                
                const itemCategories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                    item.classList.remove('hidden');
                    item.style.animation = `fadeIn 0.5s ease forwards ${visibleIndex * 0.1}s`;
                    visibleIndex++;
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Portfolio hover effects
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const links = card.querySelectorAll('.portfolio-link');
            links.forEach((link, index) => {
                link.style.transitionDelay = `${0.1 * index}s`;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const links = card.querySelectorAll('.portfolio-link');
            links.forEach(link => {
                link.style.transitionDelay = '0s';
            });
        });
    });
    
    // Animate elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe section elements
    observer.observe(document.querySelector('.section-header'));
    observer.observe(document.querySelector('.portfolio-filter'));
    observer.observe(document.querySelector('.portfolio-grid'));
    observer.observe(document.querySelector('.portfolio-cta'));
    
    // Add this CSS for animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .section-header, .portfolio-filter, .portfolio-grid, .portfolio-cta {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .portfolio-filter {
            transition-delay: 0.2s;
        }
        
        .portfolio-grid {
            transition-delay: 0.4s;
        }
        
        .portfolio-cta {
            transition-delay: 0.6s;
        }
    `;
    document.head.appendChild(animationStyle);
});
// Experience section animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animation for experience section elements
    const experienceElements = document.querySelectorAll('.timeline-item, .project-card, .experience-cta');
    
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calculate staggered delay
                let delay = 0;
                
                // Add different delays based on element type
                if (entry.target.classList.contains('timeline-item')) {
                    const timelineItems = document.querySelectorAll('.timeline-item');
                    const index = Array.from(timelineItems).indexOf(entry.target);
                    delay = index * 0.15;
                } else if (entry.target.classList.contains('project-card')) {
                    const projectCards = document.querySelectorAll('.project-card');
                    const index = Array.from(projectCards).indexOf(entry.target);
                    delay = index * 0.1;
                }
                
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('animate-in');
                
                // Remove the observer after animation
                experienceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    experienceElements.forEach(element => {
        element.classList.add('will-animate');
        experienceObserver.observe(element);
    });
    
    // Timeline dot hover effect
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            dot.style.transform = 'scale(1.2)';
            dot.style.backgroundColor = 'var(--accent-color)';
            dot.style.borderColor = 'white';
            dot.style.transition = 'all 0.3s ease';
        });
        
        dot.addEventListener('mouseleave', () => {
            dot.style.transform = 'scale(1)';
            dot.style.backgroundColor = 'white';
            dot.style.borderColor = 'var(--accent-color)';
        });
    });
    
    // Project card interactions - highlight matching tags on hover
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const tags = card.querySelectorAll('.tag');
        
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                const tagText = tag.textContent;
                
                // Find all tags with the same text across all project cards
                document.querySelectorAll('.tag').forEach(otherTag => {
                    if (otherTag.textContent === tagText) {
                        otherTag.classList.add('tag-highlight');
                    }
                });
            });
            
            tag.addEventListener('mouseleave', () => {
                document.querySelectorAll('.tag').forEach(otherTag => {
                    otherTag.classList.remove('tag-highlight');
                });
            });
        });
    });
    
    // Add parallax effect to decorative elements
    const decElements = document.querySelectorAll('.exp-circle, .exp-dots, .exp-star');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const experienceSection = document.querySelector('.experience-section');
        const sectionTop = experienceSection.offsetTop;
        const sectionHeight = experienceSection.offsetHeight;
        
        // Only apply parallax when section is in view
        if (scrollTop > sectionTop - window.innerHeight && scrollTop < sectionTop + sectionHeight) {
            const scrollProgress = (scrollTop - (sectionTop - window.innerHeight)) / (sectionHeight + window.innerHeight);
            
            decElements.forEach(element => {
                let translateY = 0;
                let translateX = 0;
                
                if (element.classList.contains('exp-circle')) {
                    translateY = scrollProgress * -50;
                    translateX = scrollProgress * 20;
                } else if (element.classList.contains('exp-dots')) {
                    translateY = scrollProgress * 40;
                    translateX = scrollProgress * -30;
                } else if (element.classList.contains('exp-star')) {
                    translateY = scrollProgress * 60;
                    translateX = scrollProgress * 10;
                    // Add rotation to the star
                    const rotation = scrollProgress * 30;
                    element.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`;
                    return; // Skip the default transform below
                }
                
                element.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        }
    });
});

// Add this CSS to your stylesheet or append it to the head
if (!document.getElementById('experience-animations')) {
    const animationStyle = document.createElement('style');
    animationStyle.id = 'experience-animations';
    animationStyle.textContent = `
        .will-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease, background-color 0.3s ease, color 0.3s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-dot {
            transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
            cursor: pointer;
        }
        
        .tag-highlight {
            background-color: var(--accent-color);
            color: var(--primary-color);
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(animationStyle);
}