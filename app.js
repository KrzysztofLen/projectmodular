// (function () {
//     'use strict';
//
//     var ENTER_KEY = 13;
//     var newTodoDom = document.getElementById('newWord__word');
//
//     var db = new PouchDB('my_database');
//     var remoteCouch = false;
//
//     // Update list without refresh page
//     db.changes({
//         since: 'now',
//         live: true
//     }).on('change', showTodos);
//
//     // We have to create a new todo document and enter it in the database
//     function addWord(text) {
//         var todo = {
//             _id: new Date().toISOString(),
//             title: text,
//             completed: false
//         };
//         db.put(todo).then(function (result) {
//             console.log("everything is ok");
//             console.log(result);
//         }).catch(function (err) {
//             console.log("everything is terrible");
//             console.log(err);
//         });
//     }
//
//     // Show the current list of todos by reading them from the database
//     function showTodos() {
//         db.allDocs({include_docs: true, descending: true}).then(function (doc) {
//             redrawTodosUI(doc.rows);
//         }).catch(function (err) {
//             console.log(err);
//         });
//     }
//
//     function redrawTodosUI(todos) {
//         var ul = document.getElementById('dictionary_list');
//         ul.innerHTML = '';
//         todos.forEach(function (todo) {
//             ul.appendChild(createTodoListItem(todo.doc));
//         });
//     }
//
//     function newTodoKeyPressHandler(event) {
//         document.getElementById("submit_new_word").onclick = function() {
//             addWord(newTodoDom.value);
//             newTodoDom.value = '';
//         };
//
//         if (event.keyCode === ENTER_KEY) {
//             if(newTodoDom.value === '') {
//                 alert('blad');
//             } else {
//                 addWord(newTodoDom.value);
//                 newTodoDom.value = '';
//             }
//         }
//     }
//
//     function addEventListeners() {
//         newTodoDom.addEventListener('keypress', newTodoKeyPressHandler, false);
//     }
//
//     function checkboxChanged(todo, event) {
//     }
//
//     // User has double clicked a todo, display an input so they can edit the title
//     function todoDblClicked(todo) {
//         var div = document.getElementById('li_' + todo._id);
//         var inputEditTodo = document.getElementById('input_' + todo._id);
//         div.className = 'editing';
//         inputEditTodo.focus();
//     }
//
//     // User pressed the delete button for a todo, delete it
//     function deleteButtonPressed(todo) {
//         db.remove(todo);
//     }
//
//     // If they press enter while editing an entry, blur it to trigger save
//     // (or delete)
//     function todoKeyPressed(todo, event) {
//         if (event.keyCode === ENTER_KEY) {
//             var inputEditTodo = document.getElementById('input_' + todo._id);
//             inputEditTodo.blur();
//         }
//     }
//
//     // The input box when editing a todo has blurred, we should save
//     // the new title or delete the todo if the title is empty
//     function todoBlurred(todo, event) {
//         var trimmedText = event.target.value.trim();
//         if (!trimmedText) {
//             db.remove(todo);
//         } else {
//             todo.title = trimmedText;
//             db.put(todo);
//         }
//     }
//
//
//     // Given an object representing a todo, this will create a list item
//     // to display it.
//     function createTodoListItem(todo) {
//         var checkbox = document.createElement('input');
//         checkbox.className = 'toggle';
//         checkbox.type = 'checkbox';
//         checkbox.addEventListener('change', checkboxChanged.bind(this, todo));
//
//         var label = document.createElement('label');
//         label.appendChild(document.createTextNode(todo.title));
//         label.addEventListener('dblclick', todoDblClicked.bind(this, todo));
//
//         var deleteLink = document.createElement('button');
//         deleteLink.className = 'destroy';
//         deleteLink.addEventListener('click', deleteButtonPressed.bind(this, todo));
//
//         var divDisplay = document.createElement('div');
//         divDisplay.className = 'word__view';
//         divDisplay.appendChild(checkbox);
//         divDisplay.appendChild(label);
//         divDisplay.appendChild(deleteLink);
//
//         var li = document.createElement('li');
//         li.id = 'li_' + todo._id;
//         li.appendChild(divDisplay);
//
//         if (todo.completed) {
//             li.className += 'complete';
//             checkbox.checked = true;
//         }
//
//         return li;
//     }
//
//     addEventListeners();
//     showTodos();
//
//     if (remoteCouch) {
//         sync();
//     }
//
// })();