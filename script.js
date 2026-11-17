/* =========================================================
   BOULEVARD VIP
   JavaScript principal
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. ANIMATION D'APPARITION AU SCROLL
       ===================================================== */

    const elementsAAnimer = document.querySelectorAll(
        ".carte, .carte-menu, .carte-acces, .etape, " +
        ".contenu-apropos, .section-cta, .bloc-localisation, " +
        ".grille-galerie .image-galerie img, .information-item, " +
        ".formulaire-contact, .formulaire-commande"
    );

    if ("IntersectionObserver" in window) {

        const observerAnimation = new IntersectionObserver(
            (elements) => {

                elements.forEach((element) => {

                    if (element.isIntersecting) {

                        element.target.classList.add("apparition");

                        observerAnimation.unobserve(element.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        elementsAAnimer.forEach((element) => {
            observerAnimation.observe(element);
        });

    } else {

        /* Compatibilité avec les anciens navigateurs */

        elementsAAnimer.forEach((element) => {
            element.classList.add("apparition");
        });

    }


    /* =====================================================
       2. NAVIGATION MOBILE
       ===================================================== */

    const navigation = document.querySelector(".navigation");

    if (navigation) {

        const boutonMenu = document.createElement("button");

        boutonMenu.className = "bouton-menu-mobile";
        boutonMenu.setAttribute("aria-label", "Ouvrir le menu");
        boutonMenu.setAttribute("aria-expanded", "false");

        boutonMenu.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        const headerConteneur =
            document.querySelector(".conteneur-header");

        if (headerConteneur) {
            headerConteneur.appendChild(boutonMenu);
        }

        boutonMenu.addEventListener("click", () => {

            navigation.classList.toggle("menu-ouvert");

            const menuOuvert =
                navigation.classList.contains("menu-ouvert");

            boutonMenu.setAttribute(
                "aria-expanded",
                menuOuvert
            );

            boutonMenu.setAttribute(
                "aria-label",
                menuOuvert
                    ? "Fermer le menu"
                    : "Ouvrir le menu"
            );

        });


        /* Fermer le menu après clic */

        navigation.querySelectorAll("a").forEach((lien) => {

            lien.addEventListener("click", () => {

                navigation.classList.remove("menu-ouvert");

                boutonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                boutonMenu.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

            });

        });

    }


    /* =====================================================
       3. NAVIGATION ACTIVE
       ===================================================== */

    const pageActuelle =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navigation a").forEach((lien) => {

        const destination =
            lien.getAttribute("href");

        if (!destination) return;

        const pageLien =
            destination.split("#")[0];

        if (
            pageLien === pageActuelle ||
            (pageActuelle === "" && pageLien === "index.html")
        ) {

            lien.classList.add("actif");

        }

    });


    /* =====================================================
       4. DÉFILEMENT FLUIDE
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((lien) => {

        lien.addEventListener("click", (event) => {

            const cibleID =
                lien.getAttribute("href");

            if (
                !cibleID ||
                cibleID === "#"
            ) {
                return;
            }

            let cible = null;

            try {
                cible = document.querySelector(cibleID);
            } catch (erreur) {
                return;
            }

            if (!cible) return;

            event.preventDefault();

            cible.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       5. HEADER QUI CHANGE AU SCROLL
       ===================================================== */

    const header =
        document.querySelector(".header");

    if (header) {

        const gererHeader = () => {

            if (window.scrollY > 80) {

                header.classList.add("header-scrolle");

            } else {

                header.classList.remove("header-scrolle");

            }

        };

        window.addEventListener(
            "scroll",
            gererHeader,
            { passive: true }
        );

        gererHeader();

    }


    /* =====================================================
       6. BOUTON RETOUR EN HAUT
       ===================================================== */

    const boutonHaut =
        document.createElement("button");

    boutonHaut.className = "retour-haut";
    boutonHaut.innerHTML = "↑";

    boutonHaut.setAttribute(
        "aria-label",
        "Retour en haut"
    );

    document.body.appendChild(boutonHaut);


    const gererBoutonHaut = () => {

        if (window.scrollY > 500) {

            boutonHaut.classList.add("visible");

        } else {

            boutonHaut.classList.remove("visible");

        }

    };

    window.addEventListener(
        "scroll",
        gererBoutonHaut,
        { passive: true }
    );

    gererBoutonHaut();


    boutonHaut.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       7. GALERIE : OUVERTURE DES PHOTOS EN GRAND
       ===================================================== */

    const imagesGalerie =
        document.querySelectorAll(
            ".grille-galerie .image-galerie img"
        );


    if (imagesGalerie.length > 0) {

        const visionneuse =
            document.createElement("div");

        visionneuse.className =
            "visionneuse";

        visionneuse.innerHTML = `
            <button class="fermer-visionneuse"
                    aria-label="Fermer">
                ×
            </button>

            <img src="" alt="Photo Boulevard VIP">

            <p class="legende-visionneuse"></p>
        `;

        document.body.appendChild(visionneuse);


        const grandeImage =
            visionneuse.querySelector("img");

        const legende =
            visionneuse.querySelector(
                ".legende-visionneuse"
            );

        const boutonFermer =
            visionneuse.querySelector(
                ".fermer-visionneuse"
            );


        imagesGalerie.forEach((image) => {

            image.style.cursor = "zoom-in";

            image.addEventListener("click", () => {

                grandeImage.src =
                    image.src;

                grandeImage.alt =
                    image.alt || "Boulevard VIP";

                legende.textContent =
                    image.alt || "";

                visionneuse.classList.add("ouverte");

                document.body.classList.add(
                    "visionneuse-active"
                );

            });

        });


        const fermerVisionneuse = () => {

            visionneuse.classList.remove(
                "ouverte"
            );

            document.body.classList.remove(
                "visionneuse-active"
            );

        };


        boutonFermer.addEventListener(
            "click",
            fermerVisionneuse
        );


        visionneuse.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === visionneuse
                ) {

                    fermerVisionneuse();

                }

            }
        );


        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    fermerVisionneuse();

                }

            }
        );

    }


    /* =====================================================
       8. CATÉGORIES DU MENU
       ===================================================== */

    const boutonsCategories =
        document.querySelectorAll(
            ".menu-section .actions-cta a"
        );


    boutonsCategories.forEach((bouton) => {

        bouton.addEventListener(
            "click",
            () => {

                boutonsCategories.forEach(
                    (element) => {

                        element.classList.remove(
                            "categorie-active"
                        );

                    }
                );

                bouton.classList.add(
                    "categorie-active"
                );

            }
        );

    });


    /* =====================================================
       9. FORMULAIRE DE CONTACT
       ===================================================== */

    const formulaireContact =
        document.querySelector(
            ".formulaire-contact"
        );


    if (formulaireContact) {

        formulaireContact.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const nom =
                    formulaireContact.querySelector(
                        '[name="nom"]'
                    );

                const telephone =
                    formulaireContact.querySelector(
                        '[name="telephone"]'
                    );

                const message =
                    formulaireContact.querySelector(
                        '[name="message"]'
                    );


                if (
                    nom &&
                    nom.value.trim() === ""
                ) {

                    afficherMessage(
                        "Veuillez renseigner votre nom.",
                        "erreur"
                    );

                    nom.focus();

                    return;

                }


                if (
                    telephone &&
                    telephone.value.trim() === ""
                ) {

                    afficherMessage(
                        "Veuillez renseigner votre numéro.",
                        "erreur"
                    );

                    telephone.focus();

                    return;

                }


                if (
                    message &&
                    message.value.trim() === ""
                ) {

                    afficherMessage(
                        "Veuillez écrire votre message.",
                        "erreur"
                    );

                    message.focus();

                    return;

                }


                afficherMessage(
                    "Merci ! Votre message a bien été préparé. Nous vous répondrons prochainement.",
                    "succes"
                );

                formulaireContact.reset();

            }
        );

    }


    /* =====================================================
       10. FORMULAIRE DE COMMANDE
       ===================================================== */

    const formulaireCommande =
        document.querySelector(
            ".formulaire-commande"
        );


    if (formulaireCommande) {

        formulaireCommande.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const nom =
                    formulaireCommande.querySelector(
                        '[name="nom"]'
                    );

                const telephone =
                    formulaireCommande.querySelector(
                        '[name="telephone"]'
                    );

                const adresse =
                    formulaireCommande.querySelector(
                        '[name="adresse"]'
                    );


                if (
                    nom &&
                    nom.value.trim() === ""
                ) {

                    afficherMessage(
                        "Veuillez renseigner votre nom.",
                        "erreur"
                    );

                    nom.focus();

                    return;

                }


                if (
                    telephone &&
                    telephone.value.trim() === ""
                ) {

                    afficherMessage(
                        "Veuillez renseigner votre numéro.",
                        "erreur"
                    );

                    telephone.focus();

                    return;

                }


                if (
                    adresse &&
                    adresse.value.trim() === ""
                ) {

                    afficherMessage(
                        "Veuillez renseigner votre adresse.",
                        "erreur"
                    );

                    adresse.focus();

                    return;

                }


                afficherMessage(
                    "Votre commande est prête à être traitée. Boulevard VIP vous remercie !",
                    "succes"
                );

            }
        );

    }


    /* =====================================================
       11. SYSTÈME DE MESSAGE
       ===================================================== */

    function afficherMessage(
        texte,
        type
    ) {

        const ancienMessage =
            document.querySelector(
                ".message-site"
            );


        if (ancienMessage) {
            ancienMessage.remove();
        }


        const message =
            document.createElement("div");

        message.className =
            `message-site ${type}`;

        message.textContent =
            texte;

        document.body.appendChild(message);


        setTimeout(() => {

            message.classList.add(
                "message-visible"
            );

        }, 50);


        setTimeout(() => {

            message.classList.remove(
                "message-visible"
            );


            setTimeout(() => {

                message.remove();

            }, 400);

        }, 4500);

    }


    /* =====================================================
       12. LIENS WHATSAPP
       ===================================================== */

    const numeroWhatsApp =
        "227919999991";


    document.querySelectorAll(
        "[data-whatsapp]"
    ).forEach((bouton) => {

        bouton.addEventListener(
            "click",
            () => {

                const message =
                    bouton.dataset.whatsapp ||
                    "Bonjour Boulevard VIP, je souhaite passer une commande.";


                const url =
                    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;


                window.open(
                    url,
                    "_blank"
                );

            }
        );

    });


    /* =====================================================
       13. ANIMATION DES NUMÉROS / ÉTAPES
       ===================================================== */

    const etapes =
        document.querySelectorAll(".etape");


    etapes.forEach((etape, index) => {

        etape.style.transitionDelay =
            `${index * 100}ms`;

    });


    /* =====================================================
       14. ANNÉE AUTOMATIQUE DU FOOTER
       ===================================================== */

    const annee =
        new Date().getFullYear();


    document.querySelectorAll(
        ".annee-actuelle"
    ).forEach((element) => {

        element.textContent =
            annee;

    });

});