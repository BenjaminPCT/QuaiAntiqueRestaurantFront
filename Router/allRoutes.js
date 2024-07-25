import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/galerie", "La Galerie", "/pages/galerie.html", []),
    new Route("/menu", "La Carte", "/pages/menu.html", []),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"] ,"js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"] ,"js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["client", "admin"], "js/auth/account.js"),
    new Route("/resaTable", "Reservation", "/pages/reservations/resaTable.html", ["client"]),
    new Route("/allResa", "Les reservations", "/pages/reservations/allResa.html", ["client"]),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";