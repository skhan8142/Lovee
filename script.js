// Quiz Questions
const quizQuestions = [
    {
        question: "What's my favorite color?",
        options: ["Blue", "Red", "Green"],
        correct: 0
    },
    {
        question: "Where did we first meet?",
        options: ["School", "Work", "Through friends"],
        correct: 2
    },
    {
        question: "What's my favorite food?",
        options: ["Pizza", "Sushi", "Pasta"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

// Sweet Compliments Array
const sweetCompliments = [
    "Your smile lights up my entire world ✨",
    "You make every day feel like a beautiful adventure 🌟",
    "Your kindness touches everyone around you 💖",
    "You're the most beautiful soul I've ever met 🌸",
    "Your laugh is my favorite sound in the world 🎵",
    "You inspire me to be a better person every day 💫",
    "The way your eyes sparkle when you're happy melts my heart ❤️",
    "Your presence makes everything better 🌈",
    "You're the reason I believe in love 💑",
    "Your strength and determination amaze me 💪",
    "You're the missing piece to my puzzle 🧩",
    "Every moment with you feels like magic ✨",
    "Your heart is pure gold 💝",
    "You're more beautiful than all the stars combined 🌟",
    "Your love makes my life complete 💖",
    "You're the first person I want to talk to every morning 🌅",
    "Your hugs are my safe haven 🤗",
    "You're perfect just the way you are 💫",
    "Being with you feels like home 🏡",
    "You're the best thing that's ever happened to me 💕"
];

// Compliment Generator Function
function generateCompliment() {
    const complimentText = document.getElementById('compliment-text');
    const randomIndex = Math.floor(Math.random() * sweetCompliments.length);
    
    // Remove existing animation class
    complimentText.classList.remove('compliment-fade-in');
    
    // Trigger reflow to restart animation
    void complimentText.offsetWidth;
    
    // Add new compliment and animation
    complimentText.textContent = sweetCompliments[randomIndex];
    complimentText.classList.add('compliment-fade-in');
    
    // Create floating hearts
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 300);
    }
}

// Initialize Quiz
function initQuiz() {
    const quizContainer = document.getElementById('quiz-questions');
    const question = quizQuestions[currentQuestion];
    
    quizContainer.innerHTML = `
        <div class="question">
            <p>${question.question}</p>
            <div class="options">
                ${question.options.map((option, index) => `
                    <button class="option" onclick="checkAnswer(${index})">${option}</button>
                `).join('')}
            </div>
        </div>
    `;
}

// Check Answer
function checkAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestion];
    if (selectedIndex === question.correct) {
        score++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        initQuiz();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    const quizContainer = document.getElementById('quiz-questions');
    quizContainer.innerHTML = `
        <div class="results">
            <h3>Quiz Complete!</h3>
            <p>You scored ${score} out of ${quizQuestions.length}</p>
            <button onclick="resetQuiz()">Try Again</button>
        </div>
    `;
}

// Reset Quiz
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    initQuiz();
}

// Countdown Timer
function updateCountdown() {
    // Set your target date here (November 16, 2025)
    const targetDate = new Date('2025-11-17').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Floating Hearts Animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Mood Change Function
function toggleMood() {
    document.body.classList.toggle('dark-mode');
    const button = document.querySelector('.mood-button');
    const icon = button.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        button.innerHTML = '<i class="fas fa-sun"></i> Change Mood';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        button.innerHTML = '<i class="fas fa-moon"></i> Change Mood';
    }
}

// Secret Message Puzzle
function initPuzzle() {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const messageReveal = document.querySelector('.secret-message-reveal');
    let selectedPieces = [];

    puzzlePieces.forEach(piece => {
        piece.addEventListener('click', () => {
            if (!piece.classList.contains('active')) {
                piece.classList.add('active');
                selectedPieces.push({
                    order: parseInt(piece.dataset.order),
                    text: piece.textContent
                });

                if (selectedPieces.length === puzzlePieces.length) {
                    // Check if pieces are in correct order
                    const orderedPieces = selectedPieces.sort((a, b) => a.order - b.order);
                    const message = orderedPieces.map(p => p.text).join(' ');
                    messageReveal.innerHTML = `<p class="revealed-message">${message}</p>`;
                    messageReveal.style.opacity = '1';
                    
                    // Add hearts animation
                    createFloatingHeart();
                    createFloatingHeart();
                    createFloatingHeart();
                }
            }
        });
    });
}

// Memory Cards Interaction
function initMemoryCards() {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            card.querySelector('.memory-card-inner').style.transform = 
                card.querySelector('.memory-card-inner').style.transform === 'rotateY(180deg)' 
                    ? 'rotateY(0deg)' 
                    : 'rotateY(180deg)';
        });
    });
}

// Heartbeat Button Interaction
function initHeartbeatButton() {
    const heartbeatBtn = document.getElementById('heartbeat-btn');
    const message = document.getElementById('heartbeat-message');
    
    if (heartbeatBtn && message) {
        heartbeatBtn.addEventListener('mouseenter', () => {
            message.textContent = "Can you feel it? My heart beats faster when I think of you...";
            message.classList.add('show');
        });

        heartbeatBtn.addEventListener('mouseleave', () => {
            message.textContent = "Hover over the heart to feel my heartbeat...";
            message.classList.remove('show');
        });

        heartbeatBtn.addEventListener('click', () => {
            message.textContent = "This is how my heart feels when I see you! 💓";
            message.classList.add('show');
            
            // Create extra floating hearts
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createFloatingHeart();
                }, i * 200);
            }

            // Reset message after 3 seconds
            setTimeout(() => {
                message.textContent = "Hover over the heart to feel my heartbeat...";
            }, 3000);
        });
    }
}

// 365 Days of You Calendar
const dailyMessages = [
    "I love your beautiful smile that brightens my day",
    "Your kindness touches everyone around you",
    "You make my heart skip a beat every time I see you",
    "Your laughter is my favorite sound in the world",
    "You're the most amazing person I know",
    "I love how you always know how to make me happy",
    "Your eyes sparkle like stars in the night sky",
    "You're my favorite hello and my hardest goodbye",
    "Every moment with you feels like a dream",
    "Your love makes me a better person",
    "I fall in love with you more every day",
    "You're my favorite person to talk to",
    "Your hugs feel like home",
    "I love how you understand me completely",
    "You make ordinary moments extraordinary",
    "Your voice is my favorite melody",
    "I love how you care about others",
    "You're my perfect match in every way",
    "Your presence makes everything better",
    "I love how you always support me",
    "You're the reason I believe in love",
    "Your smile is my favorite sight",
    "I love how you make me feel special",
    "You're my favorite adventure",
    "Your love gives me strength",
    "I love how you always know what to say",
    "You're my favorite person to wake up to",
    "Your touch makes my heart race",
    "I love how you make me laugh",
    "You're my favorite part of every day",
    // Add more messages as needed
];

function createCalendar() {
    const daysGrid = document.querySelector('.days-grid');
    const totalDays = 365;
    
    for (let i = 1; i <= totalDays; i++) {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <div class="day-number">Day ${i}</div>
            <div class="day-message">${dailyMessages[i % dailyMessages.length]}</div>
        `;
        
        dayCard.addEventListener('click', function() {
            this.classList.toggle('revealed');
        });
        
        daysGrid.appendChild(dayCard);
    }
}

// Handle collapsible sections
function initCollapsibleSections() {
    const menuButtons = document.querySelectorAll('.menu-button');
    let activeSection = null;

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);

            // If clicking the same button, close the section
            if (activeSection === sectionId) {
                button.classList.remove('active');
                section.classList.remove('active');
                activeSection = null;
                return;
            }

            // Remove active class from all buttons and sections
            menuButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.section-content').forEach(sec => sec.classList.remove('active'));

            // Add active class to clicked button and section
            button.classList.add('active');
            section.classList.add('active');
            activeSection = sectionId;

            // Scroll to the section smoothly
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize quiz
    initQuiz();
    
    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Create floating hearts periodically
    setInterval(createFloatingHeart, 3000);
    
    // Add scroll reveal functionality
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // Initialize new features
    initPuzzle();
    initMemoryCards();
    initHeartbeatButton();
    
    // Add compliment generator button listener
    const complimentButton = document.getElementById('generate-compliment');
    if (complimentButton) {
        complimentButton.addEventListener('click', generateCompliment);
    }
    
    // Add hover effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.caption').style.transform = 'translateY(0)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('.caption').style.transform = 'translateY(100%)';
        });
    });
    
    createCalendar();
    
    // Initialize collapsible sections
    initCollapsibleSections();
}); 