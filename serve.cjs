const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ttf':'font/ttf','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const port = Number(process.env.VINCE_PREVIEW_PORT || 4317);
const server = http.createServer((req,res) => {
  let pathname;
  try {pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);} catch {res.writeHead(400).end();return;}
  const target = path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
  if(target!==root && !target.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.stat(target,(error,stat)=>{
    if(error || !stat.isFile()){res.writeHead(404).end('Not found');return;}
    res.writeHead(200,{'Content-Type':mime[path.extname(target)] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    fs.createReadStream(target).pipe(res);
  });
});
server.listen(port,'127.0.0.1',()=>console.log(`Vince preview: http://127.0.0.1:${port}/ (PID ${process.pid})`));
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
