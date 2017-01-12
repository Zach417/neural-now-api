var NeuralNetwork = require('../../models/neuralnetwork');
var RestFilter = require('../../components/RestFilter');
var UserSecurity = require('../security');

var readFilterSchema = {
  "title": "Neural Network Schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "input": {
      "type": "object",
      "properties": {
        "size": { "type": "string" },
        "activation": { "type": "number" },
      },
    },
    "hidden": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "size": { "type": "string" },
          "activation": { "type": "number" },
        },
      },
    },
    "output": {
      "type": "object",
      "properties": {
        "size": { "type": "string" },
        "activation": { "type": "number" },
      },
    },
    "weights": {
      "type": "array",
      "items": {
        "type": "array",
        "items": {
          "type": "array",
          "items": {
            "type": "number",
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
    "input": {
      "type": "object",
      "properties": {
        "size": { "type": "string" },
        "activation": { "type": "number" },
      },
    },
    "hidden": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "size": { "type": "string" },
          "activation": { "type": "number" },
        },
      },
    },
    "output": {
      "type": "object",
      "properties": {
        "size": { "type": "string" },
        "activation": { "type": "number" },
      },
    },
    "weights": {
      "type": "array",
      "items": {
        "type": "array",
        "items": {
          "type": "array",
          "items": {
            "type": "number",
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
      console.log(result);
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
    create: UserSecurity.isNotAllowed,
    read: UserSecurity.isAllowed,
    update: UserSecurity.isNotAllowed,
    destroy: UserSecurity.isNotAllowed,
  }
});
