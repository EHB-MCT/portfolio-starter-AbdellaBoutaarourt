const knex = require('knex');

const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

const db = knex({
  client: 'pg', // or 'mysql' or 'sqlite3'
  connection: {
    host: 'your_database_host',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'your_database_name',
  },
});



