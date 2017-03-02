var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];


$(document).ready(function() {

  // download json
  $("#dictionary-btn").click(function() {
    $.getJSON("data.json", function(data) {
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


    $("#btn_random").on("click", getQuote);

    $("#btn_random").click(function() {

      $.getJSON("data.json", function(data) {

        var words = data.words;

        var num = Math.floor(Math.random() * words.length);

        $('#english_word').html(words[num].english);
        $('#polish_word').html(words[num].polish);

      });


        var text = '{"words":[' +
            '{"english":"superseded","polish":"wyparte" },' +
            '{"english":"discouraged","polish":"zniechęcony" },' +
            '{"english":"occurs","polish":"występuje" }]}';


            // $.ajax({
            //   dataType: 'json',
            //   url: 'dictionary.json',
            //   success: function() {
            //     alert("udało się");
            //   }
            // })


        // obj = JSON.parse(text);
        // document.getElementById("english_word").innerHTML =
        //     obj.words[num].english;
        // document.getElementById("polish_word").innerHTML = obj.words[num].polish

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
