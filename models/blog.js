const mongoose = require('mongoose');

//séma kiállítása
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//model a késöbbi kommunikációhoz
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;