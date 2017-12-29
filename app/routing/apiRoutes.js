var friendsData = require("../data/friends.js");


module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    return res.json(friendsData);
  });


  app.post("/api/friends", function (req, res) {

    var bestFriend = {
      name: "",
      photo: "",
      friendDiff: 1000
    };

    console.log(friendsData)

    var surveyScores = req.body.scores;
    var totalDifference = 0;

    console.log("console logging scores " + req.body.scores);

    for (var i = 0; i < friendsData.length; i++) {

      // console.log("Input Data" + inputData);
      console.log("Input Scores" + surveyScores);
      console.log("total Diff" + totalDifference);
      totalDifference = 0;

      //Loop through the scores of each friend
      for (var j = 0; j < friendsData[i].scores[j]; j++) {
        //calculating the difference between each score and sum them into totalDifferenceerence
        totalDifference += Math.abs(parseInt(surveyScores[j]) - parseInt(friendsData[i].scores[j]));

        console.log("best friend " + bestFriend.friendDiff);
        //Find best friend match
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