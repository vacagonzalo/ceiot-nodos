const express = require('express');
const Device = require('../models/Device');
const Log = require('../models/Log');
const cache = require('../connection/cache');
const mqtt = require('../connection/broker');
const router = express.Router();

const TIME_TO_LIVE = process.env.TIME_TO_LIVE || 120;
const ASSISTANT = 1;
const ENGINEER = 2;

router.get('', verifyToken, async (req, res) => {
    try {
        let devices = await Device.find({}, { _id: 0, __v: 0 });
        if (!devices) {
            res.sendStatus(500);
        }
        res.send({ devices });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get('/:tag', verifyToken, async (req, res) => {
    try {
        let device = await Device.findOne({ tag: req.params.tag }, { _id: 0, __v: 0 });
        if (!device) {
            res.sendStatus(500);
        }
        res.send({ device });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.post('', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    if (reply >= ENGINEER) {
                        let body = req.body;
                        let dupplicated = await Device.findOne(
                            { $or: [{ serial: body.serial }, { tag: body.tag }] },
                            {}
                        );
                        if (dupplicated) {
                            res.sendStatus(403);
                            return;
                        } else {
                            let device = new Device({
                                serial: body.serial,
                                tag: body.tag,
                                modbus: body.modbus,
                                frec: body.frec,
                                unit: body.unit
                            });
                            mqtt.publish(`cmnd/${device.tag}/frec`, `${device.frec}`);
                            await device.save();
                            cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                            let log = new Log({
                                timestamp: new Date(),
                                endpoint: `POST:/devices`,
                                user: req.headers['user-agent'],
                                body: `${body.serial},${body.tag},${body.modbus},${body.frec},${body.unit}`
                            });
                            await log.save();
                            res.sendStatus(201);
                            return;
                        }
                    }
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    if (reply >= ENGINEER) {
                        const body = req.body;
                        const filter = { serial: body.serial };
                        const update = {
                            tag: body.tag,
                            modbus: body.modbus,
                            frec: body.frec,
                            unit: body.unit
                        }
                        await Device.findOneAndUpdate(filter, update);
                        let device = await Device.findOne(filter, { _id: 0, __v: 0 });
                        if (device) {
                            cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                            let log = new Log({
                                timestamp: new Date(),
                                endpoint: `PUT:/devices`,
                                user: req.headers['user-agent'],
                                body: `${body.tag},${body.modbus},${body.frec},${body.unit}`
                            });
                            await log.save();
                            res.status(200).send(device);
                            return;
                        } else {
                            res.sendStatus(403);
                            return;
                        }
                    }
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    if (reply >= ENGINEER) {
                        let deleted = await Device.findOneAndDelete({ tag: req.body.tag }, {});
                        if (deleted) {
                            cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                            let log = new Log({
                                timestamp: new Date(),
                                endpoint: `DELETE:/devices`,
                                user: req.headers['user-agent'],
                                body: `${body.tag}`
                            });
                            await log.save();
                            res.sendStatus(202);
                            return;
                        } else {
                            res.sendStatus(403);
                            return;
                        }
                    }
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

// middleware

function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            console.log('no auth in header');
            return res.sendStatus(401);
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            console.log('no auth null');

            return res.sendStatus(401);
        }
        cache.GET(token, async (error, reply) => {
            if (error) {
                console.log('cache error');
                return res.sendStatus(401);
            }
            if (!reply) {
                console.log('token not found in cache');
                return res.sendStatus(401);
            }
            cache.EXPIRE(token, TIME_TO_LIVE);
            next();
        });
    } catch (error) {
        console.log(`catch: ${error}`)
        return res.sendStatus(401);
    }
}

module.exports = router;