var express = require('express');
  mongoose = require('mongoose');
  bodyParser = require('body-parser');
var db= mongoose.connect('mongodb://localhost/bookAPi');

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT ||  8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
  res.send('welcome to my API');
});

bookRouter = require('./Routes/bookRoutes')(Book);
// create router

app.use('/api/books',bookRouter);


app.listen(port,function(){
  console.log('Gulp is running on PORT:'+port);
});
