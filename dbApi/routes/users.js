const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        let data = await User.find({}, { _id: 0, __v: 0 });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Error");
    }
});

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        let dupplicated = await User.findOne(
            { $or: [{ name: body.name }, { email: body.email }] },
            {}
        );
        if (dupplicated) {
            res.sendStatus(403)
        } else {
            let user = new User({
                name: body.name,
                email: body.email,
                password: body.password,
                rank: body.rank
            });
            await user.save();
            res.sendStatus(201);
        }
    } catch (error) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/', async (req, res) => {
    try {
        const body = req.body;
        let updated = await User.findOneAndUpdate(
            { name: body.name },
            {
                email: body.email,
                password: body.password,
                rank: body.rank
            }
        );
        if (updated) {
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/', async (req, res) => {
    try {
        const body = req.body;
        let deleted = await User.findOneAndDelete({ name: body.name });
        if (deleted) {
            res.sendStatus(202);
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports = router;