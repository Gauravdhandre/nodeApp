const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));


app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Can not write to server.log');
    }
  });
  next();
})

//This will stop all middelwere to execute, in case of site under maintenance
// app.use((request, response, next) =>{
//   response.render('maintenance.hbs');
// })

// If we wrote this above we can not stop this to render because middlewere did not get chanse to stop this
// Render help Page
// http://localhost:3000/help.html
app.use(express.static(__dirname + '/public'));

// hbs.helper methodName can access any where
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Render Json
// app.get('/',(request, response) =>{
//   response.send({
//   	name: 'Gaurav',
//   	likes: [
//         'Cricket',
//         'Mal'
//   	]
//   });
// });

// Render HTML with data
app.get('/',(request, response) =>{
  response.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my demo site!'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/projects', (request, response) => {
  response.render('projects.hbs',{
    pageTitle: 'Project Page'
  });
});

app.get('/bad',(request, response) =>{
  response.send({
  	errorMessage: "Unable to handle request"
  });
});

app.listen(port, () => {
	console.log(`server is start in 3000 port ${port}`);
});