const MIN_CARACTERES = 4
const MAX_CARACTERES_CONTRASEÑA = 16
const MAX_CARACTERES_NOMBRE = 12

const parametros_URL = new URLSearchParams(window.location.search)
const redireccion = parametros_URL.get("url")

function handle_response(data) {
  if (data.exito) {
    window.location.href = `/sesion/inicio/InicioUsuario.html?url=${redireccion}`
  }
  else {
    mensaje = "nombre de usuario ya en uso"
    MensajeDatosInvalidos(mensaje)
  }
}

function crear_usuario(event){
  event.preventDefault()
  const formData = new FormData(event.target)
  const nombre = formData.get("nombre")
  const contraseña = formData.get("contraseña_registro")
  const contraseña_confirmacion = formData.get("contraseña_registro_confirmacion")

  if (!ValidarContraseña(contraseña)) {
    let mensaje = "La contraseña debe tener entre 4 y 16 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un símbolo."
    MensajeDatosInvalidos(mensaje)
    return
  } 
  if (!ValidarNombreUsuario(nombre)) {
    let mensaje = "El nombre debe tener entre 4 y 12 caracteres."
    MensajeDatosInvalidos(mensaje)
    return
  }
  if (contraseña != contraseña_confirmacion) {
      let mensaje = "Las contraseñas no coinciden, vuelva a intentarlo."
      MensajeDatosInvalidos(mensaje)
      return
  }
  
  fetch("http://localhost:5000/usuarios/crear", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre: nombre,
      contraseña: contraseña
    })
  })
  .then((res) => res.json())
  .then(handle_response)
  .catch((error) => console.log("Error", error))
}

function ValidarContraseña(contraseña) {
  const longitudValida = contraseña.length >= MIN_CARACTERES && contraseña.length <= MAX_CARACTERES_CONTRASEÑA
  const tieneMayuscula = /[A-Z]/.test(contraseña)
  const tieneMinuscula = /[a-z]/.test(contraseña)
  const tieneNumero = /\d/.test(contraseña)
  const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña)

  return longitudValida && tieneMayuscula && tieneMinuscula && tieneNumero && tieneSimbolo
}

function ValidarNombreUsuario(nombre) {
  const longitudValida = nombre.length >= MIN_CARACTERES && nombre.length <= MAX_CARACTERES_NOMBRE
  return longitudValida
}

function MensajeDatosInvalidos(mensaje) {
  let aviso = document.getElementById("aviso")
  let input_contraseña = document.getElementById("contraseña_registro")
  let input_confirmar_contra = document.getElementById("contraseña_registro_confirmacion")
  aviso.innerHTML = ''
  aviso.innerText = "*" + mensaje.toLowerCase()
  input_contraseña.value = ''
  input_confirmar_contra.value = ''
}

function redireccion_inicio_sesion() {
  window.location.href = `/sesion/inicio/InicioUsuario.html?url=${redireccion}`
}
function togglePassword() {
    var passwordField = document.getElementById("contraseña_registro");
    var passwordFieldType = passwordField.getAttribute("type");
    if (passwordFieldType === "password") {
        passwordField.setAttribute("type", "text");
    } else {
        passwordField.setAttribute("type", "password");
    }
}