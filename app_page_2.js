// Application data
const userData = {
    name: "EcoWarrior",
    currentRocks: 847,
    level: "Sapling",
    nextMilestone: 1000,
    monthlyRocks: 234
};

const earningMethods = [
    {type: "Purchase", description: "Earn rocks with every order", baseRate: "5-20 rocks per ₹100", icon: "🛒"},
    {type: "Review", description: "Share your product experience", points: 10, icon: "⭐"},
    {type: "Referral", description: "Invite eco-conscious friends", points: 25, icon: "👥"},
    {type: "Repeat Purchase", description: "Bonus for buying the same item again", bonus: "5-15 extra rocks", icon: "🔄"}
];

const recentActivity = [
    {action: "Purchased Organic Face Wash", rocks: 15, time: "2 hours ago"},
    {action: "Reviewed Bamboo Toothbrush Set", rocks: 10, time: "1 day ago"},
    {action: "Referred friend Maya", rocks: 25, time: "3 days ago"}
];

// Ollie's motivational messages
const ollieMessages = [
    "Great job, EcoWarrior! You're almost at your next milestone!",
    "Keep up the fantastic work! Every purchase makes a difference! 🌱",
    "You're doing amazing! Your eco-journey inspires others! 🌍",
    "Wow! You're getting closer to becoming a Tree! 🌳",
    "Your commitment to sustainability is incredible! 💚",
    "Every Goodie Rock counts towards a greener future! ♻️"
];

// DOM Elements
let currentRocksElement;
let progressFillElement;
let ollieMessageElement;
let tabButtons;
let tabContents;
let rockContainer;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    updateProgress();
    animateCounters();
    startOllieMessages();
});

function initializeElements() {
    currentRocksElement = document.getElementById('current-rocks');
    progressFillElement = document.getElementById('progress-fill');
    ollieMessageElement = document.getElementById('ollie-message');
    tabButtons = document.querySelectorAll('.tab-btn');
    tabContents = document.querySelectorAll('.tab-content');
    rockContainer = document.getElementById('rock-container');
}

function setupEventListeners() {
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });

    // Earning card interactions
    const earningCards = document.querySelectorAll('.earning-card');
    earningCards.forEach(card => {
        card.addEventListener('click', () => handleEarningCardClick(card));
    });

    // Reward card interactions
    const rewardButtons = document.querySelectorAll('.reward-card .btn');
    rewardButtons.forEach(button => {
        button.addEventListener('click', (e) => handleRewardClaim(e));
    });

    // Badge sharing
    const shareButtons = document.querySelectorAll('.share-badge');
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => handleBadgeShare(e));
    });

    // Rock shower FAB
    const fab = document.getElementById('rock-shower');
    fab.addEventListener('click', createRockShower);

    // Add hover effects to cards
    addCardHoverEffects();
}

function switchTab(tabName) {
    // Update tab buttons
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    // Update tab content
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName) {
            content.classList.add('active');
        }
    });
}

function updateProgress() {
    const progressPercentage = (userData.currentRocks / userData.nextMilestone) * 100;
    if (progressFillElement) {
        progressFillElement.style.width = `${progressPercentage}%`;
    }

    // Update progress text
    const progressCurrent = document.getElementById('progress-current');
    const progressTarget = document.getElementById('progress-target');
    const currentLevel = document.getElementById('current-level');
    const monthlyRocks = document.getElementById('monthly-rocks');

    if (progressCurrent) progressCurrent.textContent = userData.currentRocks;
    if (progressTarget) progressTarget.textContent = userData.nextMilestone;
    if (currentLevel) currentLevel.textContent = userData.level;
    if (monthlyRocks) monthlyRocks.textContent = userData.monthlyRocks;
}

function animateCounters() {
    // Animate the main rocks counter
    if (currentRocksElement) {
        animateNumber(currentRocksElement, 0, userData.currentRocks, 2000);
    }

    // Animate monthly rocks counter
    const monthlyElement = document.getElementById('monthly-rocks');
    if (monthlyElement) {
        animateNumber(monthlyElement, 0, userData.monthlyRocks, 1500);
    }
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function startOllieMessages() {
    let messageIndex = 0;
    
    function rotateMessage() {
        if (ollieMessageElement) {
            ollieMessageElement.style.opacity = '0';
            
            setTimeout(() => {
                ollieMessageElement.textContent = ollieMessages[messageIndex];
                ollieMessageElement.style.opacity = '1';
                messageIndex = (messageIndex + 1) % ollieMessages.length;
            }, 300);
        }
    }
    
    // Change message every 8 seconds
    setInterval(rotateMessage, 8000);
}

function handleEarningCardClick(card) {
    const cardType = card.dataset.type;
    
    // Add visual feedback
    card.classList.add('pulse');
    setTimeout(() => card.classList.remove('pulse'), 500);
    
    // Simulate earning points based on card type
    let pointsEarned = 0;
    let action = '';
    
    switch(cardType) {
        case 'purchase':
            pointsEarned = Math.floor(Math.random() * 16) + 5; // 5-20 points
            action = 'Made a purchase';
            break;
        case 'review':
            pointsEarned = 10;
            action = 'Wrote a review';
            break;
        case 'referral':
            pointsEarned = 25;
            action = 'Referred a friend';
            break;
        case 'repeat':
            pointsEarned = Math.floor(Math.random() * 11) + 5; // 5-15 points
            action = 'Made a repeat purchase';
            break;
    }
    
    // Update points and show animation
    if (pointsEarned > 0) {
        addPoints(pointsEarned, action);
        showPointsAnimation(card, pointsEarned);
    }
}

function addPoints(points, action) {
    userData.currentRocks += points;
    userData.monthlyRocks += points;
    
    // Update UI
    animateNumber(currentRocksElement, userData.currentRocks - points, userData.currentRocks, 1000);
    updateProgress();
    
    // Add to activity feed
    addToActivityFeed(action, points);
    
    // Check for milestone achievement
    checkMilestoneAchievement();
}

function showPointsAnimation(element, points) {
    const pointsDisplay = document.createElement('div');
    pointsDisplay.textContent = `+${points} 🪨`;
    pointsDisplay.style.position = 'absolute';
    pointsDisplay.style.top = '50%';
    pointsDisplay.style.left = '50%';
    pointsDisplay.style.transform = 'translate(-50%, -50%)';
    pointsDisplay.style.color = '#4A7C59';
    pointsDisplay.style.fontWeight = 'bold';
    pointsDisplay.style.fontSize = '1.2rem';
    pointsDisplay.style.pointerEvents = 'none';
    pointsDisplay.style.zIndex = '1000';
    pointsDisplay.style.animation = 'pointsFloat 2s ease-out forwards';
    
    element.style.position = 'relative';
    element.appendChild(pointsDisplay);
    
    setTimeout(() => {
        if (pointsDisplay.parentNode) {
            pointsDisplay.parentNode.removeChild(pointsDisplay);
        }
    }, 2000);
}

function addToActivityFeed(action, points) {
    const activityFeed = document.getElementById('activity-feed');
    if (!activityFeed) return;
    
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.style.opacity = '0';
    newActivity.style.transform = 'translateX(-20px)';
    
    newActivity.innerHTML = `
        <div class="activity-icon">✨</div>
        <div class="activity-content">
            <p><strong>${action}</strong></p>
            <span class="activity-time">Just now</span>
        </div>
        <div class="activity-rocks">+${points} 🪨</div>
    `;
    
    activityFeed.insertBefore(newActivity, activityFeed.firstChild);
    
    // Animate in
    setTimeout(() => {
        newActivity.style.transition = 'all 0.3s ease';
        newActivity.style.opacity = '1';
        newActivity.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove oldest activity if more than 5 items
    const activities = activityFeed.querySelectorAll('.activity-item');
    if (activities.length > 5) {
        activities[activities.length - 1].remove();
    }
}

function checkMilestoneAchievement() {
    if (userData.currentRocks >= userData.nextMilestone) {
        showMilestoneModal();
        userData.level = getNextLevel(userData.level);
        userData.nextMilestone = getNextMilestone(userData.currentRocks);
    }
}

function getNextLevel(currentLevel) {
    const levels = ['Sprout', 'Sapling', 'Tree', 'Forest Guardian', 'Eco Champion'];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : currentLevel;
}

function getNextMilestone(currentRocks) {
    if (currentRocks < 500) return 500;
    if (currentRocks < 1000) return 1000;
    if (currentRocks < 2000) return 2000;
    if (currentRocks < 5000) return 5000;
    return Math.ceil(currentRocks / 1000) * 1000 + 1000;
}

function showMilestoneModal() {
    // Create celebration overlay
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(74, 124, 89, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    celebration.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            max-width: 400px;
            animation: slideIn 0.5s ease;
        ">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="color: #4A7C59; margin-bottom: 1rem;">Milestone Achieved!</h2>
            <p style="margin-bottom: 1.5rem;">Congratulations! You've reached ${userData.nextMilestone} Goodie Rocks!</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #4A7C59;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
            ">Awesome!</button>
        </div>
    `;
    
    document.body.appendChild(celebration);
    
    // Remove after 5 seconds if not manually closed
    setTimeout(() => {
        if (celebration.parentNode) {
            celebration.remove();
        }
    }, 5000);
}

function handleRewardClaim(event) {
    const button = event.target;
    const card = button.closest('.reward-card');
    const rewardName = card.querySelector('h3').textContent;
    const costText = card.querySelector('.reward-cost').textContent;
    const cost = parseInt(costText.match(/\d+/)[0]);
    
    if (userData.currentRocks >= cost) {
        // Simulate claiming reward
        userData.currentRocks -= cost;
        updateProgress();
        animateNumber(currentRocksElement, userData.currentRocks + cost, userData.currentRocks, 1000);
        
        // Show success message
        showNotification(`Successfully claimed: ${rewardName}! 🎁`, 'success');
        
        // Add to activity feed
        addToActivityFeed(`Claimed ${rewardName}`, -cost);
    } else {
        showNotification(`Not enough Goodie Rocks for ${rewardName}. You need ${cost - userData.currentRocks} more! 💎`, 'warning');
    }
}

function handleBadgeShare(event) {
    const badgeItem = event.target.closest('.badge-item');
    const badgeName = badgeItem.querySelector('h4').textContent;
    
    // Simulate social sharing
    showNotification(`Shared your "${badgeName}" badge! 📱✨`, 'success');
    
    // Add some bonus points for sharing
    addPoints(5, `Shared ${badgeName} badge`);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4A7C59' : type === 'warning' ? '#D2B48C' : '#6B8E23'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function createRockShower() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createFallingRock(), i * 100);
    }
}

function createFallingRock() {
    const rock = document.createElement('div');
    rock.className = 'falling-rock';
    rock.textContent = '🪨';
    rock.style.left = Math.random() * window.innerWidth + 'px';
    rock.style.animationDelay = Math.random() * 0.5 + 's';
    rock.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
    
    rockContainer.appendChild(rock);
    
    setTimeout(() => {
        if (rock.parentNode) {
            rock.parentNode.removeChild(rock);
        }
    }, 3000);
}

function addCardHoverEffects() {
    const cards = document.querySelectorAll('.earning-card, .reward-card, .badge-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pointsFloat {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            transform: translate(-50%, -60px) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -80px) scale(0.8);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { 
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
        }
        to { 
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Add some demo interactions for better user experience
document.addEventListener('click', function(e) {
    // Add ripple effect to buttons
    if (e.target.classList.contains('btn')) {
        createRippleEffect(e.target, e);
    }
});

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
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);