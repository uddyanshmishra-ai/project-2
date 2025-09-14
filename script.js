

// Landing Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Form data storage
    let formData = {
        name: '',
        email: '',
        phone: '',
        class: '',
        message: ''
    };

    // DOM Elements
    const popupOverlay = document.getElementById('popup-overlay');
    const popupContent = document.getElementById('popup-content');
    const formContainer = document.getElementById('form-container');
    const successContainer = document.getElementById('success-container');
    const mouseFollower = document.getElementById('mouse-follower');
    
    // Buttons
    const startTrialBtn = document.getElementById('start-trial-btn');
    const startTrialBtn2 = document.getElementById('start-trial-btn-2');
    const closePopupBtn = document.getElementById('close-popup');
    const submitFormBtn = document.getElementById('submit-form');
    
    // Form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const classSelect = document.getElementById('class');
    const messageTextarea = document.getElementById('message');

    // Mouse tracking for interactive background
    document.addEventListener('mousemove', function(e) {
        if (mouseFollower) {
            const x = e.clientX / 10;
            const y = e.clientY / 10;
            mouseFollower.style.left = x + 'px';
            mouseFollower.style.top = y + 'px';
        }
    });

    // Popup functionality
    function showPopup() {
        popupOverlay.classList.remove('hidden');
        popupOverlay.classList.add('show');
        
        // Animate popup entrance
        popupContent.style.transform = 'scale(0.8)';
        popupContent.style.opacity = '0';
        
        setTimeout(() => {
            popupContent.style.transform = 'scale(1)';
            popupContent.style.opacity = '1';
            popupContent.style.transition = 'all 0.3s ease-out';
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    function hidePopup() {
        popupContent.style.transform = 'scale(0.8)';
        popupContent.style.opacity = '0';
        
        setTimeout(() => {
            popupOverlay.classList.add('hidden');
            popupOverlay.classList.remove('show');
            resetForm();
            document.body.style.overflow = 'auto';
        }, 300);
    }

    function resetForm() {
        // Reset form data
        formData = {
            name: '',
            email: '',
            phone: '',
            class: '',
            message: ''
        };
        
        // Reset form inputs
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (phoneInput) phoneInput.value = '';
        if (classSelect) classSelect.value = '';
        if (messageTextarea) messageTextarea.value = '';
        
        // Show form, hide success
        formContainer.classList.remove('hidden');
        successContainer.classList.add('hidden');
    }

    function updateFormData() {
        formData.name = nameInput ? nameInput.value : '';
        formData.email = emailInput ? emailInput.value : '';
        formData.phone = phoneInput ? phoneInput.value : '';
        formData.class = classSelect ? classSelect.value : '';
        formData.message = messageTextarea ? messageTextarea.value : '';
    }

    function validateForm() {
        updateFormData();
        
        if (!formData.name.trim()) {
            alert('Please enter your full name');
            return false;
        }
        
        if (!formData.email.trim()) {
            alert('Please enter your email address');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        if (!formData.phone.trim()) {
            alert('Please enter your phone number');
            return false;
        }
        
        if (!formData.class) {
            alert('Please select a course');
            return false;
        }
        
        return true;
    }

    function submitForm() {
        if (!validateForm()) {
            return;
        }
        
        // Log form data (in real app, this would be sent to server)
        console.log('Form submitted with data:', formData);
        
        // Show success state
        formContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            hidePopup();
        }, 3000);
        
        // In a real application, you would send this data to your backend:
        // fetch('/api/signup', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     // Show success message
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        //     // Show error message
        // });
    }

    // Event listeners
    if (startTrialBtn) {
        startTrialBtn.addEventListener('click', showPopup);
    }
    
    if (startTrialBtn2) {
        startTrialBtn2.addEventListener('click', showPopup);
    }
    
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', hidePopup);
    }
    
    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', submitForm);
    }

    // Close popup when clicking outside
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                hidePopup();
            }
        });
    }

    // Form input event listeners for real-time data updates
    if (nameInput) {
        nameInput.addEventListener('input', updateFormData);
    }
    if (emailInput) {
        emailInput.addEventListener('input', updateFormData);
    }
    if (phoneInput) {
        phoneInput.addEventListener('input', updateFormData);
    }
    if (classSelect) {
        classSelect.addEventListener('change', updateFormData);
    }
    if (messageTextarea) {
        messageTextarea.addEventListener('input', updateFormData);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !popupOverlay.classList.contains('hidden')) {
            hidePopup();
        }
    });

    // Smooth scroll for anchor links
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

    // Add loading states to buttons
    function addLoadingState(button) {
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = `
                <div class="flex items-center justify-center space-x-2">
                    <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                </div>
            `;
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        }
    }

    // Enhanced form submission with loading state
    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', function() {
            if (validateForm()) {
                addLoadingState(this);
                setTimeout(submitForm, 1000);
            }
        });
    }

    // Add entrance animations on scroll
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

    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Add parallax effect to floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.float-animation');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add click ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const rippleCSS = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;

        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = rippleCSS;
            document.head.appendChild(style);
        }

        const ripple = button.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    // Add ripple effect to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Initialize page
    console.log('EduMaster Landing Page Loaded Successfully!');
    console.log('Features: Responsive Design, Interactive Animations, Form Validation, Modern UI');
});

// Utility functions for future enhancements
const LandingPageUtils = {
    // Function to handle form data submission to API
    async submitToAPI(data) {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    },

    // Function to validate email format
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Function to validate phone number
    validatePhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    },

    // Function to format phone number
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phone;
    },

    // Function to add analytics tracking
    trackEvent(eventName, eventData) {
        // Google Analytics or other analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        console.log('Event tracked:', eventName, eventData);
    },

    // Function to show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LandingPageUtils;
}