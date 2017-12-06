const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

//Partials
hbs.registerPartials(__dirname + '/views/partials')
//View Engine
app.set('view engine','hbs');
//Static directory
app.use(express.static(__dirname + '/public'));

//Middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append log file');
        }
    })
    next();
});

//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});

//HELPERS
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


//ROUTES
app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    portfolioMessage: 'Portfolio Page here'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Sorry the request you made is not valid'
  })
});

app.listen(port, () => {
    console.log(`Server is UP on port ${port}`);
});
