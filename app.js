const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post('/', function (req, res)   {
    const location = req.body.cityname;
    const appid = "7a7fa792ae46a8734b1b370a741f77c7";
    const units = req.body.units;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=" + units + "&appid=" + appid;
        https.get(url, function (response) {
            console.log(response.statusCode);
            response.on("data", function (data) {
                const weatherdata = JSON.parse(data);
                const temp = weatherdata.main.temp;
                const icon = weatherdata.weather[0].icon;
                const descp = weatherdata.weather[0].description;
                const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
                res.write("<h1>The temperature of " + location + " is " + temp + " degress Celcius</h1>")
                res.write("<h2>The weather seems to have a " + descp + ".</h2>");
                res.write("<img src=" + imageURL + ">");
                res.send();
            })
        })
    }
    );

app.listen(port, () => console.log(`Server is running on port ${port}!`))       