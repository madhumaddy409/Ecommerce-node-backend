'use strict'
const userController = require('../../controllers/users/user')

module.exports = (app, auth) => {
    app.get('/users', auth, userController.fetchUsers);
    app.put('/user', auth, userController.updateUserInfo);
    app.delete('/user', auth, userController.deleteUser)
}