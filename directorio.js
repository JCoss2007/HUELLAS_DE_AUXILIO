const buscarDirectorio = document.getElementById("buscarDirectorio");
const filtroDistrito = document.getElementById("filtroDistrito");
const filtroTipo = document.getElementById("filtroTipo");
const btnLimpiarDirectorio = document.getElementById("btnLimpiarDirectorio");
const mensajeVacioDirectorio = document.getElementById("mensajeVacioDirectorio");
const tarjetasDirectorio = document.querySelectorAll(".entidad-card");
const pinsMapa = document.querySelectorAll(".pin");
const entidadMapaActiva = document.getElementById("entidadMapaActiva");

const datosEntidades = {
  pin1: {
    nombre: "Refugio Patitas",
    detalle: "San Miguel · Refugio"
  },
  pin2: {
    nombre: "Hogar Seguro",
    detalle: "San Miguel · Veterinaria"
  },
  pin3: {
    nombre: "Huellas de Auxilio",
    detalle: "Pueblo Libre · Municipalidad"
  },
  pin4: {
    nombre: "Patitas en Buenas Manos",
    detalle: "Magdalena · Asociación"
  }
};

function filtrarDirectorio() {
  const texto = buscarDirectorio.value.toLowerCase().trim();
  const distrito = filtroDistrito.value;
  const tipo = filtroTipo.value;

  let visibles = 0;

  tarjetasDirectorio.forEach(function (tarjeta) {
    const nombre = tarjeta.dataset.nombre;
    const distritoTarjeta = tarjeta.dataset.distrito;
    const tipoTarjeta = tarjeta.dataset.tipo;
    const descripcion = tarjeta.dataset.descripcion;

    const coincideTexto =
      nombre.includes(texto) ||
      distritoTarjeta.includes(texto) ||
      tipoTarjeta.includes(texto) ||
      descripcion.includes(texto);

    const coincideDistrito = distrito === "" || distrito === distritoTarjeta;
    const coincideTipo = tipo === "" || tipo === tipoTarjeta;

    if (coincideTexto && coincideDistrito && coincideTipo) {
      tarjeta.classList.remove("oculta");
      visibles++;
    } else {
      tarjeta.classList.add("oculta");
    }
  });

  if (visibles === 0) {
    mensajeVacioDirectorio.style.display = "block";
  } else {
    mensajeVacioDirectorio.style.display = "none";
  }
}

function limpiarFiltrosDirectorio() {
  buscarDirectorio.value = "";
  filtroDistrito.value = "";
  filtroTipo.value = "";

  tarjetasDirectorio.forEach(function (tarjeta) {
    tarjeta.classList.remove("oculta");
  });

  mensajeVacioDirectorio.style.display = "none";
}

function activarPin(pinSeleccionado) {
  const idPin = pinSeleccionado.dataset.pin;
  const datos = datosEntidades[idPin];

  pinsMapa.forEach(function (pin) {
    pin.classList.remove("activo");
  });

  tarjetasDirectorio.forEach(function (tarjeta) {
    tarjeta.classList.remove("activa-mapa");

    if (tarjeta.dataset.pin === idPin) {
      tarjeta.classList.add("activa-mapa");
    }
  });

  pinSeleccionado.classList.add("activo");

  entidadMapaActiva.innerHTML = `
    <strong>${datos.nombre}</strong>
    <span>${datos.detalle}</span>
  `;
}

buscarDirectorio.addEventListener("input", filtrarDirectorio);
filtroDistrito.addEventListener("change", filtrarDirectorio);
filtroTipo.addEventListener("change", filtrarDirectorio);
btnLimpiarDirectorio.addEventListener("click", limpiarFiltrosDirectorio);

pinsMapa.forEach(function (pin) {
  pin.addEventListener("click", function () {
    activarPin(pin);
  });
});

filtrarDirectorio();