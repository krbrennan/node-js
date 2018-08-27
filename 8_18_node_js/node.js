const http = require('http')

const fs = require("fs");
const path = require("path")
const mime = require("mime-types")

const hostName = 'localhost'
const port = 3000

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end("It's Working...")
// });

const server = http.createServer(function(request, response) {
  let filePath = false

  if(request.url == '/'){
    filePath = "./index.html"
  } else{
    filePath = "./" + request.url
  }

  let absPath = './' + filePath
  serverWorking(response, absPath)
}).listen(3000)

const send404 = (response) => {
  response.writeHead(404, {"Content-type" : "text/plain"})
  response.write("Error 404: File not found!")
  response.end()
}

const sendPage = (response, filePath, fileContents) => {
  response.writeHead(200, {"Content-Type" : mime.lookup(path.basename(filePath))})
  response.end(fileContents)
}

const serverWorking = (response, absPath) => {
  fs.exists(absPath, function(exists){
    if(exists){
      fs.readFile(absPath, function(err, data){
        if(err){
          send404(response)
        } else{
          sendPage(response, absPath, data)
        }
      });
    } else {
      send404(response)
    }
  });
}

server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}`)
});
