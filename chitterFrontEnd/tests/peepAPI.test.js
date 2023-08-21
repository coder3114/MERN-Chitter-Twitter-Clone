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
      test("should return peep added with 201 status on success", async () => {
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

  describe("getPeeps tests", () => {
    describe("Normal data returned", () => {
      const status = 200;
      const expectedReturn = { peepList: samplePeeps, status: status };
      const resolvedRequestWithData = { data: samplePeeps, status: status };

      beforeEach(async () => {
        axiosMock.get.mockResolvedValueOnce(resolvedRequestWithData);
        functionResult = await api.getPeeps();
      });

      test("should make a get request via axios", () => {
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledWith(
          `${import.meta.env.VITE_PEEPSURL}/peeps`
        );
      });

      test("should return sample peeps when valid data is returned from server", () => {
        expect(functionResult).toStrictEqual(expectedReturn);
      });
    });

    describe("Empty array returned", () => {
      test("should return an empty array and no peeps error message when empty array is returned from server", async () => {
        const status = 204;
        const message = `Data not available from the server: There are no peeps to retrieve, please post one`;
        const returnedError = {
          peeps: [],
          status: status,
          error: {
            type: `get`,
            message: message,
          },
        };

        axiosMock.get.mockResolvedValueOnce({
          data: [],
          status: status,
          message: message,
        });
        functionResult = await api.getPeeps();

        expect(functionResult).toStrictEqual(returnedError);
      });
    });

    describe("Error returned", () => {
      test("should return appropriate error message when error is returned from server", async () => {
        const status = 400;
        const message = `Data not available from the server: ${testError.message}`;
        const expectedReturn = {
          peeps: [],
          status: status,
          error: {
            type: `get`,
            message,
          },
        };

        axiosMock.get.mockRejectedValueOnce({
          response: { status: status, data: { message: `Test Error` } },
        });
        functionResult = await api.getPeeps();

        expect(functionResult).toStrictEqual(expectedReturn);
      });
    });
  });
});
