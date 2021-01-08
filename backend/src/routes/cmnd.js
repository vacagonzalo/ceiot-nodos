const express = require('express');
const router = express.Router();
const cache = require('../cache');
const mqtt = require('../broker');
const Log = require('../models/Log');
const TIME_TO_LIVE = process.env.TIME_TO_LIVE || 120;

const ENGINEER = 2;

router.get('/reset', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    if (reply >= ENGINEER) {
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        mqtt.publish(`cmnd/reset-all`, "reset");
                        let log = new Log({
                            timestamp: new Date(),
                            endpoint: 'GET:/cmnd/reset',
                            user: req.headers['user-agent'],
                            body: 'none'
                        });
                        await log.save();
                        res.sendStatus(200);
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
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/reset/:tag', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    if (reply >= ENGINEER) {
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        mqtt.publish(`cmnd/${req.params.tag}/reset`, "reset");
                        let log = new Log({
                            timestamp: new Date(),
                            endpoint: `GET:/cmnd/reset/${req.params.tag}`,
                            user: req.headers['user-agent'],
                            body: 'none'
                        });
                        await log.save();
                        res.sendStatus(200);
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
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/calibrate/:tag', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    if (reply >= ENGINEER) {
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        mqtt.publish(`cmnd/${req.params.tag}/calibrate`, "live");
                        let log = new Log({
                            timestamp: new Date(),
                            endpoint: `GET:/cmnd/calibrate/${req.params.tag}`,
                            user: req.headers['user-agent'],
                            body: 'none'
                        });
                        await log.save();
                        res.sendStatus(200);
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
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;
