const express = require('express');
const http = require('http');
const app = express();
const router = require('./router.js');

router(app);

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on ${port}`);