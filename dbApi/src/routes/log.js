const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const cache = require('../cache');
const TIME_TO_LIVE = process.env.TIME_TO_LIVE || 120;
const ADMINISTRATOR = 3;

router.get('', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return
                }
                if (reply) {
                    if (reply == ADMINISTRATOR) {
                        let log = await Log.find();
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        res.status(200).send(log);
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