document.addEventListener('DOMContentLoaded', function() {
    // Slide menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const slideMenu = document.querySelector('.slide-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const hamburger = document.querySelector('.hamburger');

    // Open menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Menu toggle clicked');
            slideMenu.classList.add('active');
            menuOverlay.classList.add('active');
            hamburger.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close menu function
    function closeSlideMenu() {
        slideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close menu events
    if (closeMenu) {
        closeMenu.addEventListener('click', closeSlideMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeSlideMenu);
    }

    // Close menu when clicking on menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', closeSlideMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && slideMenu && slideMenu.classList.contains('active')) {
            closeSlideMenu();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '#e9ecef';
                }
            });
            
            if (isValid) {
                alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.');
                this.reset();
            } else {
                alert('Lütfen tüm alanları doldurun.');
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate service cards and other elements
    document.querySelectorAll('.service-card, .about-text, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Hamburger animation CSS
const style = document.createElement('style');
style.textContent = `
    .hamburger.active .bar:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
    }
    .hamburger.active .bar:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
`;
document.head.appendChild(style);

// Image Modal JavaScript Functions
let currentImageIndex = 0;
const projectImages = [
    'img/1.jpeg',
    'img/2.jpeg',
    'img/3.jpeg',
    'img/4.jpeg',
    'img/5.jpeg',
    'img/6.jpeg',
    'img/7.jpeg',
    'img/8.jpeg',
    'img/9.jpeg',
    'img/10.jpeg',
    'img/11.jpeg',
    'img/12.jpeg',
    'img/13.jpeg',
    'img/14.jpeg',
    'img/15.jpeg',
    'img/16.jpeg',
    'img/17.jpeg',
    'img/18.jpeg',
    'img/19.jpeg',
    'img/20.jpeg',
    'img/21.jpeg',
    'img/22.jpeg',
    'img/23.jpeg',
    'img/24.jpeg',
    'img/25.jpeg',
    'img/26.jpeg',
    'img/27.jpeg'
];

function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    currentImageIndex = projectImages.indexOf(imageSrc);
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    modal.style.display = 'block';
    modalImg.src = projectImages[currentImageIndex];
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= projectImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = projectImages.length - 1;
    }
    
    const modalImg = document.getElementById('modalImage');
    modalImg.src = projectImages[currentImageIndex];
}

// Close modal when clicking outside the image
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeImageModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
    if (e.key === 'ArrowLeft') {
        changeImage(-1);
    }
    if (e.key === 'ArrowRight') {
        changeImage(1);
    }
});
