// Seleccionamos los elementos
const btnAbrirDerivar = document.getElementById("btnAbrirDerivar");
const modalDerivar = document.getElementById("modalDerivar");
const btnCerrarDerivar = document.getElementById("btnCerrarDerivar");
const btnCancelarDerivar = document.getElementById("btnCancelarDerivar");
const btnConfirmarDerivar = document.getElementById("btnConfirmarDerivar");

// Función genérica para cerrar el modal
function cerrarModal() {
    modalDerivar.classList.remove("activo");
}

// Evento para ABRIR el modal
if (btnAbrirDerivar) {
    btnAbrirDerivar.addEventListener("click", function(event) {
        event.preventDefault(); 
        modalDerivar.classList.add("activo");
    });
}

// Eventos para CERRAR el modal
if (btnCerrarDerivar) btnCerrarDerivar.addEventListener("click", cerrarModal);
if (btnCancelarDerivar) btnCancelarDerivar.addEventListener("click", cerrarModal);

// Evento para CONFIRMAR
if (btnConfirmarDerivar) {
    btnConfirmarDerivar.addEventListener("click", function() {
        alert("¡Derivación confirmada y enviada a la entidad aliada!");
        cerrarModal();
        // Aquí en el futuro conectarías con la base de datos
    });
}