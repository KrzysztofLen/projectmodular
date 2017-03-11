/**
 * Created by Hp on 2017-02-25.
 */
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];


$(document).ready(function() {

    // download json
    $("#dictionary-btn").click(function() {
        $.getJSON("../js/data.json", function(data) {
            var products = data.words;
            var ul = $("<ul>");
            var items = '';
            $.each(products, function(i, v) {
                items += "<li>" + v.english + "</li>";
                items += "<li>" + v.polish + "</li>";
            });
            ul.html(items);
            $('#content').append(ul);
            $("#dictionary-btn").off('click');
        });
    });

    // COMMENT FOR FUTUTRE WORKING
    // ADDING FUNCTIONALITY THAT SEND WORDS TO DB
    // USE MONGO DB
    // AFTER PLACE IN INPUT WORDS THEY ARE SEND IT TO DB
    // THEN FROM THERE THEY ARE DOWNLOAD
    // AFTER CLICK #DICTIONARY-BTN ALL WORDS ARE DOWNLOAD

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


    $("#btn_random").on("click", getQuote);

    $("#btn_random").click(function() {

        $.getJSON("../js/data.json", function(data) {

            var words = data.words;

            var num = Math.floor(Math.random() * words.length);

            $('#english_word').html(words[num].english);
            $('#polish_word').html(words[num].polish);

        });

    });

}); // end jQuery






function getQuote() {
    var color = Math.floor(Math.random() * colors.length);

    for (var i = 0; i < colors.length; i++) {
        var randCol = colors[color];
    }

    $("element zmieniajacy kolor").css({
        backgroundColor: randCol
    }).animate(1000);

}
