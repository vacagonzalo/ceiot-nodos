const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

router.get('', async (req, res) => {
    try {
        let data = await Device.find({}, { _id: 0, __v: 0 });
        res.status(200).send(data);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('', async (req, res) => {
    try {
        const body = req.body;
        let device = new Device({
            serial: body.serial,
            tag: body.tag,
            modbus: body.modbus,
            frec: body.frec,
            unit: body.unit
        });
        await device.save();
        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;