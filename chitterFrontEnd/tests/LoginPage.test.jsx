import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../src/Pages/LoginPage.jsx";

describe("Login Component", () => {
  test("should render the form elements correctly", async () => {
    const submitAction = vi.fn();

    render(
      <MemoryRouter>
        <LoginPage submitAction={submitAction} />
      </MemoryRouter>
    );

    const rows = await screen.findAllByText(/Login/i);
    expect(rows.length).toBe(2);

    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("calls submitAction when the form is submitted", () => {
    const submitAction = vi.fn();

    render(
      <MemoryRouter>
        <LoginPage submitAction={submitAction} />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByTestId("login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(submitAction).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
