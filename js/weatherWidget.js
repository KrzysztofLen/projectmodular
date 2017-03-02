/**
 * Created by Hp on 2017-02-20.
 */
$(document).ready(function() {

    getLocation();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }


    function showPosition(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        apiLink(lat, long);
    }

    function apiLink(lat, long) {
        var api = "http://api.openweathermap.org/data/2.5/weather?";
        var coords = "lat=" + lat + "&lon=" + long;
        var apiId = "&appid=bff4e1badcf10cc889cb1eb07661ad0b";
        var json = api + coords + apiId;

        showWeather(json);
    }

    function showWeather(json) {

        $.getJSON(json, function (jd) {
            var myWeather = jd.weather[0].main;
            var myTemp = jd.main.temp;
            var myCity = jd.name;

            $(".temp__cityName").append(myCity);

            var celsius = Math.round(myTemp - 273.15);

            $(".temp__temperature").append(Math.round(celsius));

            $(".temp__temperature").each(function () {
                var kelvin = Math.round(celsius + 273.15);

                $("#temp a").click(function () {
                    $(this).replaceWith("<a href=''>K</a>");

                    $(".temp__temperature").replaceWith("<h2 class='temp__temperature'>" + kelvin + "</h2>");
                })


                function showIco(weather) {

                    switch (weather) {
                        case "Dizzle":
                            $(".sun-shower").css("display", "block");
                            break;
                        case "Thunderstom":
                            $(".thunder-storm").css("display", "block");
                            break;
                        case "Snow":
                            $(".flurries").css("display", "block");
                            break;
                        case "Clear":
                            $(".sunny").css("display", "block");
                            break;
                        case "Rain":
                            $(".rainy").css("display", "block");
                            break;
                        case "Clouds":
                            $(".cloudy").css("display", "block");
                            break;
                        default:

                    }
                }

                var accWeat = showIco(myWeather);
            })

        })
    }
});

