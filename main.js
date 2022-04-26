const cities = require("cities");
var myCity = cities.zip_lookup("10016");
console.log(myCity);

const port = 3002,
http = require("http"),
httpStatus = require("http-status-codes"),
app = http.createServer((request, response)=>{ 
    console.log("Recieved an incoming request!");
    response .writeHead(httpSatus.OK,{
        "Content-Type": "text/html"
    });
    let responseMessage = "<h1>Hello, Universe!</h1>";
    response.write(responseMessage);
    response.end();
    console.log('Send a response : ${responseMessage}');
});

app.listen(port);
console.log('The server has started and is listening on port number: ${port}');
