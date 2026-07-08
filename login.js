const formLogin = document.getElementById("formLogin");

const email = document.getElementById("email");
const password = document.getElementById("password");

const mensajeError = document.getElementById("mensajeError");
const tituloError = document.getElementById("tituloError");
const textoError = document.getElementById("textoError");

const boxEmail = document.getElementById("boxEmail");
const boxPassword = document.getElementById("boxPassword");

const errorEmailIcon = document.getElementById("errorEmailIcon");
const errorPasswordIcon = document.getElementById("errorPasswordIcon");

const usuarios = [
  {
    correo: "ciudadano@huellas.com",
    contrasena: "123456",
    pagina: "Home_Ciudadano.html"
  },
  {
    correo: "entidad@huellas.com",
    contrasena: "123456",
    pagina: "Home_Entidad.html"
  }
];

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  limpiarErrores();

  const correoIngresado = email.value.trim();
  const contrasenaIngresada = password.value.trim();

  if (correoIngresado === "" || contrasenaIngresada === "") {
    mostrarErrorGeneral(
      "Completa todos los campos",
      "Ingresa tu correo y contraseña para continuar."
    );

    if (correoIngresado === "") {
      marcarErrorCorreo();
    }

    if (contrasenaIngresada === "") {
      marcarErrorPassword();
    }

    return;
  }

  const usuarioEncontrado = usuarios.find(function (usuario) {
    return usuario.correo === correoIngresado;
  });

  if (!usuarioEncontrado) {
    mostrarErrorGeneral(
      "No existe una cuenta con ese correo.",
      "Verifica el correo ingresado o crea una cuenta nueva."
    );

    marcarErrorCorreo();
    return;
  }

  if (usuarioEncontrado.contrasena !== contrasenaIngresada) {
    mostrarErrorGeneral(
      "Correo o contraseña incorrectos",
      "Verifica tus datos e inténtalo de nuevo."
    );

    marcarErrorCorreo();
    marcarErrorPassword();
    return;
  }

  window.location.href = usuarioEncontrado.pagina;
});

function mostrarErrorGeneral(titulo, texto) {
  tituloError.textContent = titulo;
  textoError.textContent = texto;
  mensajeError.classList.add("activo");
}

function marcarErrorCorreo() {
  boxEmail.classList.add("input-error");
  errorEmailIcon.classList.add("activo");
}

function marcarErrorPassword() {
  boxPassword.classList.add("input-error");
  errorPasswordIcon.classList.add("activo");
}

function limpiarErrores() {
  mensajeError.classList.remove("activo");

  boxEmail.classList.remove("input-error");
  boxPassword.classList.remove("input-error");

  errorEmailIcon.classList.remove("activo");
  errorPasswordIcon.classList.remove("activo");
}