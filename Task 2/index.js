
const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
//global variable
let editTodo = null;

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something!!")
        return false;
    }

    if (addBtn.value === 'Edit') {
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = 'Add';
        inputBox.value = "";
    }
    else {

        //Creating P tag
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = inputText;
        li.appendChild(p);
        todoList.appendChild(li);

        //Creating Edit Button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('btn', 'editBtn');
        li.appendChild(editBtn);

        //Creating Delete btn
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Remove';
        deleteBtn.classList.add('btn', 'deleteBtn')
        li.appendChild(deleteBtn);

        //Creating Done btn
        const doneBtn = document.createElement('button');
        doneBtn.innerText = 'Done';
        doneBtn.classList.add('btn', 'doneBtn')
        li.appendChild(doneBtn);

        //Empty todo box after adding
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}

// const updateTodo = (e) => {
//     if (e.target.innerHTML === 'Remove') {
//         todoList.removeChild(e.target.parentElement);
//         deleteLocalTodos(e.target.parentElement);
//     }

//     else if (e.target.innerHTML === 'Edit') {
//         inputBox.value = e.target.previousElementSibling.innerHTML;
//         inputBox.focus();
//         addBtn.value = 'Edit';
//         editTodo = e;
//     }

//     else if (e.target.innerHTML === 'Done') {
//         const list = e.target.parentElement;
//         const doneText = list.querySelector('p');
//         doneText.style.textDecoration = 'line-through';
//         // list.parentElement.appendChild(list);
//         e.target.innerHTML = 'Undo';
//     }
//     else if (e.target.innerHTML === 'Undo') {
//         const list = e.target.parentElement;
//         const doneText = list.querySelector('p');
//         doneText.style.textDecoration = ''; 
//         e.target.innerHTML = 'Done'; 
//     }
// }

const updateTodo = (e) => {
    if (e.target.innerHTML === 'Remove') {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    } else if (e.target.innerHTML === 'Edit') {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = 'Edit';
        editTodo = e;
    } else if (e.target.innerHTML === 'Done') {
        const list = e.target.parentElement;
        const doneText = list.querySelector('p');
        doneText.style.textDecoration = 'line-through';
        e.target.innerHTML = 'Undo';

        // Update local storage
        const todos = JSON.parse(localStorage.getItem("todos"));
        const todoIndex = todos.findIndex(todo => todo === doneText.innerHTML);
        if (todoIndex !== -1) {
            todos[todoIndex] = `<s>${doneText.innerHTML}</s>`; // Add line-through HTML tags
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    } else if (e.target.innerHTML === 'Undo') {
        const list = e.target.parentElement;
        const doneText = list.querySelector('p');
        doneText.style.textDecoration = '';
        e.target.innerHTML = 'Done';

        // Update local storage
        const todos = JSON.parse(localStorage.getItem("todos"));
        const todoIndex = todos.findIndex(todo => todo === `<s>${doneText.innerHTML}</s>`);
        if (todoIndex !== -1) {
            todos[todoIndex] = doneText.innerHTML; // Remove line-through HTML tags
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
}

const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            //Creating P tag
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.innerHTML = todo;
            li.appendChild(p);

            //Creating Edit Button
            const editBtn = document.createElement('button');
            editBtn.innerText = 'Edit';
            editBtn.classList.add('btn', 'editBtn');
            li.appendChild(editBtn);

            //Creating Delete btn
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Remove';
            deleteBtn.classList.add('btn', 'deleteBtn')
            li.appendChild(deleteBtn);

            //Creating Done btn
            const doneBtn = document.createElement('button');
            doneBtn.innerText = 'Done';
            doneBtn.classList.add('btn', 'doneBtn')
            li.appendChild(doneBtn);
            todoList.appendChild(li);
        });
    }
}

const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}


document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);

