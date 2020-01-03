const express = require("express");
const fs = require("fs");
const url = require("url");

const app = express();
const hostName = "127.0.0.1";
let port = 8888;

//app.use(express.static(__dirname+"/src"));

app.get("*",(req,res) => {
    console.log("asking url : %s ",req.path);
    console.log("asking query : ",req.query);

    let filename = null;
    let pathname = url.parse(req.url).pathname;
      //当请求static文件夹时，设置文件返回类型是text/css
	let firstDir = pathname && pathname.split('/')[2];
	console.log(pathname);
	console.log(pathname.split('/'));
	let ContentType = null;
	// if (firstDir && firstDir === 'css') {
	// 	ContentType = {'Content-Type': 'text/css'};
	// } else {
	// 	ContentType = {'Content-Type': 'text/html'}
	// }
	if (req.path == "/") {
		filename = "./index.html"; //默认为index.html
		ContentType = {"Content-Type":"text/html"};
	}else {
		filename = "."+req.path;
		// ContentType = {"Content-Type":"text/plain"};
	}
	console.log("filename : ",filename);
    fs.readFile(filename,(err,data) => {
    	if (err) {
    		console.log(err);
    		res.send("something wrong with the file");
    	}else {
    		res.writeHead(200,ContentType)
    		res.write(data);
    	}
    	res.end();
    });
});

app.post("*",(req,res) => {
    let body = req.body;
    console.log("request parms : ",body);
    res.send("hey you sent a post request !");
});

app.listen(port,hostName,()=>{
    console.log("server is runing at %s:%s",hostName,port);
});
