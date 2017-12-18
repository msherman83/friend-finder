// Required module
var path = require("path");


// Routes
module.exports = function(app) {
  
    // Survey route
    app.get("/survey", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
  
    // Default to the home route if nothing matches
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/home.html"));
    });
  };