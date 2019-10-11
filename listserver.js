var http = require('http');
var url = require('url');
var fs = require('fs');

var indexFile = 'index.html';
var listFile = 'list.txt';
var port = 1337;

var errorHandler = function (err) {
  if (err) {
    console.log(err);
  }
}

var server = http.createServer(function (req, res) {
  var reqUrl = url.parse(req.url, true);
  console.log(req.method, req.url, reqUrl.pathname);

  if (req.method === 'GET' && reqUrl.pathname === '/list') {
    fs.readFile(listFile, (err, data) => {
      errorHandler(err);

      if (!err) {
        res.write(data);
        res.end();
      }
    });
  }

  if (req.method === 'GET' && reqUrl.pathname === '/') {

    if (reqUrl.query.yt !== undefined) {
      console.log('adding:', reqUrl.query.yt);

      fs.appendFile(listFile, reqUrl.query.yt + "\n", errorHandler);
    }

    fs.readFile(indexFile, function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
});

server.listen(port);
console.log('Listening on port ' + port);
