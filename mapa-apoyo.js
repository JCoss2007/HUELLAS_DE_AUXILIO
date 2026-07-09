const filtroDistritoMapa = document.getElementById("filtroDistritoMapa");
const filtroTipoMapa = document.getElementById("filtroTipoMapa");
const btnLimpiarMapa = document.getElementById("btnLimpiarMapa");
const contadorEntidades = document.getElementById("contadorEntidades");
const mensajeVacioMapa = document.getElementById("mensajeVacioMapa");

const cardsMapa = document.querySelectorAll(".entidad-mapa-card");
const pinsMapaApoyo = document.querySelectorAll(".pin");

function activarEntidadMapa(idEntidad) {
  cardsMapa.forEach(function (card) {
    card.classList.remove("activa");

    if (card.dataset.entidad === idEntidad) {
      card.classList.add("activa");
    }
  });

  pinsMapaApoyo.forEach(function (pin) {
    pin.classList.remove("activo");

    if (pin.dataset.entidad === idEntidad) {
      pin.classList.add("activo");
    }
  });
}

function filtrarMapa() {
  const distrito = filtroDistritoMapa.value;
  const tipo = filtroTipoMapa.value;

  let visibles = 0;
  let primeraEntidadVisible = "";

  cardsMapa.forEach(function (card) {
    const distritoCard = card.dataset.distrito;
    const tipoCard = card.dataset.tipo;

    const coincideDistrito = distrito === "" || distrito === distritoCard;
    const coincideTipo = tipo === "" || tipo === tipoCard;

    if (coincideDistrito && coincideTipo) {
      card.classList.remove("oculta");
      visibles++;

      if (primeraEntidadVisible === "") {
        primeraEntidadVisible = card.dataset.entidad;
      }
    } else {
      card.classList.add("oculta");
    }
  });

  pinsMapaApoyo.forEach(function (pin) {
    const idEntidad = pin.dataset.entidad;
    const cardRelacionada = document.querySelector(
      `.entidad-mapa-card[data-entidad="${idEntidad}"]`
    );

    if (cardRelacionada.classList.contains("oculta")) {
      pin.style.display = "none";
    } else {
      pin.style.display = "block";
    }
  });

  contadorEntidades.textContent = visibles;

  if (visibles === 0) {
    mensajeVacioMapa.style.display = "block";
  } else {
    mensajeVacioMapa.style.display = "none";
    activarEntidadMapa(primeraEntidadVisible);
  }
}

function limpiarMapa() {
  filtroDistritoMapa.value = "";
  filtroTipoMapa.value = "";

  filtrarMapa();
}

pinsMapaApoyo.forEach(function (pin) {
  pin.addEventListener("click", function () {
    activarEntidadMapa(pin.dataset.entidad);
  });
});

cardsMapa.forEach(function (card) {
  card.addEventListener("click", function () {
    activarEntidadMapa(card.dataset.entidad);
  });
});

filtroDistritoMapa.addEventListener("change", filtrarMapa);
filtroTipoMapa.addEventListener("change", filtrarMapa);
btnLimpiarMapa.addEventListener("click", limpiarMapa);

filtrarMapa();