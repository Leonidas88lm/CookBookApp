const parametros_URL = new URLSearchParams(window.location.search)
const id_receta = parametros_URL.get("id_receta")
const id_usuario = parametros_URL.get("id_usuario")
if (id_receta === null || id_usuario === null) {
    window.location.href = `/`
}


function handle_get_response(data) {
    document.getElementById("nombre").value = data.receta.nombre
    document.getElementById("descripcion").value = data.receta.descripcion
    document.getElementById("imagen").value = data.receta.imagen
    document.getElementById("video").value = data.receta.video
    document.getElementById("ingredientes").value = data.receta.ingredientes
    document.getElementById("receta").value = data.receta.receta
    document.getElementById("calorias").value = data.receta.calorias
    document.getElementById("tiempo_preparacion").value = data.receta.tiempo_preparacion
    document.getElementById("tipo_plato").value = data.receta.tipo_receta
    document.getElementById("dificultad").value = data.receta.dificultad   
    document.getElementById("alto_proteinas").checked = data.receta.alto_proteinas
    document.getElementById("bajo_carbohidratos").checked = data.receta.bajo_carbohidratos
    document.getElementById("apto_vegano").checked = data.receta.apto_vegano
    document.getElementById("apto_celiaco").checked = data.receta.apto_celiaco
    document.getElementById("apto_lactosa").checked = data.receta.apto_lactosa
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
    const nombre = formData.get("nombre")
    const descripcion = formData.get("descripcion")
    const imagen = formData.get("imagen")
    const video = formData.get("video")
    const ingredientes = formData.get("ingredientes")
    const receta = formData.get("receta")
    const tipo_plato = formData.get("tipo_plato")
    const dificultad = formData.get("dificultad")
    const calorias = formData.get("calorias")
    const tiempo_preparacion = formData.get("tiempo_preparacion")
    const alto_proteinas = formData.get("alto_proteinas") ? true : false
    const bajo_carbohidratos = formData.get("bajo_carbohidratos") ? true : false
    const apto_vegano = formData.get("apto_vegano") ? true : false
    const apto_celiaco = formData.get("apto_celiaco") ? true : false
    const apto_lactosa = formData.get("apto_lactosa") ? true : false

    fetch(`http://localhost:5000/recetas/${id_receta}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion,
            imagen: imagen,
            video: video,
            ingredientes: ingredientes,
            receta: receta,
            tipo_plato: tipo_plato,
            dificultad: dificultad,
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

function redireccion_mis_recetas() {
    window.location.href = `/mis-recetas/MisRecetas.html?id_usuario=${id_usuario}`
}