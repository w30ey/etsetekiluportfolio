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
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Sticky navigation on scroll
    function handleScroll() {
        // Add shadow to nav when scrolling
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
            nav.style.padding = '0.75rem 0';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.padding = '1.25rem 0';
        }
        
        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
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
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
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
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
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
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.footer-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.footer-newsletter-input');
            const button = this.querySelector('.footer-newsletter-button');
            
            if (emailInput.value) {
                // In a real implementation, this would send data to a server
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.backgroundColor = '#10B981';
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.backgroundColor = '';
                    emailInput.value = '';
                    alert('Thank you for subscribing! You\'ll receive updates on leadership and global strategy.');
                }, 1500);
            }
        });
    }
    
    // Add hover effect to education items
    const educationItems = document.querySelectorAll('.education-item-content');
    educationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Picture placeholders - instructions for client
    console.log('%c📸 PICTURE PLACEMENT INSTRUCTIONS:', 'color: #DC2626; font-size: 16px; font-weight: bold;');
    console.log('%cReplace placeholder divs with <img> tags and add actual image URLs:', 'color: #4A5568;');
    console.log('%c1. Hero: hero-picture-placeholder → <img src="your-portrait.jpg" alt="ETSE">', 'color: #718096;');
    console.log('%c2. About: about-picture-placeholder → <img src="professional-headshot.jpg" alt="ETSE Professional">', 'color: #718096;');
    console.log('%c3. Education: education-image-placeholder → <img src="university-photo.jpg" alt="Ashoka University">', 'color: #718096;');
    console.log('%c4. Experience: experience-image-placeholder → <img src="company-logo.jpg" alt="Company">', 'color: #718096;');
    console.log('%c5. Leadership: leadership-image-placeholder → <img src="action-shot.jpg" alt="Leadership Activity">', 'color: #718096;');
    console.log('%c6. Contact: contact-picture-placeholder → <img src="casual-portrait.jpg" alt="ETSE Casual">', 'color: #718096;');
    
    // Initialize the page with scroll position
    handleScroll();
    
    // Add loading animation for pictures
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero picture
        const heroPicture = document.querySelector('.hero-profile-picture');
        if (heroPicture) {
            setTimeout(() => {
                heroPicture.style.opacity = '1';
                heroPicture.style.transform = 'translateY(0)';
            }, 500);
        }
    });
    
    // Pre-load animation for hero picture
    const heroPicture = document.querySelector('.hero-profile-picture');
    if (heroPicture) {
        heroPicture.style.opacity = '0';
        heroPicture.style.transform = 'translateY(30px)';
        heroPicture.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
});