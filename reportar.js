const paso1 = document.getElementById("paso1");
const paso2 = document.getElementById("paso2");
const paso3 = document.getElementById("paso3");

const btnContinuar = document.getElementById("btnContinuar");
const btnCancelar = document.getElementById("btnCancelar");

const pasosIndicador = document.querySelectorAll(".paso-num");
const panelResumen = document.querySelector(".panel-resumen");

const inputDireccion = document.getElementById("direccion");
const selectDistrito = document.getElementById("distrito");
const inputReferencia = document.getElementById("referencia");

const mapaInteractivo = document.getElementById("mapaInteractivo");
const pinMapa = document.getElementById("pinMapa");

const resumenDistrito = document.getElementById("resumenDistrito");
const resumenUbicacion = document.getElementById("resumenUbicacion");

const confirmDistrito = document.getElementById("confirmDistrito");
const confirmUbicacion = document.getElementById("confirmUbicacion");
const confirmTipo = document.getElementById("confirmTipo");
const confirmUrgencia = document.getElementById("confirmUrgencia");

const btnElegirUbicacion = document.getElementById("btnElegirUbicacion");

const btnAbrirFotos = document.getElementById("btnAbrirFotos");
const btnAbrirVideos = document.getElementById("btnAbrirVideos");
const btnAbrirAudio = document.getElementById("btnAbrirAudio");

const modalFotos = document.getElementById("modalFotos");
const modalVideos = document.getElementById("modalVideos");

const botonesCerrarModal = document.querySelectorAll(".btn-cerrar-modal");
const opcionesFoto = document.querySelectorAll(".opcion-foto");
const opcionesVideo = document.querySelectorAll(".opcion-video");

const previewEvidencia = document.getElementById("previewEvidencia");
const miniEvidencias = document.getElementById("miniEvidencias");
const previewAudio = document.getElementById("previewAudio");

const selectTipoCaso = document.getElementById("tipoCaso");
const botonesUrgencia = document.querySelectorAll(".btn-urgencia");

const descripcion = document.getElementById("descripcion");
const contadorDescripcion = document.getElementById("contadorDescripcion");

let pasoActual = 1;
let urgenciaSeleccionada = "Baja";
let audioGrabado = false;

const evidencias = [];

const ubicacionesSimuladas = [
  {
    distritoTexto: "Lince",
    distritoValue: "lince",
    direccion: "Av. Arequipa, frente al parque",
    referencia: "Cerca al Colegio San Agustín",
    left: 52,
    top: 48
  },
  {
    distritoTexto: "Santiago de Surco",
    distritoValue: "surco",
    direccion: "Av. Caminos del Inca 1250",
    referencia: "Frente a una veterinaria",
    left: 64,
    top: 62
  },
  {
    distritoTexto: "Miraflores",
    distritoValue: "miraflores",
    direccion: "Av. Larco 780",
    referencia: "A una cuadra del parque Kennedy",
    left: 38,
    top: 46
  },
  {
    distritoTexto: "San Miguel",
    distritoValue: "san-miguel",
    direccion: "Av. La Marina 2100",
    referencia: "Cerca al centro comercial",
    left: 30,
    top: 58
  },
  {
    distritoTexto: "Pueblo Libre",
    distritoValue: "pueblo-libre",
    direccion: "Av. Brasil 1250",
    referencia: "Frente a un parque pequeño",
    left: 45,
    top: 55
  },
  {
    distritoTexto: "Jesús María",
    distritoValue: "jesus-maria",
    direccion: "Av. Salaverry 980",
    referencia: "Cerca a una zona residencial",
    left: 49,
    top: 42
  }
];

btnContinuar.addEventListener("click", function () {
  if (pasoActual === 1) {
    pasoActual = 2;
    cambiarPaso();
    return;
  }

  if (pasoActual === 2) {
    pasoActual = 3;
    actualizarConfirmacion();
    cambiarPaso();
    return;
  }

  if (pasoActual === 3) {
    alert("Reporte enviado correctamente. La entidad más cercana recibirá el caso.");
    window.location.href = "Home_Ciudadano.html";
  }
});

btnCancelar.addEventListener("click", function () {
  if (pasoActual === 1) {
    window.location.href = "Home_Ciudadano.html";
    return;
  }

  pasoActual--;
  cambiarPaso();
});

function cambiarPaso() {
  paso1.classList.remove("activo");
  paso2.classList.remove("activo");
  paso3.classList.remove("activo");

  if (pasoActual === 1) {
    paso1.classList.add("activo");
    btnContinuar.textContent = "Continuar";
    btnCancelar.textContent = "Cancelar";
    panelResumen.classList.remove("mostrar-resumen");
  }

  if (pasoActual === 2) {
    paso2.classList.add("activo");
    btnContinuar.textContent = "Continuar";
    btnCancelar.textContent = "Atrás";
    panelResumen.classList.add("mostrar-resumen");
    actualizarResumen();
  }

  if (pasoActual === 3) {
    paso3.classList.add("activo");
    btnContinuar.textContent = "Enviar";
    btnCancelar.textContent = "Atrás";
    panelResumen.classList.add("mostrar-resumen");
    actualizarResumen();
    actualizarConfirmacion();
  }

  pasosIndicador.forEach(function (paso) {
    paso.classList.remove("activo");

    if (Number(paso.dataset.step) <= pasoActual) {
      paso.classList.add("activo");
    }
  });
}

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
  selectDistrito.value = ubicacion.distritoValue;
  inputReferencia.value = ubicacion.referencia;

  resumenDistrito.textContent = ubicacion.distritoTexto;
  resumenUbicacion.textContent = ubicacion.direccion;

  actualizarResumen();
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

inputDireccion.addEventListener("input", actualizarResumen);
selectDistrito.addEventListener("change", function () {
  const distritoSeleccionado = ubicacionesSimuladas.find(function (ubicacion) {
    return ubicacion.distritoValue === selectDistrito.value;
  });

  if (distritoSeleccionado) {
    inputDireccion.value = distritoSeleccionado.direccion;
    inputReferencia.value = distritoSeleccionado.referencia;
    pinMapa.style.left = distritoSeleccionado.left + "%";
    pinMapa.style.top = distritoSeleccionado.top + "%";
  }

  actualizarResumen();
});

inputReferencia.addEventListener("input", actualizarResumen);

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

btnAbrirAudio.addEventListener("click", function () {
  audioGrabado = true;

  previewAudio.innerHTML = `
    <div class="audio-simulado">
      <div>
        <strong>Audio grabado correctamente</strong>
        <span>Duración: 00:12</span>
      </div>

      <button type="button" id="btnQuitarAudio">×</button>
    </div>
  `;

  const btnQuitarAudio = document.getElementById("btnQuitarAudio");

  btnQuitarAudio.addEventListener("click", function () {
    audioGrabado = false;
    previewAudio.innerHTML = "";
  });
});

function mostrarEvidencias() {
  previewEvidencia.innerHTML = "";
  miniEvidencias.innerHTML = "";

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

  evidencias.slice(0, 2).forEach(function (evidencia) {
    const mini = document.createElement("div");
    mini.classList.add("mini-evidencia");

    if (evidencia.tipo === "foto") {
      const img = document.createElement("img");
      img.src = evidencia.ruta;
      img.alt = "Mini evidencia";

      mini.appendChild(img);
    }

    if (evidencia.tipo === "video") {
      const video = document.createElement("video");
      video.muted = true;

      const source = document.createElement("source");
      source.src = evidencia.ruta;
      source.type = "video/mp4";

      video.appendChild(source);
      mini.appendChild(video);
    }

    miniEvidencias.appendChild(mini);
  });
}

botonesUrgencia.forEach(function (boton) {
  boton.addEventListener("click", function () {
    botonesUrgencia.forEach(function (item) {
      item.classList.remove("activo");
    });

    boton.classList.add("activo");
    urgenciaSeleccionada = boton.dataset.urgencia;

    actualizarConfirmacion();
  });
});

descripcion.addEventListener("input", function () {
  contadorDescripcion.textContent = descripcion.value.length;
});

selectTipoCaso.addEventListener("change", actualizarConfirmacion);

function actualizarResumen() {
  const distritoTexto = obtenerTextoDistrito();

  resumenDistrito.textContent = distritoTexto || "Sin seleccionar";
  resumenUbicacion.textContent = inputDireccion.value || "Sin seleccionar";

  actualizarConfirmacion();
}

function actualizarConfirmacion() {
  confirmDistrito.textContent = obtenerTextoDistrito() || "Sin seleccionar";
  confirmUbicacion.textContent = inputDireccion.value || "Sin seleccionar";
  confirmTipo.textContent = selectTipoCaso.value || "Sin seleccionar";
  confirmUrgencia.textContent = urgenciaSeleccionada;
}

function obtenerTextoDistrito() {
  if (selectDistrito.value === "lince") {
    return "Lince";
  }

  if (selectDistrito.value === "surco") {
    return "Santiago de Surco";
  }

  if (selectDistrito.value === "miraflores") {
    return "Miraflores";
  }

  if (selectDistrito.value === "san-miguel") {
    return "San Miguel";
  }

  if (selectDistrito.value === "pueblo-libre") {
    return "Pueblo Libre";
  }

  if (selectDistrito.value === "jesus-maria") {
    return "Jesús María";
  }

  return "";
}

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

actualizarResumen();
mostrarEvidencias();