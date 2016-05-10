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
	fs.writeFile(path.resolve(`./data/letters/${req.params.id}.png`), base64Data, function(){}); 
	res.end();
});

module.exports = router;