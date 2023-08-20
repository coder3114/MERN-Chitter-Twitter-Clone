import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Modal from "../src/Components/utils/Modal.jsx";

describe("Modal Component", () => {
  test("should render the modal with title and message", () => {
    const handleClose = vi.fn();
    const title = "Test Title";
    const message = "Test Message";

    render(<Modal handleClose={handleClose} title={title} message={message} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  test("should call handleClose when close button is clicked", () => {
    const handleClose = vi.fn();
    const title = "Test Title";
    const message = "Test Message";

    render(<Modal handleClose={handleClose} title={title} message={message} />);

    const closeButton = screen.getByText("Close");

    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
