
module.exports.userLogout = async(req, res) => {
    req.session.destroy((err) => {
       if (err) {
         return res.status(500).send("Failed to logout.");
       }
       // Redirect to the home page or login page after session is destroyed
       return res.redirect("/login");
     });
}
