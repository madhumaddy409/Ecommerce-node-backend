// Import express
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2');


const config = require('./config/config');
const PORT = config.admin.port;
const { auth } = require('./middleware/middleware');
const { configureRoutes } = require('./middleware/googleAuth');

// Import product routes
const productRoutes = require('./routes/products/products');
const loginRegisterRoutes = require('./routes/login/login');
const userRoutes = require('./routes/users/user');
const cartRoutes = require('./routes/cart/cart')

// Create an instance of express
const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


// Setup MySQL session store
const pool =  mysql.createPool(config.sqlWriteConn);
const sessionStore = new MySQLStore({}, pool);

// Session middleware using MySQL as the session store
app.use(
  session({
    secret: 'your-session-secret', // Change this for production
    resave: false,
    saveUninitialized: false,
    store: sessionStore,  // Use MySQL session store
    cookie: {
      secure: false,  // Set to true when using HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // Session expires after 24 hours
    },
  })
);

// Define a route
app.get('/healthz', (req, res) => {
  res.send('Ecommerce server is up and running!');
});

// Protected Route: Dashboard (authentication required)
app.get("/dashboard", auth, (req, res) => {
  res.send(`Welcome to your Dashboard, ${req.user.name} and user sesion, ${req.user}`);
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Apply routes
loginRegisterRoutes(app);
productRoutes(app, auth);
configureRoutes(app, auth);
userRoutes(app, auth);
cartRoutes(app, auth);


module.exports = {
  app,
};
