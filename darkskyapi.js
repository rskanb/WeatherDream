<<<<<<< HEAD
$(document).ready(function(){
var tempArray = [];
$("#add-dreamcity").addClass('hidden');
//Function to get current latiture and longitude based on browser
=======

var tempArray = [];

//Function to get current latiture and longitude based on browser 
>>>>>>> 18f16f74e0b859c3893913d782f9cd085a07666f
var geolocationCall = navigator.geolocation.getCurrentPosition(function(position) {
    if (navigator.geolocation){  //condition to check geolocation available
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    $.get("http://ipinfo.io", function(response) {
        var paragraph = document.getElementById("current-location");
        var text = document.createTextNode(`${response.city}, ${response.region}, ${response.country}`);
        paragraph.appendChild(text);
        // console.log(response.city, response.country);
        // console.log(response);
    }, "jsonp");
    console.log(navigator.geolocation);
    getDarkWeather(lat, long)
    } else {
        var paragraph = document.getElementById("current-location");
        var text = document.createTextNode(`Geolocation is not supported by this browser.`)
        paragraph.appendChild(text);
    }
  });

//Function to get provided latitue and longitude current weather
function getDarkWeather(lat, long){
    //Example of query URL : https://api.darksky.net/forecast/[key]/[latitude],[longitude]
    var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/df67c7be35a4db36806ee00e0657e57d/${lat},${long}`
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function(response){
        //console.log(response);
        var newDiv = $("<div>");
        var currentTemp = parseInt(response.currently.temperature);
        var currTemp = $("<p>").text(`Temperature: ${currentTemp} ℉`);
        var currIcon = $("<p>").text(`${response.currently.icon}`);
        var currCondition = $("<p>").text(`Condition: ${response.currently.summary}`);
        newDiv.append(currTemp);
        newDiv.append(currIcon);
        newDiv.append(currCondition);
<<<<<<< HEAD
        //newDiv.attr("data-currentbrowsertemp",currentTemp);
        $("#current-location").append(newDiv);
        tempArray.push(currentTemp);
=======
        newDiv.attr("data-currentbrowsertemp",currentTemp);
        $("#currentweather").append(newDiv);
        tempArray.push(currentTemp);

>>>>>>> 18f16f74e0b859c3893913d782f9cd085a07666f
    });
    // console.log(currentTemp)
};
//$(document).ready(getDarkWeather);t

//Function to get current weather base on city and dream location
$("#add-homecity").on("click", function(event){
    event.preventDefault();
<<<<<<< HEAD
    $("#newdiv").empty();
    var homeCityName = $("#home-city").val();
    console.log(homeCityName);
    var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q= ${homeCityName} &APPID=c63e722432e11165cac004ba48f2a376`;
    var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${homeCityName}&APPID=c63e722432e11165cac004ba48f2a376`;
    homeCityCall(queryUrl);
    var homeCity = $("#home-city").val('');
    $("#add-dreamcity").removeClass('hidden');
});
function homeCityCall(url){
    $.ajax({
        //url: queryUrl,
=======
    var currentCity = $("#current-city").val();
    console.log(currentCity);
    var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&APPID=c63e722432e11165cac004ba48f2a376`;
    homeCity(queryUrl)
    var currentCity = $("#current-city").val('');
});
    function homeCity(url){
    
    $.ajax({
>>>>>>> 18f16f74e0b859c3893913d782f9cd085a07666f
        url: url,
        method: "GET"
    }).done(function(response){
        console.log(response);
        var cityTemperature = parseInt(((response.main.temp-273.15)*1.8)+32);
        console.log(cityTemperature)
        console.log(` ${response.name}, ${response.sys.country}`);
        var newDiv = $("<div>");
        var cityTemp = $("<p>").text(`Home City Temperature: ${cityTemperature} ℉`);
        var currCity = $("<p>").text(`${response.name}, ${response.sys.country}`);
        //Latitude and longitude extracted to use for getDarkWeather API in case needed
        //var lat = response.coord.lat;
        //var long = response.coord.lon;
        newDiv.attr("id", "newdiv");
        newDiv.append(currCity);
        newDiv.append(cityTemp);
<<<<<<< HEAD
        //newDiv.attr("data-homecitytemp",cityTemperature);
        $("#home-location").append(newDiv);
        tempArray.push(cityTemperature);
    });
};
=======
        newDiv.attr("data-currentcitytemp",cityTemperature);
        $("#currentlocation").append(newDiv);
        tempArray.push(cityTemperature);
        
    });
}

>>>>>>> 18f16f74e0b859c3893913d782f9cd085a07666f

$("#add-dreamcity").on("click", function(event){
    event.preventDefault();
    $("#newdiv1").empty();
    var dreamCity = $("#dream-city").val();
    console.log(dreamCity);
<<<<<<< HEAD
    var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q= ${dreamCity} &APPID=c63e722432e11165cac004ba48f2a376`
    var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${dreamCity}&APPID=c63e722432e11165cac004ba48f2a376`
    dreamCityCall(queryUrl);
    var dreamCity = $("#dream-city").val('');
});
function dreamCityCall(url){
    $.ajax({
        //url: queryUrl,
=======
    var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${dreamCity}&APPID=c63e722432e11165cac004ba48f2a376`
    // debugger;
    dreamCityCall(queryUrl);
    var dreamCity = $("#dream-city").val('');
});

 function dreamCityCall(url){
    $.ajax({
>>>>>>> 18f16f74e0b859c3893913d782f9cd085a07666f
        url: url,
        method: "GET"
    }).done(function(response){
        console.log(response);
        var dreamCityTemp = parseInt(((response.main.temp-273.15)*1.8)+32);

        var newDiv = $("<div>");
        var dreamCityTemp1 = $("<p>").text(`Dream City Temperature: ${dreamCityTemp} ℉`);
        var dreamCity = $("<p>").text(`Dream City: ${response.name}, ${response.sys.country}`);
        //Latitude and longitude extracted to use for getDarkWeather API in case needed
        //var lat = response.coord.lat;
        //var long = response.coord.lon;
        newDiv.attr("id", "newdiv1");
        newDiv.append(dreamCity);
        newDiv.append(dreamCityTemp1);
<<<<<<< HEAD
        //newDiv.attr("data-dreamtemp",dreamCityTemp);
        $("#dream-location").append(newDiv);
        tempArray.push(dreamCityTemp);
        console.log(tempArray)
    });
};
});
=======
        newDiv.attr("data-dreamtemp",dreamCityTemp);
        $("#dreamweather").append(newDiv);
        tempArray.push(dreamCityTemp);
        console.log(tempArray)
    });
}

if(tempArray.length === 3){
    buildChart(tempArray)
}

function buildChart(temp){
console.log(temp)
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Current City", "Your City", "Dream City"],
        datasets: [{
            label: "Temperatures",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [temp[0], temp[1], temp[2]],
        }]
    },

    // Configuration options go here
    // options: {
    //     animation: {
    //         onProgress: function(animation) {
    //             progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
    //         }
    //     }

      
    // }
});
}
>>>>>>> 18f16f74e0b859c3893913d782f9cd085a07666f
