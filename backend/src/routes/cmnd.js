const express = require('express');
const mqtt = require('../connection/broker');
const router = express.Router();
const middleware = require('./middleware/middleware');

router.get('/reset',
    middleware.verifyToken,
    middleware.verifyRankEngineer,
    middleware.logRequest,
    (req, res) => {
        try {
            mqtt.publish(`cmnd/reset-all`, "reset");
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    });

router.get('/reset/:tag',
    middleware.verifyToken,
    middleware.verifyRankEngineer,
    middleware.logRequest,
    (req, res) => {
        try {
            mqtt.publish(`cmnd/${req.params.tag}/reset`, "reset");
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    });

router.get('/calibrate/:tag',
    middleware.verifyToken,
    middleware.verifyRankEngineer,
    middleware.logRequest,
    (req, res) => {
        try {
            mqtt.publish(`cmnd/${req.params.tag}/calibrate`, "live");
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    });

module.exports = router;