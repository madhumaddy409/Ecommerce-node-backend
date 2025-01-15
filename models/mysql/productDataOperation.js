'use strict'

const _ = require("lodash");
const { executeReadOperation, executeWriteOperation } = require('../mysql/mysqlConnection');

// add products
async function pushProducts (product) {
    try {
        const query = 'INSERT into products SET ? ;';
        const params = [product]
        await executeWriteOperation(query, params);
    } catch (err) {
        throw err
    }
}

// fetch all products
async function fetchProducts () {
    try {
        const query = 'Select * from products;';
        return executeReadOperation(query, []);
    } catch (err) {
        throw err
    }
}

// update product deatils
async function updateProductDetails (productInfo, productId) {
    try {
        const query = 'update products set ? where product_id = ?;';
        await executeWriteOperation(query, [productInfo ,productId]);
    } catch (err) {
        throw err
    }
}

async function removeProductFromApplication (productId) {
    try {
        const query = 'delete from products where product_id = ?;';
        await executeWriteOperation(query, [productId]);
    } catch (err) {
        throw err
    }
}



module.exports = {
    pushProducts,
    fetchProducts,
    updateProductDetails,
    removeProductFromApplication
}

