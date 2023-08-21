import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, afterEach } from "vitest";
import axiosMock from "axios";

import App from "../src/App.jsx";
import { getPeeps, submitPeep } from "../src/api/peepAPI.js";
import { registerUser, loginUser } from "../src/api/userAPI.js";
import samplePeeps from "./testData/peeps.json";

vi.mock("axios");

vi.mock("./api/peepAPI", () => {
  return {
    getPeeps: vi.fn(),
    submitPeep: vi.fn(),
  };
});

vi.mock("../src/api/userAPI.js", () => {
  return {
    registerUser: vi.fn(),
    loginUser: vi.fn(),
  };
});

describe("App test", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("should render without crash when the user is not logged in", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Chitter")).toBeInTheDocument();
    expect(
      screen.getByText("© DF-Chitter 2023 | Created by Enqi Yang")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Logged in users can post peeps!")
    ).toBeInTheDocument();
    expect(screen.getByTestId("peep-list")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("should display a message when no peeps available", async () => {
    const status = 204;
    const message = `Data not available from the server: There are no peeps to retrieve, please post one`;

    axiosMock.get.mockResolvedValueOnce({
      data: [],
      status: status,
      message: message,
    });
    await getPeeps();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText("There are no peeps previously stored. Start posting!")
    ).toBeInTheDocument();
  });

  test("should display peeps when retrieved successfully from server", async () => {
    // const status = 200;
    // const resolvedRequestWithData = { data: samplePeeps, status: status };
    // axiosMock.get.mockResolvedValueOnce(resolvedRequestWithData);
    // await getPeeps();
    // render(
    //   <MemoryRouter>
    //     <App />
    //   </MemoryRouter>
    // );
    // expect(
    //   screen.getByText("Sample Peep - Hey Emma here, this is my first post!")
    // ).toBeInTheDocument();
  });

  describe("tests for register", () => {
    test("should display the register form when user click Register button", async () => {
      // render(
      //   <MemoryRouter initialEntries={["/register"]}>
      //     <App />
      //   </MemoryRouter>
      // );
      // const emailInput = screen.getByLabelText("Email address");
      // const passwordInput = screen.getByLabelText("Password");
      // const registerButton = screen.getByTestId("register");
      // await userEvent.type(emailInput, "test@example.com");
      // await userEvent.type(passwordInput, "testpassword");
      // await userEvent.click(registerButton);
      // await waitFor(() => {
      //   expect(screen.getByText(/Registration successful/i)).toBeVisible();
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

    test("should display login in message when registration passes", async () => {});
  });

  describe("tests for login", () => {
    const validTestEmail = `valid@email.com`;
    const validPassword = `password`;

    test("should display Welcome to Chitter message when user logs in", async () => {
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

    test("should render the textbox for posting after user logs in", async () => {});
  });

  describe("tests for logout", () => {
    test("should not render post text box when Logout button is clicked", async () => {
      // const logoutHandler = vi.fn();
      // render(
      //   <MemoryRouter>
      //     <App isLoggedIn={true} logoutHandler={logoutHandler} />
      //   </MemoryRouter>
      // );
      // const logoutButton = screen.getByTestId("Logout");
      // fireEvent.click(logoutButton);
      // await waitFor(() => {
      //   const postTextBox = screen.getByTestId("post-peep-form");
      //   expect(postTextBox).toBeNull();
      // });
      // const postTextBox = screen.getByTestId("post-peep-form");
      // expect(postTextBox).toBeNull();
      // expect(logoutHandler).toHaveBeenCalled();
    });
  });
});
