
    
// function azaveaApi() {

    $.ajax({
        url: "https://app.climate.azavea.com/api/indicator/max_high_temperature/",
        method: "GET", 
        headers: { 'Authorization' : "Token 37898cb2ffb3e95284ad45e40879613c1ca4774e" },
        processData: false
    }).then(function(response){
        console.log(response);
        document.write(response);
    })
// }


             
// function azaveaApi() {

    // $.ajax({
    //     url: "https://app.climate.azavea.com/api/region/",
    //     method: "GET", 
    //     headers: { 'Authorization' : "Token 37898cb2ffb3e95284ad45e40879613c1ca4774e" },
    //     processData: false
    // }).then(function(response){
    //     console.log(response);
    //     document.write(response);
    // })
// }


                     
// function azaveaApi() {

    $.ajax({
        url: "https://app.climate.azavea.com/api/region/11",
        method: "GET", 
        headers: { 'Authorization' : "Token 37898cb2ffb3e95284ad45e40879613c1ca4774e" },
        processData: false
        
    }).then(function(response){
        console.log(response);
        document.write(response);
    })
// }     
