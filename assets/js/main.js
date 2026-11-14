
/*===== MENU SHOW =====*/

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};

showMenu('nav-toggle', 'nav-menu');


/*===== REMOVE MENU MOBILE =====*/

const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');

    if (navMenu) {
        navMenu.classList.remove('show');
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', linkAction);
});


/*===== SCROLL SECTIONS ACTIVE LINK =====*/

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector(
            `.nav__menu a[href="#${sectionId}"]`
        );

        if (!navLink) return;

        if (
            scrollDown > sectionTop &&
            scrollDown <= sectionTop + sectionHeight
        ) {
            navLink.classList.add('active-link');
        } else {
            navLink.classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);


/*===== SCROLL REVEAL ANIMATION =====*/

if (typeof ScrollReveal !== 'undefined') {

    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200
    });

    sr.reveal(
        '.home__data, .about__img, .skills__subtitle, .skills__text'
    );

    sr.reveal(
        '.home__img, .about__subtitle, .about__text, .skills__img',
        { delay: 400 }
    );

    sr.reveal('.home__social-icon', { interval: 200 });

    sr.reveal(
        '.skills__data, .work__img, .contact__input',
        { interval: 200 }
    );
}


/*===== DARK MODE =====*/

const themeButton = document.getElementById('theme-button');

if (themeButton) {

    const themeIcon = themeButton.querySelector('i');
    const savedTheme = localStorage.getItem('selected-theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');

        if (themeIcon) {
            themeIcon.classList.replace('bx-moon', 'bx-sun');
        }
    }

    themeButton.addEventListener('click', () => {

        document.body.classList.toggle('dark-theme');

        const isDarkMode =
            document.body.classList.contains('dark-theme');

        if (themeIcon) {
            if (isDarkMode) {
                themeIcon.classList.replace('bx-moon', 'bx-sun');
            } else {
                themeIcon.classList.replace('bx-sun', 'bx-moon');
            }
        }

        localStorage.setItem(
            'selected-theme',
            isDarkMode ? 'dark' : 'light'
        );
    });
}


/*===== CONTACT FORM - WEB3FORMS =====*/

const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {

    contactForm.addEventListener('submit', async function (event) {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (!submitButton) return;

        // Clear previous message
        if (contactMessage) {
            contactMessage.textContent = '';
        }

        // Disable button while sending
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';

        const formData = new FormData(contactForm);

        // Web3Forms Access Key
        formData.set(
            'access_key',
            'c8823224-df77-41a4-9858-59049e58b1c1'
        );

        try {

            const response = await fetch(
                'https://api.web3forms.com/submit',
                {
                    method: 'POST',
                    body: formData
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || 'Message submission failed.'
                );
            }

            if (contactMessage) {
                contactMessage.textContent =
                    'Thank you! Your message has been sent successfully.';

                contactMessage.style.color = '#00c853';
            }

            contactForm.reset();

        } catch (error) {

            console.error('Contact Form Error:', error);

            if (contactMessage) {
                contactMessage.textContent =
                    'Unable to send your message. Please try again.';

                contactMessage.style.color = '#ff0000';
            }

        } finally {

            submitButton.disabled = false;

            submitButton.innerHTML =
                '<span>Send Message</span><i class="bx bx-send"></i>';

        }

    });

}


/*===== QUALIFICATION TABS =====*/

const qualTabs = document.querySelectorAll(
    '.qualification__button'
);

const qualContents = document.querySelectorAll(
    '.qualification__content'
);

qualTabs.forEach(tab => {

    tab.addEventListener('click', () => {

        const targetId = tab.dataset.target;
        const target = document.getElementById(targetId);

        if (!target) return;

        qualTabs.forEach(t => {
            t.classList.remove('qualification__active');
        });

        qualContents.forEach(content => {
            content.classList.remove(
                'qualification__content-active'
            );
        });

        tab.classList.add('qualification__active');

        target.classList.add(
            'qualification__content-active'
        );

    });

});


/*===== INTERACTIVE WORK SECTION DATA =====*/

const expertiseData = {

    frontend: {
        tag: '01 / Development',
        title: 'Frontend Development',

        description:
            'I enjoy building responsive and visually appealing websites with a focus on clean layouts, usability and interactive experiences.',

        points: [
            'Creating responsive website layouts',
            'Designing with HTML and CSS',
            'Adding interactivity using JavaScript',
            'Building personal web projects'
        ],

        tech: ['HTML5', 'CSS3', 'JavaScript']
    },

    java: {
        tag: '02 / Programming',
        title: 'Java Programming',

        description:
            'I am developing my programming foundation using Java and exploring object-oriented programming concepts.',

        points: [
            'Java fundamentals',
            'Object-oriented programming',
            'Encapsulation and inheritance',
            'Polymorphism and abstraction'
        ],

        tech: ['Java', 'OOP']
    },

    database: {
        tag: '03 / Data',
        title: 'Database Management',

        description:
            'I work with SQL to understand relational databases, retrieve information and manage structured data.',

        points: [
            'SQL queries',
            'Joins and aggregate functions',
            'Database management concepts',
            'Data retrieval and filtering'
        ],

        tech: ['SQL', 'DBMS', 'MySQL']
    },

    design: {
        tag: '04 / Creativity',
        title: 'UI/UX & Web Design',

        description:
            'I focus on creating clean and user-friendly interfaces that provide a smooth browsing experience.',

        points: [
            'Clean visual layouts',
            'Responsive design',
            'Color combinations and typography',
            'User-friendly navigation'
        ],

        tech: ['CSS', 'UI Design', 'Responsive Design']
    },

    problem: {
        tag: '05 / Logic',
        title: 'Problem Solving',

        description:
            'I continuously work on improving my logical thinking and programming approach through hands-on practice.',

        points: [
            'Understanding programming problems',
            'Breaking problems into smaller steps',
            'Writing logical solutions',
            'Practicing Java programming'
        ],

        tech: ['Java', 'Logic Building']
    },

    journey: {
        tag: '06 / Growth',
        title: 'My Learning Journey',

        description:
            'My journey as an aspiring software developer is driven by curiosity, consistent learning and practical implementation.',

        points: [
            'Strengthening programming fundamentals',
            'Exploring frontend development',
            'Learning database concepts',
            'Building practical projects'
        ],

        tech: ['Learning', 'Practice', 'Growth']
    }

};


/*===== MODAL ELEMENTS =====*/

const workCards = document.querySelectorAll('.work__img');

const workModal = document.getElementById('workModal');

const modalTitle = document.getElementById('modalTitle');
const modalTag = document.getElementById('modalTag');

const modalDescription =
    document.getElementById('modalDescription');

const modalList = document.getElementById('modalList');
const modalTech = document.getElementById('modalTech');

const modalClose = document.getElementById('modalClose');

let previousFocusedElement = null;


/*===== OPEN MODAL =====*/

function openWorkModal(topic, card) {

    const data = expertiseData[topic];

    if (!data || !workModal) return;

    previousFocusedElement = card;

    if (modalTag) modalTag.textContent = data.tag;

    if (modalTitle) modalTitle.textContent = data.title;

    if (modalDescription) {
        modalDescription.textContent = data.description;
    }

    // Add key areas
    if (modalList) {

        modalList.replaceChildren();

        data.points.forEach(point => {

            const li = document.createElement('li');

            li.textContent = point;

            modalList.appendChild(li);

        });

    }

    // Add technology badges
    if (modalTech) {

        modalTech.replaceChildren();

        data.tech.forEach(skill => {

            const span = document.createElement('span');

            span.textContent = skill;

            modalTech.appendChild(span);

        });

    }

    // Display modal
    workModal.classList.add('active');

    workModal.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    if (modalClose) modalClose.focus();

}


/*===== CARD CLICK EVENTS =====*/

workCards.forEach(card => {

    card.addEventListener('click', event => {

        event.preventDefault();

        const topic = card.dataset.topic;

        openWorkModal(topic, card);

    });

});


/*===== CLOSE MODAL =====*/

function closeWorkModal() {

    if (!workModal) return;

    workModal.classList.remove('active');

    workModal.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';

    if (previousFocusedElement) {
        previousFocusedElement.focus();
    }

}


/*===== CLOSE BUTTON =====*/

if (modalClose) {

    modalClose.addEventListener('click', closeWorkModal);

}


/*===== CLICK OUTSIDE MODAL =====*/

if (workModal) {

    workModal.addEventListener('click', event => {

        if (event.target === workModal) {
            closeWorkModal();
        }

    });

}


/*===== ESCAPE KEY =====*/

document.addEventListener('keydown', event => {

    if (
        event.key === 'Escape' &&
        workModal &&
        workModal.classList.contains('active')
    ) {
        closeWorkModal();
    }

});




