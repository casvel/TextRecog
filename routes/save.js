var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var fs   = require("fs");

var router = express.Router();

router.use(bodyParser.json());

router.route('/letter/:id')

.all(function(req, res, next) 
{
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
})

.post(function(req, res, next)
{
	var base64Data = new Buffer(req.body.image.replace(/^data:image\/(png|gif|jpeg);base64,/,''), "base64");
	var randomId = guid();
	fs.writeFile(path.resolve(`./data/letters/${req.params.id}/${req.params.id}-`+ randomId +`.png`), base64Data, function(){}); 
	res.end();
});

module.exports = router;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}