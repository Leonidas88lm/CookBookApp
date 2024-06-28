const parametros_URL = new URLSearchParams(window.location.search)
const id_receta = parametros_URL.get("id_receta")
const id_usuario = parametros_URL.get("id_usuario")
if (id_receta === null || id_usuario === null) {
    window.location.href = `/`
}

function handle_get_response(data) {
    document.getElementById("recipeName").value = data.receta.nombre
    document.getElementById("description").value = data.receta.descripcion
    document.getElementById("imageLink").value = data.receta.imagen
    document.getElementById("videoLink").value = data.receta.video
    document.getElementById("ingredients").value = data.receta.ingredientes
    document.getElementById("recipe").value = data.receta.receta
    document.getElementById("calories").value = data.receta.calorias
    document.getElementById("prepTime").value = data.receta.tiempo_preparacion
    document.getElementById("highProtein").checked = data.receta.alto_proteinas
    document.getElementById("lowCarbs").checked = data.receta.bajo_carbohidratos
    document.getElementById("veganFriendly").checked = data.receta.apto_vegano
    document.getElementById("celiacFriendly").checked = data.receta.apto_celiaco
    document.getElementById("lactoseFree").checked = data.receta.apto_lactosa
}

fetch(`http://localhost:5000/recetas/${id_receta}`)
    .then((response) => response.json())
    .then(handle_get_response)
    .catch((error) => console.log("ERROR", error))

  
    
function handle_response(data) {
    if (data.exito) {
        window.location.href = `/mis-recetas/MisRecetas.html?id_usuario=${id_usuario}`
    } else {
        alert("Error")
    }
}

function edit_receta(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const nombre = formData.get("name")
    const descripcion = formData.get("description")
    const imagen = formData.get("imageLink")
    const video = formData.get("videoLink")
    const ingredientes = formData.get("ingredients")
    const receta = formData.get("recipe")
    const calorias = formData.get("calories")
    const tiempo_preparacion = formData.get("prepTime")
    const alto_proteinas = formData.get("highProtein") ? true : false
    const bajo_carbohidratos = formData.get("lowCarbs") ? true : false
    const apto_vegano = formData.get("veganFriendly") ? true : false
    const apto_celiaco = formData.get("celiacFriendly") ? true : false
    const apto_lactosa = formData.get("lactoseFree") ? true : false

    fetch(`http://localhost:5000/recetas/${id_receta}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            imagen: imagen,
            video: video,
            descripcion: descripcion,
            ingredientes: ingredientes,
            receta: receta,
            calorias: calorias,
            tiempo_preparacion: tiempo_preparacion,
            alto_proteinas: alto_proteinas,
            bajo_carbohidratos: bajo_carbohidratos,
            apto_vegano: apto_vegano,
            apto_celiaco: apto_celiaco,
            apto_lactosa: apto_lactosa
        })
    })
        .then((res) => res.json())
        .then(handle_response)
        .catch((error) => console.log("ERROR", error))
}
