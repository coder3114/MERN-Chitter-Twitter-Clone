import mongoose from "mongoose";

const newIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: newIds[0],
    firstName: "Emma",
    lastName: "Parker",
    username: "TestBuddy",
    email: "emma.parker.test@mail.com",
    password: "X#9cFp$2Ks",
  },
  {
    _id: newIds[1],
    firstName: "Olivia",
    lastName: "Gray",
    username: "usernameExisted",
    email: "testUsernameExist@mail.com",
    password: "P@5mGtR7Qw",
  },
  {
    _id: newIds[2],
    firstName: "Ava",
    lastName: "Cooper",
    username: "Bug-Catcher",
    email: "ava.cooper.test@mail.com",
    password: "B^3hVz*6Ln",
  },
  {
    _id: newIds[3],
    firstName: "Noah",
    lastName: "Morgan",
    username: "likeChitter",
    email: "noah.morgan.test@mail.com",
    password: "D$8jCx#4Fv",
  },
  // {
  //   _id: newIds[4],
  //   firstName: "Amy",
  //   lastName: "Brooks",
  //   username: "foreverSoftware",
  //   email: "amy.brooks.test@mail.com",
  //   password: "T%2qNsP7Zr",
  // },
];

export const peeps = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: newIds[0],
    content: "Hey Emma here, this is my first post!",
    time: "2023-08-12T00:00:00.000Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: newIds[1],
    content: "Hi I am Olivia, I'm happy it's Friday today!",
    time: "2023-08-11T00:00:00.000Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: newIds[2],
    content: "Full stack is fun! Ava",
    time: "2023-08-17T00:00:00.000Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: newIds[3],
    content: "Happy coding -- Noah",
    time: "2023-08-11T00:00:00.000Z",
  },
];

// {
//   "peeps": [
//     {
//       "peepText": "Hey Everyone, this is my first post!",
//       "peepTimePosted": "2023-08-12T00:00:00.000Z"
//     },
//     {
//       "peepText": "Hi I am happy it's Friday today!",
//       "peepTimePosted": "2023-08-11T00:00:00.000Z"
//     },
//     {
//       "peepText": "Hi I am a bad example because I am tooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooog!",
//       "peepTimePosted": "2023-08-17T00:00:00.000Z"
//     }
//   ]
// }
