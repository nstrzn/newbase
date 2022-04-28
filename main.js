const res = require("express/lib/response");


const port = 3001,
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
    console.log(`Send a response : ${responseMessage}`);
});

app.on("request",(req,res)=>{
    res.writeHead(httpStatus.OK,{
        "Content-Type": "text/html"

    });

let  responseMessage =  "<h1> This  will show on tghe screen.</h1>";
res.end(responseMessage);
});
app.listen(port);
console.log(`The server has started and is listening on port number : ${port}`);

const getJSONString = obj =>{
    return JSON.stringify(oby, null, 2);
};
