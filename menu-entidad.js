const btnMenu = document.getElementById("btnMenu");
const btnCerrarMenu = document.getElementById("btnCerrarMenu");
const menuMobile = document.getElementById("menuMobile");

btnMenu.addEventListener("click", function () {
  menuMobile.classList.add("activo");
});

btnCerrarMenu.addEventListener("click", function () {
  menuMobile.classList.remove("activo");
});