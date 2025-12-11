const express = require('express');
const app = express();
require('dotenv').config();

// DB connection
const dbConnect = require('./Model/DbConnect');
dbConnect(process.env.MONGODB_URL);

// CORS
const cors = require("cors");

// List of allowed frontend URLs
const allowedOrigins = [
  process.env.FRONTEND_URL,               // your Vercel frontend
  "http://localhost:5173",                // local Vite dev server
  "http://localhost:3000"                 // optional, local CRA
];

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin like Postman
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `CORS policy: The origin ${origin} is not allowed.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static uploads folder
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routers
const UserRouter = require('./Router/UserRouter');
app.use('/user', UserRouter);

const CartRouter = require("./Router/CartRouter");
app.use('/cart', CartRouter);

const AdminRouter = require('./Router/AdminRouter');
app.use('/admin', AdminRouter);

// Home route
app.get("/", (req, res) => {
    res.send("FruitMart Backend API is running...");
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
