const express = require("express");
const bodyParser = require("body-parser");
const route = require("./src/routes/route");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
mongoose
  .connect(
    "mongodb+srv://kimmi_kumari:kimmi@cluster0.mfdc6.mongodb.net/HumanresourcePosition?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);
//invalid url
route.all("/*", function (req, res) {
  res.status(400).send({
    status: false,
    msg: "The api you request is not available!",
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
