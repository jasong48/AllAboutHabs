var express = require('express');
var router = express.Router();
var request = require('request');

const https = require('https')
const http = require('https')


/* GET team page. */
router.get('/team', function(req, res, next) {

  var url = 'https://statsapi.web.nhl.com/api/v1/teams/8/stats';

  var data2;
  var length;
  request(url, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      return res.sendStatus(500);
    }
    data = JSON.parse(body);

    console.log(data2);

    res.render('team', { fname : data.roster, length: length});
  });
});


module.exports = router;


