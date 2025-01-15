'use strict'

const _ = require('lodash');
const { pushToCart, updateToCart, fethCartInfo, removeFromCart } = require('../../models/mysql/cartDataOperation');
const { cartValidateForUpdate } = require('../../lib/lib');


module.exports.addCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        const cartInfo  = {
            user_id, 
            product_id, 
            quantity
        };
        const { missingKeys, isValid } = cartValidateForUpdate(cartInfo); // cart validation 

        if (!isValid) {
            return res.status(200).send({
                success: false,
                message: `Validation failed. The following fields are missing or empty: ${missingKeys.join(", ")}.`,
                missingKeys,
            });
        }
        await pushToCart(cartInfo);
        return res.status(200).send({
            message: "prodcut added to the cart"
        })
    } catch (err) {
        return res.status(500).send({
            message: "unable to add to the cart"
        })
    }
}

module.exports.updateCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity, cart_id } = req.body;
        const cartInfo  = {
            user_id, 
            product_id, 
            quantity
        };
        const { missingKeys, isValid } = cartValidateForUpdate(cartInfo); // cart validation 

        if (!isValid) {
            return res.status(200).send({
                success: false,
                message: `Validation failed. The following fields are missing or empty: ${missingKeys.join(", ")}.`,
                missingKeys,
            });
        }
        await updateToCart(cartInfo, cart_id);
        return res.status(200).send({
            message: "cart details update"
        })
    } catch (err) {
        return res.status(500).send({
            message: "unable to update to the cart"
        })
    }
}

module.exports.fetchCart = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (_.isNull(user_id) || !_.isNumber(user_id) || _.isUndefined(user_id)) {
            return res.status(412).send({
                message: `user id is required parameter`,
            });
        }
       const cartDetails = await fethCartInfo(user_id);
       console.log(cartDetails,"cartDetails")
       if( _.isEmpty(cartDetails)) {
        return res.status(200).send({
            message: "No cart item are avilbale"
        })
       }

        return res.status(200).send(cartDetails)
    } catch (err) {
        return res.status(500).send({
            message: "unable to fetch to the cart"
        })
    }  
}

module.exports.removeCart = async (req, res) => {
    try {
        const { cart_id } = req.body;
        if (_.isNull(cart_id) || !_.isNumber(cart_id) || _.isUndefined(cart_id)) {
            return res.status(412).send({
                message: `cart id is required parameter`,
            });
        }
        await removeFromCart(cart_id);
        return res.status(200).send({
            message: "product removed from the cart"
        })
    } catch (err) {
        return res.status(500).send({
            message: "unable to fetch to the cart"
        })
    }
}