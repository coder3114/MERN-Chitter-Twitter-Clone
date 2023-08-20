import Peep from "../src/models/PeepModel.js";

import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import server from "../server.js";
import testData from "./testData/samplePeeps.js";

const testDataArray = testData.peeps;
const validationErrorMessage = `Validation failed, please check input!`;

chai.use(chaiHttp);

describe(`Testing requests on the Peep database`, () => {
  const testServer = chai.request(server).keepOpen();

  beforeEach(async () => {
    try {
      await Peep.deleteMany();
      console.log(`Database cleared`);
    } catch (error) {
      console.log(`Error clearing`);
      throw new Error();
    }
    try {
      await Peep.insertMany(testDataArray);
      console.log(`Database populated with test Peeps`);
    } catch (error) {
      console.log(`Error inserting`);
      throw new Error();
    }
  });

  describe(`/GET peeps`, () => {
    it(`1 - should return all of the peeps as an array`, async () => {
      const res = await testServer.get(`/peeps`).send();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an(`array`);
      expect(res.body.length).to.equal(testDataArray.length);
    });

    it("2 - should return error message if no peep to retrieve", async () => {
      await Peep.deleteMany();

      const res = await testServer.get(`/peeps`).send();

      expect(res).to.have.status(404);
      expect(res.body.message).to.be.eql(`No peeps to display, start posting!`);
    });
  });

  describe(`/POST a peep`, () => {
    it(`3 - should not create a peep without a content field`, async () => {
      let peep = {
        userId: "64dbacfec48fc3b245fd45d8",
        content: "2023-08-12T00:00:00.000Z",
      };

      const res = await testServer.post(`/peeps`).send(peep);

      expect(res).to.have.status(422);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(validationErrorMessage);
    });

    it(`4 - should not create a peep without a userId field`, async () => {
      let peep = {
        content: "Hey, I am a testing post",
        time: "2023-08-12T00:00:00.000Z",
      };

      const res = await testServer.post(`/peeps`).send(peep);

      expect(res).to.have.status(422);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(validationErrorMessage);
    });

    it(`5 - should not create a peep without a time field`, async () => {
      let peep = {
        userId: "64dbacfec48fc3b245fd45d8",
        content: "Hey, testing again",
      };

      const res = await testServer.post(`/peeps`).send(peep);

      expect(res).to.have.status(422);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(validationErrorMessage);
    });

    it(`6 - should not create a peep without a correct time field`, async () => {
      let peep = {
        userId: "64dbacfec48fc3b245fd45d8",
        content: "Hey, I am another testing post",
        time: "not a date",
      };

      const res = await testServer.post(`/peeps`).send(peep);

      expect(res).to.have.status(422);
      expect(res).to.have.property(`error`);
      expect(res.body.message).to.be.eql(validationErrorMessage);
    });

    it(`7 - should create a peep that is properly formed`, async () => {
      let peep = {
        userId: "64dbacfec48fc3b245fd45d8",
        content: "Hey, I am a successful testing post",
        time: "2023-08-12T00:00:00.000Z",
      };

      const res = await testServer.post(`/peeps`).send(peep);
      expect(res).to.have.status(201);
      expect(res.body.peep).to.be.an(`object`);
      expect(res.body.peep).to.have.property(`content`, peep.content);
      expect(res.body.message).to.eql("Peep post successful");
    });
  });
});
