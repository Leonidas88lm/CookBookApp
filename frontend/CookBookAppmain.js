/*Filtra las tarjetas de recetas basándose en un filtro específico, (filtros: vegano etc...)*/
function filterRecipes(filter) {
    const cards = Array.from(document.querySelectorAll('.recipe-card'));

    let filteredCards = cards.filter(card => card.dataset.filters.includes(filter));

    if (filter.startsWith('calorias_')) {
        const maxCalories = parseInt(filter.split('_')[1], 10);
        filteredCards = filteredCards.filter(card => parseInt(card.dataset.calories, 10) <= maxCalories)
                                     .sort((a, b) => parseInt(b.dataset.calories, 10) - parseInt(a.dataset.calories, 10));
    } else if (filter.endsWith('_minutos')) {
        const maxTime = parseInt(filter.split('_')[0], 10);
        filteredCards = filteredCards.filter(card => parseInt(card.dataset.time, 10) <= maxTime)
                                     .sort((a, b) => parseInt(b.dataset.time, 10) - parseInt(a.dataset.time, 10));
    }

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

        switch (contenido.recetas[index].calorias) {            
            case 100:
                item.setAttribute("data-calories", "100");
                break;
            case 500:
                item.setAttribute("data-calories", "500");
                break;
            case 1000:
                item.setAttribute("data-calories", "1000");
                break;
            case 2000:
                item.setAttribute("data-calories", "2000");
                break;
            case 3000:
                item.setAttribute("data-calories", "3000");
                break;
            default:
                break;
        }

        const filters = construirFiltros(contenido.recetas[index]);
        if (filters !== "") {
            item.setAttribute("data-filters", filters);
        }


        const tiempo_preparacion = contenido.recetas[index].tiempo_preparacion;

        switch (tiempo_preparacion) {
            case 10:
            case 20:
            case 40:
            case 60:
            case 90:
            case 120:
                item.setAttribute("data-time", tiempo_preparacion.toString());

                const valor_tiempo_preparacion = tiempo_preparacion.toString();
                let filters = item.getAttribute("data-filters");

                if (!filters.includes(`${valor_tiempo_preparacion}_minutos`)) {
                    filters += ` ${valor_tiempo_preparacion}_minutos`;
                    item.setAttribute("data-filters", filters.trim());
                }
                break;
            default:
                // Manejar caso por defecto si es necesario
                break;
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
