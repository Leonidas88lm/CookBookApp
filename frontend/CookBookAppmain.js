/*Filtra las tarjetas de recetas basándose en un filtro específico, (filtros: vegano etc...)*/
function filterRecipes(filter) {
    const cards = Array.from(document.querySelectorAll('.recipe-card'));
    let filteredCards = cards.filter(card => card.dataset.filters.includes(filter));
    cards.forEach(card => card.style.display = 'none');
    filteredCards.forEach(card => card.style.display = 'block');
}
/*Busca y filtra las tarjetas de recetas basándose en un término de búsqueda, (cuadro de busqueda)*/
function searchRecipes() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const cards = document.querySelectorAll('.recipe-card');
    cards.forEach(card => {
        const title = card.querySelector('.recipe-title').innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


//funcion para recopilar los filtros que posee una receta:
function construirFiltros(receta) {
    let filters = "";

    // Filtros basados en la dificultad
    switch (receta.dificultad) {
        case "Facil":
            filters += " Facil";
            break;
        case "Medio":
            filters += " Medio";
            break;
        case "Dificil":
            filters += " Dificil";
            break;
        default:
            break;
    }

    // Filtros basados en el tipo de receta (tipo de plato)
    switch (receta.tipo_receta) {
        case "Plato principal":
            filters += " Plato_principal";
            break;
        case "Acompañamiento":
            filters += " Acompañamiento";
            break;
        case "Salsa":
            filters += " Salsa";
            break;
        case "Postre":
            filters += " Postre";
            break;
        case "Bebida":
            filters += " Bebida";
            break;
        default:
            break;
    }

    // Filtros adicionales basados en propiedades booleanas
    if (receta.alto_proteinas) {
        filters += " alta_proteina";
    }
    if (receta.bajo_carbohidratos) {
        filters += " bajo_carbohidratos";
    }
    if (receta.apto_vegano) {
        filters += " vegano";
    }
    if (receta.apto_celiaco) {
        filters += " celiacos";
    }
    if (!receta.apto_lactosa) {
        filters += " sin_lactosa";
    }

    // Filtros basados en las calorías
    if (receta.calorias >= 1 && receta.calorias <= 100) {
        filters += " calorias_100";
    }
    else if (receta.calorias > 100 && receta.calorias <= 500) {
        filters += " calorias_500";
    }
    else if (receta.calorias > 500 && receta.calorias <= 1000) {
        filters += " calorias_1000";
    }
    else if (receta.calorias > 1000 && receta.calorias <= 2000) {
        filters += " calorias_2000";
    }
    else if (receta.calorias > 2000 && receta.calorias <= 3000) {
        filters += " calorias_3000";
    }

    // Filtros basados en tiempo de preparacion
    if (receta.tiempo_preparacion >= 1 && receta.tiempo_preparacion <= 10) {
        filters += " 10_minutos";
    }
    else if (receta.tiempo_preparacion > 10 && receta.tiempo_preparacion <= 20) {
        filters += " 20_minutos";
    }
    else if (receta.tiempo_preparacion > 20 && receta.tiempo_preparacion <= 40) {
        filters += " 40_minutos";
    }
    else if (receta.tiempo_preparacion > 40 && receta.tiempo_preparacion <= 60) {
        filters += " 60_minutos";
    }
    else if (receta.tiempo_preparacion > 60 && receta.tiempo_preparacion <= 90) {
        filters += " 90_minutos";
    }
    else if (receta.tiempo_preparacion > 90 && recetas.tiempo_preparacion <=120) {
        filters += " 120_minutos";
    }

    return filters.trim(); // Devuelve los filtros sin espacios al inicio o al final
}

//funcion que recibe la respuesta del fetch:
function respuesta_recibida(respuesta){
    return respuesta.json();
}
//funcion que recibe el contenido de la respuesta del fetch:
function contenido_respuesta(contenido){

    const contenedor = document.getElementById("recetas");
    for (let index = 0; index < contenido.recetas.length; index++){
        const item = document.createElement("div")
        item.setAttribute("class", "col-md-4 recipe-card ")

        const filters = construirFiltros(contenido.recetas[index]);
        if (filters !== "") {
            item.setAttribute("data-filters", filters);
        }

        const name = document.createElement("h5");
        name.innerText = contenido.recetas[index].nombre;
        name.setAttribute("class", "recipe-title");

        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const anchor = document.createElement("a");
        anchor.setAttribute("class", "text-decoration-none text-dark");
        anchor.setAttribute("href", `/receta/Receta.html?id=${contenido.recetas[index].id}`);

        const image = document.createElement("img");
        image.setAttribute("class", "card-img-top");
        image.setAttribute("src", contenido.recetas[index].imagen);
        image.setAttribute("alt", contenido.recetas[index].nombre);

        const card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");

        const description = document.createElement("p");
        description.setAttribute("class", "card-text");
        description.innerText = contenido.recetas[index].descripcion;

        card_body.append(description);
        anchor.append(name);
        anchor.append(image);
        anchor.append(card_body);
        card.append(anchor);
        item.append(card);

        contenedor.append(item);
    } 
}

function respuesta_error(error){
    console.log("Error");
    console.log(error);
}

fetch("http://localhost:5000/recetas/")
.then(respuesta_recibida)
.then(contenido_respuesta)
.catch(respuesta_error)
