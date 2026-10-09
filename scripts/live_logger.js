const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/log') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const time = new Date().toLocaleTimeString('fr-FR');
        const line = `[${time}] [${data.type}] ${data.text}\n`;
        fs.appendFileSync('debug_drive.log', line);
        console.log(line.trim());
      } catch (e) {}
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('alive');
  }
});

server.listen(8088, '0.0.0.0', () => {
  console.log('Live Drive Logger listening on http://0.0.0.0:8088/log');
});

