'use strict'
const cartController = require('../../controllers/cart/cart')

module.exports = (app, auth) => {
    app.post('/cart', auth,  cartController.addCart);
    app.put('/cart', auth, cartController.updateCart);
    app.get('/cart', auth, cartController.fetchCart);
    app.delete('/cart', auth, cartController.removeCart);
}