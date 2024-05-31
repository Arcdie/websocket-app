const fs = require('fs');
const https = require('https');
const express = require('express');
const { WebSocketServer } = require('ws');

const server = https.createServer({
  cert: fs.readFileSync('./certs/cert.pem', 'utf-8'),
  key: fs.readFileSync('./certs/privkey.pem', 'utf-8'),
  // port: 3002,
});

const app = express();
//const wss = new WebSocketServer({ server });
const wss = new WebSocketServer({ port: 3002 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

app.get('/', (req, res) => {
  res.sendFile('public/index.html', {root: __dirname })
});

app.listen(3000, () => {
  console.log(`App listening on port ${3000}`);
});
