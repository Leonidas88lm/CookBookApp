const parametros_URL = new URLSearchParams(window.location.search)
const id_usuario = parametros_URL.get("id_usuario")
const redireccion = parametros_URL.get("url")
if (id_usuario === null) {
    window.location.href = `/`
}

function handle_response(data){
    if (data.exito){
        window.location.href = `/receta/Receta.html?id=${data.id_receta}`
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
    const tipo_plato = formData.get("tipo_plato")
    const dificultad = formData.get("dificultad")
    const calorias = formData.get("calorias")
    const tiempo_preparacion = formData.get("tiempo_preparacion")
    const alto_proteinas = formData.get("alto_proteinas") ? true : false
    const bajo_carbohidratos = formData.get("bajo_carbohidratos") ? true : false
    const apto_vegano = formData.get("apto_vegano") ? true : false
    const apto_celiaco = formData.get("apto_celiaco") ? true : false
    const apto_lactosa = formData.get("apto_lactosa") ? true : false

    fetch("http://localhost:5000/recetas/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_usuario: id_usuario,
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
    .catch((error) => console.log("Error", error))
}

function redireccion_segun_url() {
    if (redireccion == "mis-recetas") 
        window.location.href = `/mis-recetas/MisRecetas.html?id_usuario=${id_usuario}`
    else 
        window.location.href = '/CookBookAppmain.html'
}   