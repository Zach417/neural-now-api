var restful = require('node-restful');
var mongoose = restful.mongoose;

var paperSchema = new mongoose.Schema({
  name: String,
  url: String,
});

var authorSchema = new mongoose.Schema({
  name: String,
  url: String,
});

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
  type: String,
  description: String,

  authors: [authorSchema],
  paper: paperSchema,
  date: String,
  abstract: String,
  github: String,
  files: [String],

  inputType: String,
  inputSize: [Number],
  inputNormalized: Boolean,
  codeExample: String,
  outputDescription: String,
  outputClasses: [String],
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
