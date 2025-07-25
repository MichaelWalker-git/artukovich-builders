// Artukovich Builders - Custom Home Builder Website JavaScript
// Montana Custom Home Builder Landing Page

class ArtukovichWebsite {
  constructor() {
    this.mobileMenuOpen = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupFormHandling();
    this.setupMobileNavigation();
    this.setupScrollToTop();
    this.setupContactForm();
    this.setupAnalytics();
  }

  setupEventListeners() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.handlePageLoad();
    });

    // Handle scroll events
    window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));

    // Handle resize events
    window.addEventListener('resize', this.throttle(() => this.handleResize(), 100));
  }

  handlePageLoad() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize lazy loading for images
    this.setupLazyLoading();
    
    // Setup smooth scrolling for navigation links
    this.setupSmoothScrolling();
    
    // Initialize intersection observer for animations
    this.setupScrollAnimations();
  }

  setupScrollEffects() {
    // Initialize scroll effect variables
    this.lastScrollY = window.scrollY;
  }

  handleScroll() {
    const header = document.querySelector('.header');
    const currentScrollY = window.scrollY;
    
    // Header background opacity based on scroll
    if (currentScrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Hide/show header based on scroll direction
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      if (header) header.style.transform = 'translateY(-100%)';
    } else {
      if (header) header.style.transform = 'translateY(0)';
    }

    this.lastScrollY = currentScrollY;
  }

  setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      // Close menu when clicking nav links
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.mobileMenuOpen && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
    }
  }

  toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    navMenu.classList.toggle('active', this.mobileMenuOpen);
    navToggle.classList.toggle('active', this.mobileMenuOpen);
    document.body.classList.toggle('menu-open', this.mobileMenuOpen);
  }

  closeMobileMenu() {
    if (this.mobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      '.service-card, .portfolio-item, .process-step, .expertise-item, .hero-features .feature'
    );
    
    animateElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
      });
    }
  }

  setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
      
      // Real-time form validation
      const formFields = contactForm.querySelectorAll('input, select, textarea');
      formFields.forEach(field => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => this.clearFieldError(field));
      });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate all fields
    const isValid = this.validateForm(form);
    
    if (!isValid) {
      this.showFormMessage('Please correct the errors above.', 'error');
      return;
    }

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    this.submitContactForm(formData)
      .then(() => {
        this.showFormMessage('Thank you! We\'ll contact you within 24 hours to discuss your project.', 'success');
        form.reset();
        this.trackFormSubmission();
      })
      .catch(() => {
        this.showFormMessage('Sorry, there was an error sending your message. Please try again or call us directly.', 'error');
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  }

  async submitContactForm(formData) {
    // Replace this with your actual form submission logic
    // This could be a call to your backend API, email service, or form handler
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful submission
        Math.random() > 0.1 ? resolve() : reject();
      }, 2000);
    });
  }

  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      errorMessage = 'This field is required.';
      isValid = false;
    }
    
    // Email validation
    else if (fieldType === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address.';
        isValid = false;
      }
    }
    
    // Phone validation
    else if (fieldType === 'tel' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = value.replace(/[\s\-\(\)\.]/g, '');
      if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
        errorMessage = 'Please enter a valid phone number.';
        isValid = false;
      }
    }

    // Show/hide error message
    if (isValid) {
      this.clearFieldError(field);
    } else {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    
    field.classList.add('error');
    const errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    
    field.parentNode.appendChild(errorEl);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
  }

  showFormMessage(message, type = 'info') {
    const form = document.querySelector('.contact-form');
    const existingMessage = form.querySelector('.form-message');
    
    // Remove existing message
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    form.insertBefore(messageEl, form.firstChild);
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        messageEl.remove();
      }, 5000);
    }
  }

  setupScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.title = 'Back to top';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Show/hide based on scroll position
    window.addEventListener('scroll', this.throttle(() => {
      if (window.scrollY > 500) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, 100));
  }

  setupFormHandling() {
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
      input.addEventListener('input', this.formatPhoneNumber.bind(this));
    });

    // Project type dependent fields
    const projectSelect = document.querySelector('#project');
    if (projectSelect) {
      projectSelect.addEventListener('change', this.handleProjectTypeChange.bind(this));
    }
  }

  formatPhoneNumber(e) {
    const input = e.target;
    const value = input.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length >= 6) {
      formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
      formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else {
      formattedValue = value;
    }

    input.value = formattedValue;
  }

  handleProjectTypeChange(e) {
    const projectType = e.target.value;
    const budgetSelect = document.querySelector('#budget');
    
    // Adjust budget options based on project type
    if (budgetSelect) {
      const customHomeOptions = [
        { value: '', text: 'Select Budget Range' },
        { value: '500k-750k', text: '$500K - $750K' },
        { value: '750k-1m', text: '$750K - $1M' },
        { value: '1m-1.5m', text: '$1M - $1.5M' },
        { value: '1.5m+', text: '$1.5M+' },
        { value: 'discuss', text: 'Prefer to Discuss' }
      ];
      
      const otherProjectOptions = [
        { value: '', text: 'Select Budget Range' },
        { value: 'under-50k', text: 'Under $50K' },
        { value: '50k-100k', text: '$50K - $100K' },
        { value: '100k-250k', text: '$100K - $250K' },
        { value: '250k-500k', text: '$250K - $500K' },
        { value: '500k+', text: '$500K+' },
        { value: 'discuss', text: 'Prefer to Discuss' }
      ];
      
      const options = projectType === 'custom-home' ? customHomeOptions : otherProjectOptions;
      
      budgetSelect.innerHTML = '';
      options.forEach(option => {
        const optionEl = document.createElement('option');
        optionEl.value = option.value;
        optionEl.textContent = option.text;
        budgetSelect.appendChild(optionEl);
      });
    }
  }

  setupAnalytics() {
    // Track page views and user interactions
    this.trackPageView();
    
    // Track button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.trackEvent('CTA Click', {
          button_text: button.textContent.trim(),
          button_location: this.getElementSection(button)
        });
      });
    });

    // Track portfolio views
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const projectName = item.querySelector('h3')?.textContent || 'Unknown Project';
        this.trackEvent('Portfolio View', {
          project_name: projectName
        });
      });
    });

    // Track form interactions
    const formFields = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formFields.forEach(field => {
      field.addEventListener('focus', () => {
        this.trackEvent('Form Interaction', {
          field_name: field.name || field.id,
          action: 'focus'
        });
      });
    });
  }

  trackPageView() {
    // Replace with your analytics service (Google Analytics, etc.)
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }

  trackEvent(eventName, parameters = {}) {
    // Replace with your analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, parameters);
  }

  trackFormSubmission() {
    this.trackEvent('Form Submission', {
      form_name: 'contact_form',
      conversion: true
    });
  }

  getElementSection(element) {
    const sections = ['hero', 'services', 'portfolio', 'process', 'about', 'contact'];
    
    for (let section of sections) {
      const sectionEl = document.getElementById(section);
      if (sectionEl && sectionEl.contains(element)) {
        return section;
      }
    }
    
    return 'unknown';
  }

  // Utility functions
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  handleResize() {
    // Handle responsive adjustments on window resize
    if (window.innerWidth > 768 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}

// Initialize the website when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ArtukovichWebsite();
  });
} else {
  new ArtukovichWebsite();
}

// Add CSS for JavaScript-enhanced elements
const dynamicStyles = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .field-error {
    color: #DC2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .form-group input.error,
  .form-group select.error,
  .form-group textarea.error {
    border-color: #DC2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  
  .form-message {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  
  .form-message.success {
    background-color: #D1FAE5;
    color: #065F46;
    border: 1px solid #A7F3D0;
  }
  
  .form-message.error {
    background-color: #FEE2E2;
    color: #991B1B;
    border: 1px solid #FECACA;
  }
  
  .scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .scroll-to-top:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-2px);
  }
  
  .header.scrolled {
    background-color: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .lazy {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .lazy:not([src]) {
    background-color: #f0f0f0;
  }
  
  @media (max-width: 768px) {
    .nav-menu {
      position: fixed;
      top: 100%;
      left: 0;
      right: 0;
      background-color: white;
      flex-direction: column;
      padding: 2rem 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
    }
    
    .nav-menu.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .nav-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .body.menu-open {
      overflow: hidden;
    }
    
    .scroll-to-top {
      bottom: 1rem;
      right: 1rem;
      width: 45px;
      height: 45px;
    }
  }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
