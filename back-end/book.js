const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Book extends Model{}

//Sequelizer initialization
Book.init({
    title: DataTypes.STRING,
    isAvailable: DataTypes.INTEGER
}, {sequelize, modelName: 'book'});

//Wrapper class to access sequelizer
class BookDataContext{
    //creating book in db
    async create(bookTitle){
        try{
            await sequelize.sync();
            const book = await Book.create({
                title: bookTitle,
                isAvailable: 1            
            });

        return book;
        } catch (e) {
            //TODO: Need to handle error logs
            console.error(e);
            throw new Error("Failed to create book.");
        }
    }

    //Get all books from db
    async getAll(){
        try {
        await sequelize.sync();
        const books = await Book.findAll();
        return books;
        } catch(e){
            //TODO: Need to handle error logs
            console.error(e);
            throw new Error("Failed to get all books.");    
        }

    }

    //Sort books
    async getSortedBooks(){
        try{
            let books = await this.getAll();            
            books = books.sort((a,b)=>{
                return a.title.localeCompare(b.title);
            });
            return books;
        } catch(e){
            //TODO: Need to handle error logs
            console.error(e);
            throw new Error("Failed to sorted books.");  
        }
    }

    //Get book by id
    async getById(id){
        try{
        await sequelize.sync();
        const book = await Book.findByPk(id);
        return book;
        } catch(e){
            //TODO: Need to handle error logs
            console.error(e);
            throw new Error(`Failed to get book by id ${id}.`);
        }
    }

    //Update book 
    async update(id, book){
        try{
        await sequelize.sync();
        await Book.update(book,{
            where:{
                id: id
            }
        });
        } catch(e){
            //TODO: Need to handle error logs
            console.error(e);
            throw new Error(`Failed to update book by id ${id}.`);
        }
    }

    //Delete book
    async delete(id){
        try{
        await sequelize.sync();
        await Book.destroy({
            where:{
                id: id
            }
        });
        }catch(e){
            //TODO: Need to handle error logs
            console.error(e);
            throw new Error(`Failed to delete book by id ${id}.`);
        }
    }

    //Closing squelize connection.
    closeDb(){
        console.log("Close");
        sequelize.close();
    }
}

module.exports = BookDataContext