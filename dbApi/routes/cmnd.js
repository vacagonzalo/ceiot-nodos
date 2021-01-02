const express = require('express');
const router = express.Router();
const cache = require('../cache');
const mqtt = require('../broker');
const TIME_TO_LIVE = process.env.TIME_TO_LIVE || 120;

router.get('/reset', (req, res) => {
    try {
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, (error, reply) => {
                if (error) {
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                    mqtt.publish(`cmnd/reset-all`, "reset");
                    res.sendStatus(200);
                    return;
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
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, (error, reply) => {
                if (error) {
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                    mqtt.publish(`cmnd/${req.params.tag}`, "reset");
                    res.sendStatus(200);
                    return;
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
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, (error, reply) => {
                if (error) {
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                    mqtt.publish(`cmnd/${req.params.tag}`, "live");
                    res.sendStatus(200);
                    return;
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