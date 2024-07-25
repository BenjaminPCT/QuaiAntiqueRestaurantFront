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
    if (input.value.trim() !== '') {
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
    if (emailRegex.test(input.value.trim())) {
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
    // Ajouter votre propre logique de validation des mots de passe ici
    if (input.value.trim().length >= 8) {
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
    if (passwordInput.value === confirmPasswordInput.value && confirmPasswordInput.value.trim() !== '') {
        confirmPasswordInput.classList.add("is-valid");
        confirmPasswordInput.classList.remove("is-invalid");
        return true;
    } else {
        confirmPasswordInput.classList.remove("is-valid");
        confirmPasswordInput.classList.add("is-invalid");
        return false;
    }
}



function validatePassword(input){
//Définir mon regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
const passwordUser = input.value;
if(passwordUser.match(passwordRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
}
else{
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
}
}
function validateConfirmPassword(inputPassword, inputConfirmPassword){
if(inputPassword.value == inputConfirmPassword.value){
    inputConfirmPassword.classList.add("is-valid");
    inputConfirmPassword.classList.remove("is-invalid");
    return true;
}
else{
    inputConfirmPassword.classList.add("is-invalid");
    inputConfirmPassword.classList.remove("is-valid");
    return false;
}
}
