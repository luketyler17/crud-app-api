// Update with your config settings.
require("dotenv").config();
//adding stuff
let connectionString = process.env.DATABASE_URL;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
//   development: {
//     client: 'postgresql',
//     connection: {
//       host: '127.0.0.1',
//       password: 'docker',
//       user: 'postgres',
//       port: 5432,
//       database: 'capstone'
//       }
//   },


//he changed dev connection to connectionString also
module.exports = {
  
  development: {
    client: "pg",
    connection: connectionString,
  },

  staging: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: { connectionString, ssl: { rejectUnauthorized: false } },
  },
};
