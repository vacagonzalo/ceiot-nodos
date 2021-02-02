const express = require('express');
const Device = require('../models/Device');
const mqtt = require('../connection/broker');
const router = express.Router();

const middleware = require('./middleware/middleware');

router.get('',
    middleware.verifyToken,
    middleware.verifyRankAssistant,
    async (req, res) => {
        try {
            let devices = await Device.find({}, { _id: 0, __v: 0 });
            if (!devices) {
                res.sendStatus(500);
            } else {
                res.send({ devices });
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });

router.get('/:tag',
    middleware.verifyToken,
    middleware.verifyRankAssistant,
    async (req, res) => {
        try {
            let device = await Device.findOne(
                { tag: req.params.tag },
                { _id: 0, __v: 0 });
            if (!device) {
                res.sendStatus(500);
            } else {
                res.send(device);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });

router.post('',
    middleware.verifyToken,
    middleware.verifyRankEngineer,
    middleware.logRequest,
    async (req, res) => {
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
                mqtt.publish(`cmnd/${device.tag}/frec`, `${device.frec}`);
                res.sendStatus(201);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });

router.put('/:tag/calibration',
    middleware.verifyToken,
    middleware.verifyRankEngineer,
    middleware.logRequest,
    async (req, res) => {
        try {
            mqtt.publish(`cmnd/${req.params.tag}/mode`, 'cal');
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    });

router.put('/:tag/default-mode',
    middleware.verifyToken,
    middleware.verifyRankEngineer,
    middleware.logRequest,
    async (req, res) => {
        try {
            mqtt.publish(`cmnd/${req.params.tag}/mode`, 'def');
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    });

router.put('/:serial',
    middleware.verifyToken,
    middleware.verifyRankEngineer,
    middleware.logRequest,
    async (req, res) => {
        try {
            const body = req.body;
            const filter = { serial: req.params.serial };
            const update = {
                tag: body.tag,
                modbus: body.modbus,
                frec: body.frec,
                unit: body.unit
            }
            let device = await Device.findOne(filter, { _id: 0, __v: 0 });
            if (device) {
                await Device.findOneAndUpdate(filter, update);
                mqtt.publish(`cmnd/${device.tag}/frec`, `${body.frec}`);
                res.send(device);
            } else {
                res.send({});
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });

router.delete('/:tag',
    middleware.verifyToken,
    middleware.verifyRankEngineer,
    middleware.logRequest,
    async (req, res) => {
        try {
            let deleted = await Device.findOneAndDelete(
                { tag: req.params.tag },
                {});
            if (deleted) {
                res.sendStatus(202);
            } else {
                res.sendStatus(403);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        }
    });

module.exports = router;