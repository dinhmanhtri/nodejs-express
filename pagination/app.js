import express from "express";
import database from "./db/connectDb.js";
// import * as path from "path";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/home", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

import AccountModel from "./models/AccountModel.js";
app.get("/user", (req, res, next) => {
  // Pagination: localhost:4000/user?page=1
  const PAGE_SIZE = 2;
  let page = +req.query.page;
  if (page) {
    if (page < 1) {
      page = 1;
    }
    let skip = (page - 1) * PAGE_SIZE;
    AccountModel.find()
      .skip(skip)
      .limit(PAGE_SIZE)
      .exec((err, doc) => {
        if (err) {
          return res.json(err);
        }
        AccountModel.countDocuments({}).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          return res.json({
            totalDoc: count,
            totalPage: Math.ceil(count / PAGE_SIZE),
            accounts: doc,
          });
        });
      });
  } else {
    AccountModel.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Server error");
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
