const btnAgregarFoto = document.getElementById("btnAgregarFoto");
const previewFotos = document.getElementById("previewFotos");
const modalFotos = document.getElementById("modalFotos");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const opcionesFoto = document.querySelectorAll(".opcion-foto");

const inputNombre = document.getElementById("nombre");
const inputEspecie = document.getElementById("especie");
const inputEdad = document.getElementById("edad");
const inputSexo = document.getElementById("sexo");
const inputDistrito = document.getElementById("distrito");
const inputTamano = document.getElementById("tamano");
const inputDescripcion = document.getElementById("descripcion");

const mascotas = {
  max: {
    nombre: "Max",
    especie: "perro",
    edad: "2 años",
    sexo: "macho",
    distrito: "miraflores",
    tamano: "mediano",
    descripcion: "Cariñoso y juguetón, le encanta correr y recibir caricias.",
    fotos: ["img/max-perro-1.png", "img/max-perro-2.png"]
  },

  fifi: {
    nombre: "Fifí",
    especie: "gato",
    edad: "1 año",
    sexo: "hembra",
    distrito: "san-borja",
    tamano: "pequeno",
    descripcion: "Tranquila y observadora, ideal para un hogar calmado.",
    fotos: ["img/fifi-gato.png"]
  },

  simba: {
    nombre: "Simba",
    especie: "perro",
    edad: "6 meses",
    sexo: "macho",
    distrito: "surco",
    tamano: "mediano",
    descripcion: "Cachorro lleno de energía, busca una familia activa.",
    fotos: ["img/simba-perro.png"]
  },

  luna: {
    nombre: "Luna",
    especie: "gato",
    edad: "2 años",
    sexo: "hembra",
    distrito: "jesus-maria",
    tamano: "pequeno",
    descripcion: "Muy afectuosa y sociable, le encantan las siestas al sol.",
    fotos: ["img/luna-gato.png"]
  },

  toby: {
    nombre: "Toby",
    especie: "perro",
    edad: "3 años",
    sexo: "macho",
    distrito: "pueblo-libre",
    tamano: "pequeno",
    descripcion: "Pequeño y leal, siempre listo para acompañarte.",
    fotos: ["img/toby-perro.png"]
  },

  mia: {
    nombre: "Mia",
    especie: "gato",
    edad: "4 años",
    sexo: "hembra",
    distrito: "lince",
    tamano: "pequeno",
    descripcion: "Tierna y curiosa, está aprendiendo a conocer el mundo.",
    fotos: ["img/mia-gato.png"]
  }
};

function crearFoto(rutaImagen) {
  const fotoItem = document.createElement("div");
  fotoItem.classList.add("foto-item");

  const imagen = document.createElement("img");
  imagen.src = rutaImagen;
  imagen.alt = "Foto de mascota";

  const btnQuitar = document.createElement("button");
  btnQuitar.type = "button";
  btnQuitar.classList.add("btn-quitar-foto");
  btnQuitar.textContent = "×";

  btnQuitar.addEventListener("click", function () {
    fotoItem.remove();
  });

  fotoItem.appendChild(imagen);
  fotoItem.appendChild(btnQuitar);

  previewFotos.appendChild(fotoItem);
}

function cargarDatosEditar() {
  const parametros = new URLSearchParams(window.location.search);
  const idMascota = parametros.get("id");

  if (!idMascota || !mascotas[idMascota]) {
    return;
  }

  const mascota = mascotas[idMascota];

  inputNombre.value = mascota.nombre;
  inputEspecie.value = mascota.especie;
  inputEdad.value = mascota.edad;
  inputSexo.value = mascota.sexo;
  inputDistrito.value = mascota.distrito;
  inputTamano.value = mascota.tamano;
  inputDescripcion.value = mascota.descripcion;

  previewFotos.innerHTML = "";

  mascota.fotos.forEach(function (foto) {
    crearFoto(foto);
  });
}

if (btnAgregarFoto && modalFotos) {
  btnAgregarFoto.addEventListener("click", function () {
    modalFotos.classList.add("activo");
  });
}

if (btnCerrarModal && modalFotos) {
  btnCerrarModal.addEventListener("click", function () {
    modalFotos.classList.remove("activo");
  });
}

if (modalFotos) {
  modalFotos.addEventListener("click", function (evento) {
    if (evento.target === modalFotos) {
      modalFotos.classList.remove("activo");
    }
  });
}

opcionesFoto.forEach(function (opcion) {
  opcion.addEventListener("click", function () {
    const rutaImagen = opcion.dataset.img;

    crearFoto(rutaImagen);

    modalFotos.classList.remove("activo");
  });
});

cargarDatosEditar();