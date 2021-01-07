const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redis = require('redis');
const OPTIONS = {
    host: REDIS_HOST,
    port: REDIS_PORT
}
const client = redis.createClient(OPTIONS);
client.on('error', error => {
    console.log(`Redis client error: ${error}`);
});
client.once('connect', () => {
    console.log(`Redis client connected to ${REDIS_HOST}:${REDIS_PORT}`);
});

module.exports = client;