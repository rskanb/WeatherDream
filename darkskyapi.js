
$(document).ready(function(){
    //code to create the chart
    var tempArray = [];
    var ctx = document.getElementById('myChart');
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
    var homeCity;
    var dreamCity
    $("#add-homecity").on("click",function(event){
        event.preventDefault();
        $("#newdiv").empty();
        homeCity = $("#home-city").val().trim();
        var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.unsplash.com/search/photos?page=1&query=${homeCity}&client_id=90ca82a2be2184719136b24b6f8bf5978a1c75e992d067d7dacfb1aaf0c76675`
        console.log(homeCity);
        gethomecitypic(queryUrl);
        homeCityWeather(homeCity);
        $("#home-city").val('');
    });
    //Function to get Home City Picture
    function gethomecitypic(queryUrl){
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response){
            console.log(response);
            $("#homecityimage").attr('src', response.results[0].links.download);
            console.log(response.results[0].links.download);
        });
    }
    
    $("#add-dreamcity").on("click", function(event){
        event.preventDefault();
        $("#newdiv1").empty();
        var dreamCity = $("#dream-city").val().trim();
        console.log(dreamCity);
        var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.unsplash.com/search/photos?page=1&query=${dreamCity}&client_id=90ca82a2be2184719136b24b6f8bf5978a1c75e992d067d7dacfb1aaf0c76675`;
        getdreamcitypic(queryUrl);
        dreamCityWeather(dreamCity);
        $("#dream-city").val('');
    });
    
    //Function to get Dream Location Picture
    function getdreamcitypic(queryUrl){
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response){
            console.log(response);
            $("#dreamcityimage").attr('src', response.results[0].links.download);
            //console.log(response.results[0].links.download);
        });
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
            var newDiv = $("<div>");
            var currentTemp = parseInt(response.currently.temperature);
            var currTemp = $("<p>").text(`Temperature: ${currentTemp} ℉`);
            var currCondition = $("<p>").text(`Condition: ${response.currently.summary}`);
            newDiv.append(currTemp);
            newDiv.append(currCondition);
            $("#current-location").append(newDiv);
            tempArray.push(currentTemp);
        });
    };
    function homeCityWeather(place){
        $("#add-dreamcity").removeClass("hidden");
      // debugger;
    //Function to get current weather base on city and dream location
        var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=c63e722432e11165cac004ba48f2a376`;
        homeCityCall(queryUrl);
        
        //$("#add-dreamcity").css('text-align','center');
    }
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
            var cityHumid = $("<p>").text(`Humidity: ${humid}`);
            newDiv.attr("id", "newdiv");
            newDiv.append(currCity);
            newDiv.append(cityTemp);
            newDiv.append(cityWind);
            newDiv.append(cityHumid);
            newDiv.css('margin-top', '20px');
            $("#home-location").append(newDiv);
            tempArray.push(cityTemperature);
        });
    };
    
    //Function to call dream city openweather api
    function dreamCityWeather(dreamplace){
        var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${dreamplace}&APPID=c63e722432e11165cac004ba48f2a376`;
        dreamCityCall(queryUrl);
    }
    
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
            var newDiv1 = $("<div>");
            var dreamCityTemp1 = $("<p>").text(`Temperature: ${dreamCityTemp} ℉`);
            var dreamCity = $("<p>").text(`${response.name}, ${response.sys.country}`);
            var dcityWind = $("<p>").text(`Wind Speed: ${dwindsp}`);
            var dcityHumid = $("<p>").text(`Humidity: ${dhumid}`);
            //Latitude and longitude extracted to use for getDarkWeather API in case needed
            //var lat = response.coord.lat;
            //var long = response.coord.lon;
            newDiv1.attr("id", "newdiv1");
            newDiv1.append(dreamCity);
            newDiv1.append(dreamCityTemp1);
            newDiv1.append(dcityWind);
            newDiv1.append(dcityHumid);
            newDiv1.css('margin-top', '20px');
            $("#dream-location").append(newDiv1);
            tempArray.push(dreamCityTemp);
            buildChart(tempArray, chart)
        });
    };
    //Building chart based on temperature of all cities/location
    function buildChart(temp, chart){
        console.log("hello")
        // chart.data.datasets.forEach((dataset) => {
        //     dataset.data.push(data);
        // });
        chart.data.datasets[0].data.push(temp[0])
        chart.data.datasets[0].data.push(parseInt(temp[1]))
        chart.data.datasets[0].data.push(parseInt(temp[2]))
        chart.data.datasets[0].data.push(parseInt(temp[1])) - chart.data.datasets[0].data.push(temp[0])
        chart.data.datasets[0].data.push(parseInt(temp[2])) - chart.data.datasets[0].data.push(temp[0])
        chart.update();
    }
    });
    