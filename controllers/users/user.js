'use strict'

const _ = require('lodash');
const { fetchAllUsers, updateUserInformation } = require('../../models/mysql/userRegistration');
const { userValidateForUpdate } = require('../../lib/lib')

// fetch all users
module.exports.fetchUsers = async (req, res) => {
    try {
        const users = await fetchAllUsers();
        if(!_.isEmpty(users)) {
            return res.status(200).send(users)
        } else {
            return res.status(200).send({
                message: "No users found"
            })
        }
    } catch(err) {
        return res.status(500).send({
            message: "Unbale to find the users"
        })
    }
}

//  update user information
module.exports.updateUserInfo = async (req, res) => {
    try {
        const {first_name,last_name, profile_picture_url, is_verified, role, phone_number, user_id} = req.body;

        if(!_.isNumber(user_id) || _.isUndefined(user_id) || _.isNull(user_id)) {
            return res.status(412).send({
                message: 'user Id is required parameter to update to user information'
            })
        }

        const updateUserInfo = {
            first_name,
            last_name,
            profile_picture_url,
            is_verified,
            role,
            phone_number
        }

        const { isValid, missingKeys } = userValidateForUpdate(updateUserInfo); // validation for user information
        console.log(isValid)

        if (!isValid) {
            return res.status(200).send({
                success: false,
                message: `Validation failed. The following fields are missing or empty: ${missingKeys.join(", ")}.`,
                missingKeys,
            });
        }
        await updateUserInformation(updateUserInfo, user_id); // update user 
        return res.status(200).send({
            message: "user updated successfully"
        })
    } catch (err) {
        console.log(err,"Error")
        return res.status(500).send({
            message: "Unbale to update the users information"
        })
    }
}
