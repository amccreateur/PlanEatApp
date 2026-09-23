const http = require('http');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'debug_drive.log');
const PORT = 8088;

// Clear or init log file
fs.writeFileSync(LOG_FILE, `=== PlanEat Drive Live Logger Started at ${new Date().toISOString()} ===\n`, 'utf8');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/log') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const timestamp = new Date().toLocaleTimeString('fr-FR');
        const line = `[${timestamp}] [${data.type || 'INFO'}] ${data.text || data.data || JSON.stringify(data)}\n`;
        fs.appendFileSync(LOG_FILE, line, 'utf8');
        console.log(line.trim());
      } catch (e) {
        fs.appendFileSync(LOG_FILE, `[RAW] ${body}\n`, 'utf8');
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
    });
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('PlanEat Log Server Active');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[LogServer] Listening on http://0.0.0.0:${PORT} -> saving to ${LOG_FILE}`);
});
