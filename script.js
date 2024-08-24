document.addEventListener('DOMContentLoaded', function() {
 // Load tasks when the DOM is fully loaded
 loadFromLocalStorage();

 const todoInput = document.getElementById('todo-input');
 const addTodoBtn = document.getElementById('add-btn');

 // Add new todo
 addTodoBtn.addEventListener('click', function() {
     const todoText = todoInput.value.trim();
     if (todoText !== '') {
         addTodoItem(todoText, 'low');
         saveToLocalStorage();
         todoInput.value = '';
     }
 });

 // Add todo to the DOM
 function addTodoItem(text, priority = 'low', completed = false, dateAdded = new Date()) {
     const todoList = document.getElementById('todo-list');
     const li = document.createElement('li');
     li.classList.add(priority + '-priority');

     const span = document.createElement('span');
     span.textContent = text;

     const dateSpan = document.createElement('div');
     dateSpan.classList.add('date');
     dateSpan.textContent = `Added on: ${dateAdded.toLocaleDateString()}`;

     const checkBox = document.createElement('input');
     checkBox.type = 'checkbox';
     checkBox.checked = completed;
     checkBox.addEventListener('change', function() {
         li.classList.toggle('completed', checkBox.checked);
         saveToLocalStorage();
     });

     if (completed) {
         li.classList.add('completed');
     }

     const deleteBtn = document.createElement('button');
     deleteBtn.textContent = 'Delete';
     deleteBtn.addEventListener('click', function() {
         todoList.removeChild(li);
         saveToLocalStorage();
     });

     const editBtn = document.createElement('button');
     editBtn.textContent = 'Edit';
     editBtn.addEventListener('click', function() {
         const newTaskText = prompt('Edit task:', text);
         if (newTaskText && newTaskText.trim() !== '') {
             span.textContent = newTaskText.trim();
             saveToLocalStorage();
         }
     });

     li.appendChild(checkBox);
     li.appendChild(span);
     li.appendChild(dateSpan);
     li.appendChild(editBtn);
     li.appendChild(deleteBtn);
     todoList.appendChild(li);
 }

 function saveToLocalStorage() {
     const tasks = [];
     document.querySelectorAll('#todo-list li').forEach(li => {
         const task = {
             text: li.querySelector('span').textContent,
             completed: li.classList.contains('completed'),
             priority: li.className.split(' ')[0].split('-')[0],
             dateAdded: li.querySelector('.date').textContent.replace('Added on: ', '')
         };
         tasks.push(task);
     });

     // Save tasks under the logged-in user's key
     const loggedInUser = sessionStorage.getItem('loggedInUser');
     if (loggedInUser) {
         localStorage.setItem(`tasks_${loggedInUser}`, JSON.stringify(tasks));
     }
 }

 function loadFromLocalStorage() {
     const loggedInUser = sessionStorage.getItem('loggedInUser');
     if (loggedInUser) {
         const tasks = JSON.parse(localStorage.getItem(`tasks_${loggedInUser}`));
         if (tasks) {
             tasks.forEach(task => {
                 addTodoItem(task.text, task.priority, task.completed, new Date(task.dateAdded));
             });
         }
     }
 }

 // Handle user logout
 document.getElementById('logout-btn').addEventListener('click', function() {
     sessionStorage.removeItem('loggedInUser');
     window.location.href = 'index.html'; // Redirect to login page
 });
});
