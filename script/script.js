document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuDrawer = document.querySelector('.mobile-menu-drawer');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    // Function to open drawer
    const openDrawer = () => {
        mobileMenuDrawer.classList.add('open');
        mobileMenuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    };

    // Function to close drawer
    const closeDrawer = () => {
        mobileMenuDrawer.classList.remove('open');
        mobileMenuOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Restore body scroll
    };

    // Event Listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openDrawer);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeDrawer);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeDrawer);
    }

    // Close drawer when clicking nav link
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            closeDrawer();
        });
    });

    // Handle Scroll Indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Micro-interactions: Mouse move parallax effect for background spotlights and text
    const container = document.querySelector('.hero-container');
    if (container && window.innerWidth > 991) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);

            // Move the background giant text slightly
            const bgText = document.querySelector('.bg-text');
            if (bgText) {
                bgText.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px)`;
            }
        });

        // Reset positions when mouse leaves
        container.addEventListener('mouseleave', () => {
            const bgText = document.querySelector('.bg-text');
            if (bgText) {
                bgText.style.transform = 'translate(0px, 0px)';
                bgText.style.transition = 'transform 0.5s ease-out';
            }
        });
    }

    // Scroll Animations with Intersection Observer
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animationClass = el.getAttribute('data-animation') || 'fadeInUp';
                    const delay = el.getAttribute('data-delay') || '0s';
                    
                    el.style.animationDelay = delay;
                    el.classList.add('animated', animationClass);
                    
                    // Unobserve after animating once
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });
        
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    } else {
        // Fallback if IntersectionObserver not supported
        animatedElements.forEach(el => {
            el.classList.add('animated', el.getAttribute('data-animation') || 'fadeInUp');
        });
    }

    // Left Slideshow Automation (Switch every 2s, pause on hover)
    const leftSlideshow = document.getElementById('about-left-slideshow');
    if (leftSlideshow) {
        const slides = leftSlideshow.querySelectorAll('.left-slide');
        let currentSlide = 0;
        let isPaused = false;

        const nextSlide = () => {
            if (isPaused) return;
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        let slideshowInterval = setInterval(nextSlide, 2000);

        leftSlideshow.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        leftSlideshow.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    }

    // Right Slider Automation (Seamless sliding loop)
    const sliderWrapper = document.getElementById('about-right-slider-wrapper');
    if (sliderWrapper) {
        const rightSlides = sliderWrapper.querySelectorAll('.right-slide');
        const slidesCount = rightSlides.length;
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slidesCount;
           sliderWrapper.style.transform = `translateX(-${currentIndex * 25}%)`;
        }, 3000);
    }

    // Product Slider (Left/Right arrow clicking, slides one-by-one)
    const productTrack = document.getElementById('product-track');
    const productPrev = document.getElementById('product-prev');
    const productNext = document.getElementById('product-next');

    if (productTrack && productPrev && productNext) {
        let scrollPosition = 0;
        
        const getCardWidth = () => {
            const card = productTrack.querySelector('.product-card');
            if (!card) return 0;
            const gap = 24; // matches stylesheet gap
            return card.offsetWidth + gap;
        };

        productNext.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            const maxScroll = productTrack.scrollWidth - productTrack.offsetWidth;
            scrollPosition = Math.min(scrollPosition + cardWidth, maxScroll);
            productTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });

        productPrev.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            scrollPosition = Math.max(scrollPosition - cardWidth, 0);
            productTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });

        window.addEventListener('resize', () => {
            scrollPosition = 0;
            productTrack.style.transform = 'translateX(0px)';
        });
    }

    // Testimonials slider (auto loop, pause on hover, dots interactive)
    const testSection = document.getElementById('testimonials-section-container');
    const testSlider = document.getElementById('testimonials-slider');
    const testDots = document.getElementById('testimonial-dots');

    if (testSlider && testDots && testSection) {
        const slides = testSlider.querySelectorAll('.testimonial-slide');
        const dots = testDots.querySelectorAll('.dot');
        let currentTest = 0;
        let isTestPaused = false;

        const showTestimonial = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            currentTest = index;
            slides[currentTest].classList.add('active');
            dots[currentTest].classList.add('active');
        };

        const nextTestimonial = () => {
            if (isTestPaused) return;
            const nextIdx = (currentTest + 1) % slides.length;
            showTestimonial(nextIdx);
        };

        let testimonialInterval = setInterval(nextTestimonial, 4000);

        testSection.addEventListener('mouseenter', () => {
            isTestPaused = true;
        });

        testSection.addEventListener('mouseleave', () => {
            isTestPaused = false;
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'));
                showTestimonial(idx);
            });
        });
    }

    // FAQ Accordion (if one is open, others should close)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle-icon i');

        // Initialize active item height on page load
        if (item.classList.contains('active') && answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }

        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-toggle-icon i');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0px';
                    }
                    if (otherIcon) {
                        otherIcon.className = 'fa-solid fa-plus';
                    }
                });

                // If the clicked item was not active, open it
                if (!isActive) {
                    item.classList.add('active');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                    if (icon) {
                        icon.className = 'fa-solid fa-minus';
                    }
                }
            });
        }
    });

    // Scroll To Top Button Click
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Floating Sidebar Visibility on Scroll and smooth scrolling
    const floatingSidebar = document.getElementById('floating-sidebar');
    if (floatingSidebar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                floatingSidebar.classList.add('visible');
            } else {
                floatingSidebar.classList.remove('visible');
            }
        });

        const sidebarItems = floatingSidebar.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSelector = item.getAttribute('data-target');
                const targetElement = document.querySelector(targetSelector);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
});
