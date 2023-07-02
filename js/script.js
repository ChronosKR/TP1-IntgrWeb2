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
        setError(lastName, 'Votre nom de famille est requis.');
        noError = false;
    } else{
        setSuccess(lastName);
    }
    if (firstNameValue ===''){
        setError(firstName, 'Votre prénom est requis.');
        noError = false;
    } else{
        setSuccess(firstName);
    }
    if (emailValue ===''){
        setError(email, 'Votre courriel est requis.');
        noError = false;
    } else if (!validateEmail(emailValue)){
        setError(email, 'Veuillez entrer une adresse courriel valide.')
        noError = false;
    }else{
        setSuccess(email);
    }
    if (messageValue ===''){
        setError(message, 'Votre message est requis.');
        noError = false;
    } else if (messageValue.length < 50){
        setError(message, "Afin de mieux vous répondre, veuillez s'il vous plaît entrer un message d'au moins 25 caractères"); // Surtout à titre indicatif pour tester la fonction.
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
        setError(newsletterEmail, 'Votre courriel est requis.');
        noError = false;
    } else if (!validateEmail(newsletterEmailValue)){
        setError(newsletterEmail, 'Veuillez entrer une adresse courriel valide.')
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



/* fonctions ci-dessous complémentaire/expérimental au projet, test pour pouvoir implémenter l'usage de "tab" à l'intérieur même du menu burger mobile, mais ça semble un peu plus complexe
pour rendre les nav à l'intérieur non "tabable" lorsqu'ils sont en dehors du viewport/caché pour le moment. Ça prendrait une fonction pour implémenter des tabindex="-1" dans ma structure de html. Je ferai de plus amples tests ultérieurement! */

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