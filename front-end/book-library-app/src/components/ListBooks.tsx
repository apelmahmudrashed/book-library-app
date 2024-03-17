import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

type BookProps = {
  apiBaseUrl: string;
};

function ListBooks(props: BookProps) {
  const [books, setBook] = useState<any>();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    axios
      .get(`${props.apiBaseUrl}/api/books`)
      .then((res) => {
        const books = res.data;
        setBook(books);
      })
      .catch((err) => {
        //TODO: display error no the page
        console.log(err);
      });
  };

  const sortBooks = () => {
    axios
      .get(`${props.apiBaseUrl}/api/books/sortby/title`)
      .then((res) => {
        const books = res.data;
        setBook(books);
      })
      .catch((err) => {
        //TODO: display error no the page
        console.log(err);
      });
  };

  const deleteBook = (id: Number) => {
    axios
      .delete(`${props.apiBaseUrl}/api/books/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        //TODO: display error no the page
        console.log(err);
      });
    loadBooks();
  };

  return (
    <>
      <div className="container">
        <div className="py-4">
          <button
            className="w-100 btn btn-outline-primary"
            onClick={() => sortBooks()}
          >
            Sort by title
          </button>
          <table className="table border shadow">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {books?.map((book: any) => (
                <>
                  <tr>
                    <th scope="row">{book.id}</th>
                    <td>{book.title}</td>
                    <td>{book.isAvailable === 1 ? "Available" : "Borrowed"}</td>
                    <td>
                      <Link
                        to={`/books/edit/${book.id}`}
                        className="btn btn-outline-primary"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => deleteBook(book.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListBooks;
