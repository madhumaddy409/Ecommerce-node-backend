'use strict'
const _ = require('lodash');
const { pushProducts, fetchProducts, updateProductDetails, removeProductFromApplication } = require('../../models/mysql/productDataOperation');

module.exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id, image_url,  } = req.body;
        const product = {
            name: name, // Name of the product
            description: description, // produt description
            price: price, // Price of the product
            stock: stock, // Quantity in stock
            category_id: category_id, // Foreign key for the category (e.g., Electronics)
            image_url: image_url, // URL of the product's image
            created_at: new Date(), // ISO string for when the product was added
            updated_at: new Date(), // ISO string for when the product was last updated
            is_active: 1, // Product is active (1 for active, 0 for inactive)
        }

        const isProductPushed = await pushProducts(product);
        console.log(isProductPushed)
        if (!_.isEmpty(isProductPushed)) {
            return res.status(200).send({
                message: 'Product added succesfully'
            })
        }

    } catch(err) {
        return res.status(500).send({
            error: err.message || JSON.stringify(err),
            message: 'Error from adding product'
        })
    }
}

module.exports.fetchProducts = async (req, res) => {
    try {
        const products = await fetchProducts();
        if(!_.isEmpty(products)) {
            return res.status(200).send(products)
        }
    } catch (err) {
        return res.status(500).send({
            error: err.message || JSON.stringify(err),
            message: 'Error from adding product'
        }) 
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        const  { product_id: productId, name, description, price, stock, category_id, image_url } = req.body;
        const updateProductInfo = {
            name,
            description,
            price,
            stock,
            category_id,
            image_url
        }
 
        if (!_.isNumber(productId) || _.isUndefined(productId) || _.isNull(productId)) {
            res.status(411).send({
                message: "Product Id is required for product deatils update"
            })
        }
        await updateProductDetails(updateProductInfo, productId);
        return res.status(200).send({
            message: "Product update successfully"
        })
    } catch (err) {
        return res.status(500).send({
            error: err.message || JSON.stringify(err),
            message: 'Unable to update the product details'
        })
    }
}

module.exports.removeProduct = async(req, res) => {
    try {
        const  { product_id: productId } = req.body;

        if (!_.isNumber(productId) || _.isUndefined(productId) || _.isNull(productId)) {
            res.status(411).send({
                message: "Product Id is required for product deatils update"
            })
        }
        await removeProductFromApplication(productId);
        return res.status(200).send({
            message: "Product removed successfully"
        })
    } catch(err) {
        return res.status(500).send({
            error: err.message || JSON.stringify(err),
            message: 'Unable to remove the product details'
        })
    }
}