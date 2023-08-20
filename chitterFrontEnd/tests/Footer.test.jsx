import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../src/Components/Footer.jsx";

describe("Footer Component", () => {
  test("should render correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const footerText = screen.getByText(
      "© DF-Chitter 2023 | Created by Enqi Yang"
    );
    expect(footerText).toBeInTheDocument();
  });
});
