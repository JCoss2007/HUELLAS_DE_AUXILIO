// Función genérica para alternar la visibilidad de la contraseña
function togglePasswordVisibility(inputId, iconId) {
    const inputField = document.getElementById(inputId);
    const iconElement = document.getElementById(iconId);

    if (inputField.type === "password") {
        inputField.type = "text";
        // Opcional: Si tienes un icono de ojo tachado, puedes cambiarlo aquí
        // iconElement.src = "icons/ojo-cerrado.png"; 
        iconElement.style.opacity = "1";
    } else {
        inputField.type = "password";
        // iconElement.src = "icons/ojo.png";
        iconElement.style.opacity = "0.5";
    }
}

// Evento para el ojo de "Nueva contraseña"
document.getElementById("toggleNew").addEventListener("click", function() {
    togglePasswordVisibility("newPassword", "toggleNew");
});

// Evento para el ojo de "Confirmar contraseña"
document.getElementById("toggleConfirm").addEventListener("click", function() {
    togglePasswordVisibility("confirmPassword", "toggleConfirm");
});
/* ==========================================
   LÓGICA DEL MODAL DE ÉXITO
   ========================================== */
const formNuevaContrasena = document.getElementById("formNuevaContrasena");
const modalExito = document.getElementById("modalExito");
const btnCloseModalExito = document.getElementById("btnCloseModalExito");
const btnAceptarModalExito = document.getElementById("btnAceptarModalExito");

if(formNuevaContrasena) {
    formNuevaContrasena.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita recargar la página
        
        // Validamos que las contraseñas sean iguales
        const newPass = document.getElementById("newPassword").value;
        const confirmPass = document.getElementById("confirmPassword").value;
        
        if(newPass !== confirmPass) {
            alert("Las contraseñas no coinciden. Por favor, verifica.");
            return; // Detiene el código para no mostrar el modal
        }

        // Si son iguales, mostramos el modal de éxito
        modalExito.classList.add("activo");
    });
}

// Función para redirigir directamente al Login
function redirigirLogin() {
    modalExito.classList.remove("activo");
    window.location.href = "Login.html";
}

// Eventos para cerrar o aceptar
if(btnCloseModalExito) {
    btnCloseModalExito.addEventListener("click", function() {
        modalExito.classList.remove("activo");
    });
}

if(btnAceptarModalExito) {
    btnAceptarModalExito.addEventListener("click", redirigirLogin);
}