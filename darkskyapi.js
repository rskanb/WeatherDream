
$(document).ready(function(){
    //code to create the chart
    var tempArray = [];
    var ctx = document.getElementById('myChart');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: ["Current Location", "Home Location", "Dream Location", "Temp Difference from Home", "Temp Difference from Dream"],
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
        getDarkWeather(lat, long)
        } else {
            var paragraph = document.getElementById("current-location");
            var text = document.createTextNode(`Geolocation is not supported by this browser.`)
            paragraph.appendChild(text);
        }
      });
    
    //Function to get provided latitue and longitude current weather based on browser
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

    //remove data and attributes and make it as new page load only at home location div
    function stopslide(){
        $("#homecityimage").removeAttr();
        $("image").removeAttr();
        $("#homecityimage").attr('src','img.jpg');
        $("#newdiv").empty();
        $("#newdiv").removeData();
    }
    //remove data and attributes and make it as new page load only at dream location div
    function stopdreamslide(){
        $("#dreamcityimage").removeAttr();
        $("image").removeAttr();
        $("#dreamcityimage").attr('src','img.jpg');
        $("#newdiv1").empty();
        $("#newdiv1").removeData();
        //$("#dream-location").removeData();
    }
    // $("#add-dreamcity").addClass('hidden'); for hiding button initially but not used
    //Initially defininig the variables 
    var homeCity;
    var dreamCity
    var t;
    var d;

    //Click event to add home location or home town/city
    $("#add-homecity").on("click",function(event){
        event.preventDefault();
        stopslide();
        homeCity = $("#home-city").val().trim();
        var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.unsplash.com/search/photos?page=1&query=${homeCity}&client_id=90ca82a2be2184719136b24b6f8bf5978a1c75e992d067d7dacfb1aaf0c76675`;
        gethomecitypic(queryUrl);
        homeCityWeather(homeCity);
        $("#home-city").val('');
    });

     //Click event to add dream location or dream town/city
    $("#add-dreamcity").on("click", function(event){
        event.preventDefault();
        stopdreamslide();
        dreamCity = $("#dream-city").val().trim();
        var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.unsplash.com/search/photos?page=1&query=${dreamCity}&client_id=90ca82a2be2184719136b24b6f8bf5978a1c75e992d067d7dacfb1aaf0c76675`;
        getdreamcitypic(queryUrl);
        dreamCityWeather(dreamCity);
        $("#dream-city").val('');
    });

    //Function to get Home City Picture and displaying on image source also changing image after every 5 second
    function gethomecitypic(queryUrl){
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response){
        stop();
        //blow commented out code runs till array length it does not repeate.
        // $("#homecityimage").attr('src', response.results[i].links.download);   // original code
        // function setSlideDelay(i) {
        //     setTimeout(function(){
        //      $("#homecityimage").attr('src', response.results[i].links.download);
        //        console.log(response.results[i].links.download);
        //      }, i*4000);
        // };
        // for (let i=0; i<=response.results.length; i++){
        //     setSlideDelay(i)
        //     console.log("for home city started");
        //         //console.log(response.results[i].links.download);
        //     //setTimeout(() => $("#homecityimage").attr('src', response.results[i].links.download), i*5000); 
        // };
        //below function executes continuously after reseting array length 
        var i=0;
        var homePicSlide = response.results.length;
        function homeSlide(){
            if(i >= homePicSlide){
                i = 0;
            }
            $("#homecityimage").attr('src', response.results[i].links.download);
            i++;       
        }
        function autohSlide(){
            clearInterval(t);
            t = setInterval(homeSlide, 5000)
        }
        function stop(){
            clearInterval(t);
        }
        autohSlide();
        });
    }

    //Function to get dream City Picture and displaying on image source also changing image after every 5 second
    function getdreamcitypic(queryUrl){
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response){
        // $('#dreamcityimage').empty();
        stopdream();
        var i=0;
        var dreamPicSlide = response.results.length;
        function dreamSlide(){
            if(i >= dreamPicSlide){
                i = 0;
            }
            $("#dreamcityimage").attr('src', response.results[i].links.download);
            i++;       
        }
        function autodSlided(){
            clearInterval(d);
            setInterval(dreamSlide, 5000)
        }
        function stopdream(){
            clearInterval(d);
        }
        autodSlided();
        });
    }

    //Function to get home location weather base on city input
    function homeCityWeather(place){
        $("#add-dreamcity").removeClass("hidden");
        $("#newdiv").empty();
        var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=c63e722432e11165cac004ba48f2a376`;
        homeCityCall(queryUrl);
        //$("#add-dreamcity").css('text-align','center');
    }
    function homeCityCall(url){
        $.ajax({
            url: url,
            method: "GET"
        }).done(function(response){
            stopslide();
            var cityTemperature = parseInt(((response.main.temp-273.15)*1.8)+32);
            var humid = response.main.humidity;
            var windsp = response.wind.speed;
            //Not used sunrise and sunset moment js as api returns base on current browser location time which is not useful
            // var sunRise = (response.sys.sunrise)*1000;
            // var day = moment(sunRise).format("DD-MM-YYYY HH:mm:ss A");
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
    
     //Function to get dream city/town/location weather base on input
    function dreamCityWeather(dreamplace){
        $("#newdiv1").empty();
        var queryUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${dreamplace}&APPID=c63e722432e11165cac004ba48f2a376`;
        dreamCityCall(queryUrl);
    }
    
    function dreamCityCall(url){
        $.ajax({
            //url: queryUrl,
            url: url,
            method: "GET"
        }).done(function(response){
            stopdreamslide();
            var dreamCityTemp = parseInt(((response.main.temp-273.15)*1.8)+32);
            var dhumid = response.main.humidity;
            var dwindsp = response.wind.speed;
            var newDiv1 = $("<div>");
            var dreamCityTemp1 = $("<p>").text(`Temperature: ${dreamCityTemp} ℉`);
            var dreamCity = $("<p>").text(`${response.name}, ${response.sys.country}`);
            var dcityWind = $("<p>").text(`Wind Speed: ${dwindsp}`);
            var dcityHumid = $("<p>").text(`Humidity: ${dhumid}`);
            //Latitude and longitude extracted to use for getDarkWeather API in case needed for future development
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
    