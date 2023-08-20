import axiosMock from "axios";
import { describe, expect, beforeEach, test } from "vitest";

import * as api from "../src/api/peepAPI.js";

import samplePeeps from "./testData/peeps.json";

vi.mock("axios");

describe("External Data Tests", () => {
  const testError = { message: `Test Error` };
  let functionResult;

  describe("postPeep tests", () => {
    const testNewPeep = { ...samplePeeps[0] };
    delete testNewPeep._id;

    describe("Base Request", () => {
      beforeEach(() => {
        api.submitPeep(testNewPeep);
      });

      test("should have made a post request to axios", () => {
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
      });

      test('should make a request to the "/peeps" url with the peep to post', () => {
        expect(axiosMock.post).toHaveBeenCalledWith(
          `${import.meta.env.VITE_PEEPSURL}/peeps`,
          testNewPeep
        );
      });
    });

    describe("Successful POST requests", () => {
      test('should return "Todo added" with 201 status on success', async () => {
        const status = 201;
        const expectedResponse = { data: testNewPeep, status: status };
        const expectedReturn = { peep: testNewPeep, status: status };

        axiosMock.post.mockResolvedValueOnce(expectedResponse);
        functionResult = await api.submitPeep(testNewPeep);

        expect(functionResult).toStrictEqual(expectedReturn);
      });
    });

    describe("Unsuccessful POST requests", () => {
      test("should return an error property in the response when unsuccessful POST is made", async () => {
        const status = 400;
        const expectedResponse = {
          response: { status: status, message: testError.message },
        };
        const expectedReturn = {
          status: status,
          error: { type: `post`, message: testError.message },
        };

        axiosMock.post.mockRejectedValueOnce(expectedResponse);
        functionResult = await api.submitPeep(testNewPeep);

        expect(functionResult).toStrictEqual(expectedReturn);
      });
    });
  });
});
