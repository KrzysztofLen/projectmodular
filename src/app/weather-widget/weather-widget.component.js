/**
 * Created by Hp on 2017-02-20.
 */
$(document).ready(function () {

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

            var celsius = Math.round(myTemp - 273.15);
            var kelvin = Math.round(celsius + 273.15);

            $(".weather-widget__city-name").append(myCity);

            $(".weather-widget__temperature--celcius").append(Math.round(celsius));
            $(".weather-widget__temperature--kelvin").append(kelvin);

            showCelcius(celsius);
            showKelvin(kelvin);
            showIco(myWeather);
        })
    }

    function showCelcius(celsius) {
        $(".weather-widget__kelvin").click(function (e) {
            e.preventDefault();
            $('#celcius').show();
            $('#kelvin').hide();
            $('.weather-widget__temperature--kelvin').html = ("<h2 class='weather-widget__temperature--celcius'>" + celsius + "</h2>");
        })
    }

    function showKelvin(kelvin) {
        $(".weather-widget__celcius").click(function (e) {
            e.preventDefault();
            $('#kelvin').show();
            $('#celcius').hide();
            $('#kelvin').html = ("<h2 class='weather-widget__temperature--kelvin'>" + kelvin + "</h2>");
        });
    }

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
});

