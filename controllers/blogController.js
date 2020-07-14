const Blog = require('../models/blog');
//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog
    .find()
    .sort({ createdAt: -1 })
    .then((result) => {
        res.render('blogs/index', { title: 'Home', blogs: result });
    })
    .catch((err) => {
        console.log(err);
    });
}

const blog_details = (req, res) => {
    const id = req.params.id;
    //console.log(id)
    
    Blog
    .findById(id)
    .then((result) => {
        res.render('blogs/details', {blog: result, title: 'Blog Details'});
    })
    .catch((err) => {
        res.status(404).render('404', {title: 'Blog not found'});
    });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create' });
}

const blog_create_post = (req, res) => {
    //hozzáférhetek az adathoz ez által
    //console.log(req.body);
    
    const blog = new Blog(req.body);
    blog
    .save()
    .then((result) => {
        res.redirect('/blogs');
        console.log('Sikeres adatmentés!');
    })
    .catch((err) => {
        console.log('Hiba: ' + err);
    });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/blogs' })
    })
    .catch((err) => {
        console.log('Hiba: ' + err);
    });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}