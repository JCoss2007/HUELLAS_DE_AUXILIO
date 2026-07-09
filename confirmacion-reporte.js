const confirmUbicacionFinal = document.getElementById("confirmUbicacionFinal");
const confirmEvidenciaFinal = document.getElementById("confirmEvidenciaFinal");

const datosReporte = JSON.parse(localStorage.getItem("reporteActual")) || {
  distrito: "Lince",
  evidencias: []
};

confirmUbicacionFinal.textContent = datosReporte.distrito + ", Lima";

const cantidadEvidencias = datosReporte.evidencias.length;

if (cantidadEvidencias === 0) {
  confirmEvidenciaFinal.textContent = "Sin archivos";
}

if (cantidadEvidencias === 1) {
  confirmEvidenciaFinal.textContent = "1 archivo";
}

if (cantidadEvidencias > 1) {
  confirmEvidenciaFinal.textContent = cantidadEvidencias + " archivos";
}