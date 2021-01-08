const mqtt = require('mqtt');
const MQTT_HOST = process.env.MQTT_HOST || 'mqtt://mosquitto';
const MQTT_USER = process.env.MQTT_USER || 'docker';
const MQTT_PASSWORD = process.env.MQTT_PASSWORD || "container";
console.log(MQTT_HOST);
const mqttClient = mqtt.connect(MQTT_HOST, {
    username: MQTT_USER,
    password: "container"
});
mqttClient.once('connect', () => {
    console.log(`connected to ${MQTT_HOST}`);
});

module.exports = mqttClient;
