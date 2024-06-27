document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const todoList = document.getElementById('todo-list');

    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase();
        const items = todoList.getElementsByClassName('todo-item');
        Array.from(items).forEach(function(item) {
            const title = item.getElementsByClassName('todo-title')[0].textContent.toLowerCase();
            if (title.includes(searchText)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const item = event.target.closest('.todo-item');
            todoList.removeChild(item);
        }
    });
});