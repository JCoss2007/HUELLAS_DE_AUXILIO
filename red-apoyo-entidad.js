const buscarEntidad = document.getElementById("buscarEntidad");
const filtroDistrito = document.getElementById("filtroDistrito");
const botonesCategoria = document.querySelectorAll(".categoria");
const tarjetasEntidad = document.querySelectorAll(".entidad-card");
const mensajeVacio = document.getElementById("mensajeVacio");

let categoriaSeleccionada = "";

function filtrarEntidades() {
  const textoBusqueda = buscarEntidad.value.toLowerCase().trim();
  const distritoSeleccionado = filtroDistrito.value;

  let entidadesVisibles = 0;

  tarjetasEntidad.forEach(function (tarjeta) {
    const nombre = tarjeta.dataset.nombre;
    const categoria = tarjeta.dataset.categoria;
    const distrito = tarjeta.dataset.distrito;
    const descripcion = tarjeta.dataset.descripcion;

    const coincideTexto =
      nombre.includes(textoBusqueda) || descripcion.includes(textoBusqueda);

    const coincideCategoria =
      categoriaSeleccionada === "" || categoria === categoriaSeleccionada;

    const coincideDistrito =
      distritoSeleccionado === "" || distrito === distritoSeleccionado;

    if (coincideTexto && coincideCategoria && coincideDistrito) {
      tarjeta.style.display = "flex";
      entidadesVisibles++;
    } else {
      tarjeta.style.display = "none";
    }
  });

  if (entidadesVisibles === 0) {
    mensajeVacio.style.display = "block";
  } else {
    mensajeVacio.style.display = "none";
  }
}

botonesCategoria.forEach(function (boton) {
  boton.addEventListener("click", function () {
    botonesCategoria.forEach(function (item) {
      item.classList.remove("activa");
    });

    boton.classList.add("activa");
    categoriaSeleccionada = boton.dataset.categoria;

    filtrarEntidades();
  });
});

buscarEntidad.addEventListener("input", filtrarEntidades);
filtroDistrito.addEventListener("change", filtrarEntidades);

filtrarEntidades();