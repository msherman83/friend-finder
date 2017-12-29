var friendsData = require("../data/friends.js");


module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    return res.json(friendsData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware

    var bestFriend = {
      name: "",
      photo: "",
      friendDiff: 1000
    };

    console.log(friendsData)

    var inputData = req.body;
    var inputScores = req.body.scores;
    var totalDiff = 0;

    console.log("console logging scores " + req.body.scores);

    for (var i = 0; i < friendsData.length; i++) {

      // console.log("Input Data" + inputData);
      console.log("Input Scores" + inputScores);
      console.log("total Diff" + totalDiff);
      totalDiff = 0;

      //Loop through the scores of each friend
      for (var j = 0; j < friendsData[i].scores[j]; j++) {
          //calculating the difference between each score and sum them into totalDifference
          totalDiff += Math.abs(parseInt(inputScores[j]) - parseInt(friendsData[i].scores[j]));

          console.log("best friend " + bestFriend.friendDiff);
          //Find best friend match
          if (totalDiff <= bestFriend.friendDiff) {

              bestFriend.name = friendsData[i].name;
              bestFriend.photo = friendsData[i].photo;
              bestFriend.friendDiff = totalDiff;

          }
      }
  }


  //Pushing new friend to friends API
  friendsData.push(inputData);

  res.json(bestFriend);
  });

  //   if (friendsData.length) {
  //     friendsData.push(req.body);
  //   } else {
  //     console.log("Nothing to push!");
  //     console.log(friendsData)
  //   }
  // });

  // app.post("/data/friendsData", function (req, res) {
  //   // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
  //   // It will do this by sending out the value "true" have a table
  //   // req.body is available since we're using the body-parser middleware
  //   if (friendsData.length) {
  //     friendsData.push(req.body);
  //   } else {
  //     console.log("Nothing to push!");
  //     console.log(friendsData)
  //   }
  // });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function() {
  //   // Empty out the arrays of data
  //   friendsData = [];

  //   console.log(friendsData);
  // });
};