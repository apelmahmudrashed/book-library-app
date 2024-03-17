import ListBooks from "./components/ListBooks";
import AddBook from "./components/book/AddBook";
import NavBar from "./components/layout/Navbar";
import EditBook from "./components/book/EditBook";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const API_BASE_URL = "http://localhost:3000";
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<ListBooks apiBaseUrl={API_BASE_URL} />} />
          <Route
            path="/books/add"
            element={<AddBook apiBaseUrl={API_BASE_URL} />}
          />
          <Route
            path="/books/Edit/:id"
            element={<EditBook apiBaseUrl={API_BASE_URL} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
