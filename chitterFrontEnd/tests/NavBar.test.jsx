import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../src/Components/Navbar.jsx";

describe("Navbar Component", () => {
  test("should render correctly when logged out", () => {
    const isLoggedIn = false;
    const logoutHandler = vi.fn();

    render(
      <MemoryRouter>
        <Navbar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      </MemoryRouter>
    );

    expect(screen.getByText("Chitter")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("should render correctly when logged in", () => {
    const isLoggedIn = true;
    const logoutHandler = vi.fn();

    render(
      <MemoryRouter>
        <Navbar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      </MemoryRouter>
    );

    expect(screen.getByText("Chitter")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  test("should call logoutHandler when Logout button is clicked", () => {
    const isLoggedIn = true;
    const logoutHandler = vi.fn();
    render(
      <MemoryRouter>
        <Navbar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole("button", { name: "Logout" });

    fireEvent.click(logoutButton);

    expect(logoutHandler).toHaveBeenCalledTimes(1);
  });
});
