var restful = require('node-restful');
var mongoose = restful.mongoose;

var filterSchema = new mongoose.Schema({
  sx: Number,
  sy: Number,
  depth: Number,
  w: mongoose.Schema.Types.Mixed,
});

var layerSchema = new mongoose.Schema({
  layer_type: String,
  num_inputs: Number,
  sx: Number,
  sy: Number,
  in_depth: Number,
  out_depth: Number,
  out_sx: Number,
  out_sy: Number,
  l1_decay_mul: Number,
  l2_decay_mul: Number,
  pad: Number,
  stride: Number,
  filters: [filterSchema],
  biases: filterSchema,
});

var schema = new mongoose.Schema({
	name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: String,
  inputType: String,
  outputDescription: String,
  codeExample: String,
  layers: [layerSchema],
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
