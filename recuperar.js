// Seleccionamos los elementos del HTML
const formRecuperar = document.getElementById("formRecuperar");
const modalVerificacion = document.getElementById("modalVerificacion");
const btnCloseModal = document.getElementById("btnCloseModal");
const btnAceptarModal = document.getElementById("btnAceptarModal");

// Cuando el usuario le da a "Enviar verificación"
formRecuperar.addEventListener("submit", function(event) {
  event.preventDefault(); 
  modalVerificacion.classList.add("activo"); 
});

// Función para cerrar el modal simplemente (para la "X")
btnCloseModal.addEventListener("click", function() {
  modalVerificacion.classList.remove("activo");
});

// Función para el botón "Aceptar" (cierra el modal y redirige)
btnAceptarModal.addEventListener("click", function() {
  modalVerificacion.classList.remove("activo");
  window.location.href = "Nueva_Contrasena.html"; // Redirige al Login automáticamente
});