const EmailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
    // infos factices donc appeler l'api pour verifier les credentials en BDD//

    if(EmailInput.value == "test@mail.com" && PasswordInput.value == "123"){
        

        // il faudra recuperer le vrai token de l'utilisateur connecté//
        const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";
        setToken(token);

        //placer ce token en cookie //

        setCookie(RoleCookieName, "admin", 7);

        window.location.replace("/");
    }
    else{
        EmailInput.classList.add("is-invalid");
        PasswordInput.classList.add("is-invalid");
    }
}