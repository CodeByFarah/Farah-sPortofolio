document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const getCurrentTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return prefersDarkScheme.matches ? 'dark' : 'light';
    };

    // Apply theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
    };

    // Initialize theme
    applyTheme(getCurrentTheme());

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add animation class
        themeToggle.classList.add('rotate');
        
        // Apply theme after slight delay for smooth transition
        setTimeout(() => {
            applyTheme(newTheme);
        }, 150);
        
        // Remove animation class
        setTimeout(() => {
            themeToggle.classList.remove('rotate');
        }, 300);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const systemTheme = e.matches ? 'dark' : 'light';
        // Only update if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            applyTheme(systemTheme);
        }
    });

    // Add hover animation to theme toggle
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'rotate(180deg)';
    });

    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'rotate(0deg)';
    });
}); 