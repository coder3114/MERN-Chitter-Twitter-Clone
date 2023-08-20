import UserModel from "./User.model.js";

export default class PeepModel {
  constructor(userId, content, time) {
    this.userId = userId;
    this.content = content;
    this.time = time;
    //this.user = new UserModel(userId, "", "", "");
    //this._id = _id;
  }
}
