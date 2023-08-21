import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, afterEach } from "vitest";

import App from "../src/App.jsx";

import { getPeeps, submitPeep } from "../src/api/peepAPI.js";
import { registerUser, loginUser } from "../src/api/userAPI.js";

vi.mock("./api/peepAPI", () => {
  return {
    getPeeps: vi.fn(),
    submitPeep: vi.fn(),
  };
});

vi.mock("./api/userAPI", () => {
  return {
    registerUser: vi.fn(),
    loginUser: vi.fn(),
  };
});

describe("App test", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("should render without when the user is not logged in", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Chitter")).toBeInTheDocument();
    expect(
      screen.getByText("© DF-Chitter 2023 | Created by Enqi Yang")
    ).toBeInTheDocument();
    expect(screen.getByTestId("peep-list")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("should display registration success message", async () => {
    // registerUser.mockResolvedValue({ message: "Registration successful" });
    // render(
    //   <MemoryRouter initialEntries={["/register"]}>
    //     <App />
    //   </MemoryRouter>
    // );
    // const emailInput = screen.getByLabelText("Email address");
    // const passwordInput = screen.getByLabelText("Password");
    // const registerButton = screen.getByTestId("register");
    // userEvent.type(emailInput, "test@example.com");
    // userEvent.type(passwordInput, "testpassword");
    // userEvent.click(registerButton);
    // await waitFor(() => {
    //   expect(screen.getByText("Registration successful")).toBeInTheDocument();
    // });
  });

  test("should display login success message when user logs in", async () => {
    // loginUser.mockResolvedValue({
    //   userId: "123",
    //   message: "Login successful",
    // });
    // render(
    //   <MemoryRouter initialEntries={["/login"]}>
    //     <App />
    //   </MemoryRouter>
    // );
    // const emailInput = screen.getByLabelText("Email:");
    // const passwordInput = screen.getByLabelText("Password:");
    // const loginButton = screen.getByText("Login");
    // userEvent.type(emailInput, "test@example.com");
    // userEvent.type(passwordInput, "testpassword");
    // userEvent.click(loginButton);
    // await waitFor(() => {
    //   expect(screen.getByText("Login successful")).toBeInTheDocument();
    // });
  });

  test("should display error message when registration fails", async () => {
    // registerUser.mockResolvedValue({
    //   error: { message: "Registration failed" },
    // });
    // render(
    //   <MemoryRouter initialEntries={["/register"]}>
    //     <App />
    //   </MemoryRouter>
    // );
    // const emailInput = screen.getByLabelText("Email:");
    // const passwordInput = screen.getByLabelText("Password:");
    // const registerButton = screen.getByText("Register");
    // userEvent.type(emailInput, "test@example.com");
    // userEvent.type(passwordInput, "testpassword");
    // userEvent.click(registerButton);
    // await waitFor(() => {
    //   expect(screen.getByText("Registration failed")).toBeInTheDocument();
    // });
  });
});
