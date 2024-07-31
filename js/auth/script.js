const tokenCookieName = "accesstoken";
const roleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");
const apiUrl = "http://127.0.0.1:8000/api/";

signoutBtn.addEventListener("click", signout);

document.addEventListener("DOMContentLoaded", () => {
    getInfosUser();
});

function getRole() {
    return getCookie(roleCookieName);
}

function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);
    window.location.replace("/");  // rediriger vers la page d'accueil
}

function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected() {
    const token = getToken();
    return token !== null && token !== undefined;
}

function ShowAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();
    console.log("Utilisateur connecté :", userConnected);
    console.log("Rôle :", role);

    const allElementsToEdit = document.querySelectorAll('[data-show]');
    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'disconnected':
                element.classList.toggle("d-none", userConnected);
                break;
            case 'connected':
                element.classList.toggle("d-none", !userConnected);
                break;
            case 'admin':
                element.classList.toggle("d-none", !userConnected || role !== "ROLE_ADMIN");
                break;
            case 'client':
                element.classList.toggle("d-none", !userConnected || role !== "ROLE_USER");
                break;
        }
    });
}

function sanitizeHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}

function getInfosUser() {
    console.log("Récupération des informations utilisateur");
    const token = getToken();
    console.log("Token récupéré :", token);

    if (!token) {
        console.log("Aucun token trouvé, utilisateur non connecté");
        ShowAndHideElementsForRoles();
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", token);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(apiUrl + "account/me", requestOptions)
        .then(response => {
            console.log("Réponse reçue :", response);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Impossible de récupérer les informations utilisateur");
            }
        })
        .then(result => {
            console.log("Informations utilisateur :", result);
            // Stocker le premier rôle de l'utilisateur dans un cookie ou une variable globale
            if (result.roles && result.roles.length > 0) {
                setRole(result.roles[0]);
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données utilisateur", error);
        })
        .finally(() => {
            // Afficher/Masquer les éléments selon le rôle
            ShowAndHideElementsForRoles();
        });
}

function setRole(role) {
    setCookie(roleCookieName, role, 7);
}

