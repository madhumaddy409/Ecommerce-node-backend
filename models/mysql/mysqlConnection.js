'use strict'

const mysql = require('mysql2');
const _ = require('lodash');

const { sqlReadConn, sqlWriteConn } = require('../../config/config')

async function mysqlReadConnection() {
    try {
       const poolRead = mysql.createConnection(sqlReadConn);
       if (!_.isEmpty(poolRead)) {
        return poolRead;
       }
    } catch(err) {
        throw err;
    }
}

async function mysqlWriteConnection() {
    try {
        const poolRead = mysql.createConnection(sqlWriteConn);
        if (!_.isEmpty(poolRead)) {
         return poolRead;
        }
     } catch(err) {
         throw err;
     }
}

async function executeReadOperation (query = '', params = []) {
    const pool = await mysqlReadConnection();
    return new Promise((resolve, reject) => {
        pool.query(query, params, async (err, result) => {
            if (err) {
                reject(err);
            }
            if (!_.isEmpty(result)) {
                resolve(result);
            }
        })
    })
}

async function executeWriteOperation (query = '', params = []) {
    const pool = await mysqlWriteConnection();
    return new Promise((resolve, reject) => {
        pool.query(query, params, async (err, result) => {
            if (err) {
                reject(err);
            }
            if (!_.isEmpty(result)) {
                resolve(result);
            }
        })
    })
}

module.exports = {
    executeReadOperation,
    executeWriteOperation,
    mysqlWriteConnection
}
