const fs = require('fs');
const express = require('express');
const { WebSocketServer } = require('ws');

const server = https.createServer({
  cert: fs.readFileSync('./certs/cert.pem'),
  key: fs.readFileSync('./certs/privkey.pem'),
  port: 3002,
});

const app = express();
const wss = new WebSocketServer(server);

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log(`App listening on port ${3000}`);
});
