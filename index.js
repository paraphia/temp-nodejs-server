const http = require('http')
const url = require('url');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
let filename = '';
let success = true;
const server = http.createServer((req,res)=>{
	// GET параметры 
	let queryObject = url.parse(req.url, true).query;
	//Если запрашиваемый url = / то это главная иначе присваиваем url, далее прибавим .html
	let fname = req.url === '/' ? 'index.html' : req.url; 
	//Формируем абсолютный путь к запрашиваемому файлу
	let fpath = path.join(__dirname,'public', fname);
	//Расширение файла
	const fext = path.extname(fpath);
	//Путь к странице 404
	const notFoundPath = path.join(__dirname, 'public', '404.html');
	// Дефолтный контент тайп
	let content_type = 'text/html';
	// Меняем Content-Type в соответствии с расширением файла
	switch(fext){
		case '.js':
			content_type = 'text/javascript'
			break;
		case '.css':
			content_type = 'text/css'
			break
	}
	//Если нету расширения, например /about то прибавляем.html
	if(!fext){
		fpath += '.html'
	}
	res.writeHead(200,{
		'Content-type': content_type
	})
	//Если запрашиваемый файл существует
	if(fs.existsSync(fpath)){
		//Читаем данные и отправляем файл
		fs.readFile(fpath, (err,data)=>{
			if(err){
				throw err;
			}
			res.end(data);
		})
	}else{
		//Если нет запрашиваемого файла то выводим 404 страницу
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