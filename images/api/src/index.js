const express = require('express');
const cors = require('cors');

const userRoute = require('../routes/user.js');
const animeRoute = require('../routes/anime.js');


require('dotenv').config({path: '../../../.env'});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// go to the routers

app.use("/users", userRoute);
app.use("/animes", animeRoute);



app.get("/", (req, res) => {
    res.redirect("/info.html");
});

module.exports = app;

