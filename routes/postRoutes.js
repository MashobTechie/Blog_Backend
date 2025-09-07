const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');




// Middleware Function to get a post by ID (resusable for GET, POST , DELETE)

async function getPost(req, res, next){
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    // If a post is found, attach it to the response objectso that the middleware can use it. 
    res.post = post;
    next(); // Proceed to the next middleware or route handler

}



// Route 1: Get all posts
// GET /posts

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find(); // Find all documents in the posts collection
        res.json(posts); // Send the posts as a JSON response
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route 2: Create a new post
//POST /posts
    router.post('/', async (req, res) => {
       // Create a new post instance

          const post = new Post({
              title: req.body.title,
              content: req.body.content,
              author: req.body.author
          });

          try {
              const newPost = await post.save();
              res.status(201).json(newPost);
          } catch (error) {
              // Handle validation
              if (error.name === 'ValidationError') {
                  return res.status(400).json({ error: 'Validation error', details: error.errors });
              }
              console.error('Error creating post:', error);
              res.status(500).json({ error: 'Internal server error' });
          }
    });


    // Get a single Post by ID
    // GET /posts/:id
    // Route Parameters
    // (req.params): Express extracts values from the URL path defined with a colon (:) This is how we get the specific ID from the URL

    router.get('/:id', getPost, (req, res) => {
        try {
            res.json(res.post); // Send the found post as JSON
        } catch (error) {
             res.status(500).json({
                message: error.message
             });
        }

    })


    module.exports = router;
