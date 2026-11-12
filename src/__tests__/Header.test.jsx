import { render, screen } from "@testing-library/react";
import Header from "../components/Header.jsx";

describe("Header", () => {
  test("renders the app title", () => {
    render(<Header />);
    expect(screen.getByText("Personal Project Showcase App")).toBeInTheDocument();
  });

  test("renders the title inside a header landmark", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toHaveTextContent("Personal Project Showcase App");
  });
});