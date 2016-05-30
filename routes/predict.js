var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var fs   = require("fs");

var router = express.Router();

router.use(bodyParser.json());

router.route("/")

.all(function(req, res, next) 
{
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  next();
})

.post(function(req, res, next)
{
	var base64Data = new Buffer(req.body.image.replace(/^data:image\/(png|gif|jpeg);base64,/,''), "base64");
	var folder = path.resolve("./data/test");

	fs.exists(folder, function(exists)
	{
		if (!exists)
			fs.mkdirSync(folder);

		fs.writeFile(path.resolve(folder+"/text.png"), base64Data, function(){});
	});

	var spawn = require("child_process").spawn;
	var py    = spawn("python", ["python/predict.py"]);

	py.stdout.on("data", function(data)
	{
		var str = data.toString();
		var predictions = []
		str.split(' ').forEach(function(x){ predictions.push(parseInt(x)) });
		console.log(predictions);
	});

	res.end();
});

module.exports = router;