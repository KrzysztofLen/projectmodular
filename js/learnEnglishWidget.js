/**
 * Created by Hp on 2017-02-25.
 */

(function () {
    'use strict';

    const ENTER_KEY = 13;
    const newTodoDom = document.getElementById('newWord__word');

    const db = new PouchDB('my_database');
    const remoteCouch = false;

    // We have to create a new document and enter it in the database
    const addWord = (text) => {
        let index = Math.floor(Math.random() * 100).toString();

        let todo = {
            _id: index,
            title: text,
            completed: false
        };
        db.put(todo).then((result) => {
            console.log("everything is ok");
            console.log(result);
        }).catch((err) => {
            console.log("everything is terrible");
            console.log(err);
        });
    }

    // Show the current list by reading them from the database
    const showDictionary = () => {
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
    }).on('change', showDictionary);

    const redrawTodosUI = (todos) => {
        randomWord(todos);
        let ul = document.getElementById('dictionary_list');
        ul.innerHTML = '';
        todos.forEach((todo) => {
            ul.appendChild(createWordListItem(todo.doc));
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

    // User pressed the delete button to delete item
    const deleteButtonPressed = (todo) => {
        db.remove(todo);
    }

    const createWordListItem = (todo) => {
        let checkbox = document.createElement('input');
        checkbox.id = todo._id;
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', checkboxChanged.bind(this, todo));

        let label = document.createElement('label');
        label.setAttribute("for", todo._id);
        label.appendChild(document.createTextNode(todo.title));

        let deleteLink = document.createElement('button');
        deleteLink.className = 'destroy';
        deleteLink.addEventListener('click', deleteButtonPressed.bind(this, todo));

        let divDisplay = document.createElement('div');
        divDisplay.className = 'word__view';
        divDisplay.appendChild(checkbox);
        divDisplay.appendChild(label);
        divDisplay.appendChild(deleteLink);

        let li = document.createElement('li');
        li.id = 'li_' + todo._id;
        li.appendChild(divDisplay);

        if (todo.completed) {
            li.className += 'complete';
            checkbox.checked = true;
        }

        return li;
    }

    const randomWord = (wordList) => {
        const btnRand = document.getElementById('btn_random');
        document.getElementById("random_word").innerHTML = wordList[1].doc.title;

        btnRand.onclick = () => {

            for (let i = 0; i < wordList.length; i++) {
                let rand = Math.floor(Math.random() * wordList.length);
                var randWord = wordList[rand];
            }
            document.getElementById("random_word").innerHTML = randWord.doc.title;
        }
    }

    addEventListeners();
    showDictionary();

    if (remoteCouch) {
        sync();
    }

})();