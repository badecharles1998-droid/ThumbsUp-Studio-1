document.addEventListener('DOMContentLoaded', () => {

    /* ==================== MENU MOBILE (BURGER) ==================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
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
    if(header){
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* ==================== SLIDER PORTFOLIO ==================== */
    const track = document.querySelector('.portfolio__slider-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.slider__btn--next');
        const prevButton = document.querySelector('.slider__btn--prev');

        if (slides.length > 0) {
            let currentIndex = 0;
            const moveToSlide = (currentTrack, targetIndex) => {
                const amountToMove = slides[targetIndex].offsetLeft - slides[0].offsetLeft;
                currentTrack.style.transform = 'translateX(-' + amountToMove + 'px)';
                currentIndex = targetIndex;
            }
            prevButton.addEventListener('click', e => {
                const prevIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
                moveToSlide(track, prevIndex);
            });
            nextButton.addEventListener('click', e => {
                const nextIndex = currentIndex + 1 >= slides.length ? 0 : currentIndex + 1;
                moveToSlide(track, nextIndex);
            });
        }
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
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
    
    /* ==================== GESTION DU FORMULAIRE (SIMPLE) ==================== */
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            alert('Message envoyé ! Nous vous répondrons rapidement.');
            contactForm.reset();
        });
    }

    /* ==================== PAGE COMMANDE DYNAMIQUE (Version 2 avec quantité) ==================== */
    if (document.querySelector('.order-page__container')) {
        
        // 1. Définir les détails des packs avec des prix numériques
        const packages = {
            'unique': { name: 'Miniature Unique', price: 25 },
            'createur': { name: 'Pack Créateur (5 miniatures)', price: 115 },
            'pro': { name: 'Pack Pro (10 miniatures)', price: 220 },
            'agence': { name: 'Pack Agence (20 miniatures)', price: 420 }
        };
        
        // 2. Récupérer les éléments du DOM
        const summaryDetailsContainer = document.getElementById('summary-details');
        const packageInput = document.getElementById('package-input');
        const quantitySelector = document.getElementById('quantity-selector');
        const quantityInput = document.getElementById('quantity-input');
        const totalPriceEl = document.getElementById('total-price');

        // 3. Récupérer le pack de l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const selectedPackKey = urlParams.get('pack');
        const selectedPackage = packages[selectedPackKey];

        // Fonction pour mettre à jour le prix total
        function updateTotalPrice() {
            if (!selectedPackage) return;
            // On s'assure que la quantité est un nombre valide, avec 1 par défaut
            const quantity = Math.max(1, parseInt(quantityInput.value) || 1);
            quantityInput.value = quantity; // On met à jour le champ au cas où une valeur incorrecte était entrée
            
            const total = selectedPackage.price * quantity;
            totalPriceEl.textContent = total + '€';
        }

        // 4. Mettre à jour le résumé de commande si un pack est sélectionné
        if (selectedPackage) {
            summaryDetailsContainer.innerHTML = `
                <div class="order-summary__line-item">
                    <span>Pack sélectionné</span>
                    <strong>${selectedPackage.name}</strong>
                </div>
            `;
            if (packageInput) {
                packageInput.value = selectedPackage.name;
            }

            // N'afficher le sélecteur de quantité que pour le pack "Miniature Unique"
            if (selectedPackKey === 'unique') {
                quantitySelector.style.display = 'block';
            } else {
                quantitySelector.style.display = 'none';
            }

            updateTotalPrice();

        } else {
            totalPriceEl.textContent = '0€';
            summaryDetailsContainer.innerHTML = `<p>Veuillez d'abord sélectionner un pack sur notre <a href="tarifs.html">page des tarifs</a>.</p>`;
            quantitySelector.style.display = 'none';
        }

        // 5. Ajouter un écouteur d'événement pour le changement de quantité
        quantityInput.addEventListener('input', updateTotalPrice);
    }
});