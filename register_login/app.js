const express = require("express");
const app = express();
const port = 3000;
const database = require("./db/database.js");
const UserModel = require("./models/userModel");
const bcrypt = require("bcrypt");

app.use(express.urlencoded({ urlencoded: false }));
app.use(express.json());

const userRouter = require("./routes/userRouter");
app.use("/api/user", userRouter);

app.get("/", (req, res, next) => {
  res.json("HOME");
});

app.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, "req.body.username");
  console.log(password, "req.body.password");

  let user = await UserModel.findOne({ username: username }).catch((err) => {
    console.log(err);
  });

  if (user === null) {
    let data = req.body;
    data.password = await bcrypt.hash(password, 10);
    UserModel.create(data)
      .then((user) => {
        res.json("Account creation successful");
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Account creation failed");
      });
  } else {
    console.log("User already exists");
    res.json("User already exists");
  }
});

app.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, "req.body.username");
  console.log(password, "req.body.password");

  UserModel.findOne({ username: username }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          res.json("Login successful");
        } else {
          res.json("Wrong password");
        }
      });
    } else {
      res.status(400).json("Account not found");
    }
  });
});

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
