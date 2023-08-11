import mongoose from "mongoose";

const newIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const peeps = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: newIds[0],
    peepDescription: "Hey Everyone, this is my first post!",
    peepTimePosted: "2023-08-12T00:00:00.000Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: newIds[1],
    peepDescription: "Hi I am happy it's Friday today!",
    peepTimePosted: "2023-08-11T00:00:00.000Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: newIds[2],
    peepDescription: "Full stack is fun!",
    peepTimePosted: "2023-08-17T00:00:00.000Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: newIds[3],
    peepDescription:
      "Whether software development is the right career choice for you?",
    peepTimePosted: "2023-08-11T00:00:00.000Z",
  },
];
