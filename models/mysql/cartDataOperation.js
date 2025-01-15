'use strict'

const _ = require("lodash");
const { executeReadOperation, executeWriteOperation } = require('../mysql/mysqlConnection');

async function pushToCart(cartInfo) {
    try {
        const query = `Insert into cart SET ? ;`;
        const params = [cartInfo]
        await executeWriteOperation(query, params);
    } catch ( err) {
        console.log(err,"==>")
        throw err
    }
}

async function updateToCart(cartInfo, cartId) {
    try {
        const query = `Update cart SET ? where cart_id = ?;`;
        const params = [cartInfo, cartId]
        await executeWriteOperation(query, params);
    } catch ( err) {
        throw err
    }
}

async function fethCartInfo(user_id) {
    try {
        const query = `select * from cart where user_id = ?;`;
        const params = [user_id]
        return executeReadOperation(query, params);
    } catch ( err) {
        throw err
    }
}

async function removeFromCart(cartId) {
    try {
        const query = `delete from cart where cart_id = ?;`;
        const params = [cartId];
        await executeWriteOperation(query, params);
    } catch ( err) {
        throw err
    }
}

module.exports = {
    pushToCart, 
    updateToCart, 
    fethCartInfo, 
    removeFromCart
}