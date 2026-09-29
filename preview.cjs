const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'dist');
const server=http.createServer((req,res)=>{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.join(root,pathname==='/'?'index.html':pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return}res.setHeader('Content-Type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html; charset=utf-8');res.end(data)})});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
