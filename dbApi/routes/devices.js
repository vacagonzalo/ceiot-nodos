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

router.get('/:tag', async (req, res) => {
    try {
        let device = await Device.findOne(
            { tag: req.params.tag },
            { _id: 0, __v: 0 }
        );
        if (device) {
            res.status(200).send(device);
        } else {
            res.sendStatus(204);
        }
    } catch (err) {

    }
});

router.post('', async (req, res) => {
    try {
        let body = req.body;
        let dupplicated = await Device.findOne(
            { $or: [{ serial: body.serial }, { tag: body.tag }] },
            {}
        );
        if (dupplicated) {
            res.sendStatus(403);
        } else {
            let device = new Device({
                serial: body.serial,
                tag: body.tag,
                modbus: body.modbus,
                frec: body.frec,
                unit: body.unit
            });
            await device.save();
            res.sendStatus(201);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/', async (req, res) => {
    try {
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
            res.status(200).send(device);
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/', async (req, res) => {
    try {
        let deleted = await Device.findOneAndDelete({tag: req.body.tag},{});
        if(deleted){
            res.sendStatus(202)
        }else {
            res.sendStatus(403);
        }
    } catch (error) {
        
    }
});

module.exports = router;