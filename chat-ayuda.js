const formChat = document.getElementById("formChat");
const inputChat = document.getElementById("inputChat");
const chatMensajes = document.getElementById("chatMensajes");
const botonesTema = document.querySelectorAll(".tema-btn");

const respuestas = {
  reporte:
    "Para reportar un caso, presiona el botón Reportar, completa la información solicitada y agrega evidencia si la tienes. Al finalizar, recibirás un código para hacer seguimiento.",

  seguimiento:
    "Para revisar el estado de un reporte, entra a Mis reportes. Ahí podrás ver si está pendiente, en revisión, atendido o cerrado.",

  directorio:
    "En el Directorio puedes buscar entidades de apoyo, refugios, veterinarias u organizaciones cercanas. También puedes ver su información y medios de contacto.",

  adopciones:
    "En Adopciones puedes revisar mascotas disponibles, enviar una solicitud y luego consultar el estado desde Mis solicitudes.",

  soporte:
    "Puedes escribir tu consulta aquí. Si el problema es sobre tu cuenta o funcionamiento de la plataforma, también puedes usar Reportar un problema desde Mi cuenta.",

  anonimo:
    "Sí, puedes reportar de forma anónima. Tu información personal no será publicada en el reporte.",

  saludo:
    "Hola, soy el asistente virtual de Huellas de Auxilio. Puedo ayudarte con reportes, seguimiento, directorio, adopciones o soporte.",

  default:
    "Puedo ayudarte con reportes, seguimiento de casos, uso del directorio, adopciones o soporte. También puedes elegir un tema sugerido del panel izquierdo."
};

botonesTema.forEach(function (boton) {
  boton.addEventListener("click", function () {
    botonesTema.forEach(function (item) {
      item.classList.remove("activo");
    });

    boton.classList.add("activo");

    const tema = boton.dataset.tema;
    const textoTema = boton.querySelector("span").textContent;

    agregarMensajeUsuario(textoTema);
    agregarMensajeAsistente(respuestas[tema]);
  });
});

formChat.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = inputChat.value.trim();

  if (texto === "") {
    return;
  }

  agregarMensajeUsuario(texto);

  const respuesta = buscarRespuesta(texto);
  agregarMensajeAsistente(respuesta);

  inputChat.value = "";
});

function buscarRespuesta(texto) {
  const consulta = texto.toLowerCase();

  if (consulta.includes("hola") || consulta.includes("buenas")) {
    return respuestas.saludo;
  }

  if (consulta.includes("report")) {
    return respuestas.reporte;
  }

  if (
    consulta.includes("estado") ||
    consulta.includes("seguimiento") ||
    consulta.includes("caso")
  ) {
    return respuestas.seguimiento;
  }

  if (
    consulta.includes("directorio") ||
    consulta.includes("entidad") ||
    consulta.includes("apoyo")
  ) {
    return respuestas.directorio;
  }

  if (
    consulta.includes("adop") ||
    consulta.includes("solicitud") ||
    consulta.includes("mascota")
  ) {
    return respuestas.adopciones;
  }

  if (consulta.includes("anonimo") || consulta.includes("anónimo")) {
    return respuestas.anonimo;
  }

  if (consulta.includes("soporte") || consulta.includes("ayuda")) {
    return respuestas.soporte;
  }

  return respuestas.default;
}

function agregarMensajeUsuario(texto) {
  const mensaje = document.createElement("div");
  mensaje.classList.add("mensaje", "usuario");

  const parrafo = document.createElement("p");
  parrafo.textContent = texto;

  const hora = document.createElement("span");
  hora.textContent = "Ahora";

  mensaje.appendChild(parrafo);
  mensaje.appendChild(hora);

  chatMensajes.appendChild(mensaje);
  bajarChat();
}

function agregarMensajeAsistente(texto) {
  const fila = document.createElement("div");
  fila.classList.add("fila-asistente");

  const avatar = document.createElement("div");
  avatar.classList.add("avatar-asistente");

  const img = document.createElement("img");
  img.src = "icons/huella-verde.png";
  img.alt = "Asistente";

  avatar.appendChild(img);

  const mensaje = document.createElement("div");
  mensaje.classList.add("mensaje", "asistente");

  const parrafo = document.createElement("p");
  parrafo.textContent = texto;

  const hora = document.createElement("span");
  hora.textContent = "Ahora";

  mensaje.appendChild(parrafo);
  mensaje.appendChild(hora);

  fila.appendChild(avatar);
  fila.appendChild(mensaje);

  chatMensajes.appendChild(fila);
  bajarChat();
}

function bajarChat() {
  chatMensajes.scrollTop = chatMensajes.scrollHeight;
}