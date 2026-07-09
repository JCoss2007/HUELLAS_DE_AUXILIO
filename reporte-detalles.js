const botonesUrgencia = document.querySelectorAll(".btn-urgencia");
const descripcion = document.getElementById("descripcion");
const contadorDescripcion = document.getElementById("contadorDescripcion");
const btnAbrirAudio = document.getElementById("btnAbrirAudio");
const previewAudio = document.getElementById("previewAudio");
const btnEnviarReporte = document.getElementById("btnEnviarReporte");

const resumenDistrito = document.getElementById("resumenDistrito");
const resumenUbicacion = document.getElementById("resumenUbicacion");
const miniEvidencias = document.getElementById("miniEvidencias");
const pinMini = document.getElementById("pinMini");

const tipoCaso = document.getElementById("tipoCaso");

let urgenciaSeleccionada = "Baja";
let audioGrabado = false;

const datosGuardados = JSON.parse(localStorage.getItem("reporteActual")) || {
  direccion: "Av. Arequipa, frente al parque",
  distrito: "Lince",
  referencia: "Cerca al Colegio San Agustín",
  evidencias: [],
  pinLeft: "52%",
  pinTop: "48%"
};

resumenDistrito.textContent = datosGuardados.distrito;
resumenUbicacion.textContent = datosGuardados.direccion;
pinMini.style.left = datosGuardados.pinLeft;
pinMini.style.top = datosGuardados.pinTop;

mostrarMiniEvidencias();

botonesUrgencia.forEach(function (boton) {
  boton.addEventListener("click", function () {
    botonesUrgencia.forEach(function (item) {
      item.classList.remove("activo");
    });

    boton.classList.add("activo");
    urgenciaSeleccionada = boton.dataset.urgencia;
  });
});

descripcion.addEventListener("input", function () {
  contadorDescripcion.textContent = descripcion.value.length;
});

btnAbrirAudio.addEventListener("click", function () {
  audioGrabado = true;

  previewAudio.innerHTML = `
    <div class="audio-simulado">
      <div>
        <strong>Audio enviado correctamente</strong>
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

btnEnviarReporte.addEventListener("click", function () {
  const reporteCompleto = {
    direccion: datosGuardados.direccion,
    distrito: datosGuardados.distrito,
    referencia: datosGuardados.referencia,
    evidencias: datosGuardados.evidencias,
    pinLeft: datosGuardados.pinLeft,
    pinTop: datosGuardados.pinTop,
    tipoCaso: tipoCaso.value || "Maltrato animal",
    urgencia: urgenciaSeleccionada,
    descripcion: descripcion.value || "Caso reportado por el ciudadano.",
    audio: audioGrabado
  };

  localStorage.setItem("reporteActual", JSON.stringify(reporteCompleto));
});

function mostrarMiniEvidencias() {
  miniEvidencias.innerHTML = "";

  if (datosGuardados.evidencias.length === 0) {
    const mini1 = document.createElement("div");
    mini1.classList.add("mini-evidencia");

    const mini2 = document.createElement("div");
    mini2.classList.add("mini-evidencia");

    miniEvidencias.appendChild(mini1);
    miniEvidencias.appendChild(mini2);
    return;
  }

  datosGuardados.evidencias.slice(0, 2).forEach(function (evidencia) {
    const mini = document.createElement("div");
    mini.classList.add("mini-evidencia");

    if (evidencia.tipo === "foto") {
      const img = document.createElement("img");
      img.src = evidencia.ruta;
      img.alt = "Evidencia del reporte";
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

  if (datosGuardados.evidencias.length === 1) {
    const mini = document.createElement("div");
    mini.classList.add("mini-evidencia");
    miniEvidencias.appendChild(mini);
  }
}