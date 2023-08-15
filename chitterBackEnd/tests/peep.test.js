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
      const res = await testServer.get(`/`).send();

      // console.log(res.body);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an(`array`);
      expect(res.body.length).to.equal(testDataArray.length);
    });
  });

  describe(`/POST create a peep`, () => {
    it(`should create a peep that is properly formed`, async () => {
      let peep = {
        userId: "64dbacfec48fc3b245fd45d8",
        peepDesc: "Hey Everyone, I am a testing post :)",
      };

      console.log(peep);

      const res = await testServer.post(`/`).send(peep);

      console.log(res);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an(`object`);
      expect(res.body).to.have.property(`peepDesc`, peep.peepDesc);
    });
  });
});
