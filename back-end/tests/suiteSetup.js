const BookDataContext = require('../book');
//make sure db connection is closed after Jest run.
afterAll(function () {    
    dbContext = new BookDataContext();
    dbContext.closeDb();
   });