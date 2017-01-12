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
  input: layerSchema,
  hidden: [layerSchema],
  output: layerSchema,
  weights: [mongoose.Schema.Types.Mixed],
});

module.exports = restful.model('neuralnetwork', schema);
