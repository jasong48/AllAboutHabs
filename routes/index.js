var express = require('express');
var router = express.Router();
var request = require('request');

const https = require('https')
const http = require('https')


var baseURL = 'https://statsapi.web.nhl.com'
const playerID = [];
const playerPhoto = [];
const playerTag = [];
const playerURL = [];
/* GET home page. */
router.get('/', function(req, res, next) {

    var url1 = baseURL + '/api/v1/teams/8/roster';

    var data; // The JSON
    var length; // Number of players

    // https://statsapi.web.nhl.com/api/v1/people/8474884/stats?stats=statsSingleSeason&season=20212022


    request(url1, function(err, response, body) {
        if (err || response.statusCode !== 200) {
            return res.sendStatus(500);
        }
        data = JSON.parse(body);
        length = Object.keys(data.roster).length;

        for (let i = 0; i < length; i++) {
            //console.log(data.roster[i].person.link);
            var n = data.roster[i].person.link.lastIndexOf('/');
            playerID.push(data.roster[i].person.link.substring(n + 1));
        }

        for (let i = 0; i < length; i++) {
            playerPhoto.push('http://nhl.bamcontent.com/images/headshots/current/168x168/' + playerID[i] + '.jpg');
        }

        for (let i = 0; i < length; i++) {
          playerTag.push(data.roster[i].person.link)
        }

        for (let i = 0; i < length; i++) 
        {
          playerURL.push('https://statsapi.web.nhl.com' +playerTag[i] + '/stats?stats=statsSingleSeason&season=20212022');
        }
        //console.log(playerURL);

        res.locals.playerURL = playerURL;
        res.locals.playerPhoto = playerPhoto;
        res.locals.fname = data.roster;
        res.locals.length = length;

       

    }); // end of first request

    

    request('https://statsapi.web.nhl.com/api/v1/people/'+playerTag[0] +'/stats?stats=statsSingleSeason&season=20212022', function(err, response, body) {
      if (err || response.statusCode !== 200) {
          return res.sendStatus(500);
      }
      data = JSON.parse(body);
            
        
      res.render('index', {
        playerPhoto:  res.locals.playerPhoto,
        fname: res.locals.fname,
        length: res.locals.length
    });
      




  }); // end of first request
    



});









router.get('/team', function(req, res, next) {

    var url = 'https://statsapi.web.nhl.com/api/v1/teams/8/stats';

    request(url, function(err, response, body) {
        if (err || response.statusCode !== 200) {
            return res.sendStatus(500);
        }
        data = JSON.parse(body);

        //console.log(data.stats[0].splits[0].stat);

        res.render('team', {
            gamesPlayed: data.stats[0].splits[0].stat.gamesPlayed,
            wins: data.stats[0].splits[0].stat.wins,
            loses: data.stats[0].splits[0].stat.losses,
            otloss: data.stats[0].splits[0].stat.ot,
            pts: data.stats[0].splits[0].stat.pts,
            ptPctg: data.stats[0].splits[0].stat.ptPctg,

            goalsPerGame: data.stats[0].splits[0].stat.goalsPerGame,
            goalsAgainstPerGame: data.stats[0].splits[0].stat.goalsAgainstPerGame,
            evGGARatio: data.stats[0].splits[0].stat.evGGARatio,
            powerPlayPercentage: data.stats[0].splits[0].stat.powerPlayPercentage,
            powerPlayGoals: data.stats[0].splits[0].stat.powerPlayGoals,
            powerPlayGoalsAgainst: data.stats[0].splits[0].stat.powerPlayGoalsAgainst,
            powerPlayOpportunities: data.stats[0].splits[0].stat.powerPlayOpportunities,
            penaltyKillPercentage: data.stats[0].splits[0].stat.penaltyKillPercentage,

            savePctg: data.stats[0].splits[0].stat.savePctg,
            shootingPctg: data.stats[0].splits[0].stat.shootingPctg,
            faceOffWinPercentage: data.stats[0].splits[0].stat.faceOffWinPercentage,
            faceOffsLost: data.stats[0].splits[0].stat.faceOffsLost,
            faceOffsWon: data.stats[0].splits[0].stat.faceOffsWon,
            faceOffsTaken: data.stats[0].splits[0].stat.faceOffsTaken,
            winOutshotByOpp: data.stats[0].splits[0].stat.winOutshotByOpp,
            winOutshootOpp: data.stats[0].splits[0].stat.winOutshootOpp,
            winLeadSecondPer: data.stats[0].splits[0].stat.winLeadSecondPer,
            winLeadFirstPer: data.stats[0].splits[0].stat.winLeadFirstPer,
            winOppScoreFirst: data.stats[0].splits[0].stat.winOppScoreFirst,
            winScoreFirst: data.stats[0].splits[0].stat.winScoreFirst,
            shotsAllowed: data.stats[0].splits[0].stat.shotsAllowed,
            shotsPerGame: data.stats[0].splits[0].stat.shotsPerGame

        });
    });
});



module.exports = router;