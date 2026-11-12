import { render, screen } from "@testing-library/react";
import ProjectCard from "../components/ProjectCard.jsx";

const props = {
  image: "https://example.com/cover.png",
  title: "Harbor & Pine",
  description: "A full identity for a coastal roastery.",
};

describe("ProjectCard", () => {
  test("renders the title as a heading", () => {
    render(<ProjectCard {...props} />);
    expect(screen.getByRole("heading", { name: "Harbor & Pine" })).toBeInTheDocument();
  });

  test("renders the description", () => {
    render(<ProjectCard {...props} />);
    expect(screen.getByText("A full identity for a coastal roastery.")).toBeInTheDocument();
  });

  test("renders the image with the title as alt text", () => {
    render(<ProjectCard {...props} />);
    const img = screen.getByRole("img", { name: "Harbor & Pine" });
    expect(img).toHaveAttribute("src", "https://example.com/cover.png");
  });

  test("still renders when no image is provided", () => {
    render(<ProjectCard title="No Image" description="Still works" />);
    expect(screen.getByRole("heading", { name: "No Image" })).toBeInTheDocument();
  });
});