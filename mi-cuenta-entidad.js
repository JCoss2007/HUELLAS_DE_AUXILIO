const botonesEditar = document.querySelectorAll(".btn-editar");

botonesEditar.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const nombreCard = boton.dataset.editar;
    const card = document.querySelector('[data-card="' + nombreCard + '"]');

    if (!card.classList.contains("card-editando")) {
      activarEdicion(card, boton);
    } else {
      guardarEdicion(card, boton);
    }
  });
});

function activarEdicion(card, boton) {
  const campos = card.querySelectorAll("[data-campo]");

  card.classList.add("card-editando");
  boton.textContent = "Guardar";

  campos.forEach(function (campo) {
    const valorActual = campo.textContent.trim();
    const nombreCampo = campo.dataset.campo;

    const input = document.createElement("input");
    input.type = "text";
    input.value = valorActual;
    input.dataset.campo = nombreCampo;

    campo.replaceWith(input);
  });
}

function guardarEdicion(card, boton) {
  const inputs = card.querySelectorAll("input[data-campo]");

  inputs.forEach(function (input) {
    const nuevoTexto = document.createElement("p");
    nuevoTexto.dataset.campo = input.dataset.campo;

    if (input.value.trim() === "") {
      nuevoTexto.textContent = "Sin información";
    } else {
      nuevoTexto.textContent = input.value.trim();
    }

    input.replaceWith(nuevoTexto);
  });

  card.classList.remove("card-editando");
  boton.textContent = "Editar";
}