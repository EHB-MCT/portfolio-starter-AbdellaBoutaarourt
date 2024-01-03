const express = require('express');
const cors = require('cors');
const usersRouter = require('../routes/user.js');
require('dotenv').config({path: '../../../.env'});

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.db = knex;
    next();
});

app.use('/users', usersRouter);
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});