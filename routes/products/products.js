'use strict'
const productController = require('../../controllers/products/product')

module.exports = (app, auth) => {
    app.get('/products', auth, productController.fetchProducts);
    app.post('/add/products', auth, productController.addProduct);
    app.put('/products', auth, productController.updateProduct);
    app.delete('/products', auth, productController.removeProduct) 
}