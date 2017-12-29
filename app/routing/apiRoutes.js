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


    var surveyScores = req.body.scores;

    for (var i = 0; i < friendsData.length; i++) {

      totalDifference = 0;

      //Loop through the scores of each friend
      for (var index = 0; index < friendsData[i].scores[index]; index++) {
        //calculating the difference between each score and sum them into totalDifferenceerence
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