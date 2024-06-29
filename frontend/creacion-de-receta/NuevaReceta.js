function handle_response(data){
    if (data.exito){
        window.location.href = `/receta?id=${data.id_receta}`
    } else {
        alert("Error al crear la receta")
    }
}

function create_recipe(event){
    const parametros_URL = new URLSearchParams(window.location.search)
    const id_usuario = parametros_URL.get("id_usuario")
    if (id_usuario === null) {
        window.location.href = `/`
    }
    event.preventDefault()
    const formData = new FormData(event.target)
    const nombre = formData.get("nombre")
    const descripcion = formData.get("descripcion")
    const imagen = formData.get("imagen")
    const video = formData.get("video")
    const ingredientes = formData.get("ingredientes")
    const receta = formData.get("receta")
    const tipo_receta = formData.get("tipo_receta")
    const dificultad = formData.get("dificultad")
    const calorias = formData.get("calorias")
    const tiempo_preparacion = formData.get("tiempo_preparacion")
    const alto_proteinas = formData.get("highProtein") ? true : false
    const bajo_carbohidratos = formData.get("lowCarbs") ? true : false
    const apto_vegano = formData.get("veganFriendly") ? true : false
    const apto_celiaco = formData.get("celiacFriendly") ? true : false
    const apto_lactosa = formData.get("lactoseFree") ? true : false

    fetch("http://localhost:5000/recetas",{
        method: "POST",
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
            tipo_receta: tipo_receta,
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
    .catch((error) => console.log("Error", error))
}