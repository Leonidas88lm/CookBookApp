const parametros_URL = new URLSearchParams(window.location.search);
const id_usuario = parametros_URL.get("id_usuario");
if (id_usuario === null) {
    window.location.href = `/`;
}

function response_received(response) {
    return response.json()
}

function parse_data(contenido) {
    const recetas = contenido.recetas;
    const listado = document.getElementById("todo-list"); 
    for (let index = 0; index < recetas.length; index++) {
        
        let item = document.createElement("div")
        item.setAttribute("id", `${recetas[index].id}`)
        item.setAttribute("class", "todo-item mb-3 p-2 border")

        let nombre = document.createElement("a")
        nombre.setAttribute("class", "text-light mr-2")
        nombre.setAttribute("style", "cursor:pointer")
        nombre.setAttribute("href", `/receta/Receta.html?url=mis-recetas&id_usuario=${id_usuario}&id=${contenido.recetas[index].id}`);
        nombre.innerText = recetas[index].nombre
        
	let botones = document.createElement("div")
	botones.setAttribute("class", "ml-auto")

        let boton_remover = document.createElement("button")
        boton_remover.textContent = "Borrar"
        boton_remover.setAttribute("class", "btn btn-danger btn-sm mr-2")
        boton_remover.onclick = function () {remover_receta(`${recetas[index].id}`)}

        let boton_edit = document.createElement("button")
        boton_edit.textContent = "Editar"
        boton_edit.setAttribute("class", "btn btn-warning btn-sm mr-2")
        boton_edit.onclick = function () { 
            window.location.href=`/mis-recetas/editar-receta/EditarReceta.html?id_receta=${recetas[index].id}&id_usuario=${id_usuario}` 
        }

        botones.append(boton_edit)
	botones.append(boton_remover)
	item.append(nombre)
	item.append(botones)
	listado.append(item)
    }
}

function handle_error(error) {
    console.log("Error!", error)
}

fetch(`http://localhost:5000/usuarios/${id_usuario}/recetas/`)
    .then(response_received)
    .then(parse_data)
    .catch(handle_error)



function delete_response(data) {
    if (data.exito) {
        document.getElementById(data.id_receta).remove()
    } else {
        alert("A ocurrido un error al querer eliminar la receta")
    }
}

function remover_receta(id_receta) {
    const confirmacion = confirm(`Quieres eliminar la receta?`)
    if (!confirmacion) {
        return;
    }

    fetch(
        `http://localhost:5000/recetas/${id_receta}/${id_usuario}`,
        { method: "DELETE" }
    )
        .then((res) => res.json())
        .then(delete_response)
        .catch(handle_error)
}

 
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const todoList = document.getElementById('todo-list');

    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.trim().toLowerCase();

        // Obtener todas las recetas
        const items = todoList.getElementsByClassName('todo-item');

        Array.from(items).forEach(function(item) {
            const title = item.getElementsByTagName('a')[0].innerText.toLowerCase(); // Obtener el nombre de la receta

            // Mostrar u ocultar la receta según el texto de búsqueda
            if (title.includes(searchText)) {
                item.classList.remove('d-none'); // Mostrar la receta
            } else {
                item.classList.add('d-none'); // Ocultar la receta
            }
        });
    });

    // Event listener para el clic en el botón de eliminar receta
    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const item = event.target.closest('.todo-item');
            item.remove(); // Eliminar el elemento de la lista
        }
    });
});

function redireccion_crear_recetas() {
    window.location.href = `/creacion-de-receta/NuevaReceta.html?&url=mis-recetas&id_usuario=${id_usuario}`
}
