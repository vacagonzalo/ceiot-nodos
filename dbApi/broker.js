const mqtt = require('mqtt');
const MQTT_HOST = process.env.MQTT_HOST || 'mqtt://mosquitto';
console.log(MQTT_HOST);
const mqttClient = mqtt.connect(MQTT_HOST);
mqttClient.once('connect', () => {
    console.log(`connected to ${MQTT_HOST}`);
});

module.exports = mqttClient;
