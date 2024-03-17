import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Book Library
          </a>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>

          <Link to="/books/add" className="btn btn-outline-light">
            Add Book
          </Link>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
