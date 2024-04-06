document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const newTodoInput = document.getElementById('new-todo');
    const clearCompletedButton = document.getElementById('clear-completed');
    const filterButtons = document.querySelectorAll('.filters button');

    loadTodos();

    addButton.addEventListener('click', addTodo);
    clearCompletedButton.addEventListener('click', clearCompleted);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => applyFilter(button.id));
    });

    function addTodo() {
        const todoText = newTodoInput.value.trim();
        if (!todoText) return;

        createTodoElement(todoText, false);
        newTodoInput.value = '';
        saveTodos();
    }

    function createTodoElement(text, completed) {
        const li = document.createElement('li');
        if (completed) li.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', toggleTodoComplete);

        const textNode = document.createTextNode(text);
        li.appendChild(checkbox);
        li.appendChild(textNode);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTodos();
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    function toggleTodoComplete(event) {
        const li = event.target.parentElement;
        li.classList.toggle('completed');
        saveTodos();
    }

    function clearCompleted() {
        document.querySelectorAll('#todo-list li.completed').forEach(li => li.remove());
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            todos.push({
                text: li.childNodes[1].nodeValue.trim(),
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        savedTodos.forEach(todo => {
            createTodoElement(todo.text, todo.completed);
        });
    }

    function applyFilter(filter) {
        let todos = todoList.children;

        for (let todo of todos) {
            switch (filter) {
                case 'filter-all':
                    todo.style.display = '';
                    break;
                case 'filter-active':
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'none';
                    } else {
                        todo.style.display = '';
                    }
                    break;
                case 'filter-completed':
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'none';
                    } else {
                        todo.style.display = '';
                    }
                    break;
            }
        }
    }
});
