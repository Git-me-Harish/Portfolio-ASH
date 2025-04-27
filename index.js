document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Custom Cursor ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Use requestAnimationFrame for smoother outline movement
            requestAnimationFrame(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            });
        });

        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, .filter-btn, .portfolio-link, .social-link, .tool-item, .timeline-dot, input[type="text"], input[type="email"], textarea, input[type="submit"]'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'var(--accent-color)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
                cursorDot.style.backgroundColor = 'var(--accent-color)';
            });

            element.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'var(--primary-color)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                 cursorDot.style.backgroundColor = 'var(--primary-color)';
            });
        });
    } else {
        console.warn("Cursor elements not found.");
    }

    // --- 2. Header Scroll Effect ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) { // Adjust threshold if needed
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 3. Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-menu a');

    if (mobileMenuBtn && mobileMenu) {
        const spans = mobileMenuBtn.children;

        const toggleMenu = () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            if (mobileMenuBtn.classList.contains('active')) {
                // Transform spans into X shape
                if (spans.length === 3) {
                    spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
                }
                 document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                // Reset spans
                 if (spans.length === 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                 document.body.style.overflow = ''; // Re-enable scrolling
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close mobile menu when clicking a nav link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    toggleMenu(); // Use the toggle function to close
                }
            });
        });
    }

    // --- 4. Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a'); // Desktop links

    const activateNavLink = () => {
        let currentSection = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50; // Adjust offset
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Handle case when scrolled to the bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
             const lastSection = sections[sections.length - 1];
             if (lastSection) currentSection = lastSection.getAttribute('id');
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
         // Also highlight mobile links if needed
        mobileNavLinks.forEach(link => {
            link.classList.remove('active'); // You might need an 'active' style for mobile too
             if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', activateNavLink);
    activateNavLink(); // Initial check on load


    // --- 5. Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: '0px 0px -50px 0px' // Start animation a bit before element fully enters viewport
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay using data-delay attribute or index
                const delay = entry.target.dataset.delay ? parseFloat(entry.target.dataset.delay) : index * 0.1;
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll(
        '.hero-text, .hero-image, .about-image, .about-text > *, .skill-card, .portfolio-item, .timeline-item, .project-card, .skill-category, .tool-item, .edu-card, .cert-card, .contact-info > *, .contact-form > *, .footer-column, .section-header, .portfolio-filter, .portfolio-cta, .experience-cta, .tools-section'
    );

    elementsToAnimate.forEach(element => {
         element.classList.add('will-animate'); // Add class for initial state (opacity 0, transform)
        animationObserver.observe(element);
    });

     // --- 5.1. Skills Progress Bar Animation ---
    const skillsObserverOptions = {
        threshold: 0.5, // Trigger when 50% of the item is visible
        rootMargin: '0px'
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-fill');
                const percentageSpan = entry.target.querySelector('.skill-percentage');
                if (progressBar && percentageSpan) {
                    const percentage = percentageSpan.textContent; // e.g., "90%"
                    progressBar.style.width = percentage;
                    observer.unobserve(entry.target); // Animate only once
                }
            }
        });
    }, skillsObserverOptions);

    const skillProgressItems = document.querySelectorAll('.skill-progress-item');
    skillProgressItems.forEach(item => {
        skillsObserver.observe(item);
    });


    // --- 6. About Section Specifics ---
    // 6.1 Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false; // Flag to ensure animation runs only once

    function animateCounter(element) {
        const targetText = element.textContent.replace('+', ''); // Get target number (e.g., "10")
        const target = parseInt(targetText);
        if (isNaN(target)) return; // Skip if not a number

        const duration = 1500; // ms
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        const step = target / totalFrames;
        let current = 0;
        let frame = 0;

        const counter = () => {
            frame++;
            current += step;
            element.textContent = Math.min(Math.floor(current), target) + '+'; // Ensure it doesn't exceed target

            if (frame < totalFrames) {
                requestAnimationFrame(counter);
            } else {
                element.textContent = target + '+'; // Ensure final value is correct
            }
        };
        requestAnimationFrame(counter);
    }

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statNumbers.forEach(animateCounter);
                    statsAnimated = true; // Set flag
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible
        statsObserver.observe(statsSection);
    }

    // 6.2 Skill Card Icon Hover (already included in general IntersectionObserver setup)


    // --- 7. Portfolio Filtering ---
    const filterButtons = document.querySelectorAll('.portfolio-filter .filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');

                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                let visibleIndex = 0;
                portfolioItems.forEach(item => {
                     // Reset animation styles immediately for re-filtering
                    item.style.animation = 'none';
                    item.style.opacity = '0'; // Hide initially before potential fade-in
                    item.classList.add('hidden'); // Hide by default

                    const itemCategories = item.getAttribute('data-category').split(' ');

                    if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                         // Re-apply animation with delay only if it should be visible
                         // Use requestAnimationFrame to ensure styles are applied before animation starts
                        requestAnimationFrame(() => {
                            item.classList.remove('hidden');
                            item.style.opacity = '1'; // Make it visible for animation
                            item.style.animation = `fadeIn 0.5s ease forwards ${visibleIndex * 0.1}s`;
                            visibleIndex++;
                        });
                    }
                });
                 // Force reflow might not be needed with requestAnimationFrame
                 // item.offsetHeight;
            });
        });
    }

    // --- 8. Experience Section Specifics ---
    // 8.1 Timeline Dot Hover
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            dot.style.transform = 'scale(1.3)';
            dot.style.backgroundColor = 'var(--accent-color)';
        });
        dot.addEventListener('mouseleave', () => {
            dot.style.transform = 'scale(1)';
            dot.style.backgroundColor = ''; // Reset to CSS default
        });
    });

    // 8.2 Tag Highlighting on Hover (Improved)
    const allTags = document.querySelectorAll('.tag'); // Select all tags on the page once
    allTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const tagText = tag.textContent;
            allTags.forEach(otherTag => {
                if (otherTag.textContent === tagText) {
                    otherTag.classList.add('tag-highlight');
                } else {
                     otherTag.classList.add('tag-dim'); // Dim other tags
                }
            });
        });
        tag.addEventListener('mouseleave', () => {
            allTags.forEach(otherTag => {
                otherTag.classList.remove('tag-highlight', 'tag-dim');
            });
        });
    });


    // --- 9. Technology Sphere (TagCloud.js) ---
    const tagCloudElement = document.getElementById('tagcloud');
    if (typeof TagCloud !== 'undefined' && tagCloudElement) {
        const texts = [
            'Python', 'JavaScript', 'React', 'Node.js', 'TensorFlow',
            'PyTorch', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Git',
            'HTML5', 'CSS3', 'SASS', 'Pandas', 'NumPy', 'Plotly',
            'NLTK', 'SpaCy', 'OpenCV', 'Figma', 'Linux', 'API',
            'Machine Learning', 'Data Science', 'Web Dev', 'NLP'
            // Add more relevant skills/tools
        ];

        // Responsive radius based on container width
        const getRadius = () => {
            const container = document.querySelector('.tech-sphere-container');
            return container ? Math.min(250, container.offsetWidth / 2.5) : 200;
        };

        const options = {
            radius: getRadius(),
            maxSpeed: 'normal',
            initSpeed: 'fast',
            direction: 135,
            keep: true,
            itemClass: 'tagcloud--item' // Add a class for styling
        };

        let myTagCloud = TagCloud('#tagcloud', texts, options);

        // Update radius on resize
        window.addEventListener('resize', () => {
            const newOptions = { ...options, radius: getRadius() };
             // Check if TagCloud instance exists and has an update method
             if (myTagCloud && typeof myTagCloud.update === 'function') {
                 myTagCloud.update(newOptions);
             } else {
                 // Reinitialize if update isn't available or instance was lost
                 if(tagCloudElement.innerHTML) tagCloudElement.innerHTML = ''; // Clear old tags if necessary
                 myTagCloud = TagCloud('#tagcloud', texts, newOptions);
             }
        });

    } else if (tagCloudElement) {
        console.warn("TagCloud library not found or tagcloud element missing, sphere not initialized.");
        // Optional: Display a static message or image as fallback
         tagCloudElement.innerHTML = '<p style="text-align:center; padding: 2rem;">Interactive Sphere requires JavaScript.</p>';
    }


    // --- 10. Contact Form Handling ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default page reload

            // --- Basic Form Feedback (Replace with actual submission logic) ---
            const submitButton = contactForm.querySelector('.form-submit');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate network delay
            setTimeout(() => {
                // --- Placeholder for actual form submission (e.g., using Fetch API) ---
                // fetch('/your-endpoint', {
                //     method: 'POST',
                //     body: new FormData(contactForm)
                // })
                // .then(response => response.json())
                // .then(data => {
                //     console.log('Success:', data);
                     submitButton.textContent = 'Message Sent!';
                     contactForm.reset(); // Clear the form
                // })
                // .catch((error) => {
                //     console.error('Error:', error);
                //     submitButton.textContent = 'Send Failed!';
                // });
                // --- End Placeholder ---

                 // Revert button text after a delay (even on simulated success/failure)
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }, 3000); // Show "Sent!" for 3 seconds

            }, 1500); // Simulate 1.5 second sending time
        });
    }

    // --- 11. Scroll Progress Indicator ---
    const scrollProgressElement = document.querySelector('.scroll-progress');
    if (scrollProgressElement) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
            scrollProgressElement.style.width = scrollPercent + "%";
        });
    }

    // --- 12. Back to Top Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) { // Show after scrolling down 400px
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Smooth scroll to top on click
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // --- 13. Dynamically Add Animation CSS (Consolidated) ---
    const animationStyles = `
        .will-animate {
            opacity: 0;
            transform: translateY(40px); /* Slightly more pronounced initial offset */
            transition: opacity 0.7s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }

         /* Ensure progress fill transition happens */
        .progress-fill {
            transition: width 1.5s ease-in-out;
        }

        /* Tag highlight styles */
        .tag {
            transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease, opacity 0.3s ease;
        }
        .tag-highlight {
            background-color: var(--accent-color) !important; /* Use important if needed */
            color: var(--primary-color) !important;
            transform: scale(1.08);
            z-index: 1; /* Bring highlighted tag forward */
        }
        .tag-dim {
            opacity: 0.5;
            /* filter: grayscale(50%); optional */
        }

        /* Portfolio FadeIn Keyframes (if not already in CSS) */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

         /* TagCloud item styling */
        .tagcloud--item {
            cursor: pointer;
            transition: color 0.3s ease, transform 0.2s ease;
            font-weight: 500; /* Optional: make tags bolder */
            padding: 2px 5px; /* Optional: add some padding */
        }
        .tagcloud--item:hover {
            color: var(--accent-color) !important; /* Use important to override inline styles */
            transform: scale(1.1);
        }
    `;

    // Append styles if they don't exist
    if (!document.getElementById('dynamic-animation-styles')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'dynamic-animation-styles';
        styleSheet.innerText = animationStyles;
        document.head.appendChild(styleSheet);
    }

    console.log("Portfolio JS Initialized Successfully!"); // Confirmation

});

// Inside your contactForm submit event listener in main.js

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitButton = contactForm.querySelector('.form-submit');
    const originalButtonText = submitButton.textContent;

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries()); // Convert FormData to plain object

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Send data to the backend API
    fetch('http://localhost:5000/api/contact', { // Use your backend URL here
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send data as JSON
    })
    .then(response => {
        // Check if the response status indicates success (e.g., 201 Created)
        if (!response.ok) {
             // If not okay, try to parse error JSON from backend
             return response.json().then(err => {
                 throw new Error(err.message || `HTTP error! Status: ${response.status}`);
             });
        }
        return response.json(); // Parse successful JSON response
    })
    .then(result => {
        console.log('Success:', result);
        submitButton.textContent = 'Message Sent!';
        contactForm.reset(); // Clear form on success
        // You could show a success message to the user here
        alert(result.message); // Simple alert example
    })
    .catch((error) => {
        console.error('Error:', error);
        submitButton.textContent = 'Send Failed!';
        // Show an error message to the user
        alert(`Error: ${error.message}`);
    })
    .finally(() => {
        // Re-enable button and reset text after a delay
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }, 3000);
    });
});  // End DOMContentLoaded