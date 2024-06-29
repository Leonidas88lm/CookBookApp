const parametros_URL = new URLSearchParams(window.location.search);
const redireccion = parametros_URL.get("url");

function handle_response(data) {
    if (data.exito) {
        if (redireccion === "crear-receta") {
            window.location.href = `/creacion-de-receta/NuevaReceta.html?id_usuario=${data.id_usuario}`
        }
        else if (data.exito && redireccion === "mis-recetas") {
            window.location.href = `/mis-recetas/MisRecetas.html?id_usuario=${data.id_usuario}`
        } 
    }
    else {
        datos_ingresados_invalidos()
    }

}

function iniciar_sesion(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const nombre = formData.get("nombre")
    const contraseña = formData.get("contraseña")
    
    fetch("http://localhost:5000/usuario/", {
        method: "POST",
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
        .catch((error) => console.log("ERROR", error))
}

function datos_ingresados_invalidos() {
    let aviso = document.getElementById("aviso")
    let input_password = document.getElementById("contraseña")
    aviso.innerText = ''
    aviso.innerText = "*el nombre o contraseña ingresados son incorrectos."
    input_password.value = ''
}

function redireccion_registro() {
    window.location.href = `/sesion/registro/RegistroUsuario.html?url=${redireccion}`
}

