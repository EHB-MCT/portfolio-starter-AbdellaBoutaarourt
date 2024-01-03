const express = require('express');
const cors = require('cors');

const userRoute = require('../routes/user.js');

require('dotenv').config({path: '../../../.env'});

const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig.development);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.db = knex;
    next();
});

app.use("/users", userRoute);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const server = app.listen(port, () => {
    console.log(`REST API is running at http://localhost:${port}`);
});

module.exports = server;

