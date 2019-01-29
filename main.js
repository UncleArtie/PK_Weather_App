$(document).ready(function () {
    var geoLocator = window.navigator.geolocation; //get location property
    var posOptions = {
        enableHighAccuracy: true,
        timeout: 45000
    };
    geoLocator.getCurrentPosition(successPosition, errorPosition, posOptions); //call for position using geolocation

    //taking position and rounding it off, put into usable variable 'position'
    function successPosition(pos) {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        lat = Math.round(lat);
        lon = Math.round(lon);
        console.log(lat + " " + lon); //debugging checkpoint

        var position = {
            lon: lon,
            lat: lat
        };
        console.log(position); //debugging checkpoint

        var weatherPos = "https://fcc-weather-api.glitch.me//api/current?"; //weather api

        //call for weather data using saved lat and lon variables and assigned callback function on success
        var pollWeather = $.getJSON(weatherPos, position, weatherRequest);

        function weatherRequest(data) {
            console.log("We got called"); //debugging checkpoint
            console.log(data); //debugging checkpoint

            var cSymbol = "&#8451"; //celcius temperature symbol
            var fSymbol = "&#8457"; // fahrenheit temperature symbol

            var currentTemp = data.main.temp + " " + cSymbol;
            var cTempVal = currentTemp;
            var fTempVal = (Math.round(data.main.temp * (9 / 5)) + 32) + " " + fSymbol; //convert celcius temp to fahrenheit

            $("#temp").click(function () { //button function to change displayed temperature
                currentTemp = currentTemp === cTempVal ? fTempVal : cTempVal;
                $("#tempPoint").html(currentTemp);
            });

            var infoHTML = "<p>" + data.name + "<br>";
            infoHTML += " " + data.weather[0].main + "<br>";
            infoHTML += " " + data.weather[0].description + "<br>";
            infoHTML += " " + "<img src=\"" + data.weather[0].icon + "\">" + "<br>";
            infoHTML += " " + "Wind Speed: " + data.wind.speed + " " + "knots" + "</p>";
            var tempHTML = "<p>" + "Current temperature: " + "<div id=\"tempPoint\">" + data.main.temp + " " + "&#8451" + "</div>" + "</p>";
            $("#weather").html(infoHTML).append(tempHTML);

            var backTemp = Math.round(data.main.temp);
            var backPaper = $(".body").css("background", "url(\"images/default.jpg\") no-repeat center fixed").css("background-size", "cover");
            var backType = $(".container").css("color", "white");
            console.log(backTemp);

            switch (true) {
                case (backTemp < 10):
                    newPaper = $(".body").css("background", "url(\"images/cold.jpg\") no-repeat center fixed").css("background-size", "cover");
                    newType = $(".container").css("color", "#fcf811");
                    backPaper = this.newPaper;
                    backType = this.newType;
                    break;

                case (backTemp < 17):
                    newPaper = $(".body").css("background", "url(\"images/mild.jpg\") no-repeat center fixed").css("background-size", "cover");
                    newType = $(".container").css("color", "#0cf7f7");
                    backPaper = this.newPaper;
                    backType = this.newType;
                    break;

                case (backTemp < 23):
                    newPaper = $(".body").css("background", "url(\"images/warm.jpg\") no-repeat center fixed").css("background-size", "cover");
                    newType = $(".container").css("color", "#000000");
                    backPaper = this.newPaper;
                    backType = this.newType;
                    break;

                case (backTemp < 50):
                    newPaper = $(".body").css("background", "url(\"images/hot.jpg\") no-repeat center fixed").css("background-size", "cover");
                    newType = $(".container").css("color", "#ffffff");
                    backPaper = this.newPaper;
                    backType = this.newType;
                    break;

                default:
                    $(".body").css("background", "url(\"images/default.jpg\") no-repeat center fixed").css("background-size", "cover");
            }
        }
    }

    function errorPosition(err) { //fail message for geolocation call
        console.log(err.message);
    }
});