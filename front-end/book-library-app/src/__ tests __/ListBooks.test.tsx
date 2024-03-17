import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ListBooks from "../components/ListBooks";

test("Renders the ListBooks", () => {
  render(<ListBooks apiBaseUrl="" />);
  expect(true).toBeTruthy();
});
