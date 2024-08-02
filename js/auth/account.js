// Fonction de nettoyage HTML pour éviter les attaques XSS
function sanitizeHtml(text) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    return tempDiv.innerHTML;
}

// Sélectionner les éléments de la modale
const inputModifNom = document.getElementById("ModifNomInput");
const inputModifPrenom = document.getElementById("ModifPrenomInput");
const inputModifAllergies = document.getElementById("ModifAllergiesInput");
const inputModifEmail = document.getElementById("ModifEmailInput");
const inputModifPassword = document.getElementById("ModifPasswordInput");
const inputModifConfirmPassword = document.getElementById("ModifConfirmPasswordInput");
const btnSauvegarde = document.getElementById("btn-sauvegarde-infos");

// Ajouter les écouteurs d'événements pour chaque champ
inputModifNom.addEventListener("keyup", validateForm);
inputModifPrenom.addEventListener("keyup", validateForm);
inputModifAllergies.addEventListener("keyup", validateForm);
inputModifEmail.addEventListener("keyup", validateForm);
inputModifPassword.addEventListener("keyup", validateForm);
inputModifConfirmPassword.addEventListener("keyup", validateForm);

// Fonction de validation du formulaire
function validateForm() {
    const NomOk = validateRequired(inputModifNom);
    const PrenomOk = validateRequired(inputModifPrenom);
    const AllergiesOk = validateRequired(inputModifAllergies);
    const EmailOk = validateEmail(inputModifEmail);
    const PasswordOk = validatePassword(inputModifPassword);
    const ConfirmPasswordOk = validateConfirmPassword(inputModifPassword, inputModifConfirmPassword);

    if (NomOk && PrenomOk && AllergiesOk && EmailOk && PasswordOk && ConfirmPasswordOk) {
        btnSauvegarde.disabled = false;
    } else {
        btnSauvegarde.disabled = true;
    }
}

// Fonctions de validation des champs
function validateRequired(input) {
    if (sanitizeHtml(input.value.trim()) !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(sanitizeHtml(input.value.trim()))) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (passwordRegex.test(sanitizeHtml(input.value.trim()))) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateConfirmPassword(passwordInput, confirmPasswordInput) {
    if (sanitizeHtml(passwordInput.value) === sanitizeHtml(confirmPasswordInput.value) && sanitizeHtml(confirmPasswordInput.value.trim()) !== '') {
        confirmPasswordInput.classList.add("is-valid");
        confirmPasswordInput.classList.remove("is-invalid");
        return true;
    } else {
        confirmPasswordInput.classList.remove("is-valid");
        confirmPasswordInput.classList.add("is-invalid");
        return false;
    }
}
