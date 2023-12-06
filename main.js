function scrollToSection(sectionId) {
    if (sectionId === 'consultation') {
        loadConsultationPage();
    } else {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        closeMenu();
    }
}

function loadConsultationPage() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'consultation.html', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            document.body.innerHTML = xhr.responseText;
        }
    };

    xhr.send();
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

function closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove('show');
}


// Backend API URL
const apiUrl = "https://clients-website-api.vercel.app";

// Selecting the contact form and its input elements
const contactForm = document.querySelector('.contact-form');
const nameInput = contactForm.querySelector('input[type="text"]');
const emailInput = contactForm.querySelector('input[type="email"]');
const messageInput = contactForm.querySelector('textarea');
// const send_btn = document.getElementById('submit')

// Adding a submit event listener to the form
contactForm.onsubmit =(event) =>{
  event.preventDefault()  
  // console.log('Attempting to send rqst',nameInput.value,emailInput.value,messageInput.value)
   // Example data to send in the request
    const requestData = {
        "message": messageInput.value,
        "name": nameInput.value,
        "email": emailInput.value 
    };

    // Make a POST request to the Flask API endpoint
    fetch('https://clients-website-api.vercel.app/send_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Thanks for your feedback!')
        // Handle the response as needed
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors
    });  
};

