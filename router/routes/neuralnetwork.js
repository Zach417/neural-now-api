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
    "input": {
      "type": "object",
      "properties": {
        "size": { "type": "number" },
        "activation": { "type": "string" },
      },
    },
    "hidden": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "size": { "type": "number" },
          "activation": { "type": "string" },
        },
      },
    },
    "output": {
      "type": "object",
      "properties": {
        "size": { "type": "number" },
        "activation": { "type": "string" },
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
    "name": { "type": "string" },
    "description": { "type": "string" },
    "input": {
      "type": "object",
      "properties": {
        "size": { "type": "number" },
        "activation": { "type": "string" },
      },
    },
    "hidden": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "size": { "type": "number" },
          "activation": { "type": "string" },
        },
      },
    },
    "output": {
      "type": "object",
      "properties": {
        "size": { "type": "number" },
        "activation": { "type": "string" },
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
