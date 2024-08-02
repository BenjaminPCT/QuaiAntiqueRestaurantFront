// Fonction de nettoyage HTML pour éviter les attaques XSS
function sanitizeHtml(text) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    return tempDiv.innerHTML;
}

const EmailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");
const RoleCookieName = "role";

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(event) {
    event.preventDefault();

    const dataForm = new FormData(signinForm);
    const apiUrl = "http://127.0.0.1:8000/api/login";

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": sanitizeHtml(dataForm.get('email')),
        "password": sanitizeHtml(dataForm.get('mdp')),
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                EmailInput.classList.add("is-invalid");
                PasswordInput.classList.add("is-invalid");
                throw new Error('Login failed');
            }
        })
        .then(result => {
            console.log("Connexion réussie :", result);
            const token = result.apiToken;
            console.log("Token reçu :", token);
            setToken(token);
            setCookie(RoleCookieName, result.roles[0], 7);
            window.location.replace("/");
            alert("Connexion réussie ! Vous êtes maintenant connecté.");
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Erreur lors de la connexion: " + error.message);
        });
}

// Fonction pour définir un cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Fonction pour définir le token (ajustez en fonction de votre logique)
function setToken(token) {
    localStorage.setItem('authToken', token);
}


