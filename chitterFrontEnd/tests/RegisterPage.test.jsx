import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../src/Pages/RegisterPage.jsx";

describe("Register Page", () => {
  test("should render the form elements correctly", async () => {
    const submitAction = vi.fn();

    render(
      <MemoryRouter>
        <RegisterPage submitAction={submitAction} />
      </MemoryRouter>
    );

    const rows = await screen.findAllByText(/Register/i);
    expect(rows.length).toBe(2);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("should call submitAction when the form is submitted", () => {
    const submitAction = vi.fn();

    render(
      <MemoryRouter>
        <RegisterPage submitAction={submitAction} />
      </MemoryRouter>
    );
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");

    const submitButton = screen.getByTestId("register");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(usernameInput, { target: { value: "johndoe" } });
    fireEvent.change(emailInput, {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Check that submitAction was called with the correct values
    expect(submitAction).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      password: "password123",
    });
  });
});
