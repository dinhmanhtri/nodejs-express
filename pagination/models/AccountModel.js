import mongoose from "mongoose";
import database from "../db/connectDb.js";

const Schema = mongoose.Schema;
const AccountSchema = new Schema({
  username: String,
  password: String,
});

const AccountModel = mongoose.model("Account", AccountSchema);

export default AccountModel;