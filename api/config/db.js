const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/Notes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db is connected successfully"))
  .catch((err) => console.log(err.message));
