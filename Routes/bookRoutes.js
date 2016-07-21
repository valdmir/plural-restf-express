var express= require('express');

var routes = function(Book){
  var bookRouter = express.Router();
  bookRouter.route('/Books')
    .post(function(req,res){
      var book = new Book(req.body);
      console.log(book);
      book.save();
      res.status(201).json(book);

    })
    .get(function(req,res){
      // for filter all
      // var query = req.query;
      var query={};
      if(req.query.title){
        query.title= req.query.title;
      }
      Book.find(query,function(err,books){
        if(err){
          console.log(err);
          res.status(500).json(err);

        }
        else{
          console.log(books);
          res.status(200).json(books);
        }
      });
      // var responseJson={hello: 'This is my api'};
      // res.json(responseJson,200); deprecated

    });
    bookRouter.route('/Book/:bookId')
      .get(function(req,res){
        // for filter all
        // var query = req.query;
        var query={};
        if(req.query.title){
          query.title= req.query.title;
        }
        Book.findById(req.params.bookId,query,function(err,books){
          if(err){
            res.status(500).json(err);
          }
          else{
            console.log(books);
            res.status(200).json(books);
          }
        });
        // var responseJson={hello: 'This is my api'};
        // res.json(responseJson,200); deprecated

      });
  return bookRouter;
};
module.exports= routes;
