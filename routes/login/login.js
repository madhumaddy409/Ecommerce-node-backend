'use strict'
const userLoginController = require('../../controllers/login/login')
const userLogoutController = require('../../controllers/logout/logout')

module.exports = (app, auth) => {
    app.get('/login', userLoginController.registerLogin);
    app.get('/logout', userLogoutController.userLogout)
}