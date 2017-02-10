var NeuralNetwork = require('../../models/neuralnetwork');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Neural Network Schema",
  "type": "object",
  "properties": {
    "_id": { "type": "string" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "type": { "type": "string" },
    "inputType": { "type": "string" },
    "inputSize": {
      "type": "array",
      "items": { "type": "number" },
    },
    "inputNormalized": { "type": "boolean" },
    "codeExample": { "type": "string" },
    "outputDescription": { "type": "string" },
    "outputClasses": {
      "type": "array",
      "items": { "type": "string" },
    },
    "layers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "layer_type": { "type": "string" },
          "num_inputs": { "type": "number" },
          "sx": { "type": "number" },
          "sy": { "type": "number" },
          "in_depth": { "type": "number" },
          "out_depth": { "type": "number" },
          "out_sx": { "type": "number" },
          "out_sy": { "type": "number" },
          "l1_decay_mul": { "type": "number" },
          "l2_decay_mul": { "type": "number" },
          "pad": { "type": "number" },
          "stride": { "type": "number" },
          "filters": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "sx": { "type": "number" },
                "sy": { "type": "number" },
                "depth": { "type": "number" },
                "w": { "type": "mixed" },
              },
            },
          },
          "biases": {
            "type": "object",
            "properties": {
              "sx": { "type": "number" },
              "sy": { "type": "number" },
              "depth": { "type": "number" },
              "w": { "type": "mixed" },
            },
          },
        },
      },
    },
    "createdBy": { "type": "string" },
    "createdOn": { "type": "date" },
    "modifiedBy": { "type": "string" },
    "modifiedOn": { "type": "date" },
  },
}

var writeFilterSchema = {
  "title": "Neural Network Schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "description": { "type": "string" },
    "type": { "type": "string" },
    "inputType": { "type": "string" },
    "inputSize": {
      "type": "array",
      "items": { "type": "number" },
    },
    "inputNormalized": { "type": "boolean" },
    "codeExample": { "type": "string" },
    "outputDescription": { "type": "string" },
    "outputClasses": {
      "type": "array",
      "items": { "type": "string" },
    },
    "layers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "layer_type": { "type": "string" },
          "num_inputs": { "type": "number" },
          "sx": { "type": "number" },
          "sy": { "type": "number" },
          "in_depth": { "type": "number" },
          "out_depth": { "type": "number" },
          "out_sx": { "type": "number" },
          "out_sy": { "type": "number" },
          "l1_decay_mul": { "type": "number" },
          "l2_decay_mul": { "type": "number" },
          "pad": { "type": "number" },
          "stride": { "type": "number" },
          "filters": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "sx": { "type": "number" },
                "sy": { "type": "number" },
                "depth": { "type": "number" },
                "w": { "type": "mixed" },
              },
            },
          },
          "biases": {
            "type": "object",
            "properties": {
              "sx": { "type": "number" },
              "sy": { "type": "number" },
              "depth": { "type": "number" },
              "w": { "type": "mixed" },
            },
          },
        },
      },
    },
  }
}

function findOne(user, id, callback) {
  NeuralNetwork
    .findOne({
      "name": id
    })
    .exec(function(err, result) {
      return callback(result);
    });
}

function findMany(user, callback) {
  NeuralNetwork
    .find()
    .sort([
      ['name', 'ascending']
    ])
    .exec(function(err, result) {
      return callback(result);
    });
}

module.exports = new RestFilter({
  path: "/neuralnetwork",
  model: NeuralNetwork,
  readFilterSchema: readFilterSchema,
  writeFilterSchema: writeFilterSchema,
  findOne: findOne,
  findMany: findMany,
  securityRoles: {
    create: UserSecurity.isActiveUser,
    read: UserSecurity.isAllowed,
    update: UserSecurity.isAllowed,
    destroy: UserSecurity.isActiveUser,
  }
});
