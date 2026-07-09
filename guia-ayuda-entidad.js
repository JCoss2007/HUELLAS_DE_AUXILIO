const botonesTema = document.querySelectorAll(".btn-tema");
const tituloTema = document.getElementById("tituloTema");
const descripcionTema = document.getElementById("descripcionTema");
const pasosLista = document.getElementById("pasosLista");
const videoTexto = document.getElementById("videoTexto");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

const temas = {
  inicio: {
    titulo: "Inicio y panel",
    video: "Mira cómo usar el panel principal paso a paso.",
    descripcion: "Aprende a ubicar las secciones principales del panel de entidad.",
    pasos: [
      {
        titulo: "Ingresa con tu cuenta de entidad",
        texto: "Accede desde el login usando tus datos registrados."
      },
      {
        titulo: "Revisa el menú principal",
        texto: "Desde ahí puedes entrar a reportes, adopciones, red de apoyo y ayuda."
      },
      {
        titulo: "Abre tu cuenta",
        texto: "En Mi cuenta puedes consultar o editar la información de la entidad."
      }
    ]
  },

  reportes: {
    titulo: "Reportes recibidos",
    video: "Mira cómo revisar y gestionar reportes asignados.",
    descripcion: "Gestiona los casos que fueron asignados a tu entidad.",
    pasos: [
      {
        titulo: "Entra a Reportes",
        texto: "Abre la sección Reportes desde el menú principal."
      },
      {
        titulo: "Revisa los casos asignados",
        texto: "Consulta los reportes pendientes, en proceso o finalizados."
      },
      {
        titulo: "Abre el detalle",
        texto: "Selecciona un reporte para ver la descripción, evidencia y ubicación."
      },
      {
        titulo: "Actualiza el estado",
        texto: "Registra el avance del caso para mantener informado al ciudadano."
      }
    ]
  },

  adopciones: {
    titulo: "Adopciones",
    video: "Mira cómo gestionar adopciones paso a paso.",
    descripcion: "Sigue estos pasos para gestionar adopciones de manera efectiva.",
    pasos: [
      {
        titulo: "Ingresa a Adopciones",
        texto: "Desde el menú principal, abre la sección Adopciones."
      },
      {
        titulo: "Publica una mascota",
        texto: "Haz clic en Publicar mascota, completa la información requerida y agrega fotos."
      },
      {
        titulo: "Revisa solicitudes",
        texto: "En Solicitudes podrás revisar los interesados y sus mensajes."
      },
      {
        titulo: "Actualiza el estado",
        texto: "Aprueba, rechaza o solicita más información según corresponda."
      }
    ]
  },

  red: {
    titulo: "Red de apoyo",
    video: "Mira cómo usar la red de apoyo para coordinar ayuda.",
    descripcion: "Utiliza la red de apoyo para conectar con otras entidades o aliados.",
    pasos: [
      {
        titulo: "Entra a Red de apoyo",
        texto: "Abre la sección desde el menú principal."
      },
      {
        titulo: "Busca aliados",
        texto: "Filtra por tipo de apoyo, zona o necesidad del caso."
      },
      {
        titulo: "Revisa el detalle",
        texto: "Consulta la información de contacto y servicios disponibles."
      },
      {
        titulo: "Coordina la atención",
        texto: "Comunícate con la entidad aliada para continuar el caso."
      }
    ]
  },

  preguntas: {
    titulo: "Preguntas frecuentes",
    video: "Mira respuestas rápidas a dudas comunes.",
    descripcion: "Resuelve dudas frecuentes sobre el uso del panel de entidad.",
    pasos: [
      {
        titulo: "¿Cómo actualizo un reporte?",
        texto: "Abre el detalle del reporte y usa la opción de actualización de estado."
      },
      {
        titulo: "¿Cómo reviso solicitudes?",
        texto: "Ingresa a Adopciones y abre la pestaña Solicitudes de adopción."
      },
      {
        titulo: "¿Cómo contacto soporte?",
        texto: "Puedes usar el chat de ayuda o reportar un problema desde Mi cuenta."
      }
    ]
  }
};

const ordenTemas = ["inicio", "reportes", "adopciones", "red", "preguntas"];
let temaActual = 0;

botonesTema.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const tema = boton.dataset.tema;
    temaActual = ordenTemas.indexOf(tema);
    cambiarTema(tema);
  });
});

btnAnterior.addEventListener("click", function () {
  temaActual--;

  if (temaActual < 0) {
    temaActual = ordenTemas.length - 1;
  }

  cambiarTema(ordenTemas[temaActual]);
});

btnSiguiente.addEventListener("click", function () {
  temaActual++;

  if (temaActual >= ordenTemas.length) {
    temaActual = 0;
  }

  cambiarTema(ordenTemas[temaActual]);
});

function cambiarTema(nombreTema) {
  const tema = temas[nombreTema];

  tituloTema.textContent = tema.titulo;
  descripcionTema.textContent = tema.descripcion;
  videoTexto.textContent = tema.video;

  pasosLista.innerHTML = "";

  tema.pasos.forEach(function (paso, indice) {
    const pasoItem = document.createElement("div");
    pasoItem.classList.add("paso-item");

    const numero = document.createElement("span");
    numero.textContent = indice + 1;

    const contenido = document.createElement("div");

    const titulo = document.createElement("h3");
    titulo.textContent = paso.titulo;

    const texto = document.createElement("p");
    texto.textContent = paso.texto;

    contenido.appendChild(titulo);
    contenido.appendChild(texto);

    pasoItem.appendChild(numero);
    pasoItem.appendChild(contenido);

    pasosLista.appendChild(pasoItem);
  });

  botonesTema.forEach(function (boton) {
    boton.classList.remove("activo");

    if (boton.dataset.tema === nombreTema) {
      boton.classList.add("activo");
    }
  });
}