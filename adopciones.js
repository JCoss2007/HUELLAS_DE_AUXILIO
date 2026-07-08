const buscarMascota = document.getElementById("buscarMascota");
const filtroEspecie = document.getElementById("filtroEspecie");
const filtroEdad = document.getElementById("filtroEdad");
const filtroDistrito = document.getElementById("filtroDistrito");
const btnLimpiar = document.getElementById("btnLimpiar");
const mensajeVacio = document.getElementById("mensajeVacio");

const tarjetas = document.querySelectorAll(".mascota-card");

function filtrarMascotas() {
  const texto = buscarMascota.value.toLowerCase().trim();
  const especie = filtroEspecie.value;
  const edad = filtroEdad.value;
  const distrito = filtroDistrito.value;

  let visibles = 0;

  tarjetas.forEach(function (tarjeta) {
    const nombreMascota = tarjeta.dataset.nombre;
    const especieMascota = tarjeta.dataset.especie;
    const edadMascota = tarjeta.dataset.edad;
    const distritoMascota = tarjeta.dataset.distrito;

    const coincideNombre = nombreMascota.includes(texto);
    const coincideEspecie = especie === "" || especie === especieMascota;
    const coincideEdad = edad === "" || edad === edadMascota;
    const coincideDistrito = distrito === "" || distrito === distritoMascota;

    if (coincideNombre && coincideEspecie && coincideEdad && coincideDistrito) {
      tarjeta.style.display = "flex";
      visibles++;
    } else {
      tarjeta.style.display = "none";
    }
  });

  if (visibles === 0) {
    mensajeVacio.style.display = "block";
  } else {
    mensajeVacio.style.display = "none";
  }
}

buscarMascota.addEventListener("input", filtrarMascotas);
filtroEspecie.addEventListener("change", filtrarMascotas);
filtroEdad.addEventListener("change", filtrarMascotas);
filtroDistrito.addEventListener("change", filtrarMascotas);

btnLimpiar.addEventListener("click", function () {
  buscarMascota.value = "";
  filtroEspecie.value = "";
  filtroEdad.value = "";
  filtroDistrito.value = "";

  filtrarMascotas();
});