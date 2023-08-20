import User from "../src/models/UserModel.js";

import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import server from "../server.js";
import testData from "./testData/sampleData.js";

const testUsersArray = testData.users;
const validationErrorMessage = `Validation failed, please check input!`;

chai.use(chaiHttp);

describe(`Testing requests on the User Register`, () => {
  const testServer = chai.request(server).keepOpen();

  beforeEach(async () => {
    try {
      await User.deleteMany();
      console.log(`Database cleared`);
    } catch (error) {
      console.log(`Error clearing`);
      throw new Error();
    }
  });

  describe(`/POST`, () => {
    describe(`Check input fields`, () => {
      it(`1 - should not register a new user without a firstName field`, async () => {
        let newUser = {
          lastName: "Parker",
          username: "testing",
          email: "testing@mail.com",
          password: "password123",
        };

        const res = await testServer.post(`/register`).send(newUser);

        expect(res).to.have.status(422);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(validationErrorMessage);
      });

      it(`2 - should not register a new user without a lastName field`, async () => {
        let newUser = {
          firstName: "Emma",
          username: "testing",
          email: "testing@mail.com",
          password: "password123",
        };

        const res = await testServer.post(`/register`).send(newUser);

        expect(res).to.have.status(422);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(validationErrorMessage);
      });

      it(`3 - should not register a new user without a username field`, async () => {
        let newUser = {
          firstName: "Emma",
          lastName: "Parker",
          email: "testing@mail.com",
          password: "password123",
        };

        const res = await testServer.post(`/register`).send(newUser);

        expect(res).to.have.status(422);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(validationErrorMessage);
      });

      it(`4 - should not register a new user without a email field`, async () => {
        let newUser = {
          firstName: "Emma",
          lastName: "Parker",
          username: "testing",
          password: "password123",
        };

        const res = await testServer.post(`/register`).send(newUser);

        expect(res).to.have.status(422);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(validationErrorMessage);
      });

      it(`5 - should not register a new user without a password field`, async () => {
        let newUser = {
          firstName: "Emma",
          lastName: "Parker",
          username: "testing",
          email: "testing@mail.com",
        };

        const res = await testServer.post(`/register`).send(newUser);

        expect(res).to.have.status(422);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(validationErrorMessage);
      });
    });

    describe(`Check existing users`, () => {
      it(`6 - should not register a user if username already exists`, async () => {
        await User.create({
          firstName: "A",
          lastName: "B",
          username: "usernameExisted",
          email: "testUsernameExist@mail.com",
          password: "password123",
        });

        let newUser = {
          firstName: "firstName",
          lastName: "lastName",
          username: "usernameExisted",
          email: "testing@mail.com",
          password: "password123",
        };

        const res = await testServer.post(`/register`).send(newUser);

        expect(res).to.have.status(400);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(`Username is already in use!`);
      });

      it(`7 - should not register a user if email already exists`, async () => {
        await User.create({
          firstName: "A",
          lastName: "B",
          username: "emailExisted",
          email: "olivia.gray.test@mail.com",
          password: "password123",
        });

        let newUser = {
          firstName: "firstName",
          lastName: "lastName",
          username: "username",
          email: "olivia.gray.test@mail.com",
          password: "password123",
        };

        const res = await testServer.post(`/register`).send(newUser);

        expect(res).to.have.status(400);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(`Email is already in use!`);
      });
    });

    describe(`Check successful registered user`, () => {
      it(`8 - should create a peep that is properly formed`, async () => {
        let newUser = {
          firstName: "Emma",
          lastName: "Parker",
          username: "testing",
          email: "testing@mail.com",
          password: "password123",
        };

        const res = await testServer.post(`/register`).send(newUser);
        expect(res).to.have.status(201);
        expect(res.body.user).to.be.an(`object`);
        expect(res.body.user).to.have.property(`username`);
        expect(res.body.message).to.eql("User registration successful");
      });
    });
  });
});
