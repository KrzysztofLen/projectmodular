/**
 * Created by Hp on 2017-02-25.
 */

//# TODO Change all to jQuery
//var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

// $(document).ready(function() {

// download json
// $("#dictionary-btn").click(function() {
//     $.getJSON("../js/data.json", function(data) {
//         var products = data.words;
//         var ul = $("<ul>");
//         var items = '';
//         $.each(products, function(i, v) {
//             items += "<li>" + v.english + "</li>";
//             items += "<li>" + v.polish + "</li>";
//         });
//         ul.html(items);
//         $('#content').append(ul);
//         $("#dictionary-btn").off('click');
//     });
// });

//# TODO Add MongoDB (sending and taking from DB)

// add to JSON
// $('#btnSave').click(function () {
//     var english = $("#english").val();
//     var polish = $("#polish").val();
//
//     $.getJSON("../js/data.json", function(data) {
//         // console.log(data.words[1]);
//         var data1 = {
//             english: "test",
//             polish: "test"
//         };
//         data.words.push(data1);
//     });
//
// });

//     $("#btn_random").on("click", getQuote);
//
//     $("#btn_random").click(function() {
//
//         $.getJSON("../js/data.json", function(data) {
//
//             var words = data.words;
//
//             var num = Math.floor(Math.random() * words.length);
//
//             $('#english_word').html(words[num].english);
//             $('#polish_word').html(words[num].polish);
//
//         });
//
//     });
//
// }); // end jQuery


//
// //# TODO Remove not use code
// function getQuote() {
//     var color = Math.floor(Math.random() * colors.length);
//
//     for (var i = 0; i < colors.length; i++) {
//         var randCol = colors[color];
//     }
//
//     $("element zmieniajacy kolor").css({
//         backgroundColor: randCol
//     }).animate(1000);
//
// }


(function () {
    'use strict';

    const ENTER_KEY = 13;
    const newTodoDom = document.getElementById('newWord__word');

    const db = new PouchDB('my_database');
    const remoteCouch = false;

    // We have to create a new todo document and enter it in the database
    const addWord = (text) => {
        let todo = {
            _id: new Date().toISOString(),
            title: text,
            completed: false
        };
        db.put(todo).then(function (result) {
            console.log("everything is ok");
            console.log(result);
        }).catch(function (err) {
            console.log("everything is terrible");
            console.log(err);
        });
    }

    // Show the current list of todos by reading them from the database
    const showTodos = () => {
        db.allDocs({include_docs: true, descending: true}).then((doc) => {
            redrawTodosUI(doc.rows);
        }).catch((err) => {
            console.log(err);
        });
    }

    // Update list without refresh page
    db.changes({
        since: 'now',
        live: true
    }).on('change', showTodos);

    const redrawTodosUI = (todos) => {
        let ul = document.getElementById('dictionary_list');
        ul.innerHTML = '';
        todos.forEach((todo) => {
            ul.appendChild(createTodoListItem(todo.doc));
        });
    }

    const dectectSendingEmptyValue = () => {
        if (newTodoDom.value === '') {
            return false;
        } else {
            addWord(newTodoDom.value);
            newTodoDom.value = '';
        }
    }

    const sendingKeyPressEvent = (event) => {
        let submitNewWordButton = document.getElementById("submit_new_word");

        submitNewWordButton.onclick = () => {
            dectectSendingEmptyValue();
        };

        if (event.keyCode === ENTER_KEY) {
            dectectSendingEmptyValue();
        }
    }

    const addEventListeners = () => {
        newTodoDom.addEventListener('keypress', sendingKeyPressEvent, false);
    }

    const checkboxChanged = (todo, event) => {
    }

    // User has double clicked a todo, display an input so they can edit the title
    function todoDblClicked(todo) {
        var div = document.getElementById('li_' + todo._id);
        var inputEditTodo = document.getElementById('input_' + todo._id);
        div.className = 'editing';
        inputEditTodo.focus();
    }

    // User pressed the delete button for a todo, delete it
    function deleteButtonPressed(todo) {
        db.remove(todo);
    }

    // If they press enter while editing an entry, blur it to trigger save
    // (or delete)
    function todoKeyPressed(todo, event) {
        if (event.keyCode === ENTER_KEY) {
            var inputEditTodo = document.getElementById('input_' + todo._id);
            inputEditTodo.blur();
        }
    }

    // The input box when editing a todo has blurred, we should save
    // the new title or delete the todo if the title is empty
    function todoBlurred(todo, event) {
        var trimmedText = event.target.value.trim();
        if (!trimmedText) {
            db.remove(todo);
        } else {
            todo.title = trimmedText;
            db.put(todo);
        }
    }


    // Given an object representing a todo, this will create a list item
    // to display it.
    function createTodoListItem(todo) {
        var checkbox = document.createElement('input');
        checkbox.className = 'toggle';
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', checkboxChanged.bind(this, todo));

        var label = document.createElement('label');
        label.appendChild(document.createTextNode(todo.title));
        label.addEventListener('dblclick', todoDblClicked.bind(this, todo));

        var deleteLink = document.createElement('button');
        deleteLink.className = 'destroy';
        deleteLink.addEventListener('click', deleteButtonPressed.bind(this, todo));

        var divDisplay = document.createElement('div');
        divDisplay.className = 'word__view';
        divDisplay.appendChild(checkbox);
        divDisplay.appendChild(label);
        divDisplay.appendChild(deleteLink);

        var li = document.createElement('li');
        li.id = 'li_' + todo._id;
        li.appendChild(divDisplay);

        if (todo.completed) {
            li.className += 'complete';
            checkbox.checked = true;
        }

        return li;
    }

    addEventListeners();
    showTodos();

    if (remoteCouch) {
        sync();
    }

})();