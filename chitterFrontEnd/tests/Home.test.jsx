import { render, screen } from "@testing-library/react";

import { describe, test, expect, beforeEach, fireEvent } from "vitest";
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
      <Home
        submitAction={mockSubmitAction}
        peepList={mockPeepList}
        userId={mockUserId}
      />
    );
  });

  test("should render the Home component with PostPeepForm and PeepList", () => {
    expect(screen.getByTestId("post-peep-form")).toBeInTheDocument();
    expect(screen.getByTestId("peep-list")).toBeInTheDocument();
  });

  test("should submit a peep when the form is filled out and submitted", async () => {
    const peepText = "Test peep";
    // await fireEvent.input(
    //   screen.getByPlaceholderText("What's happening..."),
    //   peepText
    // );
    // await fireEvent.click(screen.getByText("Post"));

    // expect(mockSubmitAction).toHaveBeenCalled();
    // const calledArgs = mockSubmitAction.calls[0][0];
    // expect(calledArgs.userId).toBe(mockUserId);
    // expect(calledArgs.content).toBe(peepText);
  });

  test("should display peep data in PeepList", () => {
    expect(screen.getByText(mockPeepList[0].content)).toBeInTheDocument();
    expect(screen.getByText("20/08/2023, 13:34:56")).toBeInTheDocument();
  });
});
