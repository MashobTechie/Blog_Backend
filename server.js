//  This is the main entry point for our server

// 1. Import the express library
const express = require('express');
// Import mongoose
const mongoose = require('mongoose');
require('dotenv').config();
// Import the POST ROUTES
const postRoutes = require('./routes/postRoutes');


//2.  Create an Express application instance
const app = express();

// 3. Define the port our server will listen on
// We have 3000, 5000, 8000 etc.
// PORT 5000 is the most common development port
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;





// express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. It makes it easy to handle JSON data in your application. 

// Create a middleware to parse JSON request bodies
app.use(express.json());

// Connect MONGODB

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


// 4. Define our first route (endpoint)
//  When a GET request comes to the root url
// 'request' contains info about the incoming request
// 'response' allows us to send a response back to the client. 
app.get('/api', (request, response) => {
    response.send('Hello World! This is my first Express server.');
});


//  Use the post routes for requests starting with /api/posts
app.use('/api/posts', postRoutes);


// 5.Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is running on PORT  ${PORT}`);
});

// REST  = Representational State  Transfer

//  get, POST, PUT, Delete

