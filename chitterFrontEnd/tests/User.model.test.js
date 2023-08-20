import { expect, test } from "vitest";

import UserModel from "../src/Components/utils/User.model.js";

test(`It should create the expected object when the constructor is called`, () => {
  const [firstName, lastName, username, email, password] = [
    "Emma",
    "Parker",
    "TestBuddy",
    "emma.parker.test@mail.com",
    "X#9cFp$2Ks",
  ];

  const testUser = new UserModel(
    firstName,
    lastName,
    username,
    email,
    password
  );

  expect(testUser.firstName).toBe(firstName);
  expect(testUser.lastName).toBe(lastName);
  expect(testUser.username).toBe(username);
  expect(testUser.email).toBe(email);
  expect(testUser.password).toBe(password);
  expect(testUser).toBeInstanceOf(UserModel);
});
