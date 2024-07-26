document.getElementById('photoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validatePhotoForm();
});

function validatePhotoForm() {
    const titleInput = document.getElementById('NamePhotoInput');
    const fileInput = document.getElementById('ImageInput');
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSize = 2 * 1024 * 1024; // 2 MB

    const title = titleInput.value.trim();
    const file = fileInput.files[0];

    if (!title) {
        alert('Le titre est requis.');
        return false;
    }

    if (!file) {
        alert('Le fichier image est requis.');
        return false;
    }

    if (!allowedTypes.includes(file.type)) {
        alert('Seuls les fichiers JPEG, PNG et GIF sont autorisés.');
        return false;
    }

    if (file.size > maxFileSize) {
        alert('La taille du fichier ne doit pas dépasser 2 Mo.');
        return false;
    }

    // Si toutes les validations passent, soumettez le formulaire
    document.getElementById('photoForm').submit();
}


document.addEventListener('DOMContentLoaded', () => {
    fetchGalleryImages();
});

function fetchGalleryImages() {
    const apiUrl = "http://127.0.0.1:8000/api/gallery"; // Remplace par l'URL de ton API

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur lors de la récupération des images');
            }
        })
        .then(data => {
            displayGalleryImages(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayGalleryImages(images) {
    const galleryContainer = document.getElementById('gallery-container');
    
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