'use strict'

const _ = require("lodash");
const { executeReadOperation, executeWriteOperation } = require('../mysql/mysqlConnection');

async function addUser(user) {
    try {
        const query = 'INSERT into users SET ? ;';
        const params = [user]
        await executeWriteOperation(query, params);
    } catch (err) {
        throw err
    }
}

async function isExistUser(email) {
    try {
        const query = 'select email from users where email = ?;';
        const params = [email]
        await executeReadOperation(query, params);
    } catch (err) {
        throw err
    }
}

async function updateUser(userInfo, email) {
    try {
        const query = 'update users set ? where email = ?;';
        const params = [userInfo, email]
        await executeWriteOperation(query, params);
    } catch (err) {
        throw err
    }
}

async function fetchAllUsers() {
    try {
        const query = 'select * from users;';
        const params = []
        await executeWriteOperation(query, params);
    } catch (err) {
        throw err
    } 
}

async function updateUserInformation(userInfo, userId) {
    try {
        const query = 'update users set ? where user_id = ?;';
        const params = [userInfo, userId]
        await executeWriteOperation(query, params);
    } catch (err) {
        throw err
    }
}

async function removeUser(userId) {
    try {
        const query = 'delete from users where user_id = ?;';
        const params = [userId]
        await executeWriteOperation(query, params);
    } catch (err) {
        throw err
    }
}

module.exports = {
    addUser,
    isExistUser,
    updateUser,
    fetchAllUsers,
    updateUserInformation,
    removeUser
}