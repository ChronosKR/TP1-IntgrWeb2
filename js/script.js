// Import article data
import { mainArticles, breakingNewsSnippets, entertainmentSnippets, chronicleSnippets } from './articles.js';

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
        backgroundMusic.volume = 0.3;
        
        musicToggle.addEventListener('click', toggleMusic);
        
        // Auto-play attempt (may be blocked by browser)
        backgroundMusic.play().then(() => {
            isPlaying = true;
            updateMusicButton();
        }).catch(() => {
            // Auto-play blocked, user will need to click
            isPlaying = false;
            updateMusicButton();
        });
    }
}

function toggleMusic() {
    if (isPlaying) {
        backgroundMusic.pause();
        isPlaying = false;
    } else {
        backgroundMusic.play();
        isPlaying = true;
    }
    updateMusicButton();
}

function updateMusicButton() {
    if (musicToggle) {
        musicToggle.textContent = isPlaying ? '🔊' : '🔇';
        musicToggle.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Play background music');
    }
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

// Content loading function for navigation
function loadContent(section) {
    // Update active navigation
    document.querySelectorAll('.nav__item').forEach(item => {
        item.classList.remove('nav--active');
    });
    
    const activeTab = document.getElementById(section === 'news' ? 'news-tab' : section);
    if (activeTab) {
        activeTab.parentElement.classList.add('nav--active');
    }
    
    // Load new content
    loadDynamicContent(section);
    
    // Close mobile menu if open
    if (nav.classList.contains('active')) {
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
});

// Make validation functions available globally
window.validateContactForm = validateContactForm;
window.validateNewsletterForm = validateNewsletterForm;