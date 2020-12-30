const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const cache = require('../cache');
const mqtt = require('../broker');
const TIME_TO_LIVE = process.env.TIME_TO_LIVE || 120;

router.get('', (req, res) => {
    try {
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                    let data = await Device.find({}, { _id: 0, __v: 0 });
                    res.status(200).send(data);
                    return;
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get('/:tag', (req, res) => {
    try {
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    let device = await Device.findOne(
                        { tag: req.params.tag },
                        { _id: 0, __v: 0 }
                    );
                    if (device) {
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        res.status(200).send(device);
                        return;
                    } else {
                        res.sendStatus(204);
                    }
                    return;
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {

    }
});

router.post('', (req, res) => {
    try {
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
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
                        mqtt.publish(`config/${device.tag}`, `${device.frec}`);
                        await device.save();
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        res.sendStatus(201);
                        return;
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
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
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
                        res.status(200).send(device);
                        return;
                    } else {
                        res.sendStatus(403);
                        return;
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
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    let deleted = await Device.findOneAndDelete({ tag: req.body.tag }, {});
                    if (deleted) {
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        res.sendStatus(202);
                        return;
                    } else {
                        res.sendStatus(403);
                        return;
                    }
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {

    }
});

module.exports = router;