const routeResponseMap = {
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Us</h1>",
    "/about": "<h1>Learn More About Us.</h1>",
    "/hello": "<h1>Say hello by emailing us here</h1>",
    "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
    };

if (routeResponseMap[req.url]) {
res.end(routeResponseMap[req.url]);
} else {
res.end("<h1>Welcome!</h1>");
}


const port = 3001,
http = require("http"),
httpStatus = require("http-status-codes"),
app = http.createServer((request, response) => {
console.log("Received an incoming request!");
response.writeHead(httpStatus.OK, {
"Content-Type": "text/html"
});

app.on("request", (req, res) => {
    res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
    });
    let responseMessage = "<h1>This will show on the screen.</h1>";
    res.end(responseMessage);
    });

app.on("request", (req, res) => {
var body = [];
req.on("data", (bodyData) => {
body.push(bodyData);
});
req.on("end", () => {
body = Buffer.concat(body).toString();
console.log(`Request Body Contents: ${body}`);
});
console.log(`Method: ${getJSONString(req.method)}`);
console.log(`URL: ${getJSONString(req.url)}`);
console.log(`Headers: ${getJSONString(req.headers)}`);

let responseMessage = "<h1>Hello, Universe!</h1>";
response.write(responseMessage);
response.end();
console.log(`Sent a response : ${responseMessage}`);
});
app.listen(port);
console.log(`The server has started and is listening on port number:
➥ ${port}`);

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};
