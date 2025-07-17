// Attendre que le contenu du DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {

    /* ==================== MENU MOBILE (BURGER) ==================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    // Afficher le menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Cacher le menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
    
    // Cacher le menu quand on clique sur un lien (pour les sites one-page)
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
             if (navMenu.classList.contains('show-menu')) {
                 navMenu.classList.remove('show-menu');
             }
        });
    });


    /* ==================== HEADER "STICKY" AU DÉFILEMENT ==================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==================== SLIDER PORTFOLIO ==================== */
    const track = document.querySelector('.portfolio__slider-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.slider__btn--next');
    const prevButton = document.querySelector('.slider__btn--prev');

    if (track && slides.length > 0) {
        const slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0;

        // Positionner les slides côte à côte
        const setSlidePosition = (slide, index) => {
            // Pas nécessaire avec flexbox, mais utile si on utilisait 'position: absolute'
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (currentTrack, targetIndex) => {
            const amountToMove = slides[targetIndex].offsetLeft - slides[0].offsetLeft;
            currentTrack.style.transform = 'translateX(-' + amountToMove + 'px)';
            currentIndex = targetIndex;
        }

        // Au clic sur le bouton "précédent"
        prevButton.addEventListener('click', e => {
            const prevIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
            moveToSlide(track, prevIndex);
        });

        // Au clic sur le bouton "suivant"
        nextButton.addEventListener('click', e => {
            const nextIndex = currentIndex + 1 >= slides.length ? 0 : currentIndex + 1;
            moveToSlide(track, nextIndex);
        });
    }

    /* ==================== ANIMATION AU DÉFILEMENT (SCROLL) ==================== */
    const scrollElements = document.querySelectorAll('.reveal-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Lancer une première fois au chargement
    handleScrollAnimation();
    // Et écouter le scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    /* ==================== GESTION DU FORMULAIRE (SIMPLE) ==================== */
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            
            // NOTE : Pour envoyer un vrai email, un backend (PHP, Node.js) ou un service tiers (EmailJS, Formspree) est nécessaire.
            // Ceci est une simulation pour l'expérience utilisateur.
            
            alert('Merci pour votre commande ! Nous vous recontacterons très prochainement.');
            contactForm.reset(); // Réinitialise le formulaire
        });
    }
});