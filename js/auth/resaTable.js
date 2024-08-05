document.addEventListener("DOMContentLoaded", () => {
    if (!isConnected() || getRole() !== 'ROLE_USER') {
        // Redirige vers la page de connexion ou affiche une erreur
        window.location.replace("/signin");
    } else {
        // Continue avec le chargement de la page si l'utilisateur est connecté et a le rôle approprié
        console.log("Accès autorisé à la page de réservation");
        // Ici, ajoutez le code pour initialiser votre page de réservation
    }
});

// Fonction utilitaire pour obtenir le rôle de l'utilisateur
function getRole() {
    return getCookie('role');
}

// Fonction utilitaire pour vérifier si l'utilisateur est connecté
function isConnected() {
    return getCookie('accesstoken') !== null;
}

// Fonction utilitaire pour obtenir un cookie
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
