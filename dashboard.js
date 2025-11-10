/**
 * CareCompass Dashboard
 * Interactive user experience for doctor matching
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive features
    initBubbleInteractions();
    initScrollAnimations();
    initScoreBarAnimations();
    initDoctorCardInteractions();
});

/**
 * Bubble Map Interactions
 * Connect bubbles to doctor cards
 */
function initBubbleInteractions() {
    const bubbles = document.querySelectorAll('.doctor-bubble');
    const cards = document.querySelectorAll('.doctor-card');

    bubbles.forEach(bubble => {
        const doctorId = bubble.getAttribute('data-doctor');

        // Click to scroll to doctor card
        bubble.addEventListener('click', () => {
            const targetCard = document.querySelector(`.doctor-card[data-doctor="${doctorId}"]`);
            if (targetCard) {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                // Highlight the card briefly
                targetCard.classList.add('highlight-pulse');
                setTimeout(() => {
                    targetCard.classList.remove('highlight-pulse');
                }, 2000);
            }
        });

        // Hover to highlight corresponding card
        bubble.addEventListener('mouseenter', () => {
            const targetCard = document.querySelector(`.doctor-card[data-doctor="${doctorId}"]`);
            if (targetCard) {
                targetCard.style.transform = 'translateY(-4px)';
                targetCard.style.boxShadow = '0 20px 50px rgba(78, 205, 196, 0.25)';
            }
        });

        bubble.addEventListener('mouseleave', () => {
            const targetCard = document.querySelector(`.doctor-card[data-doctor="${doctorId}"]`);
            if (targetCard) {
                targetCard.style.transform = '';
                targetCard.style.boxShadow = '';
            }
        });
    });

    // Add gentle floating animation to bubbles
    addFloatingAnimation();
}

/**
 * Add subtle floating animation to doctor bubbles
 */
function addFloatingAnimation() {
    const bubbles = document.querySelectorAll('.doctor-bubble .bubble');

    bubbles.forEach((bubble, index) => {
        const delay = index * 0.5;
        const duration = 3 + (index % 3);

        bubble.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });

    // Add floating keyframes if not already present
    if (!document.querySelector('#float-animation')) {
        const style = document.createElement('style');
        style.id = 'float-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Doctor Card Interactions
 * Hover effects and button interactions
 */
function initDoctorCardInteractions() {
    const cards = document.querySelectorAll('.doctor-card');

    cards.forEach(card => {
        const doctorId = card.getAttribute('data-doctor');

        // Hover to highlight corresponding bubble
        card.addEventListener('mouseenter', () => {
            const targetBubble = document.querySelector(`.doctor-bubble[data-doctor="${doctorId}"] .bubble`);
            if (targetBubble) {
                targetBubble.style.transform = 'scale(1.2)';
                targetBubble.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const targetBubble = document.querySelector(`.doctor-bubble[data-doctor="${doctorId}"] .bubble`);
            if (targetBubble) {
                targetBubble.style.transform = '';
                targetBubble.style.boxShadow = '';
            }
        });
    });

    // Book appointment button interactions
    const bookButtons = document.querySelectorAll('.btn-primary.btn-full');
    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Add success animation
            button.textContent = 'Booking...';
            button.style.background = 'var(--color-primary)';

            setTimeout(() => {
                button.textContent = '✓ Request Sent to Care Team';
                button.style.background = '#4ECDC4';

                // Show success message
                showSuccessMessage();
            }, 1500);
        });
    });

    // View details button interactions
    const detailButtons = document.querySelectorAll('.btn-secondary.btn-full');
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Expand the card
            const card = button.closest('.doctor-card');
            if (card) {
                card.classList.toggle('expanded');
                button.textContent = card.classList.contains('expanded') ? 'Show Less' : 'View Details';
            }
        });
    });

    // Support button
    const supportButton = document.querySelector('.support-card button');
    if (supportButton) {
        supportButton.addEventListener('click', (e) => {
            e.preventDefault();
            showChatModal();
        });
    }
}

/**
 * Scroll-triggered animations
 * Fade in elements as they come into view
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.doctor-card, .support-card');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Score bar fill animations
 * Animate bars when they come into view
 */
function initScoreBarAnimations() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const scoreFills = entry.target.querySelectorAll('.score-fill');
                scoreFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
            }
        });
    }, observerOptions);

    const scoreContainers = document.querySelectorAll('.doctor-scores');
    scoreContainers.forEach(container => observer.observe(container));
}

/**
 * Show success message after booking
 */
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-toast';
    message.innerHTML = `
        <div class="toast-icon">✓</div>
        <div>
            <strong>Booking request sent!</strong>
            <p>Our care team will reach out within 2 hours to confirm your appointment.</p>
        </div>
    `;

    document.body.appendChild(message);

    // Add toast styles if not present
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .success-toast {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: white;
                padding: 1.5rem;
                border-radius: 1rem;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                display: flex;
                gap: 1rem;
                max-width: 400px;
                animation: slideInUp 0.4s ease;
                z-index: 1000;
            }

            .toast-icon {
                width: 40px;
                height: 40px;
                background: #4ECDC4;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: bold;
                flex-shrink: 0;
            }

            .success-toast strong {
                display: block;
                color: #2D3748;
                margin-bottom: 0.25rem;
            }

            .success-toast p {
                color: #4A5568;
                font-size: 0.875rem;
                margin: 0;
            }

            @keyframes slideInUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .highlight-pulse {
                animation: highlightPulse 2s ease;
            }

            @keyframes highlightPulse {
                0%, 100% {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }
                50% {
                    box-shadow: 0 0 0 8px rgba(78, 205, 196, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove after 5 seconds
    setTimeout(() => {
        message.style.animation = 'slideInUp 0.4s ease reverse';
        setTimeout(() => {
            message.remove();
        }, 400);
    }, 5000);
}

/**
 * Show chat modal for care team support
 */
function showChatModal() {
    const modal = document.createElement('div');
    modal.className = 'chat-modal';
    modal.innerHTML = `
        <div class="chat-modal-overlay"></div>
        <div class="chat-modal-content">
            <button class="chat-modal-close">&times;</button>
            <div class="chat-header">
                <div class="chat-avatar">CT</div>
                <div>
                    <h3>Care Team</h3>
                    <p class="chat-status">Usually responds in minutes</p>
                </div>
            </div>
            <div class="chat-body">
                <div class="chat-message received">
                    <p>Hi! I'm here to help you choose the right doctor for your neck pain. What questions can I answer?</p>
                    <span class="chat-time">Just now</span>
                </div>
                <div class="chat-suggestions">
                    <button class="suggestion-chip">Which doctor is best for my condition?</button>
                    <button class="suggestion-chip">Can you explain the wait times?</button>
                    <button class="suggestion-chip">How do I prepare for my appointment?</button>
                </div>
            </div>
            <div class="chat-footer">
                <input type="text" placeholder="Type your message..." class="chat-input">
                <button class="chat-send">Send</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .chat-modal {
                position: fixed;
                inset: 0;
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }

            .chat-modal-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
            }

            .chat-modal-content {
                position: relative;
                background: white;
                border-radius: 1.5rem;
                width: 90%;
                max-width: 500px;
                max-height: 80vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease;
            }

            .chat-modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 2rem;
                color: #718096;
                cursor: pointer;
                z-index: 1;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s;
            }

            .chat-modal-close:hover {
                background: #F7FAFC;
            }

            .chat-header {
                display: flex;
                gap: 1rem;
                padding: 1.5rem;
                border-bottom: 1px solid #E2E8F0;
            }

            .chat-avatar {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #4ECDC4 0%, #95E1D3 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 700;
            }

            .chat-header h3 {
                font-size: 1.125rem;
                margin: 0;
            }

            .chat-status {
                font-size: 0.875rem;
                color: #4ECDC4;
                margin: 0;
            }

            .chat-body {
                flex: 1;
                padding: 1.5rem;
                overflow-y: auto;
            }

            .chat-message {
                background: #F7FAFC;
                padding: 1rem;
                border-radius: 1rem;
                margin-bottom: 1rem;
            }

            .chat-message p {
                margin: 0 0 0.5rem 0;
                font-size: 0.938rem;
            }

            .chat-time {
                font-size: 0.75rem;
                color: #718096;
            }

            .chat-suggestions {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .suggestion-chip {
                background: white;
                border: 2px solid #E2E8F0;
                padding: 0.75rem 1rem;
                border-radius: 0.75rem;
                text-align: left;
                font-size: 0.875rem;
                color: #4A5568;
                cursor: pointer;
                transition: all 0.2s;
            }

            .suggestion-chip:hover {
                border-color: #4ECDC4;
                background: #E8F5F1;
            }

            .chat-footer {
                display: flex;
                gap: 0.75rem;
                padding: 1.5rem;
                border-top: 1px solid #E2E8F0;
            }

            .chat-input {
                flex: 1;
                padding: 0.75rem 1rem;
                border: 2px solid #E2E8F0;
                border-radius: 0.75rem;
                font-size: 0.938rem;
                font-family: inherit;
            }

            .chat-input:focus {
                outline: none;
                border-color: #4ECDC4;
            }

            .chat-send {
                background: #4ECDC4;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s;
            }

            .chat-send:hover {
                background: #3db9b0;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideUp {
                from {
                    transform: translateY(20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Close modal handlers
    const closeBtn = modal.querySelector('.chat-modal-close');
    const overlay = modal.querySelector('.chat-modal-overlay');

    const closeModal = () => {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => modal.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Suggestion chips
    const suggestions = modal.querySelectorAll('.suggestion-chip');
    suggestions.forEach(chip => {
        chip.addEventListener('click', () => {
            const chatInput = modal.querySelector('.chat-input');
            chatInput.value = chip.textContent;
            chatInput.focus();
        });
    });
}
