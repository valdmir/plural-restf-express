var express= require('express');

var routes = function(Book){
  var bookRouter = express.Router();
  var bookController=require('../Controllers/BookController')(Book);
  // for api routes
  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);
    // .post(function(req,res){
    //   var book = new Book(req.body);
    //
    // })
    // .get(function(req,res){
    //   // move to bookcontroller.get
    // });
    // implementation middleware
    bookRouter.use('/:bookId',function(req,res,next){
      var query={};
      Book.findById(req.params.bookId,query,function(err,book){
        if(err){
          res.status(500).json(err);
        }
        else if(book){
          req.book=book;
          next();
        }
        else{
          res.status(404).send('no book found');
        }
      });
    });
    bookRouter.route('/:bookId')
      .get(function(req,res){
        var returnBook= req.book.toJSON();
        returnBook.links={};
        returnBook.links.filterByGenre="http://"+req.headers.host +"/api/books/?genre="+returnBook.genre;
        res.json(returnBook);
        // for filter all
        // var query = req.query;
      })
    .put(function(req,res){
      req.book.title=req.body.title;
      req.book.author=req.body.author;
      req.book.genre=req.body.genre;
      req.book.read=req.body.read;
      req.book.save();
      res.status(200).json(req.book);
    })
    .patch(function(req,res){
      if(req.body._id){
        delete req.body._id;
      }
      for(var p in req.body){
        req.book[p]=req.body[p];
      }
      req.book.save(function(err){
        if(err){
          res.status(500).send(err);
        }
        else{
          res.json(req.book);
        }
      });
    })
    .delete(function(req,res){
      req.book.remove(function(err){
        if(err){
          res.status(500).send(err);
        }
        else{
          res.status(204).send('Remove');
        }
      });
    });
  return bookRouter;
};
module.exports= routes;
