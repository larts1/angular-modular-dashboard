var request = require('../node_modules/request/index.js');
var http = require("http");
const fs = require('fs');

var express = require('express');
var server = express();

var token;
var myJSONObject = { apiKey : "F2023E1687010D5E" };
request({
    url: "https://api.thetvdb.com/login",
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
    token = body.token;
    console.log(body);
});

function getToken() {
  request({
      url: "https://api.thetvdb.com/login",
      method: "POST",
      json: true,   // <--Very important!!!
      body: myJSONObject
  }, function (error, response, body){
      token = body.token;
      console.log(body);
  });
}

//uusi API-avain 22h välein
var timer = setTimeout(getToken, 1000*60*60*22);

var showData = { }

server.get('/token', function(req,res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
  });

  res.end(token)
})

server.get('/airdate/:show/:episode', function(req,res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
  });

  if (! (req.params.show in showData) ) showData[req.params.show] = {};

  if (req.params.episode in showData[req.params.show]) res.end(showData[req.params.show][req.params.episode]);
    else {
      request({
          url: "https://api.thetvdb.com/series/"+req.params.show+'/episodes/query?absoluteNumber='+req.params.episode,
          method: "GET",
          json: true,
          headers: {
            'Authorization': 'Bearer ' + token,
          }
      }, function (error, response, body){
        try {
          showData[req.params.show][req.params.episode] = body.data[0].firstAired;
          console.log("Retriewed airdate");
          res.end(body.data[0].firstAired)
        }catch(err) {
          console.log(response)
          console.log(err)
        }
      });
    }
})

server.get('/sleepTracker/:time', function(req,res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
  });

  fs.appendFile('sleep.csv', req.params.time, (err) => {
    if (err) throw err;
    console.log('The '+req.params.time+' was appended to file!');
  });

  res.end("ty")
});

server.get('/tasker/:task', function(req,res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
  });

  fs.appendFile('tasks.csv', req.params.task, (err) => {
    if (err) throw err;
    console.log('The '+req.params.task+' was appended to file!');
  });

  res.end("ty")
});

server.listen(8888);
