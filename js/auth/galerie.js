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
