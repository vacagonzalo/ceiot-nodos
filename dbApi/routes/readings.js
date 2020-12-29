const express = require('express');
const router = express.Router();
const Measurement = require('../models/Measurement');
const cache = require('../cache');

router.get('/all', (req, res) => {
    try {
        if(req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if(error) {
                    res.sendStatus(401);
                    return;
                }
                if(reply) {
                    let data = await Measurement.find({}, { _id: 0, __v: 0 });
                    res.status(200).send(data);
                    return;
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch {
        res.status(500).send("Error");
    }
});

router.get('/all/:device', (req, res) => {
    try {
        if(req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if(error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if(reply) {
                    let device = req.params.device;
                    let data = await Measurement.find(
                        { tag: device },
                        { _id: 0, __v: 0 });
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
        res.status(500).send(err);
    }
});

router.get('/year', (req, res) => {
    try {
        if(req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if(error) {
                    res.sendStatus(401);
                    return;
                }
                if(reply) {
                    let date = new Date();
                    date.setDate(date.getDate() - 365);
                    let data = await Measurement.find(
                        { date: { $gte: date } },
                        { _id: 0, __v: 0 });
                    res.status(200).send(data);
                    return;
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch {
        res.status(500).send("Error");
    }
});

router.get('/year/:device', (req, res) => {
    try {
        if(req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if(error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if(reply) {
                    let device = req.params.device;
                    let date = new Date();
                    date.setDate(date.getDate() - 365);
                    let data = await Measurement.find(
                        {
                            $and: [{ tag: device },
                            { date: { $gte: date } }]
                        },
                        { _id: 0, __v: 0 });
                    res.status(200).send(data);
                    return;
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch {
        res.status(500).send("Error");
    }
});

module.exports = router;