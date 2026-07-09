const inputDireccion = document.getElementById("direccion");
const inputDistrito = document.getElementById("distrito");
const inputReferencia = document.getElementById("referencia");

const mapaInteractivo = document.getElementById("mapaInteractivo");
const pinMapa = document.getElementById("pinMapa");
const btnElegirUbicacion = document.getElementById("btnElegirUbicacion");
const btnIrDetalles = document.getElementById("btnIrDetalles");

const btnAbrirFotos = document.getElementById("btnAbrirFotos");
const btnAbrirVideos = document.getElementById("btnAbrirVideos");

const modalFotos = document.getElementById("modalFotos");
const modalVideos = document.getElementById("modalVideos");

const botonesCerrarModal = document.querySelectorAll(".btn-cerrar-modal");
const opcionesFoto = document.querySelectorAll(".opcion-foto");
const opcionesVideo = document.querySelectorAll(".opcion-video");

const previewEvidencia = document.getElementById("previewEvidencia");

let evidencias = [];

const ubicacionesSimuladas = [
  {
    distritoTexto: "Lince",
    direccion: "Av. Arequipa, frente al parque",
    referencia: "Cerca al Colegio San Agustín",
    left: 52,
    top: 48
  },
  {
    distritoTexto: "Santiago de Surco",
    direccion: "Av. Caminos del Inca 1250",
    referencia: "Frente a una veterinaria",
    left: 64,
    top: 62
  },
  {
    distritoTexto: "Miraflores",
    direccion: "Av. Larco 780",
    referencia: "A una cuadra del parque Kennedy",
    left: 38,
    top: 46
  },
  {
    distritoTexto: "San Miguel",
    direccion: "Av. La Marina 2100",
    referencia: "Cerca al centro comercial",
    left: 30,
    top: 58
  },
  {
    distritoTexto: "Pueblo Libre",
    direccion: "Av. Brasil 1250",
    referencia: "Frente a un parque pequeño",
    left: 45,
    top: 55
  },
  {
    distritoTexto: "Jesús María",
    direccion: "Av. Salaverry 980",
    referencia: "Cerca a una zona residencial",
    left: 49,
    top: 42
  }
];

btnElegirUbicacion.addEventListener("click", function () {
  mapaInteractivo.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  mapaInteractivo.classList.add("seleccionando");

  setTimeout(function () {
    mapaInteractivo.classList.remove("seleccionando");
  }, 1200);
});

mapaInteractivo.addEventListener("click", function (evento) {
  if (evento.target === pinMapa || pinMapa.contains(evento.target)) {
    return;
  }

  moverPinConEvento(evento);
});

pinMapa.addEventListener("pointerdown", function (evento) {
  evento.preventDefault();
  pinMapa.setPointerCapture(evento.pointerId);
  pinMapa.addEventListener("pointermove", moverPinConEvento);
});

pinMapa.addEventListener("pointerup", function (evento) {
  pinMapa.releasePointerCapture(evento.pointerId);
  pinMapa.removeEventListener("pointermove", moverPinConEvento);
});

function moverPinConEvento(evento) {
  const rect = mapaInteractivo.getBoundingClientRect();

  let left = ((evento.clientX - rect.left) / rect.width) * 100;
  let top = ((evento.clientY - rect.top) / rect.height) * 100;

  left = Math.max(8, Math.min(92, left));
  top = Math.max(12, Math.min(92, top));

  pinMapa.style.left = left + "%";
  pinMapa.style.top = top + "%";

  const ubicacion = buscarUbicacionCercana(left, top);

  inputDireccion.value = ubicacion.direccion;
  inputDistrito.value = ubicacion.distritoTexto;
  inputReferencia.value = ubicacion.referencia;
}

function buscarUbicacionCercana(left, top) {
  let ubicacionCercana = ubicacionesSimuladas[0];
  let menorDistancia = Infinity;

  ubicacionesSimuladas.forEach(function (ubicacion) {
    const distancia = Math.sqrt(
      Math.pow(left - ubicacion.left, 2) + Math.pow(top - ubicacion.top, 2)
    );

    if (distancia < menorDistancia) {
      menorDistancia = distancia;
      ubicacionCercana = ubicacion;
    }
  });

  return ubicacionCercana;
}

inputDistrito.addEventListener("input", function () {
  const distritoEscrito = inputDistrito.value.trim().toLowerCase();

  const distritoEncontrado = ubicacionesSimuladas.find(function (ubicacion) {
    return ubicacion.distritoTexto.toLowerCase() === distritoEscrito;
  });

  if (distritoEncontrado) {
    inputDireccion.value = distritoEncontrado.direccion;
    inputReferencia.value = distritoEncontrado.referencia;
    pinMapa.style.left = distritoEncontrado.left + "%";
    pinMapa.style.top = distritoEncontrado.top + "%";
  }
});

btnAbrirFotos.addEventListener("click", function () {
  activarTabEvidencia(btnAbrirFotos);
  abrirModal(modalFotos);
});

btnAbrirVideos.addEventListener("click", function () {
  activarTabEvidencia(btnAbrirVideos);
  abrirModal(modalVideos);
});

opcionesFoto.forEach(function (opcion) {
  opcion.addEventListener("click", function () {
    const rutaImagen = opcion.dataset.img;

    evidencias.push({
      tipo: "foto",
      ruta: rutaImagen
    });

    mostrarEvidencias();
    cerrarModal(modalFotos);
  });
});

opcionesVideo.forEach(function (opcion) {
  opcion.addEventListener("click", function () {
    const rutaVideo = opcion.dataset.video;

    evidencias.push({
      tipo: "video",
      ruta: rutaVideo
    });

    mostrarEvidencias();
    cerrarModal(modalVideos);
  });
});

function mostrarEvidencias() {
  previewEvidencia.innerHTML = "";

  if (evidencias.length === 0) {
    previewEvidencia.innerHTML = `
      <div class="preview-vacio">
        <span>+</span>
        <strong>Aún no agregaste evidencia</strong>
        <p>Selecciona una foto o video usando los botones superiores</p>
      </div>
    `;
    return;
  }

  evidencias.forEach(function (evidencia, index) {
    const item = document.createElement("div");
    item.classList.add("item-evidencia");

    if (evidencia.tipo === "foto") {
      const img = document.createElement("img");
      img.src = evidencia.ruta;
      img.alt = "Evidencia del reporte";
      item.appendChild(img);
    }

    if (evidencia.tipo === "video") {
      const video = document.createElement("video");
      video.controls = true;

      const source = document.createElement("source");
      source.src = evidencia.ruta;
      source.type = "video/mp4";

      video.appendChild(source);
      item.appendChild(video);
    }

    const btnQuitar = document.createElement("button");
    btnQuitar.type = "button";
    btnQuitar.classList.add("btn-quitar-evidencia");
    btnQuitar.textContent = "×";

    btnQuitar.addEventListener("click", function () {
      evidencias.splice(index, 1);
      mostrarEvidencias();
    });

    item.appendChild(btnQuitar);
    previewEvidencia.appendChild(item);
  });
}

function guardarReporteInicial() {
  const datos = {
    direccion: inputDireccion.value || "Av. Arequipa, frente al parque",
    distrito: inputDistrito.value || "Lince",
    referencia: inputReferencia.value || "Cerca al Colegio San Agustín",
    evidencias: evidencias,
    pinLeft: pinMapa.style.left || "52%",
    pinTop: pinMapa.style.top || "48%"
  };

  localStorage.setItem("reporteActual", JSON.stringify(datos));
}

btnIrDetalles.addEventListener("click", function () {
  guardarReporteInicial();
});

function activarTabEvidencia(botonActivo) {
  btnAbrirFotos.classList.remove("activo");
  btnAbrirVideos.classList.remove("activo");
  botonActivo.classList.add("activo");
}

function abrirModal(modal) {
  modal.classList.add("activo");
}

function cerrarModal(modal) {
  modal.classList.remove("activo");
}

botonesCerrarModal.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const idModal = boton.dataset.cerrar;
    const modal = document.getElementById(idModal);
    cerrarModal(modal);
  });
});

const modales = document.querySelectorAll(".modal-reporte");

modales.forEach(function (modal) {
  modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
      cerrarModal(modal);
    }
  });
});