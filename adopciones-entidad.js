const buscarMascota = document.getElementById("buscarMascota");
const filtroEspecie = document.getElementById("filtroEspecie");
const filtroEdad = document.getElementById("filtroEdad");
const btnLimpiar = document.getElementById("btnLimpiar");
const mensajeVacio = document.getElementById("mensajeVacio");

const tarjetas = document.querySelectorAll(".mascota-card");

function filtrarMascotasEntidad() {
  const texto = buscarMascota.value.toLowerCase().trim();
  const especie = filtroEspecie.value;
  const edad = filtroEdad.value;

  let visibles = 0;

  tarjetas.forEach(function (tarjeta) {
    const nombreMascota = tarjeta.dataset.nombre;
    const especieMascota = tarjeta.dataset.especie;
    const edadMascota = tarjeta.dataset.edad;

    const coincideNombre = nombreMascota.includes(texto);
    const coincideEspecie = especie === "" || especie === especieMascota;
    const coincideEdad = edad === "" || edad === edadMascota;

    if (coincideNombre && coincideEspecie && coincideEdad) {
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

buscarMascota.addEventListener("input", filtrarMascotasEntidad);
filtroEspecie.addEventListener("change", filtrarMascotasEntidad);
filtroEdad.addEventListener("change", filtrarMascotasEntidad);

btnLimpiar.addEventListener("click", function () {
  buscarMascota.value = "";
  filtroEspecie.value = "";
  filtroEdad.value = "";

  filtrarMascotasEntidad();
});