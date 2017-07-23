/**
 * Created by Hp on 2017-03-18.
 */

const saveBookmark = (e) => {
    const siteName = document.getElementById("bookmark-widget__input-siteName").value;
    const siteURL = document.getElementById("bookmark-widget__input-siteURL").value;

    const bookmark = {
        name: siteName,
        url: siteURL
    }

    if (!siteName || !siteURL) {
        return false;
    }

    if (localStorage.getItem('bookmarks') === null) {
        //init array
        let bookmarks = [];
        bookmarks.push(bookmark);
        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from localstorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // RE - SET back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form
    document.getElementById('bookmark-widget__form').reset();

    // re fetch bookmarks
    fetchBookmarks();

    e.preventDefault();
}

const fetchBookmarks = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    const bookmarksResult = document.getElementById('bookmark-widget__results');

    // build output
    bookmarksResult.innerHTML = "";

    for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        const generateBookmarkContainer = '<div class="well">' +
            '<h3 class="bookmark-widget__results-title">' + name + '</h3>' +
            '<a class="waves-effect waves-light btn bookmark-widget__move-btn" target="_blank" href="' + url + '">Move</a>' +
            '<a onclick="deleteBookmark(\'' + url + '\')" class="waves-effect waves-light btn bookmark-widget__remove-btn" href="#">Delete</a>' +
            '</div>';

        bookmarksResult.innerHTML += generateBookmarkContainer;
    }
}

const deleteBookmark = (url) => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

document.getElementById('bookmark-widget__form').addEventListener('submit', function (e) {
    validateForm(e);
});

const validateForm = (e) => {

    const siteURL = document.getElementsByClassName("bookmark-widget__input-siteURL")[0].value;

    if (!siteURL) {
        return false;
    }

    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    const siteURLinput = document.getElementById('bookmark-widget__input-siteURL');

    if (!siteURL.match(regex)) {
        siteURLinput.insertAdjacentHTML('afterend', "<div class='error-message'>" + 'Please use a valid URL' + "</div>");
        siteURLinput.style.color = '#e74c3c';
        e.preventDefault();
        return false;
    } else {
        saveBookmark(e);
    }
}

window.onload = fetchBookmarks();


// validate form
(function () {

    var valuationForm = document.getElementsByClassName("bookmark-widget__form");

    if (valuationForm.length == 1) {
        setCustomAppearanceErrorMessage(valuationForm[0]);
    }

    function setCustomAppearanceErrorMessage(form) {
        var submitButton = document.getElementById("bookmark-widget__submit-btn");

        suppressTheDefaultBubbles(form);

        submitButton.addEventListener("click", function () {
            replaceValidationMessagesForForm(form);
        });
    }

    function suppressTheDefaultBubbles(form) {
        form.addEventListener("invalid", function (e) {
            e.preventDefault();
        }, true);

        form.addEventListener("submit", function (e) {
            if (!this.checkValidity()) {
                e.preventDefault();
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