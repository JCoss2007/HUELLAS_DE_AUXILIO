const btnGuardarContacto = document.getElementById("btnGuardarContacto");

btnGuardarContacto.addEventListener("click", function () {
  btnGuardarContacto.textContent = "Contacto guardado";
  btnGuardarContacto.classList.add("guardado");
});