const express = require('express');
const router = express.Router();
const Measurement = require('../models/Measurement');

router.get('/all', async (req, res) => {
    try {
        let data = await Measurement.find({}, { _id: 0, __v: 0 });
        res.status(200).send(data);
    } catch {
        res.status(500).send("Error");
    }
});

router.get('/all/:device', async (req, res) => {
    try {
        let device = req.params.device;
        let data = await Measurement.find(
            { tag: device },
            { _id: 0, __v: 0 });
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/year', async (req, res) => {
    try {
        let date = new Date();
        date.setDate(date.getDate() - 365);
        let data = await Measurement.find(
            { date: { $gte: date } },
            { _id: 0, __v: 0 });
        res.status(200).send(data);
    } catch {
        res.status(500).send("Error");
    }
});

router.get('/year/:device', async (req, res) => {
    try {
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
    } catch {
        res.status(500).send("Error");
    }
});

module.exports = router;