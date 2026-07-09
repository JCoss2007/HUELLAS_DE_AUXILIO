const buscarReporte = document.getElementById("buscarReporte");
const filtroEstado = document.getElementById("filtroEstado");
const filtroUrgencia = document.getElementById("filtroUrgencia");
const filtroDistrito = document.getElementById("filtroDistrito");
const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
const mensajeVacio = document.getElementById("mensajeVacio");

const filasReportes = document.querySelectorAll(".tabla-reportes tbody tr");

function filtrarReportes() {
  const textoBusqueda = buscarReporte.value.toLowerCase().trim();
  const estadoSeleccionado = filtroEstado.value;
  const urgenciaSeleccionada = filtroUrgencia.value;
  const distritoSeleccionado = filtroDistrito.value;

  let reportesVisibles = 0;

  filasReportes.forEach(function (fila) {
    const codigo = fila.dataset.codigo;
    const estado = fila.dataset.estado;
    const urgencia = fila.dataset.urgencia;
    const distrito = fila.dataset.distrito;

    const coincideCodigo = codigo.includes(textoBusqueda);
    const coincideEstado =
      estadoSeleccionado === "" || estado === estadoSeleccionado;
    const coincideUrgencia =
      urgenciaSeleccionada === "" || urgencia === urgenciaSeleccionada;
    const coincideDistrito =
      distritoSeleccionado === "" || distrito === distritoSeleccionado;

    if (
      coincideCodigo &&
      coincideEstado &&
      coincideUrgencia &&
      coincideDistrito
    ) {
      fila.style.display = "";
      reportesVisibles++;
    } else {
      fila.style.display = "none";
    }
  });

  if (reportesVisibles === 0) {
    mensajeVacio.style.display = "block";
  } else {
    mensajeVacio.style.display = "none";
  }
}

function limpiarFiltros() {
  buscarReporte.value = "";
  filtroEstado.value = "";
  filtroUrgencia.value = "";
  filtroDistrito.value = "";

  filtrarReportes();
}

buscarReporte.addEventListener("input", filtrarReportes);
filtroEstado.addEventListener("change", filtrarReportes);
filtroUrgencia.addEventListener("change", filtrarReportes);
filtroDistrito.addEventListener("change", filtrarReportes);
btnLimpiarFiltros.addEventListener("click", limpiarFiltros);

filtrarReportes();