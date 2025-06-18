// EcoShop Product Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initImageGallery();
    initSmoothScrolling();
    initOllieAnimations();
    initPurchaseHandlers();
    initResponsiveFeatures();
    initEasterEggs();
});

// Image Gallery Functionality
function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainProductImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            changeMainImage(this);
        });
    });
}

// Function to change main image (called from HTML onclick and JavaScript)
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Remove active class from all thumbnails
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    
    // Update main image with smooth transition
    mainImage.style.opacity = '0.7';
    
    setTimeout(() => {
        mainImage.src = thumbnail.src;
        mainImage.style.opacity = '1';
    }, 150);
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    // Add smooth scrolling to internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Ollie Animation and Interaction Effects
function initOllieAnimations() {
    const speechBubbles = document.querySelectorAll('.speech-bubble');
    const ollieAvatar = document.querySelector('.otter-illustration');
    
    // Animate speech bubbles on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const bubbleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInFromLeft 0.6s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe all speech bubbles
    speechBubbles.forEach(bubble => {
        bubbleObserver.observe(bubble);
    });
    
    // Add hover effect to Ollie's avatar
    if (ollieAvatar) {
        ollieAvatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        ollieAvatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Add a periodic subtle animation to grab attention
        setInterval(() => {
            if (!ollieAvatar.matches(':hover')) {
                ollieAvatar.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    ollieAvatar.style.animation = '';
                }, 600);
            }
        }, 8000);
    }
}

// Purchase and Cart Functionality
function initPurchaseHandlers() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const quantitySelect = document.getElementById('quantity');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get quantity
            const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;
            
            // Show loading state
            const originalText = this.textContent;
            this.textContent = 'Adding to Cart...';
            this.disabled = true;
            this.style.opacity = '0.8';
            
            // Simulate API call
            setTimeout(() => {
                // Show success state
                this.textContent = 'Added! ✓';
                this.style.background = 'linear-gradient(135deg, #4CAF50, #81C784)';
                this.style.opacity = '1';
                
                // Show success notification with Ollie's personality
                showSuccessNotification(quantity);
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    this.style.background = '';
                    this.style.opacity = '';
                }, 3000);
            }, 1500);
        });
    }
    
    // Update Goodie Rocks display based on quantity
    if (quantitySelect) {
        quantitySelect.addEventListener('change', function() {
            updateGoodieRocks(parseInt(this.value));
        });
    }
}

// Update Goodie Rocks based on quantity
function updateGoodieRocks(quantity) {
    const baseRocks = 35;
    const totalRocks = baseRocks * quantity;
    
    // Update rocks display in preview section
    const rocksPreview = document.querySelector('.rocks-badge strong');
    if (rocksPreview) {
        rocksPreview.textContent = `${totalRocks} Goodie Rocks`;
    }
    
    // Update rocks display in main rocks section
    const rocksAmount = document.querySelector('.rocks-amount');
    if (rocksAmount) {
        rocksAmount.textContent = `${totalRocks} Rocks`;
    }
    
    // Update rocks description
    const totalRocksSpan = document.getElementById('totalRocks');
    if (totalRocksSpan) {
        totalRocksSpan.textContent = `${totalRocks} Goodie Rocks`;
    }
}

// Success Notification with Ollie's Personality
function showSuccessNotification(quantity = 1) {
    const messages = [
        "Yay bestie! Your glow-up is on the way! ✨",
        "Slay! This is gonna be so good for your skin! 💖",
        "Yessss! You're about to be absolutely radiant! 🌟",
        "Bestie, your skin is going to thank you! 🦦✨",
        "Okay but this purchase? Chef's kiss! 😘",
        "You're gonna look so snatched, I can't even! 💅"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Show the success notification
    const notification = document.getElementById('successNotification');
    const notificationText = document.querySelector('.notification-text');
    
    if (notification && notificationText) {
        notificationText.textContent = randomMessage;
        notification.style.display = 'block';
        notification.style.animation = 'slideInRight 0.5s ease-out';
        
        // Add some extra flair for multiple quantities
        if (quantity > 1) {
            const quantityMessage = quantity === 2 ? 
                " Double the glow, bestie! 💫" : 
                ` ${quantity}x the radiance coming your way! ⭐`;
            notificationText.textContent += quantityMessage;
        }
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 500);
        }, 5000);
    }
}

// Responsive Features
function initResponsiveFeatures() {
    // Handle mobile navigation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add ripple effect
            createRippleEffect(this, e);
        });
    });
    
    // Optimize scroll performance
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Add subtle parallax to Ollie section
        const ollieSection = document.querySelector('.ollie-section');
        if (ollieSection) {
            const rate = scrolled * -0.1;
            ollieSection.style.backgroundPosition = `center ${rate}px`;
        }
        
        // Show/hide elements based on scroll
        const header = document.querySelector('.header');
        if (header) {
            if (scrolled > 100) {
                header.style.background = 'rgba(255, 255, 253, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '';
                header.style.backdropFilter = '';
            }
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Create ripple effect for buttons
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add Easter eggs
function initEasterEggs() {
    let clickCount = 0;
    const ollieAvatar = document.querySelector('.otter-illustration');
    
    if (ollieAvatar) {
        ollieAvatar.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 5) {
                this.textContent = '🦦💖';
                
                // Create special easter egg notification
                const easterEggNotification = document.createElement('div');
                easterEggNotification.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #FFE0B2, #FFF3E0);
                    border: 3px solid #FFB74D;
                    border-radius: 20px;
                    padding: 30px;
                    text-align: center;
                    z-index: 10001;
                    font-size: 18px;
                    font-weight: bold;
                    color: #8D6E63;
                    animation: bounce 0.6s ease;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                `;
                easterEggNotification.innerHTML = '🎉 You found Ollie\'s secret! <br>You\'re officially part of the bestie squad! 💖<br><small style="font-size: 14px; opacity: 0.8;">Bonus: 10 extra Goodie Rocks for being so curious! ✨</small>';
                
                document.body.appendChild(easterEggNotification);
                
                // Add bonus rocks
                const currentRocks = parseInt(document.querySelector('.rocks-amount').textContent);
                const bonusRocks = currentRocks + 10;
                document.querySelector('.rocks-amount').textContent = `${bonusRocks} Rocks`;
                
                setTimeout(() => {
                    this.textContent = '🦦';
                    document.body.removeChild(easterEggNotification);
                    clickCount = 0;
                    
                    // Reset rocks after easter egg
                    setTimeout(() => {
                        updateGoodieRocks(parseInt(document.getElementById('quantity').value));
                    }, 2000);
                }, 4000);
            }
        });
    }
}

// Add dynamic styles for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Utility functions
function smoothTransition(element, property, from, to, duration = 300) {
    return new Promise(resolve => {
        element.style.transition = `${property} ${duration}ms ease`;
        element.style[property] = from;
        
        requestAnimationFrame(() => {
            element.style[property] = to;
            setTimeout(resolve, duration);
        });
    });
}

// Initialize intersection observer for fade-in animations
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.product-card, .review-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });
}

// Initialize fade animations when page loads
setTimeout(initFadeInAnimations, 100);