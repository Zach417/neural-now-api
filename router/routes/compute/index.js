var http = require('http');
var request = require('request');
var express = require('express');
var router = express.Router();

function getOptions (id) {
  var options = {};
  options.host = "172.31.41.31";
  options.port = 80;
  options.path = "/" + id;

  if (process.env.NODE_ENV === "development") {
    options.host = "54.244.82.249";
  }

  return options;
}

router.get('/compute/:id', function (req, res) {
  var options = getOptions(req.params.id);
  var query = req.url.split("?");
  if (query.length > 1) {
    options.path += "?" + query[1];
  }

  http.get(options, function (resp) {
    var chunks = "";
    resp.on('data', function (chunk) {
      chunks += chunk;
    });
    resp.on('end', function () {
      res.json(JSON.parse(chunks));
    });
  });
});

router.post('/compute/:id', function (req, res) {
  var options = getOptions(req.params.id);
  request({
    url: "http://" + options.host + "/compute/" + req.params.id,
    method: "POST",
    json: req.body,
  }, function (err, message, response) {
    if (err) {
      res.json({"error": response});
    } else {
      res.json(response);
    }
  });
});

module.exports = router;
