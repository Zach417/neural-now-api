var restful = require('node-restful');
var mongoose = restful.mongoose;

var layerSchema = new mongoose.Schema({
  size: Number,
  activation: String,
});

var schema = new mongoose.Schema({
	name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: String,
  input: layerSchema,
  hidden: [layerSchema],
  output: layerSchema,
  weights: [mongoose.Schema.Types.Mixed],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    unique: false,
    dropDups: false,
  },
  createdOn: Date,
  modifiedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    unique: false,
    dropDups: false,
  },
  modifiedOn: Date,
});

module.exports = restful.model('neuralnetwork', schema);
