document.addEventListener('DOMContentLoaded', () => {

    /* ==================== MENU MOBILE, HEADER STICKY, SLIDER, SCROLL ANIM, FORM ==================== */
    // ... (tout le code précédent pour ces sections reste ici, inchangé)
    // ...
    // ...
    /* ==================== FIN DU CODE PRÉCÉDENT ==================== */


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
            const quantity = parseInt(quantityInput.value) || 1;
            const total = selectedPackage.price * quantity;
            totalPriceEl.textContent = total + '€';
        }

        // 4. Mettre à jour le résumé de commande si un pack est sélectionné
        if (selectedPackage) {
            // Afficher le nom du pack
            summaryDetailsContainer.innerHTML = `
                <div class="order-summary__line-item">
                    <span>Pack sélectionné</span>
                    <strong>${selectedPackage.name}</strong>
                </div>
            `;
            // Remplir le champ caché du formulaire
            packageInput.value = selectedPackage.name;

            // N'afficher le sélecteur de quantité que pour le pack "Miniature Unique"
            if (selectedPackKey === 'unique') {
                quantitySelector.style.display = 'block';
            }

            // Mettre à jour le prix total une première fois
            updateTotalPrice();

        } else {
            totalPriceEl.textContent = '0€';
            summaryDetailsContainer.innerHTML = `<p>Veuillez d'abord sélectionner un pack sur notre <a href="tarifs.html">page des tarifs</a>.</p>`;
        }

        // 5. Ajouter un écouteur d'événement pour le changement de quantité
        quantityInput.addEventListener('input', updateTotalPrice);
    }
});