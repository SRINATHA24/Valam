// ==================== CAROUSEL FUNCTIONALITY ====================
class Carousel {
    constructor(wrapperSelector, trackSelector, prevBtnSelector, nextBtnSelector, dotsSelector = null) {
        this.wrapper = document.querySelector(wrapperSelector);
        this.track = document.querySelector(trackSelector);
        this.prevBtn = document.querySelector(prevBtnSelector);
        this.nextBtn = document.querySelector(nextBtnSelector);
        this.dotsContainer = document.querySelector(dotsSelector);
        this.currentIndex = 0;
        
        if (this.track) {
            this.slides = [...this.track.children];
            this.slideWidth = this.slides[0]?.offsetWidth || 0;
            this.init();
        }
    }

    init() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        
        if (this.dotsContainer) {
            this.createDots();
        }

        window.addEventListener('resize', () => this.updateSlideWidth());
    }

    updateSlideWidth() {
        if (this.slides[0]) {
            this.slideWidth = this.slides[0].offsetWidth;
        }
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < Math.ceil(this.slides.length / this.getSlidesPerView()); i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    getSlidesPerView() {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    next() {
        const slidesPerView = this.getSlidesPerView();
        const maxIndex = Math.ceil(this.slides.length / slidesPerView) - 1;
        
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updateCarousel();
    }

    prev() {
        const slidesPerView = this.getSlidesPerView();
        const maxIndex = Math.ceil(this.slides.length / slidesPerView) - 1;
        
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = maxIndex;
        }
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const slidesPerView = this.getSlidesPerView();
        const moveDistance = this.currentIndex * this.slideWidth * slidesPerView;
        this.track.style.transform = `translateX(-${moveDistance}px)`;

        // Update dots
        if (this.dotsContainer) {
            const dots = [...this.dotsContainer.children];
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
    }
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', () => {
    // Promo carousel
    new Carousel(
        '.carousel-wrapper',
        '.carousel-track',
        '.carousel-container .prev-btn',
        '.carousel-container .next-btn',
        '.promo-carousel .carousel-dots'
    );

    // Cars carousel
    new Carousel(
        '.cars-wrapper',
        '.cars-track',
        '.cars-carousel .prev-btn',
        '.cars-carousel .next-btn',
        '.cars-dots'
    );

    // Reviews carousel
    new Carousel(
        '.reviews-track',
        '.reviews-track',
        '.reviews-carousel .prev-btn',
        '.reviews-carousel .next-btn',
        '.review-dots'
    );

    // Destinations carousel
    new Carousel(
        '.destinations-wrapper',
        '.destinations-track',
        '.destinations-carousel .prev-btn',
        '.destinations-carousel .next-btn',
        '.dest-dots'
    );

    // ==================== FAQ ACCORDION ====================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ==================== NAVIGATION ====================
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==================== HAMBURGER MENU ====================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('mobile-active');
            if (navButtons) navButtons.classList.toggle('mobile-active');
        });

        // Close menu on link click
        const mobileLinks = document.querySelectorAll('.nav-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('mobile-active');
                if (navButtons) navButtons.classList.remove('mobile-active');
            });
        });
    }

    // ==================== BUTTON EVENTS ====================
    const bookButtons = document.querySelectorAll('.btn-book');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Booking feature will be implemented soon!');
        });
    });

    const findCarBtn = document.querySelector('.btn-find-car');
    if (findCarBtn) {
        findCarBtn.addEventListener('click', () => {
            const searchForm = document.querySelector('.search-form-hero');
            if (searchForm) {
                searchForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const city = document.querySelector('.search-form-hero .search-field input:first-of-type').value;
            const startDate = document.querySelector('.search-form-hero .search-field input:nth-of-type(2)').value;
            const endDate = document.querySelector('.search-form-hero .search-field input:nth-of-type(3)').value;
            
            if (city && startDate && endDate) {
                alert(`Searching for cars in ${city} from ${startDate} to ${endDate}`);
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('More details will be available soon!');
        });
    });

    const viewAllLinks = document.querySelectorAll('.view-all');
    viewAllLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('More items coming soon!');
        });
    });

    // ==================== STAR INTERACTION ====================
    const bookmarks = document.querySelectorAll('.car-card i.fas-bookmark');
    bookmarks.forEach(bookmark => {
        bookmark.style.cursor = 'pointer';
        bookmark.addEventListener('click', (e) => {
            e.stopPropagation();
            bookmark.style.color = bookmark.style.color === 'rgb(255, 107, 53)' ? '' : '#FF6B35';
        });
    });

    // ==================== SIGN IN BUTTONS ====================
    const signInBtn = document.querySelector('.btn-sign-in');
    const signUpBtn = document.querySelector('.btn-sign-up');
    
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            alert('Sign In page will be available soon!');
        });
    }

    if (signUpBtn) {
        signUpBtn.addEventListener('click', () => {
            alert('Sign Up page will be available soon!');
        });
    }

    // ==================== SMOOTH SCROLL OFFSET ====================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const element = document.querySelector(href);
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== ACTIVE NAV LINK ====================
    const updateActiveNav = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);

    // ==================== ADD STYLES FOR ACTIVE LINKS ====================
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            border-bottom: 3px solid rgba(255, 255, 255, 0.7);
            padding-bottom: 5px;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(10px, 10px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }

        @media (max-width: 768px) {
            .nav-menu.mobile-active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 70px;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #0052CC 0%, #003399 100%);
                padding: 2rem;
                gap: 1rem;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            }

            .nav-buttons.mobile-active {
                display: flex !important;
                position: absolute;
                top: 200px;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #0052CC 0%, #003399 100%);
                padding: 1rem 2rem;
                gap: 1rem;
                flex-direction: column;
            }

            .nav-buttons.mobile-active button {
                width: 100%;
            }
        }

        .carousel-dots .dot {
            width: 10px;
            height: 10px;
            background: rgba(0, 82, 204, 0.3);
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s;
        }

        .carousel-dots .dot.active {
            background: #0052CC;
            width: 30px;
            border-radius: 5px;
        }

        .carousel-dots .dot:hover {
            background: rgba(0, 82, 204, 0.6);
        }
    `;
    document.head.appendChild(style);

    // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.car-card, .feature-card, .destination-card, .brand-card, .faq-item, .review-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // ==================== FORM VALIDATION ====================
    const dateInputs = document.querySelectorAll('.search-form-hero input[placeholder*="DD/MM/YYYY"]');
    dateInputs.forEach(input => {
        // Keep as text input so users can type full DD/MM/YYYY freely.
        // Auto-insert slashes while typing and limit to 8 digits (DDMMYYYY).
        input.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 8);
            if (v.length >= 5) {
                v = v.replace(/^(\d{2})(\d{2})(\d{0,4}).*$/, '$1/$2/$3');
            } else if (v.length >= 3) {
                v = v.replace(/^(\d{2})(\d{0,2}).*$/, '$1/$2');
            }
            e.target.value = v;
        });

        // Optional: basic validation on blur; don't clear the value so user can correct it.
        input.addEventListener('blur', (e) => {
            const val = e.target.value;
            if (!val) return;
            const m = val.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
            if (m) {
                const dd = parseInt(m[1], 10);
                const mm = parseInt(m[2], 10);
                const yyyy = parseInt(m[3], 10);
                const date = new Date(yyyy, mm - 1, dd);
                if (!(date && date.getFullYear() === yyyy && date.getMonth() === mm - 1 && date.getDate() === dd)) {
                    // invalid date - keep the value so user can edit
                    e.target.classList.add('invalid-date');
                } else {
                    e.target.classList.remove('invalid-date');
                }
            } else {
                // incomplete/incorrect format
                e.target.classList.add('invalid-date');
            }
        });
    });

    // ==================== RATING SYSTEM ====================
    const ratingElements = document.querySelectorAll('.rating i');
    ratingElements.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('mouseover', () => {
            el.style.color = '#FF6B35';
            el.style.transform = 'scale(1.2)';
        });
        el.addEventListener('mouseout', () => {
            el.style.transform = 'scale(1)';
        });
    });

    // ==================== LAZY LOADING FOR IMAGES ====================
    const images = document.querySelectorAll('img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s';
            imageObserver.observe(img);
        });
    }

    console.log('Website initialized successfully!');
});

// ==================== UTILITY FUNCTIONS ====================

// Scroll to top button functionality
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Add class to element
function addClass(selector, className) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add(className);
    }
}

// Remove class from element
function removeClass(selector, className) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.remove(className);
    }
}

// Toggle class on element
function toggleClass(selector, className) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.toggle(className);
    }
}

// Debounce function for resize events
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    const carousels = document.querySelectorAll('.carousel-track');
    carousels.forEach(carousel => {
        if (carousel.parentElement.parentElement) {
            // Trigger carousel update on resize
            const event = new Event('resize');
            window.dispatchEvent(event);
        }
    });
}, 250);

window.addEventListener('resize', handleResize);
