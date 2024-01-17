const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

server.listen("3001", () => {
    console.log("Ypursuit Socket Server is running on port 3001");
})