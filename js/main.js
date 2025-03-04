document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Show loading state
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<div class="loading"></div>';
            submitButton.disabled = true;
            
            try {
                // Simulate form submission (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } catch (error) {
                // Show error message
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Navigation highlight
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNavigation = () => {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();

    // Mobile menu handling
    const createMobileMenu = () => {
        const nav = document.querySelector('.main-nav');
        const menuButton = document.createElement('button');
        menuButton.classList.add('mobile-menu-button');
        menuButton.setAttribute('aria-label', 'Toggle menu');
        menuButton.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
        `;
        
        nav.prepend(menuButton);
        
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('menu-open');
            menuButton.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && nav.classList.contains('menu-open')) {
                nav.classList.remove('menu-open');
                menuButton.classList.remove('active');
            }
        });
    };

    // Initialize mobile menu for smaller screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth <= 768) {
                if (!document.querySelector('.mobile-menu-button')) {
                    createMobileMenu();
                }
            } else {
                const menuButton = document.querySelector('.mobile-menu-button');
                if (menuButton) {
                    menuButton.remove();
                }
                document.querySelector('.main-nav').classList.remove('menu-open');
            }
        }, 250);
    });

    // Toggle Menu
    const toggleMenu = document.querySelector('.toggle-menu');
    const toggleClose = document.querySelector('.toggle-close');
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-button');
    menuButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    document.body.appendChild(menuButton);

    menuButton.addEventListener('click', () => {
        toggleMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    toggleClose.addEventListener('click', () => {
        toggleMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggleMenu.contains(e.target) && !menuButton.contains(e.target) && toggleMenu.classList.contains('active')) {
            toggleMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                toggleMenu.classList.remove('active');
                document.body.style.overflow = '';
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for header background
    const headerBg = document.querySelector('.header-background');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        headerBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Add CSS styles for notifications, mobile menu, and menu button
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.success {
            background-color: var(--success);
        }
        
        .notification.error {
            background-color: var(--error);
        }
        
        @media (max-width: 768px) {
            .main-nav ul {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                flex-direction: column;
                background: var(--primary-dark);
                padding: 1rem;
                transform: translateY(-100%);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                pointer-events: none;
            }
            
            .main-nav.menu-open ul {
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }
            
            .mobile-menu-button {
                background: none;
                border: none;
                padding: 0.5rem;
                cursor: pointer;
                z-index: 1000;
            }
            
            .mobile-menu-button svg {
                stroke: currentColor;
                stroke-width: 2;
                stroke-linecap: round;
                fill: none;
                transition: transform 0.3s ease;
            }
            
            .mobile-menu-button.active svg {
                transform: rotate(90deg);
            }

            .menu-button {
                display: block;
            }

            .main-nav {
                display: none;
            }
        }

        .menu-button {
            position: fixed;
            top: 2rem;
            right: 2rem;
            width: 30px;
            height: 20px;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 100;
            display: none;
        }

        .menu-button span {
            display: block;
            width: 100%;
            height: 2px;
            background-color: var(--text-light);
            position: absolute;
            transition: transform 0.3s, opacity 0.3s;
        }

        .menu-button span:first-child {
            top: 0;
        }

        .menu-button span:nth-child(2) {
            top: 50%;
            transform: translateY(-50%);
        }

        .menu-button span:last-child {
            bottom: 0;
        }
    `;
    
    document.head.appendChild(style);

    // Sticky Header functionality
    const stickyHeader = document.querySelector('.sticky-header');
    const stickyName = document.querySelector('.sticky-name');
    const stickyTitle = document.querySelector('.sticky-title');
    const mainName = document.getElementById('main-name');
    const mainTitle = document.getElementById('main-title');
    const headerSection = document.getElementById('header-section');
    
    // Add blur-section class to all main sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('blur-section');
    });

    let lastScrollY = window.scrollY;
    const scrollThreshold = 100; // Pixels to scroll before showing sticky header

    function updateStickyHeader() {
        const currentScrollY = window.scrollY;
        const headerRect = headerSection.getBoundingClientRect();
        const nameRect = mainName.getBoundingClientRect();
        const titleRect = mainTitle.getBoundingClientRect();

        // Show/hide sticky header
        if (currentScrollY > scrollThreshold) {
            stickyHeader.classList.add('visible');
        } else {
            stickyHeader.classList.remove('visible');
        }

        // Update name in sticky header
        if (nameRect.top < 0) {
            stickyName.textContent = 'Farah';
            stickyName.classList.add('visible');
        } else {
            stickyName.classList.remove('visible');
        }

        // Update title in sticky header
        if (titleRect.top < 80) { // 80px offset for header height
            stickyTitle.textContent = 'Software Engineer';
            stickyTitle.classList.add('visible');
        } else {
            stickyTitle.classList.remove('visible');
        }

        // Apply blur effect to sections
        document.querySelectorAll('.blur-section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < 80 && rect.bottom > 80) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        lastScrollY = currentScrollY;
    }

    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateStickyHeader();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    updateStickyHeader();

    // Project Modal Functionality
    const modalContainer = document.querySelector('.modal-container');
    const modals = document.querySelectorAll('.modal');
    const projectItems = document.querySelectorAll('.project-item');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    // Open modal
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            modalContainer.classList.add('active');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modalContainer.classList.remove('active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}); 