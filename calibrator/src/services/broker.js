const mqtt = require('mqtt');
const MQTT_HOST = process.env.MQTT_HOST || 'mqtt://localhost';
const MQTT_USER = process.env.MQTT_USER || 'frontend';
const MQTT_PASSWORD = process.env.MQTT_PASSWORD || "human";
console.log(MQTT_HOST);
const mqttClient = mqtt.connect(MQTT_HOST, {
    username: MQTT_USER,
    password: MQTT_PASSWORD
});
mqttClient.once('connect', () => {
    console.log(`connected to ${MQTT_HOST}`);
});

module.exports = mqttClient;
