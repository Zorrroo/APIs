const express = require('express');
const https = require('https');
const app = express()
const port = 3000
const url = "https://api.openweathermap.org/data/2.5/weather?q=Kalyan&units=metric&appid=7a7fa792ae46a8734b1b370a741f77c7"

app.get('/', function(req, res) {
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const icon = data.weather[0].id;
            const descp = weatherdata.weather[0].description;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature of kalyan is " + temp + " degress Celcius</h1>")
            res.write("<h2>The weather seems to have a " + descp + ".</h2>");

        })
    })      
}
);

app.listen(port, () => console.log(`Server is running on port ${port}!`))       