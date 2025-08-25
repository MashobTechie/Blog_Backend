const mongoose = require('mongoose');

// Define the schema for our blog posts

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true    // Remove whitespace from both ends
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true,
        default: 'Anonymous'
    },
},
    {
        timestamps: true // Automatically manage createdAt and updatedAt fields
    });

//  Create the mongoose model from the schema

// The model is a constructor function that helps us interact with 'posts' collection.
const Post = mongoose.model('Post', postSchema);


module.exports = Post;