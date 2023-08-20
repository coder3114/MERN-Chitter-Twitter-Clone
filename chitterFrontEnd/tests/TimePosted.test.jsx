import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TimePosted from "../src/Components/utils/TimePosted.jsx";

describe(`TimePosted test suite`, () => {
  const mockTimePosted = vi.fn();

  test(`updateTimePosted should return null if not supplied in props`, () => {
    expect(TimePosted.defaultProps.updateDateCreated).toBeDefined();
    expect(TimePosted.defaultProps.updateDateCreated()).toBeNull();
  });

  test(`it should call the updateTimePostedFunction when the date changes`, () => {
    render(<TimePosted updateDateCreated={mockTimePosted} />);
    expect(mockTimePosted).toHaveBeenCalledTimes(1);
  });

  test(`it should initially render with the date supplied by props`, () => {
    const testDate = new Date();
    const testOutput = `${testDate.toLocaleDateString()}, ${testDate.toLocaleTimeString()}`;
    render(
      <TimePosted updateDateCreated={mockTimePosted} timePosted={testDate} />
    );

    expect(screen.queryByTestId(`dateCreated`).textContent.trim()).toBe(
      testOutput
    );
  });

  test(`it should call the timer on initial render if no date is supplied`, async () => {
    const setInterval = vi.spyOn(window, `setInterval`);

    render(<TimePosted updateDateCreated={mockTimePosted} />);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
