// Import article data
import { mainArticles, breakingNewsSnippets, entertainmentSnippets, chronicleSnippets, editorialProfiles } from './articles.js';

const menuItems = document.querySelectorAll('.nav a');
const burger = document.querySelector(".nav__burger");
const nav = document.querySelector(".nav");
const header = document.querySelector('header');
const form = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');
const lastName = document.getElementById('last-name');
const firstName = document.getElementById('first-name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const newsletterEmail = document.getElementById('newsletter-email');

// Music control functionality
let isPlaying = false;
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');

function initializeMusic() {
    if (musicToggle && backgroundMusic) {
        // Set volume to a comfortable level
        backgroundMusic.volume = 0.2;
        
        musicToggle.addEventListener('click', toggleMusic);
        
        // Don't auto-play, let user click to start
        isPlaying = false;
        updateMusicButton();
        
        // Add event listeners for music events
        backgroundMusic.addEventListener('loadstart', () => {
            console.log('Music loading started');
        });
        
        backgroundMusic.addEventListener('canplay', () => {
            console.log('Music can start playing');
        });
        
        backgroundMusic.addEventListener('error', (e) => {
            console.log('Music error:', e);
            // Fallback: create a simple beep sound
            createFallbackSound();
        });
    }
}

function createFallbackSound() {
    // Create a simple audio context for fallback sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        function playNote(frequency, duration) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }
        
        // Simple melody pattern
        const melody = [262, 294, 330, 349, 392, 440, 494, 523]; // C major scale
        let noteIndex = 0;
        
        window.playFallbackMusic = function() {
            if (isPlaying) {
                playNote(melody[noteIndex % melody.length], 0.5);
                noteIndex++;
                setTimeout(window.playFallbackMusic, 600);
            }
        };
        
        console.log('Fallback audio system ready');
    } catch (error) {
        console.log('Audio not supported');
    }
}

function toggleMusic() {
    if (backgroundMusic.src && backgroundMusic.src !== window.location.href) {
        // Try to play the actual audio file
        if (isPlaying) {
            backgroundMusic.pause();
            isPlaying = false;
        } else {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                updateMusicButton();
            }).catch(() => {
                // Fallback to generated sound
                if (window.playFallbackMusic) {
                    isPlaying = true;
                    window.playFallbackMusic();
                    updateMusicButton();
                }
            });
        }
    } else {
        // Use fallback sound
        if (window.playFallbackMusic) {
            isPlaying = !isPlaying;
            if (isPlaying) {
                window.playFallbackMusic();
            }
            updateMusicButton();
        }
    }
}

function updateMusicButton() {
    if (musicToggle) {
        musicToggle.textContent = isPlaying ? '🔊' : '🔇';
        musicToggle.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Play background music');
        
        // Add visual feedback
        if (isPlaying) {
            musicToggle.style.animation = 'pulse 2s infinite';
        } else {
            musicToggle.style.animation = 'none';
        }
    }
}

// Editorial profiles rendering function
function renderEditorialProfiles() {
    const profilesGrid = document.getElementById('profiles-grid');
    if (!profilesGrid) return;
    
    profilesGrid.innerHTML = '';
    
    editorialProfiles.forEach(profile => {
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        
        profileCard.innerHTML = `
            <div class="profile-image">
                <img src="${profile.image}" alt="${profile.name}" class="profile-icon">
            </div>
            <div class="profile-content">
                <h3 class="profile-name">${profile.name}</h3>
                <h4 class="profile-title">${profile.title}</h4>
                <p class="profile-description">${profile.description}</p>
            </div>
        `;
        
        profilesGrid.appendChild(profileCard);
    });
}

// Dynamic content loading function
function loadDynamicContent(section = 'news') {
    const breakingNewsElement = document.getElementById('breaking-news-text');
    
    // Get all article elements
    const articles = [
        {
            title: document.getElementById('featured-article-title'),
            byline: document.getElementById('featured-article-byline'),
            content: document.getElementById('featured-article-content')
        },
        {
            title: document.getElementById('secondary-article-title'),
            byline: document.getElementById('secondary-article-byline'),
            content: document.getElementById('secondary-article-content')
        },
        {
            title: document.getElementById('third-article-title'),
            byline: document.getElementById('third-article-byline'),
            content: document.getElementById('third-article-content')
        },
        {
            title: document.getElementById('fourth-article-title'),
            byline: document.getElementById('fourth-article-byline'),
            content: document.getElementById('fourth-article-content')
        },
        {
            title: document.getElementById('fifth-article-title'),
            byline: document.getElementById('fifth-article-byline'),
            content: document.getElementById('fifth-article-content')
        },
        {
            title: document.getElementById('sixth-article-title'),
            byline: document.getElementById('sixth-article-byline'),
            content: document.getElementById('sixth-article-content')
        }
    ];
    
    if (!breakingNewsElement) {
        console.warn('Breaking news element not found');
        return;
    }

    // Update breaking news
    let newsSnippets;
    switch(section) {
        case 'entertainment':
            newsSnippets = entertainmentSnippets;
            break;
        case 'chronicles':
            newsSnippets = chronicleSnippets;
            break;
        default:
            newsSnippets = breakingNewsSnippets;
    }
    
    const randomNews = newsSnippets[Math.floor(Math.random() * newsSnippets.length)];
    breakingNewsElement.textContent = randomNews;

    // Update all articles with random content
    const shuffledArticles = [...mainArticles].sort(() => Math.random() - 0.5);
    
    articles.forEach((articleElements, index) => {
        if (articleElements.title && articleElements.byline && articleElements.content && shuffledArticles[index]) {
            const article = shuffledArticles[index];
            articleElements.title.textContent = article.title;
            articleElements.byline.textContent = article.byline;
            articleElements.content.innerHTML = article.content;
        }
    });
}

// Enhanced content loading function with smooth transitions
function loadContent(section) {
    // Update active navigation
    document.querySelectorAll('.nav__item').forEach(item => {
        item.classList.remove('nav--active');
    });
    
    const activeTab = document.getElementById(section === 'news' ? 'news-tab' : section);
    if (activeTab) {
        activeTab.parentElement.classList.add('nav--active');
    }
    
    // Get containers
    const newspaperGrid = document.getElementById('newspaper-grid');
    const editorialContainer = document.getElementById('editorial-profiles-container');
    
    if (section === 'editorial') {
        // Fade out main grid
        if (newspaperGrid) {
            newspaperGrid.classList.add('is-hidden');
            newspaperGrid.classList.remove('is-visible');
            
            setTimeout(() => {
                newspaperGrid.style.display = 'none';
                
                // Show and fade in editorial profiles
                if (editorialContainer) {
                    editorialContainer.style.display = 'block';
                    renderEditorialProfiles();
                    
                    setTimeout(() => {
                        editorialContainer.classList.add('is-visible');
                        editorialContainer.classList.remove('is-hidden');
                    }, 50);
                }
            }, 300);
        }
    } else {
        // Fade out editorial profiles
        if (editorialContainer) {
            editorialContainer.classList.add('is-hidden');
            editorialContainer.classList.remove('is-visible');
            
            setTimeout(() => {
                editorialContainer.style.display = 'none';
                
                // Show and fade in main grid
                if (newspaperGrid) {
                    newspaperGrid.style.display = 'grid';
                    loadDynamicContent(section);
                    
                    setTimeout(() => {
                        newspaperGrid.classList.add('is-visible');
                        newspaperGrid.classList.remove('is-hidden');
                    }, 50);
                }
            }, 300);
        }
    }
    
    // Close mobile menu if open
    if (nav && nav.classList.contains('active')) {
        mobileMenu();
    }
}

// Make loadContent available globally
window.loadContent = loadContent;

// Form validation functions
const validateContactForm = () => {
    if (!lastName || !firstName || !email || !message) return false;
    
    let noError = true;
    const lastNameValue = lastName.value.trim();
    const firstNameValue = firstName.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    if (lastNameValue ===''){
        setError(lastName, 'Your last name is required.');
        noError = false;
    } else{
        setSuccess(lastName);
    }
    if (firstNameValue ===''){
        setError(firstName, 'Your first name is required.');
        noError = false;
    } else{
        setSuccess(firstName);
    }
    if (emailValue ===''){
        setError(email, 'Your email is required.');
        noError = false;
    } else if (!validateEmail(emailValue)){
        setError(email, 'Please enter a valid email address.')
        noError = false;
    }else{
        setSuccess(email);
    }
    if (messageValue ===''){
        setError(message, 'Your message is required.');
        noError = false;
    } else if (messageValue.length < 50){
        setError(message, "To better respond to you, please enter a message of at least 50 characters");
        noError = false;
    } else{
        setSuccess(message);
    }
    return noError;
}

const validateNewsletterForm = () => {
    if (!newsletterEmail) return false;
    
    let noError = true;
    const newsletterEmailValue = newsletterEmail.value.trim();
    if (newsletterEmailValue ===''){
        setError(newsletterEmail, 'Your email is required.');
        noError = false;
    } else if (!validateEmail(newsletterEmailValue)){
        setError(newsletterEmail, 'Please enter a valid email address.')
        noError = false;
    }else{
        setSuccess(newsletterEmail);
    }
    return noError;
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    errorDisplay.style.display = 'block';
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = '';
    errorDisplay.style.display = 'none';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Mobile menu functions
function mobileMenu() {
    const isActive = nav.classList.contains('active');
    burger.classList.toggle('active');
    nav.classList.toggle('active');

    if (!isActive) {
        menuItems[0].focus();
    }
}

function handleBurgerKeydown(event) {
    if (event.key === 'Enter') {
        burger.click();
    }
}

function handleNavKeydown(event) {
    if (event.key === 'Tab' && nav.classList.contains('active')) {
        const firstMenuItem = menuItems[0];
        const lastMenuItem = menuItems[menuItems.length - 1];

        if (event.shiftKey && document.activeElement === firstMenuItem) {
            event.preventDefault();
            burger.focus();
        } else if (!event.shiftKey && document.activeElement === lastMenuItem) {
            event.preventDefault();
            burger.focus();
        }
    }
}

// Event listeners
if (burger) {
    burger.addEventListener('click', mobileMenu);
    burger.addEventListener('keydown', handleBurgerKeydown);
}

if (nav) {
    nav.addEventListener('keydown', handleNavKeydown);
}

// Load initial content when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeMusic();
    loadDynamicContent('news');
    
    // Initialize with visible state
    const newspaperGrid = document.getElementById('newspaper-grid');
    if (newspaperGrid) {
        newspaperGrid.classList.add('is-visible');
    }
});

// Make validation functions available globally
window.validateContactForm = validateContactForm;
window.validateNewsletterForm = validateNewsletterForm;