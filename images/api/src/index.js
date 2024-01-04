const express = require('express');
const cors = require('cors');

const userRoute = require('../routes/user.js');
const animeRoute = require('../routes/anime.js');


require('dotenv').config({path: '../../../.env'});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// go to the routers

app.use("/users", userRoute);
app.use("/animes", animeRoute);


app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const server = app.listen(port, () => {
    console.log(`REST API is running at http://localhost:${port}`);
});

module.exports = server;

