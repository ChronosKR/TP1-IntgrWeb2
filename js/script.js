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

// Dynamic content loading function
function loadDynamicContent(section = 'news') {
    const breakingNewsElement = document.getElementById('breaking-news-text');
    const mainTitleElement = document.getElementById('main-article-title');
    const mainBylineElement = document.getElementById('main-article-byline');
    const mainContentElement = document.getElementById('main-article-content');
    
    if (!breakingNewsElement || !mainTitleElement || !mainBylineElement || !mainContentElement) {
        console.warn('Some content elements not found');
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

    // Update main article
    const randomArticle = mainArticles[Math.floor(Math.random() * mainArticles.length)];
    mainTitleElement.textContent = randomArticle.title;
    mainBylineElement.textContent = randomArticle.byline;
    mainContentElement.innerHTML = randomArticle.content;
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
    loadDynamicContent('news');
});

// Make validation functions available globally
window.validateContactForm = validateContactForm;
window.validateNewsletterForm = validateNewsletterForm;