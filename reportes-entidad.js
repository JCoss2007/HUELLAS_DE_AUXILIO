const buscarReporteEntidad = document.getElementById("buscarReporteEntidad");
const filtroEstadoEntidad = document.getElementById("filtroEstadoEntidad");
const filtroUrgenciaEntidad = document.getElementById("filtroUrgenciaEntidad");
const filtroDistritoEntidad = document.getElementById("filtroDistritoEntidad");
const btnLimpiarFiltrosEntidad = document.getElementById("btnLimpiarFiltrosEntidad");
const mensajeVacioEntidad = document.getElementById("mensajeVacioEntidad");

const filasReportesEntidad = document.querySelectorAll(".tabla-reportes-entidad tbody tr");

function filtrarReportesEntidad() {
  const texto = buscarReporteEntidad.value.toLowerCase().trim();
  const estado = filtroEstadoEntidad.value;
  const urgencia = filtroUrgenciaEntidad.value;
  const distrito = filtroDistritoEntidad.value;

  let visibles = 0;

  filasReportesEntidad.forEach(function (fila) {
    const codigoFila = fila.dataset.codigo;
    const estadoFila = fila.dataset.estado;
    const urgenciaFila = fila.dataset.urgencia;
    const distritoFila = fila.dataset.distrito;

    const coincideTexto = codigoFila.includes(texto);
    const coincideEstado = estado === "" || estado === estadoFila;
    const coincideUrgencia = urgencia === "" || urgencia === urgenciaFila;
    const coincideDistrito = distrito === "" || distrito === distritoFila;

    if (coincideTexto && coincideEstado && coincideUrgencia && coincideDistrito) {
      fila.style.display = "";
      visibles++;
    } else {
      fila.style.display = "none";
    }
  });

  if (visibles === 0) {
    mensajeVacioEntidad.style.display = "block";
  } else {
    mensajeVacioEntidad.style.display = "none";
  }
}

function limpiarFiltrosEntidad() {
  buscarReporteEntidad.value = "";
  filtroEstadoEntidad.value = "";
  filtroUrgenciaEntidad.value = "";
  filtroDistritoEntidad.value = "";

  filtrarReportesEntidad();
}

buscarReporteEntidad.addEventListener("input", filtrarReportesEntidad);
filtroEstadoEntidad.addEventListener("change", filtrarReportesEntidad);
filtroUrgenciaEntidad.addEventListener("change", filtrarReportesEntidad);
filtroDistritoEntidad.addEventListener("change", filtrarReportesEntidad);
btnLimpiarFiltrosEntidad.addEventListener("click", limpiarFiltrosEntidad);

filtrarReportesEntidad();