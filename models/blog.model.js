const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    imageLink: {
        type: String,
        required: true
    },
    content: {
        required: true,
        type: Object,
    },
    date: {
        required: true,
        type: Date
    },
    status: {
        required: true,
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;