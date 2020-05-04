const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    lastName: String,
    aim: String,
    body: String,
    firstName: String,
    image: String

});

// Model
const BlogPost = mongoose.model('blogposts', BlogPostSchema);

module.exports = BlogPost;