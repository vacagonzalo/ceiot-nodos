const mqtt = require('./services/broker');
mqtt.subscribe('live');

const PORT = process.env.PORT || 9999;
const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: PORT
});

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            console.log(data);
            client.send(data);
        });
    });
});

mqtt.on('message', (topic, payload) => {
    wss.clients.forEach(client => {
        let data = `${topic}:${payload}`;
        console.log(data);
        client.send(data);
    });
});