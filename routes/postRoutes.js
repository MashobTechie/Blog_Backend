const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

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



    module.exports = router;
