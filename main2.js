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
		console.log(lat + ' ' + lon); //debugging checkpoint

		var position = {
			lon: lon,
			lat: lat
		};
		console.log(position); //debugging checkpoint

		var weatherPos = 'https://fcc-weather-api.glitch.me//api/current?'; //weather api

		//call for weather data using saved lat and lon variables and assigned callback function on success
		var pollWeather = $.getJSON(weatherPos, position, weatherRequest);

		function weatherRequest(data) {
			console.log("We got called"); //debugging checkpoint
			console.log(data); //debugging checkpoint

			var cSymbol = '&#8451'; //celcius temperature symbol
			var fSymbol = '&#8457'; // fahrenheit temperature symbol

			var currentTemp = data.main.temp + ' ' + cSymbol;
			var cTempVal = currentTemp;
			var fTempVal = (Math.round(data.main.temp * (9 / 5)) + 32) + ' ' + fSymbol; //convert celcius temp to fahrenheit

			$('#temp').click(function () { //button function to change displayed temperature
				currentTemp = currentTemp === cTempVal ? fTempVal : cTempVal;
				$('#tempPoint').html(currentTemp);
			});

			var infoHTML = '<p>' + data.name + '<br>';
			infoHTML += ' ' + data.weather[0].main + '<br>';
			infoHTML += ' ' + data.weather[0].description + '<br>';
			infoHTML += ' ' + '<img src="' + data.weather[0].icon + '">' + '<br>';
			infoHTML += ' ' + 'Wind Speed: ' + data.wind.speed + ' ' + 'knots' + '</p>';
			var tempHTML = '<p>' + 'Current temperature: ' + '<div id="tempPoint">' + data.main.temp + ' ' + '&#8451' + '</div>' + '</p>';
			$('#weather').html(infoHTML).append(tempHTML);

			var wp = 'cold';
			
			$('body').css({
				background: 'url(images/' + wp + '.jpg) no-repeat center fixed'
			});
			$('.container').css({
				color: 'yellow'
			});
		}
	}

	function errorPosition(err) { //fail message for geolocation call
		console.log(err.message);
	}



});