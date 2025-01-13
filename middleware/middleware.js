// Auth middleware to ensure user is logged in
async function auth(req, res, next) {
    if (!req.session.user) {
      return res.status(401).send("Unauthorized: Please login first");
    }
    // Attach user info to the request
    req.user = req.session.user;
    next();
}

module.exports = {
    auth
}