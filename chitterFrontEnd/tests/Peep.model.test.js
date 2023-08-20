import { expect, test } from "vitest";

import PeepModel from "../src/Components/utils/Peep.model.js";

test(`It should create the expected object when the constructor is called`, () => {
  const [userId, content, time] = [
    `id5y8tg`,
    `Testing content`,
    `2019-11-27T15:30:00.000Z`,
  ];

  const testPeep = new PeepModel(userId, content, time);

  expect(testPeep.userId).toBe(userId);
  expect(testPeep.content).toBe(content);
  expect(testPeep.time).toBe(time);
  expect(testPeep).toBeInstanceOf(PeepModel);
});
