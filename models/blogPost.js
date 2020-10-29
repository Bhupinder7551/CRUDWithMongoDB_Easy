const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    name: String,
    email: String,
    address: String,
    role: String,
    team: String,
    image: String

});

// Model
const BlogPost = mongoose.model('blogposts', BlogPostSchema);

module.exports = BlogPost;