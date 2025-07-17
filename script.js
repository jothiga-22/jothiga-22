document.addEventListener('DOMContentLoaded', function() {

    // 1. Header Scroll Animation
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for animations on scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay for a nicer effect
                const delay = entry.target.dataset.delay || index * 100;
                
                setTimeout(() => {
                    // Check for specific animation types
                    if (entry.target.matches('h2')) {
                        entry.target.classList.add('animate-underline');
                    } else {
                        // General fade-in-up animation
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                }, delay);

                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1 // trigger when 10% of the element is visible
    });

    // 3. Target all elements that need animation
    // General fade-up elements
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .experience-item, #achievements li, .contact-info, .contact-form');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        el.style.transform = 'translateY(30px)'; // Initial position for animation
        observer.observe(el);
    });

    // Section titles for underline animation
    const titlesToAnimate = document.querySelectorAll('h2');
    titlesToAnimate.forEach(title => {
        observer.observe(title);
    });

});