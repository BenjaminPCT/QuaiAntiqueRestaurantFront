// Définir les variables globales pour le formulaire d'édition de photo
const inputNamePhoto = document.getElementById("NamePhotoInput");
const inputImage = document.getElementById("ImageInput");
const btnSubmit = document.getElementById("submitButton");
const photoForm = document.getElementById("photoForm");

// Ajouter des écouteurs d'événements pour la validation
inputNamePhoto.addEventListener("keyup", validatePhotoForm);
inputImage.addEventListener("change", validatePhotoForm);

// Fonction pour valider le formulaire d'édition de photo
function validatePhotoForm() {
    const nameOk = validateRequired(inputNamePhoto);
    const imageOk = validateFile(inputImage);

    if (nameOk && imageOk) {
        btnSubmit.disabled = false;
    } else {
        btnSubmit.disabled = true;
    }
}

// Fonction pour valider les champs requis
function validateRequired(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.textContent = '';
    }
    
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        showError(input, "Ce champ est requis.");
        return false;
    }
}

// Fonction pour valider le fichier image
function validateFile(input) {
    const file = input.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5 Mo
    const errorElement = input.nextElementSibling;

    if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.textContent = '';
    }

    if (file) {
        // Vérifier le type MIME
        if (!validTypes.includes(file.type)) {
            showError(input, "Type de fichier non autorisé. Les types autorisés sont : JPEG, PNG, GIF.");
            return false;
        }
        // Vérifier la taille du fichier
        if (file.size > maxSize) {
            showError(input, "Le fichier est trop volumineux. La taille maximale autorisée est de 5 Mo.");
            return false;
        }
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        showError(input, "Aucun fichier sélectionné.");
        return false;
    }
}

// Fonction pour afficher les messages d'erreur
function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message";
        input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}


// Fonction pour valider le fichier d'image
function validateFile(input) {
    if (input.files.length > 0) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Ajouter un écouteur d'événement pour la soumission du formulaire
photoForm.addEventListener("submit", handlePhotoFormSubmit);

function handlePhotoFormSubmit(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    const formData = new FormData(photoForm);

    // Vous pouvez envoyer les données du formulaire au serveur ici
    const apiUrl = "http://127.0.0.1:8000/api/galerie";

    fetch(apiUrl, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(text => { throw new Error(text) });
        }
    })
    .then(result => {
        console.log(result);
        alert("Photo enregistrée avec succès !");
        document.getElementById("EditionPhotoModal").modal('hide'); // Fermer le modal
        // Vous pouvez aussi mettre à jour l'affichage des photos ici
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Erreur lors de l'enregistrement de la photo: " + error.message);
    });
}


function displayGalleryImages(images) {
    const galleryContainer = document.getElementById('allImages');

    // Nettoyer le conteneur avant d'ajouter de nouvelles images
    galleryContainer.innerHTML = '';

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.imageUrl; // Assure-toi que `imageUrl` est le bon nom de la propriété
        imgElement.alt = image.title || 'Image de la galerie'; // Utilise un titre si disponible
        imgElement.classList.add('rounded', 'w-100', 'img-sm');

        const titleElement = document.createElement('p');
        titleElement.textContent = image.title || 'Titre'; // Utilise un titre si disponible
        titleElement.classList.add('titre-image');

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions-image-buttons');
        actionsDiv.setAttribute('data-show', 'admin');

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.classList.add('btn', 'btn-outline-light');
        editButton.setAttribute('data-bs-toggle', 'modal');
        editButton.setAttribute('data-bs-target', '#EditionPhotoModal');
        editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList.add('btn', 'btn-outline-light');
        deleteButton.setAttribute('data-bs-toggle', 'modal');
        deleteButton.setAttribute('data-bs-target', '#DeletePhotoModal');
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';

        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);

        const imageCardDiv = document.createElement('div');
        imageCardDiv.classList.add('image-card', 'text-white');
        imageCardDiv.appendChild(imgElement);
        imageCardDiv.appendChild(titleElement);
        imageCardDiv.appendChild(actionsDiv);

        const colDiv = document.createElement('div');
        colDiv.classList.add('col', 'animated', 'p-3');
        colDiv.appendChild(imageCardDiv);

        galleryContainer.appendChild(colDiv);
    });
}


// Fonction de nettoyage HTML pour éviter les attaques XSS
function sanitizeHtml(text) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    return tempDiv.innerHTML;
}

// Fonction pour générer une balise d'image sécurisée
function getImage(titre, urlImage) {
    titre = sanitizeHtml(titre);
    urlImage = sanitizeHtml(urlImage);

    return `<div class="col animated p-3">
                <div class="image-card text-white">
                    <img src="${urlImage}" class="rounded w-100 img-sm" alt="${titre}" />
                    <p class="titre-image">${titre}</p>
                    <div class="actions-image-buttons" data-show="admin">
                        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal"><i class="bi bi-pencil-square"></i></button>
                        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeletePhotoModal"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>`;
}

// Exemple d'images locales
const galerieImage = document.getElementById('allImages');

// Les différentes sources d'images
let imgSources = [
    "../images/plat.jpg", 
    "../images/plat.jpg",
    "../images/plat.jpg",
    "../images/plat.jpg",
    "../images/plat.jpg",
    "../images/plat.jpg",
];

// Construire le HTML pour toutes les images locales
let galerieHTML = '';

imgSources.forEach(src => {
    galerieHTML += getImage('Titre de l\'image', src);
});

// Ajouter le HTML généré à l'élément galerie
galerieImage.innerHTML = galerieHTML;
