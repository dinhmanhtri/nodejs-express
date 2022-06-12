const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

class UserController {
  static getAllUser = (req, res) => {
    try {
      UserModel.find({})
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json("Server error"));
    } catch (error) {
      console.log(error);
    }
  };

  static createUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      let user = await UserModel.findOne({ username: username }).catch(
        (error) => console.log(error)
      );

      if (user === null) {
        const data = req.body;
        data.password = await bcrypt.hash(password, 10);
        const doc = new UserModel(data);
        const result = await doc.save();
        // console.log(result, "result");
        res.json("Create user successful");
      } else {
        console.log("User already exists");
        res.json("User already exists");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      await UserModel.findOne({ username: username }, (err, user) => {
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
    } catch (error) {
      console.log(error);
    }
  };
  static updatePassword = async (req, res) => {
    try {
      const id = req.params.id;
      const newPassword = req.body.newPassword;
      const password = await bcrypt.hash(newPassword, 10);
      console.log(password);
      const result = await UserModel.findByIdAndUpdate(id, {
        password: password,
      })
        .then((data) => res.json("Update successful"))
        .catch((error) => res.status(500).json("Server error"));
      console.log(result, "result");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteUser = (req, res) => {
    let id = req.params.id;
    console.log(id);
    UserModel.deleteOne({ _id: id })
      .then((data) => res.json("Delete successful"))
      .catch((err) => res.json("Server error"));
  };
}

module.exports = UserController;
