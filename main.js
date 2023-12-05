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

// Get form elements
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {

  // Prevent default submission
  e.preventDefault();

  // Create XHR object
  const xhr = new XMLHttpRequest();

  // Setup request
  xhr.open('POST', url + '/send_email');
  
  // Set headers
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Handle response
  xhr.onload = function() {
    if(xhr.status === 200) {
      // Success response
    } else {
      // Error response
    }
  }

  // Handle errors    
  xhr.onerror = function() {
    // Network error
  }

  // Create FormData
  const data = new FormData();

  // Append data 
  data.append('name', name);
  data.append('email', email);
  data.append('message', message);

  // Send request
  xhr.send(data);

});
