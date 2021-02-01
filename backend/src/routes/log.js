const express = require('express');
const Log = require('../models/Log');
const router = express.Router();
const middleware = require('./middleware/middleware');

router.get('',
    middleware.verifyToken,
    middleware.verifyRankAdministrator,
    async (req, res) => {
        try {
            let logs = await Log.find();
            res.status(200).send({ logs });
        } catch (error) {
            res.sendStatus(500);
        }
    });

module.exports = router;