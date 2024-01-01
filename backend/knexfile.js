require('dotenv').config()

module.exports = {
    client: 'pg',
    connection: {
      host: process.env.host,
      user: process.env.name,
      password: process.env.password,
      database: process.env.db,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    }
  };