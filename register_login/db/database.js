const mongoose = require("mongoose");

const DB_URL = "mongodb://manhtri:123456@127.0.0.1:27017/test_db";

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(DB_URL, { useNewUrlParser: true })
      .then(() => console.log("Database connection successful"))
      .catch((err) => console.log(`Database connection error ${err}`));
  }
}

module.exports = new Database();
