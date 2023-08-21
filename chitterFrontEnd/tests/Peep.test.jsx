import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import Peep from "../src/Components/Peep.jsx";

describe(`Peep Component`, () => {
  const peepData = {
    userId: {
      firstName: "Emma",
      lastName: "Parker",
      username: "TestBuddy",
    },
    content: "Hello, world!",
    time: new Date("2023-08-20T12:34:56Z").toISOString(),
  };

  test(`it should render the component with valid peep data`, () => {
    render(
      <MemoryRouter>
        <Peep peep={peepData} />
      </MemoryRouter>
    );

    expect(screen.getByText("Emma Parker")).toBeInTheDocument();
    expect(screen.getByText("@TestBuddy")).toBeInTheDocument();
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    //BST is 1 hour ahead of the GMT time returned by .toISOString()
    expect(screen.getByText("20/08/2023, 13:34:56")).toBeInTheDocument();
  });
});
