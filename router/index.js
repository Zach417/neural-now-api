var express = require('express');
var router = express.Router();

router.use(require('./routes/neuralnetwork'));

module.exports = router;
