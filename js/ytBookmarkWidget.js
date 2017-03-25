/**
 * Created by Hp on 2017-03-18.
 */

// listen for form submit
document.getElementById('ytBookmarkWidget__form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;

    if (!validateForm(siteName, siteURL)) {
        return false;
    }

}


// validate form
function validateForm(siteURL) {

    var siteURLinput = document.getElementById('siteURL');

    console.log(siteURLinput);
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteURL.match(regex)) {
        siteURLinput.insertAdjacentHTML('afterend', "<div class='error-message'>" + 'Please use a valid URL' + "</div>");
        siteURLinput.style.color = '#e74c3c';
        return false;
    }
}



// VALIDATION FUNCTION CHANGE !!!!!!!!
function replaceValidationUI(form) {
    var submitButton = document.getElementById("ytBookmarkWidget__submitBtn");

    // Suppress the default bubbles
    form.addEventListener("invalid", function (event) {
        event.preventDefault();
    }, true);

    // Support Safari, iOS Safari, and the Android browser—each of which do not prevent
    // form submissions by default
    form.addEventListener("submit", function (event) {
        if (!this.checkValidity()) {
            event.preventDefault();
        }
    });


    submitButton.addEventListener("click", function (event) {
        var invalidFields = form.querySelectorAll(":invalid"),
            errorMessages = form.querySelectorAll(".error-message"),
            parent;

        // Remove any existing messages
        for (var i = 0; i < errorMessages.length; i++) {
            errorMessages[i].parentNode.removeChild(errorMessages[i]);
        }

        for (var i = 0; i < invalidFields.length; i++) {
            parent = invalidFields[i].parentNode;
            parent.insertAdjacentHTML("beforeend", "<div class='error-message'>" + "Please fill in a form" +
                "</div>");
        }

        // If there are errors, give focus to the first invalid field
        if (invalidFields.length > 0) {
            invalidFields[0].focus();
        }
    });
} // end replaceValidationUI function


// Replace the validation UI for all forms
var forms = document.querySelectorAll("form");

for (var i = 0; i < forms.length; i++) {
    replaceValidationUI(forms[i]);
}


(function() {

    var valuationForm = document.getElementsByClassName("wycena");

    if (valuationForm.length == 1) {
        setCustomAppearanceErrorMessage(valuationForm[0]);
    }

    function setCustomAppearanceErrorMessage(form) {
        var submitButton = document.getElementById("wycen");

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
            parent.insertAdjacentHTML("beforeend", "<div class='error-message'>Niepoprawna " + fields[i].className + "</div>");
        }

        if (fields.length > 0) {
            fields[0].focus();
        }
    }
})();