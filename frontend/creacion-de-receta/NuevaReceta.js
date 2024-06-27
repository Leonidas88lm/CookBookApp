function handle_response(data){
    if (data.exito){
        window.location.href = `/receta?id=${data.id_receta}`
    } else {
        alert("Error al crear la receta")
    }
}

function create_recipe(event){
    event.preventDefault()
    const formData = new FormData(event.target)

    const nombre = formData.get("nombre")
    const descripcion = formData.get("descripcion")
    const imagen = formData.get("imagen")
    const video = formData.get("video")
    const ingredientes = formData.get("ingredientes")
    const receta = formData.get("receta")
    const calorias = formData.get("calorias")
    const tiempo_preparacion = formData.get("tiempo_preparacion")
    
    const alto_proteinas = document.getElementById('highProtein').checked;
    const bajo_carbohidratos = document.getElementById('lowCarbs').checked;
    const apto_vegano = document.getElementById('veganFriendly').checked;
    const apto_celiaco = document.getElementById('celiacFriendly').checked;
    const apto_lactosa = document.getElementById('lactoseFree').checked;
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