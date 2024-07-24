//Implémenter le JS de ma page


const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputConfirmPassword = document.getElementById("ConfirmPasswordInput");
const inputAgree = document.getElementById("iAgree");
const btnValidation = document.getElementById("btn-validation-inscription");

inputNom.addEventListener("keyup", validateForm); 
inputPrenom.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputConfirmPassword.addEventListener("keyup", validateForm);
inputAgree.addEventListener("change", validateForm);

function validateForm(){
        const NomOk =  validateRequired(inputNom);
        const PrenomOk =  validateRequired(inputPrenom);
        const EmailOk =   validateMail(inputEmail);
        const PasswordOk =   validatePassword(inputPassword);
        const ConfirmPasswordOk =   validateConfirmPassword(inputPassword,inputConfirmPassword);
        const AgreeOk = inputAgree.checked;

    if(NomOk && PrenomOk && EmailOk && PasswordOk && ConfirmPasswordOk && AgreeOk){
        btnValidation.disabled = false;
    }
    else{
        btnValidation.disabled = true;
    }
}


function validateRequired(input){
    if(input.value != ''){
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

function validateMail(input){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(input.value.match(emailRegex)){
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
