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
