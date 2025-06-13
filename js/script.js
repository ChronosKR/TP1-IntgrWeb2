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

const validateContactForm = () => {
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



/* Functions below are complementary/experimental to the project, test to be able to implement the use of "tab" inside the mobile burger menu, but it seems a bit more complex
to make the nav inside non-"tabable" when they are outside the viewport/hidden for now. It would take a function to implement tabindex="-1" in my html structure. I will do more extensive tests later! */

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

burger.addEventListener('click', mobileMenu);
burger.addEventListener('keydown', handleBurgerKeydown);
nav.addEventListener('keydown', handleNavKeydown);