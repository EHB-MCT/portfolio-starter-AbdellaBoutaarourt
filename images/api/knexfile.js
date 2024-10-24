/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config({path: '../../.env'});

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: 'knex_migrations',
      directory: "./migrations",

    },
  },
  testing: {
    client: "postgresql",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: "./data/migrations",
    },
  },

};


