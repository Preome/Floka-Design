/* ============================================
   FLOKA STUDIO - MAIN JAVASCRIPT
   Modern Animations & Interactions
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // ROTATING TEXT ANIMATION (Bird Marketing Style)
    // ============================================
    const words = ["Full Service", "Award Winning", "Data Driven", "Globally Recognized", "Innovative"];
    let wordIndex = 0;
    const rotatingWordEl = document.getElementById("rotatingWord");
    
    if (rotatingWordEl) {
        function rotateWord() {
            gsap.to(rotatingWordEl, {
                duration: 0.4,
                opacity: 0,
                y: -30,
                rotationX: -90,
                ease: "back.in(1)",
                onComplete: () => {
                    wordIndex = (wordIndex + 1) % words.length;
                    rotatingWordEl.textContent = words[wordIndex];
                    gsap.to(rotatingWordEl, {
                        duration: 0.6,
                        opacity: 1,
                        y: 0,
                        rotationX: 0,
                        ease: "back.out(1.2)"
                    });
                }
            });
        }
        setInterval(rotateWord, 2500);
    }
    
    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { duration: 0.2, x: e.clientX, y: e.clientY });
            gsap.to(cursorDot, { duration: 0.05, x: e.clientX, y: e.clientY });
        });
        
        const hoverElements = document.querySelectorAll('a, button, .card-expert, .team-member, .btn-primary, .btn-outline');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    duration: 0.3,
                    scale: 1.8,
                    borderColor: "#FFD700",
                    backgroundColor: "rgba(212,175,55,0.15)"
                });
                gsap.to(cursorDot, { duration: 0.2, scale: 2.5, backgroundColor: "#FFD700" });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    duration: 0.3,
                    scale: 1,
                    borderColor: "#D4AF37",
                    backgroundColor: "rgba(212,175,55,0.05)"
                });
                gsap.to(cursorDot, { duration: 0.2, scale: 1, backgroundColor: "#D4AF37" });
            });
        });
    }
    
    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
        
        // Navbar background change on scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // ============================================
    // GSAP ADVANCED ANIMATIONS
    // ============================================
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero Section Animation
    gsap.from('.hero-left', {
        duration: 1.2,
        x: -100,
        opacity: 0,
        ease: "back.out(0.8)"
    });
    
    gsap.from('.hero-right', {
        duration: 1.2,
        x: 100,
        opacity: 0,
        ease: "back.out(0.8)",
        delay: 0.3
    });
    
    // Animate Badge
    gsap.from('.badge', {
        duration: 1,
        scale: 0,
        opacity: 0,
        ease: "elastic.out(1, 0.5)",
        delay: 0.2
    });
    
    // Animate Stats
    gsap.from('.stat-item', {
        scrollTrigger: {
            trigger: '.hero-stats',
            start: 'top 85%'
        },
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // Cards Stagger Animation
    const cards = document.querySelectorAll('.card-expert, .team-member, .testi-card');
    cards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.9,
            y: 70,
            opacity: 0,
            scale: 0.9,
            delay: i * 0.12,
            ease: "back.out(0.7)"
        });
    });
    
    // Skill Bars Animation
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        gsap.to(fill, {
            scrollTrigger: {
                trigger: fill,
                start: 'top 85%',
                onEnter: () => {
                    const width = fill.getAttribute('data-width');
                    if (width && !fill.style.width) {
                        fill.style.width = width + '%';
                    }
                }
            }
        });
    });
    
    // Approach Cards Animation
    gsap.utils.toArray('.approach-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            duration: 0.8,
            x: i === 2 ? 0 : -50,
            opacity: 0,
            delay: i * 0.15,
            ease: "power2.out"
        });
    });
    
    // ============================================
    // PARTICLE BACKGROUND SYSTEM
    // ============================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.color = `rgba(212, 175, 55, ${Math.random() * 0.4})`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }
        }
        
        function initParticles() {
            particles = [];
            const particleCount = Math.min(150, Math.floor(window.innerWidth / 15));
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        
        resizeCanvas();
        initParticles();
        animateParticles();
    }
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionDiv = item.querySelector('.faq-question');
        if (questionDiv) {
            questionDiv.addEventListener('click', () => {
                item.classList.toggle('active');
                const icon = questionDiv.querySelector('i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.className = 'fas fa-minus';
                    } else {
                        icon.className = 'fas fa-plus';
                    }
                }
            });
        }
    });
    
    // ============================================
    // BUTTON CLICK EFFECTS
    // ============================================
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(exploreBtn, { duration: 0.2, scale: 0.95, yoyo: true, repeat: 1 });
            alert("✨ Welcome to Floka! Let's create something extraordinary together.");
        });
    }
    
    // Talk button effect
    const talkBtns = document.querySelectorAll('.talk-btn, .btn-outline');
    talkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(btn, { duration: 0.2, scale: 0.95, yoyo: true, repeat: 1 });
            alert("📞 Thank you for reaching out! We'll get back to you within 24 hours.");
        });
    });
    
    // Submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(submitBtn, { duration: 0.2, scale: 0.95, yoyo: true, repeat: 1 });
            alert("✅ Thank you! Your inquiry has been submitted successfully.");
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ============================================
    // 3D TILT EFFECT ON HERO IMAGE
    // ============================================
    const tiltContainers = document.querySelectorAll('.tilt-container');
    tiltContainers.forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
    
    // ============================================
    // PARALLAX SCROLL EFFECT
    // ============================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-right img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
    
    // ============================================
    // TESTIMONIAL SMOOTH SCROLL
    // ============================================
    const testiScroll = document.getElementById('testiScroll');
    if (testiScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testiScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testiScroll.offsetLeft;
            scrollLeft = testiScroll.scrollLeft;
        });
        
        testiScroll.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testiScroll.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testiScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testiScroll.offsetLeft;
            const walk = (x - startX) * 1.5;
            testiScroll.scrollLeft = scrollLeft - walk;
        });
    }
    
    console.log('Floka Studio - Fully Loaded! 🚀');
});