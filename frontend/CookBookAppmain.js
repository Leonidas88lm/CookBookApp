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
