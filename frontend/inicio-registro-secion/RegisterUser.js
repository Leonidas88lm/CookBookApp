function handle_response(data){
    if (data.exito){
      alert(data.mensaje + "\nID del nuevo usuario: " + data.id);
      window.location.href = `/creacion-de-receta/NuevaReceta.html`
    } else if (data.mensaje){
      alert(data.mensaje);
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

    if (contraseña !== contraseña_confirmacion){
      alert("Las contraseñas no coinciden, vuelva a intentarlo");
      return;
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
/* Adjunto script de validacion de contraseña, verifica que las contraseñas cumplan los siguientes requisitos: tengan un mínimo de 4 y un máximo de 16 caracteres, que contengan al menos una letra mayuscula y minúscula, un numero y un simbolo
  function validarContraseña(contraseña) {
    const longitudValida = contraseña.length >= 4 && contraseña.length <= 16;
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    const tieneMinuscula = /[a-z]/.test(contraseña);
    const tieneNumero = /\d/.test(contraseña);
    const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña);

    return longitudValida && tieneMayuscula && tieneMinuscula && tieneNumero && tieneSimbolo;
}

function crear_usuario(event) {
    event.preventDefault();

    const contraseña = document.getElementById("contraseña_registro").value;
    const confirmacion = document.getElementById("contraseña_registro_confirmacion").value;

    if (!validarContraseña(contraseña)) {
        alert("La contraseña debe tener entre 4 y 16 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un símbolo.");
        return;
    }

    if (contraseña !== confirmacion) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    alert("Usuario creado exitosamente!");
    // document.querySelector('form').submit();
}
*/