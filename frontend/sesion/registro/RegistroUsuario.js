const MIN_CARACTERES = 4
const MAX_CARACTERES_CONTRASEÑA = 16
const MAX_CARACTERES_NOMBRE = 12

const parametros_URL = new URLSearchParams(window.location.search);
const redireccion = parametros_URL.get("url");

function handle_response(data) {
  if (data.exito) {
    if (redireccion === "registro-crear-receta") {
      window.location.href = `/sesion/inicio/SesionUser.html?url=crear-receta`
    }
    else if (redireccion === "registro-mis-recetas") {
      window.location.href = `/sesion/inicio/SesionUser.html?url=mis-recetas`
    } 
    else {
      dato_invalido(data.mensaje)
    }
  } else {
    console.error("Respuesta inesperada del servidor:", data);
  }
}

function crear_usuario(event){
  event.preventDefault();
  const formData = new FormData(event.target);
  const nombre = formData.get("nombre");
  const contraseña = formData.get("contraseña_registro");
  const contraseña_confirmacion = formData.get("contraseña_registro_confirmacion");

    if (!ValidarContraseña(contraseña)) {
        let mensaje = "La contraseña debe tener entre 4 y 16 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un símbolo."
        MensajeDatosInvalidos(mensaje)
        return;
    } 
    else if (!validarNombreUsuario(nombre)) {
        let mensaje = "El nombre debe tener entre 4 y 16 caracteres."
        MensajeDatosInvalidos(mensaje)
        return;
    }
    else if (contraseña != confirmarContraseña) {
        alert("Las contraseñas no coinciden, vuelva a intentarlo.")
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



  function validarContraseña(contraseña) {
    const longitudValida = contraseña.length >= MIN_CARACTERES && contraseña.length <= MAX_CARACTERES_CONTRASEÑA;
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    const tieneMinuscula = /[a-z]/.test(contraseña);
    const tieneNumero = /\d/.test(contraseña);
    const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña);

    return longitudValida && tieneMayuscula && tieneMinuscula && tieneNumero && tieneSimbolo;
}

function validarNombreUsuario(nombre) {
  const longitudValida = nombre.length >= MIN_CARACTERES && contraseña.length <= MAX_CARACTERES_NOMBRE;
  return longitudValida;
}

function MensajeDatosInvalidos(mensaje) {
  let form = document.getElementById("form")
  if (form.querySelector("span") == null) {
      let aviso = document.createElement("span")
      aviso.setAttribute("id", "aviso")
      form.append(aviso)
  } 
  aviso = document.getElementById("aviso")
  aviso.innerText = "*" + mensaje.toLowerCase()
}