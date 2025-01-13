'use strict'

const _ = require('lodash');
const { OAuth2Client } = require("google-auth-library");
const config = require("../config/config");
const { addUser, isExistUser, updateUser } = require("../models/mysql/userRegistration");

// Google auth credentials
const googleAuth = config.googleAuth;

const oauth2Client = new OAuth2Client(
  googleAuth.clientId,
  googleAuth.clientSecret,
  googleAuth.redirectUrl
);

// Step 1: Generate Google OAuth URL
function getGoogleAuthURL() {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = new URLSearchParams({
    client_id: googleAuth.clientId,
    redirect_uri: googleAuth.redirectUrl,
    response_type: "code",
    scope: "openid email profile",
  });
  return `${baseUrl}?${params.toString()}`;
}

// Configure routes and middleware
async function configureRoutes(app) {
  // Step 2: Handle callback from Google after login
  app.get("/auth/google/callback", async (req, res) => {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Invalid Request");
    }

    try {
      // Step 3: Exchange authorization code for tokens
      const { tokens } = await oauth2Client.getToken(code);

      // Set tokens for subsequent requests
      oauth2Client.setCredentials(tokens);

      // Step 4: Fetch user info using tokens
      const ticket = await oauth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: googleAuth.clientId,
      });
      const userInfo = ticket.getPayload();

      // Step 3: Store user data in the session
      req.session.user = {
        name: userInfo?.name,
        email: userInfo?.email,
        isAuthenticated : userInfo?.email_verified
      }

      // storing user info to user table
      const user = {
        first_name: userInfo?.given_name,
        last_name: userInfo?.family_name,
        email: userInfo?.email,
        profile_picture_url: userInfo?.picture,
        is_verified: userInfo?.email_verified,
        role: "customer",
        auth_token: tokens?.id_token
      }
      const isUser = await isExistUser(userInfo?.email);

      // if user is available update token and other information
      if(!_.isEmpty(isUser)) {
        const updateUserInfo = {
            first_name: userInfo?.given_name,
            last_name: userInfo?.family_name,
            profile_picture_url: userInfo?.picture,
            is_verified: userInfo?.email_verified,
            auth_token: tokens?.id_token
        }
        await updateUser(updateUserInfo, userInfo?.email); // update user 
      } else {
        await addUser(user); // add user
      }
      // Redirect to a secure page
      res.redirect("/dashboard");
    } catch (err) {
      res.status(401).send("Authentication failed.");
    }
  });
}

// Export both the route configuration and the helper function
module.exports = {
  configureRoutes,
  getGoogleAuthURL,
};
