import axiosMock from "axios";
import { describe, expect, beforeEach, test } from "vitest";

import sampleUsers from "./testData/users.json";

vi.mock("axios");

describe("External Data Tests", () => {
  const testError = { message: `Test Error` };
  let functionResult;

  describe("registerUser tests", () => {
    const testNewUser = { ...sampleUsers[0] };
    delete testNewUser._id;

    describe("Base Request", () => {
      beforeEach(() => {
        api.registerUser(testNewUser);
      });

      test("should have made a post request to axios", () => {
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
      });

      test('should make a request to the "/register" url with the user to register', () => {
        expect(axiosMock.post).toHaveBeenCalledWith(
          `${import.meta.env.VITE_PEEPSURL}/register`,
          testNewUser
        );
      });
    });

    describe("Successful POST requests", () => {
      test("should return the registered user info with 201 status on success", async () => {
        const status = 201;
        const expectedResponse = { data: testNewUser, status: status };
        const expectedReturn = { user: testNewUser, status: status };

        axiosMock.post.mockResolvedValueOnce(expectedResponse);
        functionResult = await api.registerUser(testNewUser);

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
        functionResult = await api.registerUser(testNewUser);

        expect(functionResult).toStrictEqual(expectedReturn);
      });
    });
  });
});
