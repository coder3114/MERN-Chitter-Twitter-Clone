import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import PostPeepForm from "../src/Components/PostPeepForm.jsx";

describe(`Peep Component`, () => {
  test(`it should render the component with valid peep data`, () => {
    const submitAction = vi.fn();
    const userId = "user123";
    render(
      <MemoryRouter>
        <PostPeepForm submitAction={submitAction} userId={userId} />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("What's happening...")
    ).toBeInTheDocument();
    expect(screen.getByText("Post")).toBeInTheDocument();
  });

  test("should disable the submit button when the peep text is empty", () => {
    const submitAction = vi.fn();
    const userId = "user123";

    render(
      <MemoryRouter>
        <PostPeepForm submitAction={submitAction} userId={userId} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("What's happening...");
    const submitButton = screen.getByText("Post");

    expect(submitButton).toBeDisabled();

    fireEvent.change(input, { target: { value: "Test peep text" } });

    expect(submitButton).not.toBeDisabled();
  });

  test("should render a message when the user is not logged in", () => {
    const submitAction = vi.fn();
    const userId = "";

    render(
      <MemoryRouter>
        <PostPeepForm submitAction={submitAction} userId={userId} />
      </MemoryRouter>
    );
    expect(
      screen.getByText("Logged in users can post peeps!")
    ).toBeInTheDocument();
  });

  test("should call submitAction and submit the form data correctly", () => {
    const submitAction = vi.fn();
    const userId = "user123";

    render(
      <MemoryRouter>
        <PostPeepForm submitAction={submitAction} userId={userId} />
      </MemoryRouter>
    );

    const peepContentInput = screen.getByTestId("peepContentInput");
    fireEvent.change(peepContentInput, { target: { value: "Hello, world!" } });

    const form = screen.getByTestId("post-peep-form");
    fireEvent.submit(form);

    expect(submitAction).toHaveBeenCalledOnce();
    expect(peepContentInput.value).toBe("");
  });
});
