var express = require('express');
var router = express.Router();
var request = require('request');

const https = require('https')
const http = require('https')


var baseURL = 'https://statsapi.web.nhl.com'
const playerURL = [];
/* GET home page. */
router.get('/', function(req, res, next) {

  var url1 = baseURL + '/api/v1/teams/8/roster';


  var data;
  var length;

  const playerTag = []
  
  var playerGoals = []

 // https://statsapi.web.nhl.com/api/v1/people/8474884/stats?stats=statsSingleSeason&season=20212022






  request(url1, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      return res.sendStatus(500);
    }
    data = JSON.parse(body);

    

    length = Object.keys(data.roster).length;

    console.log(data.roster[1].person.link);


    for (let i = 0; i < length; i++) 
    {
      playerTag.push(data.roster[i].person.link)
    }
    //console.log(playerTag)

    for (let i = 0; i < length; i++) 
    {
      playerURL.push('https://statsapi.web.nhl.com' +playerTag[i] + '/stats?stats=statsSingleSeason&season=20212022');
    
    
    }
    console.log(playerURL)
    var ndata;


    for (var i = 0; i < 28; i++)
    {
       apicall(playerURL[i]);
    }

   function apicall(url){
    request(url, function (err, response, body) {
      if (err || response.statusCode !== 200) {
        return res.sendStatus(500);
      }
      playerGoals.push(JSON.parse(body));

     


      
      
    }); // end of second request
    //console.log(playerGoals)


  }
  console.log(playerGoals)
  res.render('index', { fname : data.roster, length: length, playerGoals: playerGoals});

    
    
  }); // end of first request


 
});






















router.get('/team', function(req, res, next) {

  var url = 'https://statsapi.web.nhl.com/api/v1/teams/8/stats';

  request(url, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      return res.sendStatus(500);
    }
    data = JSON.parse(body);

    console.log(data.stats[0].splits[0].stat);

    res.render('team', 
    { gamesPlayed : data.stats[0].splits[0].stat.gamesPlayed,
      wins : data.stats[0].splits[0].stat.wins,
      loses : data.stats[0].splits[0].stat.losses,
      otloss : data.stats[0].splits[0].stat.ot,
      pts : data.stats[0].splits[0].stat.wins,
      ptPctg : data.stats[0].splits[0].stat.ptPctg,

      goalsPerGame : data.stats[0].splits[0].stat.goalsPerGame,
      goalsAgainstPerGame : data.stats[0].splits[0].stat.goalsAgainstPerGame,
      evGGARatio : data.stats[0].splits[0].stat.evGGARatio,
      powerPlayPercentage : data.stats[0].splits[0].stat.powerPlayPercentage,
      powerPlayGoals : data.stats[0].splits[0].stat.powerPlayGoals,
      powerPlayGoalsAgainst : data.stats[0].splits[0].stat.powerPlayGoalsAgainst,
      powerPlayOpportunities : data.stats[0].splits[0].stat.powerPlayOpportunities,
      penaltyKillPercentage : data.stats[0].splits[0].stat.penaltyKillPercentage,

      savePctg : data.stats[0].splits[0].stat.savePctg,
      shootingPctg : data.stats[0].splits[0].stat.shootingPctg,
      faceOffWinPercentage : data.stats[0].splits[0].stat.faceOffWinPercentage,
      faceOffsLost : data.stats[0].splits[0].stat.faceOffsLost,
      faceOffsWon : data.stats[0].splits[0].stat.faceOffsWon,
      faceOffsTaken : data.stats[0].splits[0].stat.faceOffsTaken,
      winOutshotByOpp : data.stats[0].splits[0].stat.winOutshotByOpp,
      winOutshootOpp : data.stats[0].splits[0].stat.winOutshootOpp,
      winLeadSecondPer : data.stats[0].splits[0].stat.winLeadSecondPer,
      winLeadFirstPer : data.stats[0].splits[0].stat.winLeadFirstPer,
      winOppScoreFirst : data.stats[0].splits[0].stat.winOppScoreFirst,
      winScoreFirst : data.stats[0].splits[0].stat.winScoreFirst,
      shotsAllowed : data.stats[0].splits[0].stat.shotsAllowed,
      shotsPerGame : data.stats[0].splits[0].stat.shotsPerGame

    });
  });
});



module.exports = router;


