/* ============================================
   📚 STUDYHUB PROMOTIONAL WEBSITE
   ⚡ JAVASCRIPT - PART 1 OF 2
   ============================================
   
   TABLE OF CONTENTS:
   ------------------
   1. Configuration & Constants
   2. DOM Element References
   3. State Management
   4. Utility Functions
   5. Preloader
   6. Navbar & Navigation
   7. Mobile Menu
   8. Typing Animation
   9. Counter Animation
   10. Smooth Scrolling
   11. Back to Top Button
   12. Floating Social Buttons
   13. Cookie Consent
   
   ============================================ */

'use strict';

/* ============================================
   1. CONFIGURATION & CONSTANTS
   ============================================ */
const CONFIG = {
    // App URLs - Replace with your actual URLs
    appUrl: 'https://ranvircmd.github.io/javasourcecode',
    portfolioUrl: 'https://i-m-er-abhi.vercel.app',
    
    // Social Links - Replace with your actual links
    social: {
        whatsapp: 'https://wa.me/91987654?text=Hi! I have a question about StudyHub',
        telegram: 'https://t.me/er_abhii',
        discord: 'https://i-m-er-abhi.vercel.app',
        github: 'https://github.com/erabhishek12',
        twitter: 'https://i-m-er-abhi.vercel.app',
        linkedin: 'https://i-m-er-abhi.vercel.app',
        instagram: 'https://instagram.com/naturelensbyabhi',
        youtube: 'https://i-m-er-abhi.vercel.app'
    },
    
    // Donation Links - Replace with your actual links
    donation: {
        buyMeACoffee: 'https://www.buymeacoffee.com/im_er_abhishek',
        kofi: 'https://www.buymeacoffee.com/im_er_abhishek',
        paypal: 'https://www.buymeacoffee.com/im_er_abhishek',
        upiId: '9546983729@fam'
    },
    
    // Form Endpoints - Replace with your actual endpoints
    forms: {
        newsletter: 'https://formspree.io/f/your-form-id',
        contact: 'https://formspree.io/f/your-form-id',
        requestMaterial: 'https://docs.google.com/forms/d/e/1FAIpQLSeE2QjRDeyfPm3CXezjlMPuzfE-nPhquPiPU_mPp2lfK8Vuww/viewform'
    },
    
    // ==================== VIDEO DEMO PLAYER ====================

document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  const videoThumbnail = document.getElementById("videoThumbnail");
  const videoIframe = document.getElementById("videoIframe");

  if (!playButton || !videoThumbnail || !videoIframe) return;

  const YT_VIDEO_ID = "UB_x2BTmlCk";

  playButton.addEventListener("click", () => {
    // Hide thumbnail
    videoThumbnail.style.display = "none";

    // Inject iframe
    videoIframe.innerHTML = `
      <iframe 
        width="100%" 
        height="100%"
        src="https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1"
        title="StudyHub Demo Video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
  });
});


/* ============================================
   2. DOM ELEMENT REFERENCES
   ============================================ */
const DOM = {
    // Preloader
    preloader: document.getElementById('preloader'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    loadingTip: document.getElementById('loadingTip'),
    
    // Navbar
    navbar: document.getElementById('navbar'),
    navLinks: document.querySelectorAll('.nav-link'),
    themeToggle: document.getElementById('themeToggle'),
    
    // Mobile Menu
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    mobileMenu: document.getElementById('mobileMenu'),
    mobileMenuClose: document.getElementById('mobileMenuClose'),
    mobileNavLinks: document.querySelectorAll('.mobile-nav-links a'),
    
    // Hero
    typingText: document.getElementById('typingText'),
    heroParticles: document.getElementById('heroParticles'),
    
    // Buttons
    launchAppBtns: document.querySelectorAll('#heroLaunchBtn, #launchAppBtn, #mobileLaunchBtn, #ctaLaunchBtn'),
    installAppBtns: document.querySelectorAll('#heroInstallBtn, #mobileInstallBtn, #ctaInstallBtn'),
    
    // Floating Elements
    floatingSocial: document.getElementById('floatingSocial'),
    floatingToggle: document.getElementById('floatingToggle'),
    backToTop: document.getElementById('backToTop'),
    
    // Cookie Consent
    cookieConsent: document.getElementById('cookieConsent'),
    cookieAccept: document.getElementById('cookieAccept'),
    cookieSettings: document.getElementById('cookieSettings'),
    
    // Video
    videoThumbnail: document.getElementById('videoThumbnail'),
    videoIframe: document.getElementById('videoIframe'),
    playButton: document.getElementById('playButton'),
    
    // FAQ
    faqItems: document.querySelectorAll('.faq-item'),
    
    // Forms
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterEmail: document.getElementById('newsletterEmail'),
    contactForm: document.getElementById('contactForm'),
    
    // QR Code
    qrCode: document.getElementById('qrCode'),
    downloadQR: document.getElementById('downloadQR'),
    copyLink: document.getElementById('copyLink'),
    copyUPI: document.getElementById('copyUPI'),
    
    // Counters
    statNumbers: document.querySelectorAll('.stat-number'),
    resourceCounts: document.querySelectorAll('.resource-count .count'),
    
    // Toast Container
    toastContainer: document.getElementById('toastContainer'),
    
    // Sections for scroll spy
    sections: document.querySelectorAll('section[id]')
};

/* ============================================
   3. STATE MANAGEMENT
   ============================================ */
const State = {
    isMenuOpen: false,
    isFloatingOpen: false,
    isVideoPlaying: false,
    hasScrolled: false,
    currentSection: 'home',
    typingIndex: 0,
    charIndex: 0,
    isDeleting: false,
    countersAnimated: false,
    deferredPrompt: null,
    isOnline: navigator.onLine
};

/* ============================================
   4. UTILITY FUNCTIONS
   ============================================ */
const Utils = {
    /**
     * Debounce function to limit function calls
     */
    debounce(func, wait = 100) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Throttle function to limit function calls
     */
    throttle(func, limit = 100) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Check if element is in viewport
     */
    isInViewport(element, offset = 0) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    },
    
    /**
     * Get random item from array
     */
    randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    
    /**
     * Format number with commas
     */
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    /**
     * Sleep function for async/await
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * Copy text to clipboard
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (e) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    },
    
    /**
     * Get/Set Local Storage
     */
    storage: {
        get(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                return null;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                return false;
            }
        },
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                return false;
            }
        }
    },
    
    /**
     * Validate email format
     */
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    /**
     * Generate unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    /**
     * Smooth scroll to element
     */
    scrollTo(target, offset = 80) {
        const element = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
        
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
    },
    
    /**
     * Add animation class and remove after animation ends
     */
    animate(element, animationClass, duration = 500) {
        return new Promise(resolve => {
            element.classList.add(animationClass);
            setTimeout(() => {
                element.classList.remove(animationClass);
                resolve();
            }, duration);
        });
    }
};

/* ============================================
   5. PRELOADER
   ============================================ */
const Preloader = {
    progress: 0,
    tips: [
        '📖 Preparing your study materials...',
        '🎬 Loading video lectures...',
        '📝 Fetching previous year questions...',
        '💻 Setting up tutorials...',
        '🛠️ Initializing study tools...',
        '✨ Almost ready...'
    ],
    
    init() {
        this.simulateProgress();
    },
    
    async simulateProgress() {
        const startTime = Date.now();
        const minDuration = CONFIG.preloaderMinDuration;
        
        // Simulate loading progress
        while (this.progress < 100) {
            // Random increment between 5-15
            const increment = Math.floor(Math.random() * 10) + 5;
            this.progress = Math.min(this.progress + increment, 100);
            
            this.updateUI();
            
            // Random delay between 50-150ms
            await Utils.sleep(Math.floor(Math.random() * 100) + 50);
        }
        
        // Ensure minimum duration
        const elapsed = Date.now() - startTime;
        if (elapsed < minDuration) {
            await Utils.sleep(minDuration - elapsed);
        }
        
        // Hide preloader
        this.hide();
    },
    
    updateUI() {
        if (DOM.progressFill) {
            DOM.progressFill.style.width = `${this.progress}%`;
        }
        
        if (DOM.progressText) {
            DOM.progressText.textContent = `Loading... ${this.progress}%`;
        }
        
        // Update tip at certain milestones
        if (DOM.loadingTip) {
            const tipIndex = Math.floor((this.progress / 100) * this.tips.length);
            DOM.loadingTip.textContent = this.tips[Math.min(tipIndex, this.tips.length - 1)];
        }
    },
    
    hide() {
        if (DOM.preloader) {
            DOM.preloader.classList.add('hidden');
            
            // Remove from DOM after animation
            setTimeout(() => {
                DOM.preloader.style.display = 'none';
            }, 500);
        }
        
        // Trigger entrance animations
        document.body.classList.add('loaded');
        
        // Initialize AOS after preloader
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                disable: 'mobile'
            });
        }
    }
};

/* ============================================
   6. NAVBAR & NAVIGATION
   ============================================ */
const Navbar = {
    init() {
        this.bindEvents();
        this.handleScroll();
    },
    
    bindEvents() {
        // Scroll event
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
            this.updateActiveLink();
        }, 100));
        
        // Nav link clicks
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
    },
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > CONFIG.scrollThreshold) {
            DOM.navbar?.classList.add('scrolled');
            State.hasScrolled = true;
        } else {
            DOM.navbar?.classList.remove('scrolled');
            State.hasScrolled = false;
        }
    },
    
    handleNavClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            Utils.scrollTo(href);
            
            // Close mobile menu if open
            if (State.isMenuOpen) {
                MobileMenu.close();
            }
        }
    },
    
    updateActiveLink() {
        let current = 'home';
        
        DOM.sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        if (current !== State.currentSection) {
            State.currentSection = current;
            
            DOM.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    }
};

/* ============================================
   7. MOBILE MENU
   ============================================ */
const MobileMenu = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        // Toggle button
        DOM.mobileMenuToggle?.addEventListener('click', () => this.toggle());
        
        // Close button
        DOM.mobileMenuClose?.addEventListener('click', () => this.close());
        
        // Mobile nav links
        DOM.mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.close();
                    setTimeout(() => Utils.scrollTo(href), 300);
                }
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && State.isMenuOpen) {
                this.close();
            }
        });
        
        // Close on outside click
        DOM.mobileMenu?.addEventListener('click', (e) => {
            if (e.target === DOM.mobileMenu) {
                this.close();
            }
        });
    },
    
    toggle() {
        State.isMenuOpen ? this.close() : this.open();
    },
    
    open() {
        State.isMenuOpen = true;
        DOM.mobileMenu?.classList.add('active');
        DOM.mobileMenuToggle?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger to X
        this.animateHamburger(true);
    },
    
    close() {
        State.isMenuOpen = false;
        DOM.mobileMenu?.classList.remove('active');
        DOM.mobileMenuToggle?.classList.remove('active');
        document.body.style.overflow = '';
        
        // Animate X to hamburger
        this.animateHamburger(false);
    },
    
    animateHamburger(isOpen) {
        const lines = DOM.mobileMenuToggle?.querySelectorAll('.hamburger-line');
        if (!lines) return;
        
        if (isOpen) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = '';
            lines[1].style.opacity = '';
            lines[2].style.transform = '';
        }
    }
};

/* ============================================
   8. TYPING ANIMATION
   ============================================ */
const TypingAnimation = {
    init() {
        if (!DOM.typingText) return;
        this.type();
    },
    
    type() {
        const currentWord = CONFIG.typingWords[State.typingIndex];
        
        if (State.isDeleting) {
            // Deleting characters
            State.charIndex--;
            DOM.typingText.textContent = currentWord.substring(0, State.charIndex);
            
            if (State.charIndex === 0) {
                State.isDeleting = false;
                State.typingIndex = (State.typingIndex + 1) % CONFIG.typingWords.length;
                setTimeout(() => this.type(), 500);
                return;
            }
        } else {
            // Typing characters
            State.charIndex++;
            DOM.typingText.textContent = currentWord.substring(0, State.charIndex);
            
            if (State.charIndex === currentWord.length) {
                State.isDeleting = true;
                setTimeout(() => this.type(), CONFIG.pauseDuration);
                return;
            }
        }
        
        const speed = State.isDeleting ? CONFIG.deletingSpeed : CONFIG.typingSpeed;
        setTimeout(() => this.type(), speed);
    }
};

/* ============================================
   9. COUNTER ANIMATION
   ============================================ */
const CounterAnimation = {
    init() {
        this.observeCounters();
    },
    
    observeCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    this.animateCounter(entry.target);
                    entry.target.dataset.animated = 'true';
                }
            });
        }, { threshold: 0.5 });
        
        // Observe stat numbers
        DOM.statNumbers.forEach(counter => observer.observe(counter));
        
        // Observe resource counts
        DOM.resourceCounts.forEach(counter => observer.observe(counter));
    },
    
    animateCounter(element) {
        const target = parseFloat(element.dataset.count);
        const isDecimal = element.dataset.decimal === 'true';
        const duration = CONFIG.counterDuration;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-cubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            let current = target * easeProgress;
            
            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Utils.formatNumber(Math.floor(current));
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Final value
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    element.textContent = Utils.formatNumber(target);
                }
            }
        };
        
        requestAnimationFrame(animate);
    }
};

/* ============================================
   10. SMOOTH SCROLLING
   ============================================ */
const SmoothScroll = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        // All anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip if it's just "#" or empty
                if (href === '#' || href === '') return;
                
                e.preventDefault();
                Utils.scrollTo(href);
            });
        });
    }
};

/* ============================================
   11. BACK TO TOP BUTTON
   ============================================ */
const BackToTop = {
    init() {
        this.bindEvents();
        this.checkVisibility();
    },
    
    bindEvents() {
        // Click event
        DOM.backToTop?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Scroll event for visibility
        window.addEventListener('scroll', Utils.throttle(() => {
            this.checkVisibility();
        }, 100));
    },
    
    checkVisibility() {
        if (!DOM.backToTop) return;
        
        if (window.scrollY > 500) {
            DOM.backToTop.classList.add('visible');
        } else {
            DOM.backToTop.classList.remove('visible');
        }
    }
};

/* ============================================
   12. FLOATING SOCIAL BUTTONS
   ============================================ */
const FloatingSocial = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        DOM.floatingToggle?.addEventListener('click', () => this.toggle());
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (State.isFloatingOpen && 
                !DOM.floatingSocial?.contains(e.target)) {
                this.close();
            }
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && State.isFloatingOpen) {
                this.close();
            }
        });
    },
    
    toggle() {
        State.isFloatingOpen ? this.close() : this.open();
    },
    
    open() {
        State.isFloatingOpen = true;
        DOM.floatingSocial?.classList.add('active');
    },
    
    close() {
        State.isFloatingOpen = false;
        DOM.floatingSocial?.classList.remove('active');
    }
};

/* ============================================
   13. COOKIE CONSENT
   ============================================ */
const CookieConsent = {
    init() {
        this.checkConsent();
        this.bindEvents();
    },
    
    checkConsent() {
        const hasConsent = Utils.storage.get(CONFIG.storageKeys.cookieConsent);
        
        if (!hasConsent) {
            // Show cookie banner after a delay
            setTimeout(() => {
                this.show();
            }, 2000);
        }
    },
    
    bindEvents() {
        DOM.cookieAccept?.addEventListener('click', () => {
            this.accept();
        });
        
        DOM.cookieSettings?.addEventListener('click', () => {
            this.openSettings();
        });
    },
    
    show() {
        DOM.cookieConsent?.classList.add('show');
    },
    
    hide() {
        DOM.cookieConsent?.classList.remove('show');
        
        setTimeout(() => {
            DOM.cookieConsent?.classList.add('hidden');
        }, 500);
    },
    
    accept() {
        Utils.storage.set(CONFIG.storageKeys.cookieConsent, {
            accepted: true,
            timestamp: Date.now()
        });
        
        this.hide();
        Toast.show('success', 'Preferences Saved', 'Thank you for accepting cookies!');
    },
    
    openSettings() {
        // For now, just accept all
        // In a real app, you'd open a modal with cookie preferences
        Toast.show('info', 'Cookie Settings', 'Cookie customization coming soon!');
    }
};

/* ============================================
   CONSOLE WELCOME MESSAGE
   ============================================ */
const ConsoleWelcome = {
    init() {
        console.log(
            '%c📚 StudyHub',
            'font-size: 40px; font-weight: bold; color: #6C63FF; text-shadow: 2px 2px 0 #764ba2;'
        );
        console.log(
            '%cYour Ultimate Study Companion',
            'font-size: 16px; color: #888;'
        );
        console.log(
            '%c🚀 Built with ❤️ by Abhishek',
            'font-size: 12px; color: #666;'
        );
        console.log(
            '%c🔗 Portfolio: https://i-m-er-abhi.vercel.app',
            'font-size: 12px; color: #6C63FF;'
        );
        console.log(
            '%c⚠️ This is a browser feature for developers. If someone told you to paste something here, it could be a scam!',
            'font-size: 14px; color: #FF6B6B; font-weight: bold;'
        );
    }
};

/* ============================================
   📚 STUDYHUB PROMOTIONAL WEBSITE
   ⚡ JAVASCRIPT - PART 2 OF 2
   ============================================
   
   TABLE OF CONTENTS:
   ------------------
   14. Toast Notifications
   15. FAQ Accordion
   16. Video Player
   17. QR Code Generator
   18. Form Handling
   19. Copy Functions
   20. Theme Toggle
   21. PWA Install Prompt
   22. App Launch Handler
   23. Particles Animation
   24. Online/Offline Detection
   25. Scroll Animations
   26. Parallax Effects
   27. Easter Eggs
   28. Analytics (Optional)
   29. Error Handling
   30. Main Initialization
   
   ============================================ */

/* ============================================
   14. TOAST NOTIFICATIONS
   ============================================ */
const Toast = {
    queue: [],
    isShowing: false,
    
    /**
     * Show a toast notification
     * @param {string} type - 'success', 'error', 'warning', 'info'
     * @param {string} title - Toast title
     * @param {string} message - Toast message
     * @param {number} duration - Duration in ms (optional)
     */
    show(type = 'info', title = '', message = '', duration = CONFIG.toastDuration) {
        const toast = this.create(type, title, message);
        
        if (!DOM.toastContainer) {
            console.warn('Toast container not found');
            return;
        }
        
        // Add to container
        DOM.toastContainer.appendChild(toast);
        
        // Trigger reflow for animation
        toast.offsetHeight;
        
        // Auto remove after duration
        const timeoutId = setTimeout(() => {
            this.remove(toast);
        }, duration);
        
        // Store timeout ID for manual removal
        toast.dataset.timeoutId = timeoutId;
        
        return toast;
    },
    
    create(type, title, message) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${this.getIcon(type)}"></i>
            </div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            <button class="toast-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Close button event
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn?.addEventListener('click', () => this.remove(toast));
        
        return toast;
    },
    
    getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    },
    
    remove(toast) {
        if (!toast || !toast.parentNode) return;
        
        // Clear timeout
        const timeoutId = toast.dataset.timeoutId;
        if (timeoutId) {
            clearTimeout(parseInt(timeoutId));
        }
        
        // Add hiding animation
        toast.classList.add('hiding');
        
        // Remove after animation
        setTimeout(() => {
            toast.remove();
        }, 300);
    },
    
    // Convenience methods
    success(title, message) {
        return this.show('success', title, message);
    },
    
    error(title, message) {
        return this.show('error', title, message);
    },
    
    warning(title, message) {
        return this.show('warning', title, message);
    },
    
    info(title, message) {
        return this.show('info', title, message);
    },
    
    // Clear all toasts
    clearAll() {
        const toasts = DOM.toastContainer?.querySelectorAll('.toast');
        toasts?.forEach(toast => this.remove(toast));
    }
};

/* ============================================
   15. FAQ ACCORDION
   ============================================ */
const FAQAccordion = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        DOM.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question?.addEventListener('click', () => {
                this.toggle(item);
            });
            
            // Keyboard accessibility
            question?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggle(item);
                }
            });
        });
    },
    
    toggle(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other items (accordion behavior)
        DOM.faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active', !isActive);
    },
    
    openItem(index) {
        const item = DOM.faqItems[index];
        if (item) {
            this.toggle(item);
            Utils.scrollTo(item, 100);
        }
    },
    
    closeAll() {
        DOM.faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
};

/* ============================================
   16. VIDEO PLAYER
   ============================================ */
const VideoPlayer = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        DOM.playButton?.addEventListener('click', () => this.play());
        DOM.videoThumbnail?.addEventListener('click', () => this.play());
    },
    
    play() {
        if (State.isVideoPlaying) return;
        
        State.isVideoPlaying = true;
        
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${CONFIG.videoId}?autoplay=1&rel=0&modestbranding=1`;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        // Add iframe to container
        if (DOM.videoIframe) {
            DOM.videoIframe.innerHTML = '';
            DOM.videoIframe.appendChild(iframe);
            DOM.videoIframe.classList.add('active');
        }
        
        // Hide thumbnail
        if (DOM.videoThumbnail) {
            DOM.videoThumbnail.style.display = 'none';
        }
    },
    
    stop() {
        State.isVideoPlaying = false;
        
        if (DOM.videoIframe) {
            DOM.videoIframe.innerHTML = '';
            DOM.videoIframe.classList.remove('active');
        }
        
        if (DOM.videoThumbnail) {
            DOM.videoThumbnail.style.display = '';
        }
    }
};

/* ============================================
   17. QR CODE GENERATOR
   ============================================ */
const QRCodeGenerator = {
    qrInstance: null,
    
    init() {
        this.generate();
        this.bindEvents();
    },
    
    generate() {
        if (!DOM.qrCode) return;
        
        // Clear placeholder
        DOM.qrCode.innerHTML = '';
        
        // Check if QRCode library is available
        if (typeof QRCode !== 'undefined') {
            try {
                // Create canvas for QR code
                const canvas = document.createElement('canvas');
                DOM.qrCode.appendChild(canvas);
                
                QRCode.toCanvas(canvas, CONFIG.appUrl, {
                    width: 180,
                    margin: 2,
                    color: {
                        dark: '#6C63FF',
                        light: '#FFFFFF'
                    }
                }, (error) => {
                    if (error) {
                        console.error('QR Code generation failed:', error);
                        this.showFallback();
                    }
                });
            } catch (e) {
                console.error('QR Code error:', e);
                this.showFallback();
            }
        } else {
            // Fallback if library not loaded
            this.showFallback();
        }
    },
    
    showFallback() {
        if (DOM.qrCode) {
            DOM.qrCode.innerHTML = `
                <div class="qr-placeholder">
                    <i class="fas fa-qrcode"></i>
                </div>
            `;
        }
    },
    
    bindEvents() {
        // Download QR button
        DOM.downloadQR?.addEventListener('click', () => this.download());
        
        // Copy link button
        DOM.copyLink?.addEventListener('click', () => this.copyLink());
    },
    
    async download() {
        const canvas = DOM.qrCode?.querySelector('canvas');
        
        if (canvas) {
            try {
                const link = document.createElement('a');
                link.download = 'studyhub-qr-code.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                Toast.success('Downloaded!', 'QR code saved to your device');
            } catch (e) {
                Toast.error('Download Failed', 'Unable to download QR code');
            }
        } else {
            Toast.warning('Not Available', 'QR code not generated yet');
        }
    },
    
    async copyLink() {
        const success = await Utils.copyToClipboard(CONFIG.appUrl);
        
        if (success) {
            Toast.success('Copied!', 'App link copied to clipboard');
            
            // Update button text temporarily
            if (DOM.copyLink) {
                const originalHTML = DOM.copyLink.innerHTML;
                DOM.copyLink.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    DOM.copyLink.innerHTML = originalHTML;
                }, 2000);
            }
        } else {
            Toast.error('Copy Failed', 'Unable to copy link');
        }
    }
};

/* ============================================
   18. FORM HANDLING
   ============================================ */
const FormHandler = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        // Newsletter form
        DOM.newsletterForm?.addEventListener('submit', (e) => this.handleNewsletter(e));
        
        // Contact form
        DOM.contactForm?.addEventListener('submit', (e) => this.handleContact(e));
    },
    
    async handleNewsletter(e) {
        e.preventDefault();
        
        const email = DOM.newsletterEmail?.value?.trim();
        
        // Validation
        if (!email) {
            Toast.error('Error', 'Please enter your email address');
            return;
        }
        
        if (!Utils.isValidEmail(email)) {
            Toast.error('Invalid Email', 'Please enter a valid email address');
            return;
        }
        
        // Check if already subscribed
        if (Utils.storage.get(CONFIG.storageKeys.newsletter)) {
            Toast.info('Already Subscribed', 'You are already on our mailing list!');
            return;
        }
        
        // Show loading state
        const submitBtn = DOM.newsletterForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn?.innerHTML;
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Subscribing...</span>';
            submitBtn.disabled = true;
        }
        
        try {
            // Simulate API call (replace with actual API)
            await Utils.sleep(1500);
            
            // In production, send to your actual endpoint:
            // await fetch(CONFIG.forms.newsletter, {
            //     method: 'POST',
            //     body: JSON.stringify({ email }),
            //     headers: { 'Content-Type': 'application/json' }
            // });
            
            // Save to local storage
            Utils.storage.set(CONFIG.storageKeys.newsletter, {
                email,
                subscribedAt: Date.now()
            });
            
            // Clear form
            DOM.newsletterForm.reset();
            
            // Show success
            Toast.success('Subscribed! 🎉', 'Thank you for subscribing to our newsletter!');
            
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            Toast.error('Subscription Failed', 'Please try again later');
        } finally {
            // Restore button
            if (submitBtn) {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }
        }
    },
    
    async handleContact(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('contactName')?.value?.trim(),
            email: document.getElementById('contactEmail')?.value?.trim(),
            subject: document.getElementById('contactSubject')?.value,
            message: document.getElementById('contactMessage')?.value?.trim()
        };
        
        // Validation
        if (!formData.name) {
            Toast.error('Error', 'Please enter your name');
            return;
        }
        
        if (!formData.email || !Utils.isValidEmail(formData.email)) {
            Toast.error('Error', 'Please enter a valid email address');
            return;
        }
        
        if (!formData.subject) {
            Toast.error('Error', 'Please select a subject');
            return;
        }
        
        if (!formData.message || formData.message.length < 10) {
            Toast.error('Error', 'Please enter a message (at least 10 characters)');
            return;
        }
        
        // Show loading state
        const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn?.innerHTML;
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            submitBtn.disabled = true;
        }
        
        try {
            // Simulate API call (replace with actual API)
            await Utils.sleep(2000);
            
            // In production, send to your actual endpoint:
            // await fetch(CONFIG.forms.contact, {
            //     method: 'POST',
            //     body: JSON.stringify(formData),
            //     headers: { 'Content-Type': 'application/json' }
            // });
            
            // Clear form
            DOM.contactForm.reset();
            
            // Show success
            Toast.success('Message Sent! 📨', 'We\'ll get back to you within 24 hours.');
            
        } catch (error) {
            console.error('Contact form error:', error);
            Toast.error('Send Failed', 'Please try again or email us directly');
        } finally {
            // Restore button
            if (submitBtn) {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }
        }
    },
    
    // Validate form field in real-time
    validateField(input, validationFn, errorMessage) {
        const isValid = validationFn(input.value);
        
        if (!isValid) {
            input.classList.add('error');
            // You could show inline error message here
        } else {
            input.classList.remove('error');
        }
        
        return isValid;
    }
};

/* ============================================
   19. COPY FUNCTIONS
   ============================================ */
const CopyFunctions = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        // Copy UPI ID
        DOM.copyUPI?.addEventListener('click', () => this.copyUPI());
    },
    
    async copyUPI() {
        const success = await Utils.copyToClipboard(CONFIG.donation.upiId);
        
        if (success) {
            Toast.success('UPI ID Copied!', `${CONFIG.donation.upiId}`);
            
            // Update button text temporarily
            if (DOM.copyUPI) {
                const originalHTML = DOM.copyUPI.innerHTML;
                DOM.copyUPI.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    DOM.copyUPI.innerHTML = originalHTML;
                }, 2000);
            }
        } else {
            Toast.error('Copy Failed', 'Please copy manually: ' + CONFIG.donation.upiId);
        }
    },
    
    async copyText(text, successMessage = 'Copied to clipboard!') {
        const success = await Utils.copyToClipboard(text);
        
        if (success) {
            Toast.success('Copied!', successMessage);
        } else {
            Toast.error('Copy Failed', 'Unable to copy to clipboard');
        }
        
        return success;
    }
};

/* ============================================
   20. THEME TOGGLE
   ============================================ */
const ThemeToggle = {
    currentTheme: 'dark',
    
    init() {
        this.loadTheme();
        this.bindEvents();
    },
    
    loadTheme() {
        const savedTheme = Utils.storage.get(CONFIG.storageKeys.theme);
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                this.currentTheme = 'light';
            }
        }
        
        this.applyTheme();
    },
    
    bindEvents() {
        DOM.themeToggle?.addEventListener('click', () => this.toggle());
        
        // Listen for system theme changes
        window.matchMedia?.('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                if (!Utils.storage.get(CONFIG.storageKeys.theme)) {
                    this.currentTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
    },
    
    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        Utils.storage.set(CONFIG.storageKeys.theme, this.currentTheme);
        
        // Show toast
        const icon = this.currentTheme === 'dark' ? '🌙' : '☀️';
        Toast.info(`${icon} Theme Changed`, `Switched to ${this.currentTheme} mode`);
    },
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Update toggle button icon
        if (DOM.themeToggle) {
            const moonIcon = DOM.themeToggle.querySelector('.fa-moon');
            const sunIcon = DOM.themeToggle.querySelector('.fa-sun');
            
            if (this.currentTheme === 'dark') {
                moonIcon?.style.setProperty('display', 'block');
                sunIcon?.style.setProperty('display', 'none');
            } else {
                moonIcon?.style.setProperty('display', 'none');
                sunIcon?.style.setProperty('display', 'block');
            }
        }
    }
};

/* ============================================
   21. PWA INSTALL PROMPT
   ============================================ */
const PWAInstall = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        // Capture the install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            State.deferredPrompt = e;
            console.log('PWA install prompt captured');
        });
        
        // Bind install buttons
        DOM.installAppBtns.forEach(btn => {
            btn?.addEventListener('click', (e) => {
                e.preventDefault();
                this.promptInstall();
            });
        });
        
        // App installed event
        window.addEventListener('appinstalled', () => {
            State.deferredPrompt = null;
            Toast.success('App Installed! 🎉', 'StudyHub has been added to your home screen');
            console.log('PWA was installed');
        });
    },
    
    async promptInstall() {
        if (State.deferredPrompt) {
            // Show the install prompt
            State.deferredPrompt.prompt();
            
            // Wait for the user's response
            const { outcome } = await State.deferredPrompt.userChoice;
            
            console.log(`PWA install prompt outcome: ${outcome}`);
            
            if (outcome === 'accepted') {
                Toast.success('Installing...', 'Please wait while the app installs');
            }
            
            // Clear the prompt
            State.deferredPrompt = null;
        } else {
            // Show manual install instructions
            this.showManualInstructions();
        }
    },
    
    showManualInstructions() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        let message = '';
        
        if (isIOS) {
            message = 'Tap the Share button and select "Add to Home Screen"';
        } else if (isAndroid) {
            message = 'Tap the menu (⋮) and select "Add to Home Screen" or "Install App"';
        } else {
            message = 'Click the install icon in your browser\'s address bar, or visit the app directly on mobile';
        }
        
        Toast.info('Install StudyHub 📱', message, 6000);
    },
    
    // Check if app is running as PWA
    isPWA() {
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.navigator.standalone === true;
    }
};

/* ============================================
   22. APP LAUNCH HANDLER
   ============================================ */
const AppLauncher = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        DOM.launchAppBtns.forEach(btn => {
            btn?.addEventListener('click', (e) => {
                e.preventDefault();
                this.launchApp();
            });
        });
    },
    
    launchApp() {
    // 1. Check if the appUrl is empty or null
    if (!CONFIG.appUrl) {
        // If empty, show the "Coming Soon" message
        Toast.warning('Coming Soon! 🚀', 'The app URL is not configured yet. Stay tuned!');
        return;
    }

    // 2. Show loading toast
    Toast.info('Launching... 🚀', 'Opening StudyHub in a new tab');

    // 3. Open the URL
    setTimeout(() => {
        window.open(CONFIG.appUrl, '_blank');
    }, 500);
}
};

/* ============================================
   23. PARTICLES ANIMATION (Hero Background)
   ============================================ */
const ParticlesAnimation = {
    particles: [],
    canvas: null,
    ctx: null,
    animationId: null,
    
    init() {
        if (!DOM.heroParticles) return;
        
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.bindEvents();
    },
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        `;
        
        DOM.heroParticles.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    },
    
    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    },
    
    animate() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(108, 99, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    },
    
    drawConnections() {
        const maxDistance = 150;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    },
    
    resize() {
        if (!this.canvas) return;
        
        this.canvas.width = DOM.heroParticles.offsetWidth;
        this.canvas.height = DOM.heroParticles.offsetHeight;
    },
    
    bindEvents() {
        window.addEventListener('resize', Utils.debounce(() => {
            this.resize();
        }, 250));
        
        // Pause when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    },
    
    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    },
    
    resume() {
        if (!this.animationId) {
            this.animate();
        }
    },
    
    destroy() {
        this.pause();
        this.particles = [];
        if (this.canvas) {
            this.canvas.remove();
        }
    }
};

/* ============================================
   24. ONLINE/OFFLINE DETECTION
   ============================================ */
const NetworkStatus = {
    init() {
        this.bindEvents();
        this.checkStatus();
    },
    
    bindEvents() {
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    },
    
    checkStatus() {
        State.isOnline = navigator.onLine;
        
        if (!State.isOnline) {
            this.handleOffline();
        }
    },
    
    handleOnline() {
        State.isOnline = true;
        Toast.success('Back Online! 🌐', 'Your internet connection has been restored');
        document.body.classList.remove('offline');
    },
    
    handleOffline() {
        State.isOnline = false;
        Toast.warning('You\'re Offline 📡', 'Some features may not be available', 6000);
        document.body.classList.add('offline');
    }
};

/* ============================================
   25. SCROLL ANIMATIONS
   ============================================ */
const ScrollAnimations = {
    init() {
        this.initParallax();
        this.initReveal();
    },
    
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', Utils.throttle(() => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
    },
    
    initReveal() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        if (revealElements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => observer.observe(el));
    }
};

/* ============================================
   26. PARALLAX EFFECTS (Mouse Movement)
   ============================================ */
const MouseParallax = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        // Only on desktop
        if (window.innerWidth < 992) return;
        
        document.addEventListener('mousemove', Utils.throttle((e) => {
            this.handleMouseMove(e);
        }, 16));
    },
    
    handleMouseMove(e) {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        if (floatingCards.length === 0) return;
        
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        
        floatingCards.forEach((card, index) => {
            const speed = (index + 1) * 15;
            const xOffset = x * speed;
            const yOffset = y * speed;
            
            card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    }
};

/* ============================================
   27. EASTER EGGS
   ============================================ */
const EasterEggs = {
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    konamiIndex: 0,
    
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        // Konami code
        document.addEventListener('keydown', (e) => {
            if (e.key === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activateKonami();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
        
        // Logo click counter
        let logoClicks = 0;
        const logo = document.querySelector('.nav-logo');
        
        logo?.addEventListener('click', () => {
            logoClicks++;
            
            if (logoClicks === 5) {
                this.showDeveloperMessage();
                logoClicks = 0;
            }
            
            // Reset after 2 seconds
            setTimeout(() => {
                logoClicks = 0;
            }, 2000);
        });
    },
    
    activateKonami() {
        Toast.success('🎮 Konami Code Activated!', 'You found a secret! Here\'s a virtual high five ✋');
        
        // Add fun animation
        document.body.style.animation = 'rainbow 1s linear';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1000);
        
        // Add rainbow animation to stylesheet
        if (!document.getElementById('easter-egg-styles')) {
            const style = document.createElement('style');
            style.id = 'easter-egg-styles';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    showDeveloperMessage() {
        Toast.info('👋 Hey there!', 'Thanks for exploring! Built with ❤️ by Abhishek', 5000);
    }
};

/* ============================================
   28. ANALYTICS (Optional)
   ============================================ */
const Analytics = {
    init() {
        // Initialize analytics if configured
        // This is a placeholder for actual analytics implementation
        this.trackPageView();
        this.bindEvents();
    },
    
    bindEvents() {
        // Track button clicks
        document.querySelectorAll('[data-track]').forEach(el => {
            el.addEventListener('click', () => {
                const eventName = el.dataset.track;
                this.trackEvent('click', eventName);
            });
        });
    },
    
    trackPageView() {
        console.log('📊 Analytics: Page view tracked');
        // In production: 
        // gtag('event', 'page_view', { page_path: window.location.pathname });
    },
    
    trackEvent(category, action, label = '') {
        console.log(`📊 Analytics: ${category} - ${action} ${label}`);
        // In production:
        // gtag('event', action, { event_category: category, event_label: label });
    }
};

/* ============================================
   29. ERROR HANDLING
   ============================================ */
const ErrorHandler = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            // Don't show toast for every error, just log
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    },
    
    handle(error, context = '') {
        console.error(`Error in ${context}:`, error);
        
        // Show user-friendly message for critical errors
        if (context) {
            Toast.error('Oops!', `Something went wrong. Please try again.`);
        }
    }
};

/* ============================================
   30. MAIN INITIALIZATION
   ============================================ */
const App = {
    async init() {
        try {
            console.log('🚀 Initializing StudyHub Promotional Website...');
            
            // Initialize error handling first
            ErrorHandler.init();
            
            // Console welcome message
            ConsoleWelcome.init();
            
            // Initialize preloader
            Preloader.init();
            
            // Initialize core modules
            Navbar.init();
            MobileMenu.init();
            SmoothScroll.init();
            BackToTop.init();
            FloatingSocial.init();
            
            // Initialize animations
            TypingAnimation.init();
            CounterAnimation.init();
            ParticlesAnimation.init();
            ScrollAnimations.init();
            MouseParallax.init();
            
            // Initialize interactive components
            FAQAccordion.init();
            VideoPlayer.init();
            QRCodeGenerator.init();
            
            // Initialize forms
            FormHandler.init();
            CopyFunctions.init();
            
            // Initialize utilities
            CookieConsent.init();
            ThemeToggle.init();
            NetworkStatus.init();
            
            // Initialize PWA features
            PWAInstall.init();
            AppLauncher.init();
            
            // Initialize fun stuff
            EasterEggs.init();
            
            // Initialize analytics (if configured)
            Analytics.init();
            
            console.log('✅ StudyHub Promotional Website initialized successfully!');
            
        } catch (error) {
            console.error('❌ Initialization error:', error);
            ErrorHandler.handle(error, 'App initialization');
        }
    }
};

/* ============================================
   DOCUMENT READY & START
   ============================================ */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

/* ============================================
   EXPORT FOR MODULE USE (Optional)
   ============================================ */
// If using ES modules, uncomment below:
// export { App, Toast, Utils, CONFIG };

/* ============================================
   GLOBAL ACCESS (For debugging)
   ============================================ */
window.StudyHub = {
    App,
    Toast,
    Utils,
    CONFIG,
    State,
    // Expose useful methods
    showToast: Toast.show.bind(Toast),
    copyToClipboard: Utils.copyToClipboard,
    scrollTo: Utils.scrollTo
};
