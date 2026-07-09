const switchNotificaciones = document.getElementById("switchNotificaciones");
const textoEstadoNotificaciones = document.getElementById("textoEstadoNotificaciones");
const listaNotificaciones = document.getElementById("listaNotificaciones");
const mensajeDesactivado = document.getElementById("mensajeDesactivado");
const btnMarcarLeidas = document.getElementById("btnMarcarLeidas");

const estadoGuardado = localStorage.getItem("notificacionesInternas");

if (estadoGuardado === "apagado") {
  switchNotificaciones.checked = false;
  actualizarEstadoNotificaciones();
}

function actualizarEstadoNotificaciones() {
  if (switchNotificaciones.checked) {
    textoEstadoNotificaciones.textContent =
      "Recibirás avisos cuando cambie el estado de tus reportes.";

    listaNotificaciones.classList.remove("apagado");
    mensajeDesactivado.style.display = "none";
    localStorage.setItem("notificacionesInternas", "encendido");
  } else {
    textoEstadoNotificaciones.textContent =
      "No recibirás nuevos avisos internos, pero podrás revisar tus reportes manualmente.";

    listaNotificaciones.classList.add("apagado");
    mensajeDesactivado.style.display = "block";
    localStorage.setItem("notificacionesInternas", "apagado");
  }
}

switchNotificaciones.addEventListener("change", actualizarEstadoNotificaciones);

btnMarcarLeidas.addEventListener("click", function () {
  const notificacionesNoLeidas = document.querySelectorAll(".notificacion-card.no-leida");

  notificacionesNoLeidas.forEach(function (notificacion) {
    notificacion.classList.remove("no-leida");
  });
});