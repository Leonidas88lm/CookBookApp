const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");   
const id_usuario = parametros.get("id_usuario")     
const redireccio = parametros.get("url")     

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

//Tipo de plato: Plato principal, Acompañamiento, Salsa, Postre, Bebida.
    function crearEtiquetaTipoPlato(tipoPlato) {
        const tipo_plato = document.createElement("li");
    
        switch (tipoPlato) {
            case "Plato principal":
                tipo_plato.innerText = "Plato principal";
                break;
            case "Acompañamiento":
                tipo_plato.innerText = "Acompañamiento";
                break;
            case "Salsa":
                tipo_plato.innerText = "Salsa";
                break;
            case "Postre":
                tipo_plato.innerText = "Postre";
                break;
            case "Bebida":
                tipo_plato.innerText = "Bebida";
                break;
            default:
		//Si no coincide con ningun caso, salimos de la funcion
                return;
        }
    
        tipo_plato.setAttribute("class", "etiquetas-estilos");
        etiquetas.append(tipo_plato);
    }
    
    // Uso de la función crearEtiquetaTipoPlato()
    const tipoPlato = contenido.receta.tipo_plato;
    crearEtiquetaTipoPlato(tipoPlato);

//Dificultad: Facil, Medio, Dificil.
    function crearEtiquetaDificultad(dificultadReceta) {
        const dificultad = document.createElement("li");
    
        switch (dificultadReceta) {
            case "Facil":
                dificultad.innerText = "Fácil";
                break;
            case "Medio":
                dificultad.innerText = "Medio";
                break;
            case "Dificil":
                dificultad.innerText = "Difícil";
                break;
            // Si no coincide con ningún caso, salimos de la función
            default:
                return;
        }
        // Si llega hasta aquí es porque se encontró un caso válido
        dificultad.setAttribute("class", "etiquetas-estilos");
        etiquetas.append(dificultad);
    }
    
    // Uso de la función crearEtiquetaDificultad()
    const dificultadReceta = contenido.receta.dificultad;
    crearEtiquetaDificultad(dificultadReceta);


//Filtros: Alto en proteinas, Bajo en carbohidratos, Apto vegano, Apto celiaco y Apto lactosa.
    function crearEtiqueta(texto) {
        const etiqueta = document.createElement("li");
        etiqueta.innerText = texto;
        etiqueta.setAttribute("class", "etiquetas-estilos");
        etiquetas.append(etiqueta);
    }    

    //Uso de la funcion crearEtiqueta()
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

function redireccio_recetas() {
    if (redireccio == "mis-recetas")
        window.location.href = `/mis-recetas/MisRecetas.html?id_usuario=${id_usuario}`
    else
        window.location.href = "/CookBookAppmain.html"
}
