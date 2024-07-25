 // Sélectionner les éléments du formulaire
 const menuTitle1 = document.getElementById("menu1-title");
 const menuPrice1 = document.getElementById("menu1-price");
 const menuEntries1 = document.getElementById("menu1-entries");
 const menuDishes1 = document.getElementById("menu1-dishes");
 const menuDesserts1 = document.getElementById("menu1-desserts");

 const menuTitle2 = document.getElementById("menu2-title");
 const menuPrice2 = document.getElementById("menu2-price");
 const menuEntries2 = document.getElementById("menu2-entries");
 const menuDishes2 = document.getElementById("menu2-dishes");
 const menuCheeses2 = document.getElementById("menu2-cheeses");
 const menuDesserts2 = document.getElementById("menu2-desserts");

 const menuTitle3 = document.getElementById("menu3-title");
 const menuPrice3 = document.getElementById("menu3-price");
 const menuEntries3 = document.getElementById("menu3-entries");
 const menuDishes3 = document.getElementById("menu3-dishes");
 const menuCheeses3 = document.getElementById("menu3-cheeses");
 const menuDesserts3 = document.getElementById("menu3-desserts");

 const saveChangesBtn = document.getElementById("saveChangesBtn");

 // Ajouter les écouteurs d'événements pour chaque champ
 [menuTitle1, menuPrice1, menuEntries1, menuDishes1, menuDesserts1,
  menuTitle2, menuPrice2, menuEntries2, menuDishes2, menuCheeses2, menuDesserts2,
  menuTitle3, menuPrice3, menuEntries3, menuDishes3, menuCheeses3, menuDesserts3]
 .forEach(element => {
     element.addEventListener("keyup", validateForm);
     element.addEventListener("change", validateForm); // Inclure 'change' pour les <textarea>
 });

 // Fonction de validation du formulaire
 function validateForm() {
     const title1Ok = validateRequired(menuTitle1);
     const price1Ok = validatePrice(menuPrice1);
     const entries1Ok = validateRequired(menuEntries1);
     const dishes1Ok = validateRequired(menuDishes1);
     const desserts1Ok = validateRequired(menuDesserts1);

     const title2Ok = validateRequired(menuTitle2);
     const price2Ok = validatePrice(menuPrice2);
     const entries2Ok = validateRequired(menuEntries2);
     const dishes2Ok = validateRequired(menuDishes2);
     const cheeses2Ok = validateRequired(menuCheeses2);
     const desserts2Ok = validateRequired(menuDesserts2);

     const title3Ok = validateRequired(menuTitle3);
     const price3Ok = validatePrice(menuPrice3);
     const entries3Ok = validateRequired(menuEntries3);
     const dishes3Ok = validateRequired(menuDishes3);
     const cheeses3Ok = validateRequired(menuCheeses3);
     const desserts3Ok = validateRequired(menuDesserts3);

     if (title1Ok && price1Ok && entries1Ok && dishes1Ok && desserts1Ok &&
         title2Ok && price2Ok && entries2Ok && dishes2Ok && cheeses2Ok && desserts2Ok &&
         title3Ok && price3Ok && entries3Ok && dishes3Ok && cheeses3Ok && desserts3Ok) {
         saveChangesBtn.disabled = false;
     } else {
         saveChangesBtn.disabled = true;
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

 function validatePrice(input) {
     const priceRegex = /^\d+(\.\d{2})?$/;
     if (priceRegex.test(input.value.trim())) {
         input.classList.add("is-valid");
         input.classList.remove("is-invalid");
         return true;
     } else {
         input.classList.remove("is-valid");
         input.classList.add("is-invalid");
         return false;
     }
 }

