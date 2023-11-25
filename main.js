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
