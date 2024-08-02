const tokenCookieName = "accesstoken";
const roleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");
const apiUrl = "http://127.0.0.1:8000/api/";

signoutBtn.addEventListener("click", signout);
document.addEventListener("DOMContentLoaded", getInfosUser);

function getRole() {
    return getCookie(roleCookieName);
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}
function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);
    window.location.reload("/");
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
        if (c.indexOf(nameEQ) === 0) 
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function isConnected() {
    const token = getToken();
    return token !== null && token !== undefined;
}

function ShowAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();
    
    let allElementsToEdit = document.querySelectorAll('[data-show]');
    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'disconnected':
                if(userConnected){
                    element.classList.add("d-none"); 
                }
                break;
            case 'connected':
                if(!userConnected){
                    element.classList.add("d-none"); 
                }
                break;
            case 'admin':
                if(!userConnected || role != "admin"){
                    element.classList.add("d-none"); 
                }
                break;
            case 'client':
                if(!userConnected || role != "client"){
                    element.classList.add("d-none");
                }
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
    console.log("Récupération des informations utilisateur...");

    const token = getToken();
    if (!token) {
        console.log("Token non trouvé");
        return;
    }

    console.log("Token utilisé pour la requête :", token);

    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(apiUrl + "account/me", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Erreur lors de la récupération des données utilisateur", response.status);
                throw new Error('Unauthorized');
            }
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données utilisateur", error);
            ShowAndHideElementsForRoles();
        });
}




/*
disconnected 
connected (admin ou client) 
    - admin 
    - client
*/


