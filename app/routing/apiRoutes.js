var friendsData = require("../data/friends.js");


module.exports = function (app) {

  // Grabs friendsData
  app.get("/api/friends", function (req, res) {
    return res.json(friendsData);
  });


  app.post("/api/friends", function (req, res) {

    var bestFriend = {
      name: "",
      photo: "",
      friendDiff: 1000
    };

    // Create a variable of all of the scores of the friends.
    var surveyScores = req.body.scores;

    // Loop through friendData array
    for (var i = 0; i < friendsData.length; i++) {

      totalDifference = 0;

      // Loop through each friends score.
      for (var index = 0; index < friendsData[i].scores[index]; index++) {
        // Create a variable of totalDifference and get the difference between the user input score and the existing scores.
        totalDifference = totalDifference + Math.abs(parseInt(surveyScores[index]) - parseInt(friendsData[i].scores[index]));

        // Figure out best friend match
        if (totalDifference <= bestFriend.friendDiff) {

          bestFriend.name = friendsData[i].name;
          bestFriend.photo = friendsData[i].photo;
          bestFriend.friendDiff = totalDifference;

        }
      }
    }


    // push new friend to /api/friends
    friendsData.push(req.body);

    res.json(bestFriend);
  });

};