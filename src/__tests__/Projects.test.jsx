import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Projects from "../components/Projects.jsx";

function setup() {
  const onAdd = jest.fn();
  const user = userEvent.setup();
  render(<Projects onAdd={onAdd} />);

  // The labels have no htmlFor, so find the fields by role: input first, textarea second
  const [titleInput, descriptionInput] = screen.getAllByRole("textbox");
  const addButton = screen.getByRole("button", { name: "Add" });

  return { onAdd, user, titleInput, descriptionInput, addButton };
}

describe("Projects (add form)", () => {
  test("renders the form fields and button", () => {
    const { titleInput, descriptionInput, addButton } = setup();
    expect(screen.getByRole("heading", { name: "Add Project" })).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("shows an error when both fields are empty", async () => {
    const { user, addButton, onAdd } = setup();
    await user.click(addButton);
    expect(screen.getByRole("alert")).toHaveTextContent("Please enter a title and a description.");
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("shows an error when the title is missing", async () => {
    const { user, descriptionInput, addButton, onAdd } = setup();
    await user.type(descriptionInput, "Some description");
    await user.click(addButton);
    expect(screen.getByRole("alert")).toHaveTextContent("Please enter a project title.");
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("shows an error when the description is missing", async () => {
    const { user, titleInput, addButton, onAdd } = setup();
    await user.type(titleInput, "My project");
    await user.click(addButton);
    expect(screen.getByRole("alert")).toHaveTextContent("Please enter a project description.");
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("treats whitespace-only input as empty", async () => {
    const { user, titleInput, descriptionInput, addButton, onAdd } = setup();
    await user.type(titleInput, "   ");
    await user.type(descriptionInput, "   ");
    await user.click(addButton);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("calls onAdd with a trimmed project object", async () => {
    const { user, titleInput, descriptionInput, addButton, onAdd } = setup();
    await user.type(titleInput, "  My project  ");
    await user.type(descriptionInput, "  A nice description  ");
    await user.click(addButton);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: "My project",
      description: "A nice description",
    });
  });

  test("clears the fields after a successful add", async () => {
    const { user, titleInput, descriptionInput, addButton } = setup();
    await user.type(titleInput, "My project");
    await user.type(descriptionInput, "A nice description");
    await user.click(addButton);

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });

  test("removes the error message after a valid submit", async () => {
    const { user, titleInput, descriptionInput, addButton } = setup();
    await user.click(addButton);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    await user.type(titleInput, "My project");
    await user.type(descriptionInput, "A nice description");
    await user.click(addButton);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});