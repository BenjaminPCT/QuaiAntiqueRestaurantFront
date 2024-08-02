 // Fonction de nettoyage HTML pour éviter les attaques XSS
 function sanitizeHtml(text) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    return tempDiv.innerHTML;
}

// Sélectionner les éléments du DOM
const newpwdInput = document.getElementById("newpwdInput");
const valpwdedit = document.getElementById("valpwdedit");
const btnEdit = document.getElementById("btnedit");

// Ajouter les événements de saisie
newpwdInput.addEventListener("keyup", validateForm);
valpwdedit.addEventListener("keyup", validateForm);
btnEdit.addEventListener("click", handleSubmit);

function validateForm() {
    const PasswordOk = validatePassword(newpwdInput);
    const ConfirmPasswordOk = validateConfirmPassword(newpwdInput, valpwdedit);

    // Activer ou désactiver le bouton en fonction de la validation
    if (PasswordOk && ConfirmPasswordOk) {
        btnEdit.disabled = false;
    } else {
        btnEdit.disabled = true;
    }
}

function validatePassword(input) {
    // Définir le regex pour le mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

    // Nettoyer la valeur d'entrée avant la validation
    const sanitizedPassword = sanitizeHtml(input.value);

    if (sanitizedPassword.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateConfirmPassword(newpwdInput, valpwdedit) {
    // Nettoyer les valeurs d'entrée avant la comparaison
    const sanitizedNewPwd = sanitizeHtml(newpwdInput.value);
    const sanitizedConfirmPwd = sanitizeHtml(valpwdedit.value);

    if (sanitizedNewPwd === sanitizedConfirmPwd) {
        valpwdedit.classList.add("is-valid");
        valpwdedit.classList.remove("is-invalid");
        return true;
    } else {
        valpwdedit.classList.add("is-invalid");
        valpwdedit.classList.remove("is-valid");
        return false;
    }
}

function handleSubmit() {
    // Vérifier si le bouton n'est pas désactivé avant de rediriger
    if (!btnEdit.disabled) {
        alert("Mot de passe mis à jour avec succès. Vous allez être redirigé vers la page de connexion.");
        window.location.href = "/signin"; // Remplacez "/signin" par l'URL réelle de la page de connexion
    }
}
