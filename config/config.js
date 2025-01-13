'use strict';
const path = require('path');
const url = require('url');
require('dotenv').config({
  path: path.join(__dirname, '../.env')
});
const env = process.env;
const config = {
  admin: {
    port: env.PORT,
    corsorigin: env.CORSORIGIN
  },
  redis: {
    hostName: env.REDIS_HOST,
    port: env.REDIS_PORT
  },
  sqlconn: {
    host: env.ADMIN_DB_HOST,
    user: env.ADMIN_DB_USERNAME,
    password: env.ADMIN_DB_PASSWORD,
    database: env.ADMIN_DB_DB,
    multipleStatements: true,
    decimalNumbers: true,
    jsonStrings: true
  },
  sqlReadConn: {
    host: env.ADMIN_DB_HOST,
    user: env.ADMIN_DB_USERNAME,
    password: env.ADMIN_DB_PASSWORD,
    database: env.ADMIN_DB_DB,
    multipleStatements: true,
    decimalNumbers: true,
    jsonStrings: true
  },
  sqlWriteConn: {
    host: env.ADMIN_DB_WRITE_HOST,
    user: env.ADMIN_DB_WRITE_USERNAME,
    password: env.ADMIN_DB_WRITE_PASSWORD,
    database: env.ADMIN_DB_DB,
    multipleStatements: true,
    decimalNumbers: true,
    jsonStrings: true
  },
  googleAuth: {
    clientId: env.CLIENT_ID, 
    clientSecret: env.CLIENT_SECRET,
    redirectUrl: env.REDIRECT_URI
  }
}

exports = module.exports = config;