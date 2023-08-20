import User from "../src/models/UserModel.js";

import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import server from "../server.js";
import testData from "./testData/sampleData.js";

const testUsersArray = testData.users;

chai.use(chaiHttp);

describe(`Testing requests on the User Login`, () => {
  const testServer = chai.request(server).keepOpen();

  beforeEach(async () => {
    try {
      await User.deleteMany();
      console.log(`Database cleared`);
    } catch (error) {
      console.log(`Error clearing`);
      throw new Error();
    }
    try {
      await User.insertMany(testUsersArray);
      console.log(`Database populated with test Users`);
    } catch (error) {
      console.log(`Error inserting`);
      throw new Error();
    }
  });

  describe(`/POST`, () => {
    describe(`Check input fields`, () => {
      it(`1 - should not login a user without a email field`, async () => {
        let user = {
          password: "X#9cFp$2Ks",
        };

        const res = await testServer.post(`/login`).send(user);

        expect(res).to.have.status(422);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(
          `Validation failed, please check input!`
        );
      });

      it(`2 - should not login a user without a password field`, async () => {
        let user = {
          email: "emma.parker.test@mail.com",
        };

        const res = await testServer.post(`/login`).send(user);

        expect(res).to.have.status(422);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(
          `Validation failed, please check input!`
        );
      });
    });

    describe(`Check existing users`, () => {
      it(`3 - should not register a user if email doesn't exist`, async () => {
        let user = {
          email: "nonExisting.test@mail.com",
          password: "fakePassword",
        };

        const res = await testServer.post(`/login`).send(user);

        expect(res).to.have.status(401);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(
          `No accounts with this email address!`
        );
      });

      it(`4 - should not login a user if email and password don't match`, async () => {
        let user = {
          email: "emma.parker.test@mail.com",
          password: "fakePassword",
        };

        const res = await testServer.post(`/login`).send(user);

        expect(res).to.have.status(401);
        expect(res).to.have.property(`error`);
        expect(res.body.message).to.be.eql(`User password incorrect!`);
      });
    });
  });
});
