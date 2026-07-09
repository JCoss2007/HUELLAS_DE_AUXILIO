// ==========================================
// ELEMENTOS DEL DROPDOWN DE ESTADOS
// ==========================================
const dropdownHeader = document.getElementById('dropdownHeader');
const dropdownList = document.getElementById('dropdownList');
const dropdownItems = dropdownList ? dropdownList.querySelectorAll('li') : [];

// Abrir y cerrar el menú desplegable
if (dropdownHeader && dropdownList) {
  dropdownHeader.addEventListener('click', () => {
    dropdownList.classList.toggle('show');
    dropdownHeader.classList.toggle('active');
  });
}

// Selección de opciones dentro del menú
dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    // Limpiar estados anteriores
    dropdownItems.forEach(el => {
      el.classList.remove('selected');
      const check = el.querySelector('.check-icon');
      if (check) check.remove();
    });

    // Marcar el elemento seleccionado
    item.classList.add('selected');
    
    const checkIcon = document.createElement('img');
    checkIcon.src = 'icons/check-azul.png'; // Mantén tu ruta original de iconos
    checkIcon.className = 'check-icon';
    checkIcon.alt = 'Seleccionado';
    item.appendChild(checkIcon);

    // Clonar el punto de color y capturar el texto
    const colorDot = item.querySelector('.dot').cloneNode(true);
    const text = item.innerText.trim();
    
    // Actualizar la cabecera visible
    dropdownHeader.innerHTML = `
      <span>
        ${colorDot.outerHTML} ${text}
      </span>
      <img src="icons/chevron-down.png" class="chevron" alt="v" />
    `;
    
    dropdownList.classList.remove('show');
    dropdownHeader.classList.remove('active');
  });
});

// Cerrar el menú si se hace clic en cualquier otra parte de la pantalla
document.addEventListener('click', (e) => {
  const dropdownContainer = document.getElementById('statusDropdown');
  if (dropdownContainer && !dropdownContainer.contains(e.target) && dropdownList) {
    dropdownList.classList.remove('show');
    dropdownHeader.classList.remove('active');
  }
});


// ==========================================
// LÓGICA DEL MODAL DE CONFIRMACIÓN
// ==========================================
const btnActualizar = document.getElementById('btnActualizarEstado');
const modalConfirmar = document.getElementById('modalConfirmarEstado');
const btnCerrar = document.getElementById('btnCerrarConfirmar');
const btnCancelar = document.getElementById('btnCancelarConfirmar');
const btnGuardar = document.getElementById('btnGuardarConfirmar');
const textoNuevoEstado = document.getElementById('textoNuevoEstado');

function abrirModalConfirmacion() {
  if (dropdownHeader && textoNuevoEstado && modalConfirmar) {
    // Captura el texto de la opción elegida para mostrarla en el mensaje
    const textToInject = dropdownHeader.innerText.trim();
    textoNuevoEstado.innerText = `"${textToInject}"`;
    modalConfirmar.classList.add('activo');
  }
}

function cerrarModalConfirmacion() {
  if (modalConfirmar) {
    modalConfirmar.classList.remove('activo');
  }
}

// Asignación de eventos a los botones del modal
if (btnActualizar) btnActualizar.addEventListener('click', abrirModalConfirmacion);
if (btnCerrar) btnCerrar.addEventListener('click', cerrarModalConfirmacion);
if (btnCancelar) btnCancelar.addEventListener('click', cerrarModalConfirmacion);

if (btnGuardar) {
  btnGuardar.addEventListener('click', () => {
    alert("¡Estado actualizado correctamente!");
    cerrarModalConfirmacion();
  });
}