const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router1 = require("./apiRouter");
app.use("/admin/api/v1", router1);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

