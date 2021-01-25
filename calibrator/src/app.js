const mqtt = require('./services/broker');
mqtt.subscribe('live');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const server = require('http').createServer(app);

const PORT = process.env.PORT || 9999;
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            client.send(data);
        });
    });
});

mqtt.on('message', (topic, payload) => {
    wss.clients.forEach(client => {
        let data = `${topic}:${payload}`;
        client.send(data);
    });
});

server.listen(PORT, () => { console.log(`lisening on port: ${PORT}`) });