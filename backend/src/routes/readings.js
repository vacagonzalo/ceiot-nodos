const express = require('express');
const Measurement = require('../models/Measurement');
const router = express.Router();
const middleware = require('./middleware/middleware');

router.get('/all',
    middleware.verifyToken,
    middleware.verifyRankAssistant,
    async (req, res) => {
        try {
            let readings = await Measurement.find({}, { _id: 0, __v: 0 });
            res.status(200).send({ readings });
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });

router.get('/all/:device',
    middleware.verifyToken,
    middleware.verifyRankAssistant,
    async (req, res) => {
        try {
            let readings = await Measurement.find(
                { tag: req.params.device },
                { _id: 0, __v: 0 }
            );
            res.status(200).send({ readings });
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });

router.get('/year',
    middleware.verifyToken,
    middleware.verifyRankAssistant,
    async (req, res) => {
        try {
            let date = new Date();
            date.setDate(date.getDate() - 365);
            let readings = await Measurement.find(
                { date: { $gte: date } },
                { _id: 0, __v: 0 });
            res.status(200).send({ readings });
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });

router.get('/year/:device',
    middleware.verifyToken,
    middleware.verifyRankAssistant,
    async (req, res) => {
        try {
            let device = req.params.device;
            let date = new Date();
            date.setDate(date.getDate() - 365);
            let readings = await Measurement.find(
                { $and: [{ tag: device }, { date: { $gte: date } }] },
                { _id: 0, __v: 0 });
            res.status(200).send({ readings });
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });

module.exports = router;