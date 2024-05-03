const express = require('express');
const path = require('path');
const getWeatherData = require("./weatherData");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if(!address) {
        return res.send({ error: "Address is required" });
    }
    
    getWeatherData(address, (result) => {
        res.send(result);
    });
});

app.get("*", (req, res) => {
    res.status(404).send("404 title: Page not found");
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
