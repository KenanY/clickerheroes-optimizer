var static = require('node-static');
var http = require('http');

var port = process.argv[2] || 3000;
var file = new static.Server(__dirname + '/static');

http.createServer(function(req, res) {
  req.addListener('end', function() {
    file.serve(req, res);
  }).resume();
}).listen(port);