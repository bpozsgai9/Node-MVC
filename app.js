const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');


const app = express();

//connect to mongoDB
const dbURI = '';
mongoose
.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log('Connected to db!');
    app.listen(3000);
})
.catch((err) => console.log('Hiba: ' + err));


//egyéb
app.set('view engine', 'ejs');



//MIDDLEWARE--------------------------------------------->>>
//middleware az ami request és a response között történik
/*app.use((req, res, next) => {

    console.log('new request made:');
    console.log('\thost:', req.hostname);
    console.log('\tpath:', req.path);
    console.log('\tmethod:', req.method);
    console.log('\n')
    next();
});

app.use((req, res, next) => {

    console.log('in the next middleware');
    next();
});
*/

//middleware static files
//a public mappa elérhetővé válik a frontend számára(public to the browser), ez jó cucc!!!!!
app.use(express.static('public'));

//a $_POST['valami'] hozzáférésért felelős, URL enkódolás
app.use(express.urlencoded({ extended: true }));

//morgan, middleware logger függvények
app.use(morgan('dev'));
//morgan vége

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog2',
        snippet: 'about new blog',
        body: 'more about my new blog'

    });
    blog
    .save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog
    .find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
    Blog
    .findById('5f01d89a23c0023d9865d949')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

//routes
app.get('/', (req, res) => {
    
    /*
    innen 
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
      ];
    res.render('index', { title: 'Home', blogs }); //blogs: blogs -> mivel a név azonos felülírja*/

    res.redirect('/blogs');
});
 
app.get('/about', (req, res) => {

    res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes);

//catch all
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});