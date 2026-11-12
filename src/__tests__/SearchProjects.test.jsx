import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchProjects from "../components/SearchProjects.jsx";

const projects = [
  { id: 1, title: "Alpha Brand", description: "Identity for a coffee roastery" },
  { id: 2, title: "Beta Site", description: "Booking website for a clinic" },
  { id: 3, title: "Gamma Film", description: "Launch animation" },
  { id: 4, title: "Delta Pack", description: "Tea packaging" },
  { id: 5, title: "Epsilon Print", description: "Festival posters" },
];

const searchBox = () => screen.getByPlaceholderText("Search Projects");

describe("SearchProjects", () => {
  test("renders the search input", () => {
    render(<SearchProjects projects={projects} />);
    expect(searchBox()).toBeInTheDocument();
  });

  test("shows all projects when there are three or fewer", () => {
    render(<SearchProjects projects={projects.slice(0, 3)} />);
    expect(screen.getAllByRole("heading")).toHaveLength(3);
    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
  });

  test("shows only the first three projects and a summary when there are more", () => {
    render(<SearchProjects projects={projects} />);
    expect(screen.getAllByRole("heading")).toHaveLength(3);
    expect(screen.getByText("Showing 3 of 5 results")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Delta Pack" })).not.toBeInTheDocument();
  });

  test("filters by title, ignoring case", async () => {
    const user = userEvent.setup();
    render(<SearchProjects projects={projects} />);
    await user.type(searchBox(), "BETA");

    expect(screen.getByRole("heading", { name: "Beta Site" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading")).toHaveLength(1);
  });

  test("filters by description", async () => {
    const user = userEvent.setup();
    render(<SearchProjects projects={projects} />);
    await user.type(searchBox(), "coffee");

    expect(screen.getByRole("heading", { name: "Alpha Brand" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading")).toHaveLength(1);
  });

  test("ignores spaces around the query", async () => {
    const user = userEvent.setup();
    render(<SearchProjects projects={projects} />);
    await user.type(searchBox(), "  gamma  ");

    expect(screen.getByRole("heading", { name: "Gamma Film" })).toBeInTheDocument();
  });

  test("finds projects beyond the first three when searching", async () => {
    const user = userEvent.setup();
    render(<SearchProjects projects={projects} />);
    await user.type(searchBox(), "epsilon");

    expect(screen.getByRole("heading", { name: "Epsilon Print" })).toBeInTheDocument();
  });

  test("shows a message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<SearchProjects projects={projects} />);
    await user.type(searchBox(), "zzzz");

    expect(screen.getByText("No projects found")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  test("shows the empty message when there are no projects", () => {
    render(<SearchProjects projects={[]} />);
    expect(screen.getByText("No projects found")).toBeInTheDocument();
  });

  test("does not crash when a project has no description", () => {
    render(<SearchProjects projects={[{ id: 9, title: "Bare project" }]} />);
    expect(screen.getByRole("heading", { name: "Bare project" })).toBeInTheDocument();
  });
});