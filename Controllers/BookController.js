var BookController = function(Book){
  var post= function(req,res){
    var book = new Book(req.body);
    console.log(book);
    book.save();
    res.status(201).json(book);

  };
  var get = function(req,res){
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
        var returnBooks=[];
        books.forEach(function(element,index,array){
          var newBook=element.toJSON();
          newBook.links={};
          newBook.links.self= "http://"+req.headers.host +"/api/books/"+newBook._id;
          return returnBooks.push(newBook);
        });
        res.json(returnBooks);
        // res.status(200).json(books);
      }
    });
    // var responseJson={hello: 'This is my api'};
    // res.json(responseJson,200); deprecated

  };
  return {
    post :post,
    get : get
  };
};
module.exports= BookController;
