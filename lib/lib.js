const _ = require("lodash");

function userValidateForUpdate(data) {
    const requiredFields = [
        "first_name",
        "last_name",
        "profile_picture_url",
        "role",
        "phone_number"
    ];

    // Collect keys that are missing or invalid
    const missingKeys = _.filter(requiredFields, (field) =>
        _.isNil(data[field]) || _.isEmpty(data[field])
    );

    return {
        isValid: missingKeys.length === 0,
        missingKeys,
    };
}

function cartValidateForUpdate(data) {
    const requiredFields = [
        "user_id",
        "product_id",
        "quantity"
    ];

    // Collect keys that are missing or invalid
    const missingKeys = _.filter(requiredFields, (field) =>
        _.isNil(data[field])
    );

    return {
        isValid: missingKeys.length === 0,
        missingKeys,
    };
}



module.exports = {
    userValidateForUpdate,
    cartValidateForUpdate
}