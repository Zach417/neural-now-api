var http = require('http');
var request = require('request');
var express = require('express');
var router = express.Router();
var NeuralNetwork = require('../../../models/neuralnetwork');

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
  NeuralNetwork
    .findOne({
      "name": req.params.id
    })
    .exec(function(err, result) {
      body = {};
      body.input = req.body;
      body.type = result.inputType;
      body.shape = result.inputSize;

      request({
        url: "http://" + options.host + "/compute/" + req.params.id,
        method: "POST",
        json: body,
      }, function (err, message, response) {
        if (err) {
          res.json({"error": response});
        } else {
          res.json(response);
        }
      });
    });
});

module.exports = router;
