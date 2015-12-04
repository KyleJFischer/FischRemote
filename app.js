var http = require('http'),
  fs = require('fs');
var path = "D:\\RemoteStuff"

var os = require('os');

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}


http.createServer(function(request, response) {
  response.writeHeader(200, {
    "Content-Type": "text/html"
  });
  console.log(request.url)
  var change = 0;
  if (request.url.length > 1 && request.url != "/favicon.ico") {
    launchFile(path + request.url)

    change = 1;
  }
  request.url = "\\"
  var string = "<!DOCTYPE html>"
  string += "<body><center>"
  string += "<h1>Fisch's Remote</h1>"

  var items = ""


  fs.readdir(path, function(err, items) {
    for (var i = 0; i < items.length; i++) {
      string += '<p><a href="/'

      string += (items[i]);
      string += '">'
      string += (items[i]);
      string += "</a></p>"
        //string += "<h1>" + items[i] + "</h1>"
    }
    string += "</center></body>"

      response.write(string);


    response.end();

  });
}).listen(8000);


function launchFile(string) {
  var spawn = require("child_process").spawn,
    child;
  child = spawn("powershell.exe", [string]);
  child.stdout.on("data", function(data) {
    console.log("Powershell Data: " + data);
  });
  child.stderr.on("data", function(data) {
    console.log("Powershell Errors: " + data);
  });
  child.on("exit", function() {
    console.log("Powershell Script finished");
  });
  child.stdin.end(); //end input
}
