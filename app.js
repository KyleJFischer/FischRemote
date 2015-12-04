var http = require('http'),
  fs = require('fs');
var path = "D:\\FRemote\\FischRemote\\FilesInRemote" //Change this line

http.createServer(function(request, response) {
  response.writeHeader(200, {
    "Content-Type": "text/html"
  });
  console.log(request.url)

  if (request.url.length > 1 && request.url != "/favicon.ico") {
    launchFile(path + request.url)
  }
  request.url = "\\"
  var string = "<!DOCTYPE html>"
  string += "<body><center>"
  string += "<h1>Fisch's Remote</h1>"//Give a Custom Name

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
  child.on("exit", function() {
    console.log("Launched");
  });
  child.stdin.end(); //end input
}
