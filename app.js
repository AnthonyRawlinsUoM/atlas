const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const socketIO = require('socket.io');
const redisAdapter = require('socket.io-redis');

const app = express();
const uuidv4 = require('uuid/v4');
const moment = require('moment');

app.use(express.static(path.join(__dirname, 'dist/ReactiveServer/')));

app.use(function (req, res, next) {
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/ReactiveServer/index.html'))
});

const port = process.env.PORT || '5050';
app.set('port', port);



const server = http.createServer(app);

const io = socketIO(server);
io.adapter(redisAdapter({
  host: 'localhost',
  port: 6379
}));

const sioc = require('socket.io-client');


server.listen(port, () => {
  console.log('ReactiveServer Server running on', port);
});