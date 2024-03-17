import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//Back-end api base url
type EditBookProps = {
  apiBaseUrl: string;
};

//Update book component
const EditBook = (props: EditBookProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Book, setBook] = useState({
    title: "",
    isAvailable: 1,
  });

  const { title, isAvailable } = Book;
  const onInputChange = (e: any) => {
    setBook({ ...Book, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBook();
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    axios
      .put(`${props.apiBaseUrl}/api/books/${id}`, Book, {
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

  const loadBook = () => {
    axios
      .get(`${props.apiBaseUrl}/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
        // console.log(res);
      })
      .catch((err) => {
        //TODO: display error on the page
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Book</h2>
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
          <select
            name="isAvailable"
            value={isAvailable}
            className="form-select mt-2"
            aria-label="Default select example"
            onChange={(e) => onInputChange(e)}
          >
            <option value={1}>Available</option>
            <option value={0}>Borrowed</option>
          </select>
          <button className="btn btn-warning btn-block mt-2">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
