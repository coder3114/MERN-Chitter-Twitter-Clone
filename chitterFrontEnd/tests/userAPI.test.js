import axiosMock from "axios";
import { describe, expect, beforeEach, test } from "vitest";

import * as api from "../src/api/userAPI.js";

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
        const expectedReturn = {
          status: status,
          error: { type: `post`, message: testError.message },
        };

        axiosMock.post.mockRejectedValueOnce({
          response: { status: status, data: { message: testError.message } },
        });
        functionResult = await api.registerUser(testNewUser);

        expect(functionResult).toStrictEqual(expectedReturn);
      });
    });
  });

  describe("loginUser tests", () => {
    const userToLogin = { email: "test@domain.com", password: "password123" };
    const sampleUserId = "0fje84h3nf";

    describe("Base Request", () => {
      beforeEach(() => {
        api.loginUser(userToLogin);
      });

      test("should have made a post request to axios", () => {
        expect(axiosMock.post).toHaveBeenCalled();
      });

      test('should make a request to the "/login" url with the user to login', () => {
        expect(axiosMock.post).toHaveBeenCalledWith(
          `${import.meta.env.VITE_PEEPSURL}/login`,
          userToLogin
        );
      });
    });

    describe("Successful POST requests", () => {
      test("should return the logged in user info with 201 status on success", async () => {
        const status = 201;
        const message = "some example text";
        const data = { userId: sampleUserId, message: message };
        const expectedResponse = { data: data, status: status };

        const expectedReturn = {
          userId: sampleUserId,
          message: message,
          status: status,
        };

        axiosMock.post.mockResolvedValueOnce(expectedResponse);
        functionResult = await api.loginUser(userToLogin);

        expect(functionResult).toStrictEqual(expectedReturn);
      });
    });

    describe("Unsuccessful POST requests", () => {
      test("should return an error property in the response when unsuccessful POST is made", async () => {
        const status = 400;
        const expectedResponse = {
          response: { status: status, data: { message: testError.message } },
        };
        const expectedReturn = {
          status: status,
          error: { type: `post`, message: testError.message },
        };

        axiosMock.post.mockRejectedValueOnce(expectedResponse);
        functionResult = await api.loginUser(userToLogin);

        expect(functionResult).toStrictEqual(expectedReturn);
      });
    });
  });
});
