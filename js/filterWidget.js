/**
 * Created by Hp on 2017-03-06.
 */

// const = new Array['all', 'red', 'blue', 'green', 'yellow', 'orange'];


var categories = ['all', 'red', 'blue', 'green', 'yellow', 'orange'];

for (var i = 0; i < categories.length; i++) {
    var menuClass = "cat-" + categories[i];

    document.getElementById("categoriesAll").innerHTML += "<li class=" + 'menu-' + menuClass + "><a href= " + '#' + menuClass + ">" + categories[i] + "</a></li>";
}

for (var i = 0; i < 20; i++) {
    var randNum = Math.floor((Math.random() * 5) + 1);

    document.getElementById("tiles").innerHTML += "<li class=" + 'cat-' + categories[randNum] + ">Tile -" + [i] + "</li>";

}

$(document).ready(function () {

    $(function () {
        $('.categories li a').click(function () {
            $('.categories li a').removeClass('active');
            $(this).addClass('active');
            var href = $(this).attr("href");
            // console.log(href);

            var color = href.replace("#", ".");

            // console.log(color);

            $('.tiles li').not(color).each(function () {
                $(this).addClass("hide");
                $(this).removeClass("show");
            })

            $(color).each(function () {
                $(this).addClass("show");
                $(this).removeClass("hide");
            })

            if (color == ".cat-all") {
                $('.tiles li').each(function () {
                    $(this).removeClass("hide");
                })
            } // end if statment

        }); // end click function

    }); // end function

}); // end document ready