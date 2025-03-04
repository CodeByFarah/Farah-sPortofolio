document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Parallax scroll effect
    const parallaxElements = document.querySelectorAll('.parallax');
    let scrollPosition = window.pageYOffset;

    function updateParallax() {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const offset = (window.pageYOffset - scrollPosition) * speed;
            element.style.setProperty('--parallax-offset', `${offset}px`);
        });
        scrollPosition = window.pageYOffset;
    }

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateParallax);
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.setProperty('--skill-percentage', `${level}%`);
            }
        });
    }, {
        threshold: 0.1
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Animated text typing effect
    const animateText = (element) => {
        const text = element.textContent;
        element.textContent = '';
        element.classList.add('typing');
        
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100);
            } else {
                element.classList.remove('typing');
            }
        };
        
        typeChar();
    };

    // Apply typing animation to welcome text
    const welcomeText = document.querySelector('.animated-text');
    if (welcomeText) {
        setTimeout(() => {
            animateText(welcomeText);
        }, 500);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Page transition effect
    const pageTransition = document.createElement('div');
    pageTransition.classList.add('page-transition');
    document.body.appendChild(pageTransition);

    document.querySelectorAll('a:not([href^="#"])').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            pageTransition.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });

    // Remove loading class once everything is loaded
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        document.querySelector('.page-transition').classList.remove('active');
    });
}); 