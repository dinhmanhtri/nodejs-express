const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("router 1 user GET");
});

router.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.headers);
  res.json("router 1 user POST " + req.body.name + " " + req.headers["status"]);
});

router.put("/", (req, res) => {
  res.json("router 1 user PUT");
});

router.delete("/", (req, res) => {
  res.json("router 1 user DELETE");
});

module.exports = router;
