const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/warbler", {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}); //setting up database and connecting it

module.exports.User = require("./user");
module.exports.Message = require("./message");
