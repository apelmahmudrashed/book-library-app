import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Back-end api base url to consume resources
type AddBookProps = {
  apiBaseUrl: string;
};

//Add book componenet
const AddBook = (props: AddBookProps) => {
  const navigate = useNavigate();
  const [Book, setBook] = useState({
    title: "",
  });

  const { title } = Book;
  const onInputChange = (e: any) => {
    setBook({ ...Book, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${props.apiBaseUrl}/api/books`, Book, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        //TODO: display error no the page
        console.log(err);
      });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Book</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter book title"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block mt-2">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
