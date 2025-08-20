//  This is the main entry point for our server

// 1. Import the express library
const express = require('express');

//2.  Create an Express application instance
const app = express();

// express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. It makes it easy to handle JSON data in your application. 

// Create a middleware to parse JSON request bodies
app.use(express.json());

// 3. Define the port our server will listen on
// We have 3000, 5000, 8000 etc.
// PORT 5000 is the most common development port
const PORT = 5000;

// 4. Define our first route (endpoint)
//  When a GET request comes to the root url
// 'request' contains info about the incoming request
// 'response' allows us to send a response back to the client. 
app.get('/', (request, response) => {
    response.send('Hello World! This is my first Express server.');
});


// Add a test POST route to see request.body
app.post('/test-post', (request, response) => {
    console.log('Received POST request with body:', request.body);
    response.json({
        message: 'Our POST request received successfully',
        data: request.body
    });
});


// 5.Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is running on PORT  ${PORT}`);
});


