// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Toggle mobile navigation
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Sticky navigation on scroll
    function handleScroll() {
        // Add shadow to nav when scrolling
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 5px 20px rgba(2, 12, 27, 0.3)';
            nav.style.padding = '0.5rem 0';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.padding = '1rem 0';
        }
        
        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Experience card toggle functionality
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        const toggleBtn = card.querySelector('.experience-card-toggle');
        const header = card.querySelector('.experience-card-header');
        
        function toggleCard() {
            card.classList.toggle('active');
        }
        
        toggleBtn.addEventListener('click', toggleCard);
        header.addEventListener('click', toggleCard);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Skill progress animation on scroll
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillProgressBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition) {
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease';
                    bar.style.width = width;
                }, 200);
            }
        });
    }
    
    // Initial call
    animateSkills();
    
    // Call on scroll
    window.addEventListener('scroll', animateSkills);
    
    // Section reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe sections for reveal animation
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add initial reveal class to hero
    document.querySelector('.hero').classList.add('revealed');
    
    // Update copyright year
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Handle form submission (if form existed)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, this would send data to a server
            alert('Thank you for your message. In a real implementation, this would be sent to a server.');
            contactForm.reset();
        });
    }
    
    // Initialize the page with scroll position
    handleScroll();
});