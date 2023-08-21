import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, beforeEach } from "vitest";

import Home from "../src/Pages/HomePage.jsx";

vi.mock("../Components/utils/Peep.model.js", () => {
  return class PeepModel {
    constructor(userId, content, time) {
      this.userId = userId;
      this.content = content;
      this.time = time;
    }
  };
});

describe("Home Component", () => {
  const mockSubmitAction = vi.fn();
  const mockPeepList = [
    {
      userId: "user1",
      content: "Hello, World!",
      time: new Date("2023-08-20T12:34:56Z").toISOString(),
    },
    {
      userId: "user2",
      content: "Another peep",
      time: "2023-08-20T12:30:00.000Z",
    },
  ];
  const mockUserId = "user123";

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home
          submitAction={mockSubmitAction}
          peepList={mockPeepList}
          userId={mockUserId}
        />
      </MemoryRouter>
    );
  });

  test("should render the Home component with PostPeepForm and PeepList", () => {
    expect(screen.getByTestId("post-peep-form")).toBeInTheDocument();
    expect(screen.getByTestId("peep-list")).toBeInTheDocument();
  });

  test("should submit a peep when the form is filled out and submitted", async () => {
    const peepText = "Test peep";

    const peepContentInput = screen.getByTestId("peepContentInput");
    fireEvent.change(peepContentInput, { target: { value: peepText } });

    const form = screen.getByTestId("post-peep-form");
    fireEvent.submit(form);

    expect(mockSubmitAction).toHaveBeenCalled();
  });

  test("should display peep data in PeepList", () => {
    expect(screen.getByText(mockPeepList[0].content)).toBeInTheDocument();
    expect(screen.getByText("20/08/2023, 13:34:56")).toBeInTheDocument();
  });
});
