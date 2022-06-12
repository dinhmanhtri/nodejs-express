import mongoose from "mongoose";
const DB_URL = "mongodb://manhtri:123456@127.0.0.1:27017/nodemy_pagination";

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Database connection successful"))
      .catch((err) => console.error(`Database connection error: ${err}`));
  }
}

export default new Database();
