const http = require('http')
const url = require('url');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
let filename = '';
let success = true;
const server = http.createServer((req,res)=>{
	let queryObject = url.parse(req.url, true).query;
	let fname = req.url === '/' ? 'index.html' : req.url; 
	let fpath = path.join(__dirname,'public', fname);
	const fext = path.extname(fpath);
	const notFoundPath = path.join(__dirname, 'public', '404.html');
	let content_type = 'text/html';
	switch(fext){
		case '.js':
			content_type = 'text/javascript'
			break;
		case '.css':
			content_type = 'text/css'
			break
	}
	if(!fext){
		fpath += '.html'
	}
	res.writeHead(200,{
		'Content-type': content_type
	})
	if(fs.existsSync(fpath)){
		fs.readFile(fpath, (err,data)=>{
			if(err){
				throw err;
			}
			res.end(data);
		})
	}else{
		fs.readFile(notFoundPath, (err,data)=>{
			if(err){
				throw err;
			}
			res.end(data);
		})
	}
})
server.listen(PORT, ()=>{
	console.log(`Server started at port ${PORT}`);
})