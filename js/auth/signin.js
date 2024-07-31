// Sélectionner les éléments du DOM
const EmailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

// Fonction pour vérifier les identifiants de connexion
function checkCredentials() {
    const dataForm = new FormData(signinForm);
    const apiUrl = "http://127.0.0.1:8000/api/login";

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": dataForm.get('email'),  // Assure-toi que 'email' correspond au nom de ton champ
        "password": dataForm.get('mdp'),    // Assure-toi que 'mdp' correspond au nom de ton champ
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl, requestOptions)  // Assure-toi que l'URL de l'API est correcte
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
            else {
                EmailInput.classList.add("is-invalid");
                PasswordInput.classList.add("is-invalid");
            }
        })
        .then(result => {
            // Assumer que `result` contient les informations nécessaires après connexion
            const token = result.apiToken; // Remplace `result.token` par le chemin correct pour récupérer le token
            setToken(token);
            setCookie (RoleCookieName, result.roles [0], 7); // 'role' est le nom du cookie
            window.location.replace("/");  // Rediriger après connexion réussie
            alert("Connexion réussie ! Vous êtes maintenant connecté.");
        })
        .catch(error => {
            console.error('Error:', error);
            EmailInput.classList.add("is-invalid");
            PasswordInput.classList.add("is-invalid");
            alert("Erreur lors de la connexion: " + error.message);
        });
}

// Attacher l'événement de clic au bouton de connexion
btnSignin.addEventListener('click', checkCredentials);
