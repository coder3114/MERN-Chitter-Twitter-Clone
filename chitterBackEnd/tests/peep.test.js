import Peep from "../src/models/PeepModel.js";

import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import server from "../server.js";
import testData from "./testData/samplePeeps.js";

const testDataArray = testData.peeps;

chai.use(chaiHttp);

describe(`Testing requests on the database`, () => {
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
    it(`should return all of the peeps as an array`, async () => {
      const res = await testServer.get(`/post`).send();

      console.log(res.body);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an(`array`);
      expect(res.body.length).to.equal(testDataArray.length);
    });
  });
});
