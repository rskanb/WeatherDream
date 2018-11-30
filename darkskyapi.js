
$(document).ready(function(){

<<<<<<< HEAD
    //code to create the chart
=======

//code to create the chart

>>>>>>> master
var tempArray = [];
var ctx = document.getElementById('myChart')
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Your Current Location", "Your Home Location", "Your Dream Location", "Temp Difference from Home", "Temp Difference from Dream"],
        datasets: [{
            label: "Temperatures",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []
        }]
    }
 //  Configuration options go here
//  options: {
//     animation: {
//         onProgress: function(animation) {
//             progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
//         }
//     }
});





// $("#add-dreamcity").addClass('hidden');


//Function to get current latiture and longitude based on browser


// //Function to get current latiture and longitude based on browser 
// var geolocationCall = navigator.geolocation.getCurrentPosition(function(position) {
//     if (navigator.geolocation){  //condition to check geolocation available 
//     var lat = position.coords.latitude;
//     var long = position.coords.longitude;
//     $.get("http://ipinfo.io", function(response) {
//         var paragraph = document.getElementById("currentlocation");
//         var text = document.createTextNode(`${response.city}, ${response.region}, ${response.country}`);
//         paragraph.appendChild(text);
//         // console.log(response.city, response.country);
//         // console.log(response);
//     }, "jsonp");
//     console.log('navigator.geolocation ',navigator.geolocation);
//     getDarkWeather(lat, long)
//     } else {
//         var paragraph = document.getElementById("currentlocation");
//         var text = document.createTextNode(`Geolocation is not supported by this browser.`)
//         paragraph.appendChild(text);
//     }
//   });
  //var city = "san+francisco"

$("#add-homecity").on("click",function(event){
    event.preventDefault();
    var homecity = $("#home-city").val();
    var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.unsplash.com/search/photos?page=1&query=${homecity}&client_id=90ca82a2be2184719136b24b6f8bf5978a1c75e992d067d7dacfb1aaf0c76675`  
    console.log(homecity);
    gethomecitypic(queryUrl);
});
//Function to get provided latitue and longitude current weather 
function gethomecitypic(queryUrl){
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function(response){
        console.log(response);
        console.log("HERE!!!");
       // var firstPhoto = response.results[0].link.download;
        //console.log('firstPhoto', firstPhoto)
        var newDiv = $("<div>");
        // var currTemp = $("<p>").text(`Current Location Temperature: ${response.currently.temperature}`);
        // //currTemp.append('&#8457');
        // var currIcon = $("<p>").text(`Current Location Icon: ${response.currently.icon}`);
        // var currCondition = $("<p>").text(`Current Location Condition: ${response.currently.summary}`);
        newImg = $("<img>");
        newImg.attr('src', response.results[0].links.download);
        newImg.attr("height", "300");
        newImg.attr("width", "500");
        newDiv.attr("id","newDiv");
        //newImg.append(new);
        newDiv.append(newImg);
        // newDiv.append(currCondition);
        $("#home-location").append(newDiv);
    })
}

//Function to get current latiture and longitude based on browser 
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
    //var queryUrl = 
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
        //newDiv.attr("data-currentbrowsertemp",currentTemp);
        $("#current-location").append(newDiv);
        tempArray.push(currentTemp);
        newDiv.attr("data-currentbrowsertemp",currentTemp);
        $("#currentweather").append(newDiv);
        //tempArray.push(currentTemp);

    });
    // console.log(currentTemp)
};

// getDarkWeather()
//$(document).ready(getDarkWeather);

//Function to get current weather base on city and dream location
// $("#add-currentcity").on("click", function(event){
//     event.preventDefault();
//     var currentCity = $("#current-city").val();
//     console.log('current city', currentCity);
//     var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q= ${currentCity} &APPID=c63e722432e11165cac004ba48f2a376`

//     $.ajax({
//         url: queryUrl,
//         method: "GET"
//     }).done(function(response){
//         console.log(response);
//         var cityTemperature = ((response.main.temp-273.15)*1.8)+32;
//         console.log(cityTemperature)
//         console.log(` ${response.name}, ${response.sys.country}`);
//         var newDiv = $("<div>");
//         var cityTemp = $("<p>").text(`Current City Temperature: ${cityTemperature}`);
//         // //currTemp.append('&#8457');
//         var currCity = $("<p>").text(`Current City: ${response.name}, ${response.sys.country}`);
//         //Latitude and longitude extracted to use for getDarkWeather API in case needed
//         var lat = response.coord.lat;
//         var long = response.coord.lon;
//         newDiv.append(currCity);
//         newDiv.append(cityTemp);
//         $("#currentlocation").append(newDiv);
//     });
// });

// $("#add-dreamcity").on("click", function(event){
//     event.preventDefault();
//     var dreamCity = $("#dream-city").val();
//     console.log(dreamCity);
//     var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q= ${dreamCity} &APPID=c63e722432e11165cac004ba48f2a376`

//     $.ajax({
//         url: queryUrl,
//         method: "GET"
//     }).done(function(response){
//         console.log(response);
//         var dreamCityTemp = ((response.main.temp-273.15)*1.8)+32;
//         console.log(dreamCityTemp)
//         console.log(` ${response.name}, ${response.sys.country}`);
//         var newDiv = $("<div>");
//         var dreamCityTemp = $("<p>").text(`Dream City Temperature: ${dreamCityTemp}`);
//         // //currTemp.append('&#8457');
//         var dreamCity = $("<p>").text(`Dream City: ${response.name}, ${response.sys.country}`);
//         //Latitude and longitude extracted to use for getDarkWeather API in case needed
//         var lat = response.coord.lat;
//         var long = response.coord.lon;
//         newDiv.append(dreamCity);
//         newDiv.append(dreamCityTemp);
//         $("#dreamweather").append(newDiv);
//     });
// });

//$(document).ready(getDarkWeather);t

//Function to get current weather base on city and dream location
$("#add-homecity").on("click", function(event){
    event.preventDefault();
    $("#newdiv").empty();
    var homeCityName = $("#home-city").val();
    console.log(homeCityName);
    var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${homeCityName}&APPID=c63e722432e11165cac004ba48f2a376`;
    homeCityCall(queryUrl);
    var homeCity = $("#home-city").val('');
    $("#add-dreamcity").css('display', 'block')
});
// function homeCityCall(url){
//     $.ajax({
//         //url: queryUrl,
//     var currentCity = $("#current-city").val();
//     console.log(currentCity);
//     var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&APPID=c63e722432e11165cac004ba48f2a376`;
//     homeCity(queryUrl)
//     var currentCity = $("#current-city").val('');
});
    function homeCityCall(url){
    
    $.ajax({
        url: url,
        method: "GET"
    }).done(function(response){
        console.log(response);
        var cityTemperature = parseInt(((response.main.temp-273.15)*1.8)+32);
        var humid = response.main.humidity;
        var windsp = response.wind.speed;
        var sunRise = (response.sys.sunrise)*1000;
        console.log(sunRise);
        var day = moment(sunRise).format("DD-MM-YYYY HH:mm:ss A");
        console.log(day);
        var newDiv = $("<div>");
        var cityTemp = $("<p>").text(`Temperature: ${cityTemperature} ℉`);
        var currCity = $("<p>").text(`${response.name}, ${response.sys.country}`);
        var cityWind = $("<p>").text(`Wind Speed: ${windsp}`);
        var cityHumid = $("<p>").text(`Huidity: ${humid}`);
        //var citySun = $("<p>").text(`Sun Rise ${citySunRise}`);
        //Latitude and longitude extracted to use for getDarkWeather API in case needed
        //var lat = response.coord.lat;
        //var long = response.coord.lon;
        newDiv.attr("id", "newdiv");
        newDiv.append(currCity);
        newDiv.append(cityTemp);
        newDiv.append(cityWind);
        newDiv.append(cityHumid);
        //newDiv.attr("data-homecitytemp",cityTemperature);
        $("#home-location").append(newDiv);
        tempArray.push(cityTemperature);
    });
};

$("#add-dreamcity").on("click", function(event){
    event.preventDefault();
    $("#newdiv1").empty();
    var dreamCity = $("#dream-city").val();
    console.log(dreamCity);
    var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${dreamCity}&APPID=c63e722432e11165cac004ba48f2a376`
    dreamCityCall(queryUrl);
    var dreamCity = $("#dream-city").val('');
});
<<<<<<< HEAD
=======
// function dreamCityCall(url){
//     $.ajax({
//         //url: queryUrl,
//     var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${dreamCity}&APPID=c63e722432e11165cac004ba48f2a376`
//     // debugger;
//     dreamCityCall(queryUrl);
//     var dreamCity = $("#dream-city").val('');
// });

 
>>>>>>> master
function dreamCityCall(url){
    $.ajax({
        //url: queryUrl,
        url: url,
        method: "GET"
    }).done(function(response){
        console.log(response);
        var dreamCityTemp = parseInt(((response.main.temp-273.15)*1.8)+32);
        var dhumid = response.main.humidity;
        var dwindsp = response.wind.speed;
        var newDiv = $("<div>");
        var dreamCityTemp1 = $("<p>").text(`Temperature: ${dreamCityTemp} ℉`);
        var dreamCity = $("<p>").text(`Dream City: ${response.name}, ${response.sys.country}`);
        var dcityWind = $("<p>").text(`Wind Speed: ${dwindsp}`);
        var dcirtHumid = $("<p>").text(`Huidity: ${dhumid}`);
        //Latitude and longitude extracted to use for getDarkWeather API in case needed
        //var lat = response.coord.lat;
        //var long = response.coord.lon;
        newDiv.attr("id", "newdiv1");
        newDiv.append(dreamCity);
        newDiv.append(dreamCityTemp1);
        newDiv.append(dcityWind);
        newDiv.append(dcirtHumid);
        //newDiv.attr("data-dreamtemp",dreamCityTemp);
        $("#dream-location").append(newDiv);
        tempArray.push(dreamCityTemp);
        console.log(tempArray)
        buildChart(tempArray, chart)
    });
};
<<<<<<< HEAD
=======

>>>>>>> master

        

function buildChart(temp, chart){
    
    console.log("hello")
    // chart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(data);
    // });
    chart.data.datasets[0].data.push(temp[0])
    chart.data.datasets[0].data.push(parseInt(temp[1]))
    chart.data.datasets[0].data.push(parseInt(temp[2]))
    chart.data.datasets[0].data.push(temp[0]) -  chart.data.datasets[0].data.push(parseInt(temp[1]))
    chart.data.datasets[0].data.push(temp[0]) - chart.data.datasets[0].data.push(parseInt(temp[2]))
    chart.update();

 

}
