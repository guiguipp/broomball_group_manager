require("dotenv").config();
const fs = require('fs');

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'summit',
    host: '127.0.0.1',
    dialect: process.env.DB_DIALECT
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'summit',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: 'mysql',
  }
};