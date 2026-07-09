const formChat = document.getElementById("formChat");
const inputChat = document.getElementById("inputChat");
const chatMensajes = document.getElementById("chatMensajes");
const botonesTema = document.querySelectorAll(".tema-btn");

const respuestas = {
  mascota:
    "Para registrar una mascota, ingresa a Adopciones y selecciona Publicar mascota. Completa sus datos, agrega imágenes y guarda la publicación.",

  solicitudes:
    "Para revisar solicitudes, entra a Adopciones y luego a Solicitudes. Allí podrás ver la información del postulante y aprobar o rechazar la solicitud.",

  estado:
    "Para actualizar el estado de un caso, abre el detalle del reporte asignado y utiliza la opción de gestión para cambiar su avance.",

  red:
    "En Red de apoyo puedes buscar entidades aliadas, revisar sus datos y comunicarte con ellas para solicitar apoyo en casos específicos.",

  saludo:
    "Hola, soy el asistente de Huellas de Auxilio. Puedo ayudarte con adopciones, solicitudes, reportes, estados o red de apoyo.",

  default:
    "Puedo ayudarte con registro de mascotas, revisión de solicitudes, actualización de estados o uso de la red de apoyo. También puedes elegir un tema sugerido."
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

  if (
    consulta.includes("mascota") ||
    consulta.includes("publicar") ||
    consulta.includes("adopción") ||
    consulta.includes("adopcion")
  ) {
    return respuestas.mascota;
  }

  if (
    consulta.includes("solicitud") ||
    consulta.includes("postulante") ||
    consulta.includes("aprobar") ||
    consulta.includes("rechazar")
  ) {
    return respuestas.solicitudes;
  }

  if (
    consulta.includes("estado") ||
    consulta.includes("actualizar") ||
    consulta.includes("reporte") ||
    consulta.includes("caso")
  ) {
    return respuestas.estado;
  }

  if (
    consulta.includes("red") ||
    consulta.includes("apoyo") ||
    consulta.includes("entidad") ||
    consulta.includes("aliada")
  ) {
    return respuestas.red;
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

  const contenedor = document.createElement("div");

  const mensaje = document.createElement("div");
  mensaje.classList.add("mensaje", "asistente");

  const parrafo = document.createElement("p");
  parrafo.textContent = texto;

  const hora = document.createElement("span");
  hora.classList.add("hora-asistente");
  hora.textContent = "Ahora";

  mensaje.appendChild(parrafo);
  contenedor.appendChild(mensaje);
  contenedor.appendChild(hora);

  fila.appendChild(avatar);
  fila.appendChild(contenedor);

  chatMensajes.appendChild(fila);
  bajarChat();
}

function bajarChat() {
  chatMensajes.scrollTop = chatMensajes.scrollHeight;
}