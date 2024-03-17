const BookDataContext = require('./book')
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

//Swagger
//https://swagger.io/specification/#InfoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Book Library API',
            description: 'Book API information',
            contact: {
                name: 'Developer'
            },
            servers: ['http://localhost:'+port]
        }
    },
    apis: ["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//End Swagger


/**
 * @openapi
 * /api/books/:id:
 *  get:
 *      description: Get book by id
 *      responses:
 *          200:
 *              description: Returns a book object.
 *  parameters:
 *  - name: id
 *    in: path
 *    description: ID of book to use
 *    required: true   
 */
app.get('/api/books/:id', async (req, res)=>{
    dbContext = new BookDataContext();
    var book = await dbContext.getById(req.params.id);
    res.status(200).json(book);
});

/**
 * @openapi
 * /api/books:
 *  get:
 *      description: Get all books
 *      responses:
 *          200:
 *              description: Returns an array of book objects.   
 */
app.get('/api/books', async (req, res) =>{
    dbContext = new BookDataContext();
    var books = await dbContext.getAll();
    res.status(200).json(books)
});

/**
 * @openapi
 * /api/books/sortby/title:
 *  get:
 *      description: Get all books sorted by title
 *      responses:
 *          200:
 *              description: Returns an array of book objects.   
 */
app.get('/api/books/sortby/title', async (req, res) =>{
    dbContext = new BookDataContext();
    var books = await dbContext.getSortedBooks();
    res.status(200).json(books)
});

/**
 * @openapi
 * /api/books:
 *  post:
 *      description: Post book
 *      responses:
 *          201:
 *              description: Returns status object.   
 */
app.post('/api/books', async  (req, res)=>{
    // console.log(req.body);
    body = req.body;
    dbContext = new BookDataContext();
    var book = await dbContext.create(body.title);
    res.status(201).json({message: "Book was created"})
});

/**
 * @openapi
 * /api/books/:id:
 *  put:
 *      description: Update book by id
 *      responses:
 *          201:
 *              description: Status object.
 *  parameters:
 *  - name: id
 *    in: path
 *    description: ID of book to use
 *    required: true 
 *  - name: book
 *    in: body
 *    description: Book object
 *    required: true  
 */
app.put('/api/books/:id', async(req, res)=>{
    body = req.body;
    dbContext = new BookDataContext();
    await dbContext.update(req.params.id, body);
    res.status(201).json({message: "Book was updated"})
});

/**
 * @openapi
 * /api/books/:id:
 *  delete:
 *      description: Delete book by id
 *      responses:
 *          200:
 *              description: Status object.
 *  parameters:
 *  - name: id
 *    in: path
 *    description: ID of book to use
 *    required: true   
 */
app.delete('/api/books/:id', async(req, res)=>{
    dbContext = new BookDataContext();
    await dbContext.delete(req.params.id);
    res.status(200).json({message: "Book was deleted"})
});

app.use((req, res, next)=>{
    const error = new Error('NOT FOUND');
    error.status=400;
    next(error); 
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

app.listen(port, () => console.log(`Book library server listening on port ${port}...`));


module.exports = app;