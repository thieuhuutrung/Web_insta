var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 8080;

var server = http.createServer(function (req, res) {
  // console.log(req.headers);

  // res.writeHead(200,{'Content-Type':'text/html'});
  // res.end('<h1>Hello World</h1>');
  console.log('Request for ' + req.url + ' by method ' + req.method);
  if (req.method == 'GET') {
    var fileUrl = req.url == "/" ? '/index.html' : req.url; //construct fileUrl

    //then construct absolute file Path
    var filePath = path.resolve('./public' + fileUrl);

    //check if the extension is html
    var fileExt = path.extname(filePath);
    if (fileExt == '.html') {
      //check if file is exist
      fs.exists(filePath, function (exists) {
        if (!exists) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>Error 404: ' + fileUrl + ' is not found</h1>');
          return;
        } 
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>Error 404: ' + fileUrl + ' is not a HTML file</h1>');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Error 404: Method ' + req.method + ' is not supported</h1>');
  }
});

server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}`);
});