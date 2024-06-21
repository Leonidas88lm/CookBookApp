/*Filtra las tarjetas de recetas basándose en un filtro específico, (filtros: vegano etc...)*/
function filterRecipes(filter) {
    const cards = document.querySelectorAll('.recipe-card');
    cards.forEach(card => {
        if (card.dataset.filters.includes(filter)) {
                card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
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
/*Configura un evento de clic en las imágenes de las tarjetas de recetas para mostrar un modal con la imagen y el título de la receta usando jquery,
 (hace la imagen mas grande pera mejor visualisacion)*/
$(document).ready(function() {
    $('.recipe-card .card-img-top').on('click', function() {
        var imgSrc = $(this).attr('src');
        var title = $(this).closest('.recipe-card').find('.recipe-title').text();
        
        $('#modalImage').attr('src', imgSrc);
        $('#recipeModalLabel').text(title);
        $('#recipeModal').modal('show');
    });
});
