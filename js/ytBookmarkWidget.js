/**
 * Created by Hp on 2017-03-18.
 */

//# TODO refactorig and change to ES6

document.getElementById('ytBookmarkWidget__form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {

        var siteName = document.getElementById("siteName").value;
        var siteURL = document.getElementById("siteURL").value;

        if(!validateForm(siteName, siteURL)) {
            e.preventDefault();
            return false;
        }

        var bookmark = {
            name: siteName,
            url: siteURL
        }

        if (localStorage.getItem('bookmarks') === null) {
            //init array
            var bookmarks = [];

            bookmarks.push(bookmark);
            // set to local storage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        } else {
            // get bookmarks from localstorage
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

            // add bookmark to array
            bookmarks.push(bookmark);
            // RE - SET back to local storage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }

        // clear form
        document.getElementById('ytBookmarkWidget__form').reset();

        // re fetch bookmarks
        fetchBookmarks();

        e.preventDefault();
    }



function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResult = document.getElementById('bookmarksResults');

    // build output
    bookmarksResults.innerHTML = "";

    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        var generateBookmarkContainer = '<div class="well">' +
            '<h3>' + name + '</h3>' +
            '<a class="waves-effect waves-light btn moveTo--btn" target="_blank" href="' + url +'">Move</a>' +
            '<a onclick="deleteBookmark(\'' + url + '\')" class="waves-effect waves-light btn removeLink--btn" href="#">Delete</a>' +
            '</div>';

        bookmarksResult.innerHTML += generateBookmarkContainer;
    }
}

const deleteBookmark = (url) => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(let i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

document.getElementById('ytBookmarkWidget__form').addEventListener('submit', function (e) {
    validateForm();
    e.preventDefault();
    return false;
});

function validateForm (siteName, siteURL) {
    if (!siteName || !siteURL) {
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var siteURLinput = document.getElementById('siteURL');

    if (!siteURL.match(regex)) {
        siteURLinput.insertAdjacentHTML('afterend', "<div class='error-message'>" + 'Please use a valid URL' + "</div>");
        siteURLinput.style.color = '#e74c3c';
        //e.preventDefault();
        return false;
    }

    return true;
}
window.onload = fetchBookmarks();



// validate form
(function() {

    var valuationForm = document.getElementsByClassName("ytBookmarkWidget__form");

    if (valuationForm.length == 1) {
        setCustomAppearanceErrorMessage(valuationForm[0]);
    }

    function setCustomAppearanceErrorMessage(form) {
        var submitButton = document.getElementById("ytBookmarkWidget__submitBtn");

        suppressTheDefaultBubbles(form);

        submitButton.addEventListener("click", function() {
            replaceValidationMessagesForForm(form);
        });
    }

    function suppressTheDefaultBubbles(form) {
        form.addEventListener("invalid", function(event) {
            event.preventDefault();
        }, true);

        form.addEventListener("submit", function(event) {
            if (!this.checkValidity()) {
                event.preventDefault();
            }
        });
    }

    function replaceValidationMessagesForForm(form) {
        removePreviousMessages(form.querySelectorAll(".error-message"));
        addValidationMessages(form.querySelectorAll(":invalid"));
    }

    function removePreviousMessages(messages) {
        for (var i = 0; i < messages.length; i++) {
            messages[i].parentNode.removeChild(messages[i]);
        }
    }

    function addValidationMessages(fields) {
        for (var i = 0; i < fields.length; i++) {
            var parent = fields[i].parentNode;
            parent.insertAdjacentHTML("beforeend", "<div class='error-message'>" + "Please fill in a form" + "</div>");
        }

        if (fields.length > 0) {
            fields[0].focus();
        }
    }
})();