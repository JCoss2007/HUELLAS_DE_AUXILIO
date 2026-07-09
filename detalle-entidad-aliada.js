const btnAbrirModal = document.getElementById("btnAbrirModal");
const modalDerivar = document.getElementById("modalDerivar");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const btnCancelarModal = document.getElementById("btnCancelarModal");
const tiposApoyo = document.querySelectorAll(".tipo-apoyo");

function abrirModal() {
  modalDerivar.classList.add("activo");
}

function cerrarModal() {
  modalDerivar.classList.remove("activo");
}

btnAbrirModal.addEventListener("click", abrirModal);
btnCerrarModal.addEventListener("click", cerrarModal);
btnCancelarModal.addEventListener("click", cerrarModal);

modalDerivar.addEventListener("click", function (evento) {
  if (evento.target === modalDerivar) {
    cerrarModal();
  }
});

tiposApoyo.forEach(function (tipo) {
  tipo.addEventListener("click", function () {
    tiposApoyo.forEach(function (item) {
      item.classList.remove("activo");
    });

    tipo.classList.add("activo");

    const radio = tipo.querySelector("input");
    radio.checked = true;
  });
});