const estadoReporte = document.getElementById("estadoReporte");
const opcionesEstado = document.querySelectorAll(".opcion-estado");
const btnAbrirConfirmacion = document.getElementById("btnAbrirConfirmacion");
const modalConfirmacion = document.getElementById("modalConfirmacion");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const btnCancelarModal = document.getElementById("btnCancelarModal");
const btnGuardarCambios = document.getElementById("btnGuardarCambios");
const textoNuevoEstado = document.getElementById("textoNuevoEstado");

const estadoResumen = document.getElementById("estadoResumen");
const estadoProgresoPrincipal = document.getElementById("estadoProgresoPrincipal");
const textoProgresoPrincipal = document.getElementById("textoProgresoPrincipal");
const fechaProgresoPrincipal = document.getElementById("fechaProgresoPrincipal");

let nuevoEstado = "revision";

const nombresEstado = {
  recibido: "Recibido",
  revision: "En revisión",
  derivado: "Derivado",
  atendido: "Atendido"
};

const textosProgreso = {
  recibido: "El reporte fue recibido por la entidad.",
  revision: "La entidad está evaluando la información del caso.",
  derivado: "El caso fue derivado a una entidad aliada.",
  atendido: "La entidad registró la atención del caso."
};

function seleccionarEstado(estado) {
  nuevoEstado = estado;
  estadoReporte.value = estado;

  opcionesEstado.forEach(function (opcion) {
    opcion.classList.remove("activo");

    const check = opcion.querySelector("img");
    if (check) {
      check.remove();
    }

    if (opcion.dataset.estado === estado) {
      opcion.classList.add("activo");

      const iconoCheck = document.createElement("img");
      iconoCheck.src = "icons/check-azul.png";
      iconoCheck.alt = "Seleccionado";

      opcion.appendChild(iconoCheck);
    }
  });
}

opcionesEstado.forEach(function (opcion) {
  opcion.addEventListener("click", function () {
    seleccionarEstado(opcion.dataset.estado);
  });
});

estadoReporte.addEventListener("change", function () {
  seleccionarEstado(estadoReporte.value);
});

btnAbrirConfirmacion.addEventListener("click", function () {
  textoNuevoEstado.textContent = "“" + nombresEstado[nuevoEstado] + "”";
  modalConfirmacion.classList.add("activo");
});

function cerrarModal() {
  modalConfirmacion.classList.remove("activo");
}

btnCerrarModal.addEventListener("click", cerrarModal);
btnCancelarModal.addEventListener("click", cerrarModal);

modalConfirmacion.addEventListener("click", function (evento) {
  if (evento.target === modalConfirmacion) {
    cerrarModal();
  }
});

btnGuardarCambios.addEventListener("click", function () {
  estadoResumen.textContent = nombresEstado[nuevoEstado];
  estadoProgresoPrincipal.textContent = nombresEstado[nuevoEstado];
  textoProgresoPrincipal.textContent = textosProgreso[nuevoEstado];
  fechaProgresoPrincipal.textContent = "26 may. 2026, 10:35 a.m.";

  estadoResumen.className = "estado-actual-badge";

  if (nuevoEstado === "atendido") {
    estadoResumen.classList.add("estado-atendido-final");
  }

  cerrarModal();

  setTimeout(function () {
    window.location.href = "Reportes_Entidad.html";
  }, 500);
});

seleccionarEstado("revision");