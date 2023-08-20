import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import PeepList from "../src/Components/PeepList.jsx";
import samplePeeps from "./testData/peeps.json";

describe("PeepList tests", () => {
  test(`it should render the correct number of Todo components based on the todo array supplied`, async () => {
    render(
      <MemoryRouter>
        <PeepList peepList={samplePeeps} />
      </MemoryRouter>
    );
    const rows = await screen.findAllByText(/Sample Peep/i);
    expect(rows.length).toBe(4);
  });

  test(`it should render a message when no peeps are returned from the server without an error`, async () => {
    const noPeep = [];
    render(
      <MemoryRouter>
        <PeepList peepList={noPeep} />
      </MemoryRouter>
    );

    const rows = await screen.findByText(
      /There are no peeps previously stored. Start posting!/i
    );
    expect(rows).toBeInTheDocument();
  });
});
