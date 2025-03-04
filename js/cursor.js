document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const smoothFactor = 0.15; // Adjust for smoother/faster following

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Add active class when mouse moves
        cursor.classList.add('active');
        setTimeout(() => {
            cursor.classList.remove('active');
        }, 300);
    });

    // Smooth cursor following animation
    function animate() {
        // Calculate new cursor position
        cursorX += (mouseX - cursorX) * smoothFactor;
        cursorY += (mouseY - cursorY) * smoothFactor;
        
        // Update cursor position
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        // Continue animation
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Handle cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
            cursor.style.mixBlendMode = 'normal';
            cursor.style.backgroundColor = 'rgba(116, 192, 252, 0.4)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
            cursor.style.mixBlendMode = 'difference';
            cursor.style.backgroundColor = 'var(--accent-dark)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
        }
    });

    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '0.5';
    });
}); 