
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
    //Example of query URL : https://api.darksky.net/forecast/[key]/[latitude],[longitude]
    //var queryUrl = 
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
    });
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