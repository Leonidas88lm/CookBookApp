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