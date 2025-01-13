const { getGoogleAuthURL } = require("../../middleware/googleAuth")

module.exports.registerLogin = async (req, res) => {
    const googleLoginUrl = getGoogleAuthURL();
    res.send(`<a href="${googleLoginUrl}">Login with Google</a>`);
}
