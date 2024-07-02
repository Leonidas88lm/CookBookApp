const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");        

if (id === null) {
    window.location.href = "/CookBookAppmain.html";
}

function respuesta_recibida(respuesta){
    return respuesta.json()
}

function contenido_respuesta(contenido){
    const name = document.getElementById("name");
    name.innerText = contenido.receta.nombre;

    const image = document.getElementById("image");
    image.setAttribute("src", contenido.receta.imagen);

    const calorias = document.getElementById("calorias");
    calorias.innerText = "Calorias: "+ contenido.receta.calorias;

    const tiempo_preparacion = document.getElementById("tiempo_preparacion");
    tiempo_preparacion.innerText = "Tiempo de preparación: " + contenido.receta.tiempo_preparacion +" min";

    const etiquetas = document.getElementById("etiquetas");

    function crearEtiqueta(texto) {
        const etiqueta = document.createElement("li");
        etiqueta.innerText = texto;
        etiqueta.setAttribute("class", "etiquetas-estilos");
        etiquetas.append(etiqueta);
    }

    //tipo de plato: Plato principal, Acompañamiento, Salsa, Postre, Bebida.
    if (contenido.receta.tipo_plato == "plato_principal")
        crearEtiqueta("Plato principal")
    else if (contenido.receta.tipo_plato == "acompañamiento")
        crearEtiqueta("Acompañamiento")
    else if (contenido.receta.tipo_plato == "salsa")
        crearEtiqueta("Salsa")
    else if (contenido.receta.tipo_plato == "postre")
        crearEtiqueta("Postre")

    //Dificultad: Facil, Medio, Dificil.
    const dificultad = document.createElement("li");

    if (contenido.receta.dificultad == "facil")
        crearEtiqueta("Fácil") 
    else if (contenido.receta.dificultad == "medio")
        crearEtiqueta("Medio")
    else 
        crearEtiqueta("Dificil")

    //apto, alto, bajo.
    if (contenido.receta.alto_proteinas)
        crearEtiqueta("Alto en proteínas");
    if (contenido.receta.bajo_carbohidratos)
        crearEtiqueta("Bajo en carbohidratos");
    if (contenido.receta.apto_vegano)
        crearEtiqueta("Apto vegano");
    if (contenido.receta.apto_celiaco)
        crearEtiqueta("Apto celiaco");
    if (contenido.receta.apto_lactosa)
        crearEtiqueta("Apto lactosa");       

    const descripcion = document.getElementById("descripcion");
    descripcion.innerText = contenido.receta.descripcion;

    const ingredientes = document.getElementById("ingredientes");
    ingredientes.innerText = contenido.receta.ingredientes;

    const receta = document.getElementById("receta");
    receta.innerText = contenido.receta.receta;

    const video = document.getElementById("video");
    video.setAttribute("src", contenido.receta.video);
}

function handle_error(error){
    console.log("Ha ocurrido un error!", error);
}

fetch(`http://localhost:5000/recetas/${id}`)
    .then(respuesta_recibida)
    .then(contenido_respuesta)
    .catch(handle_error)
