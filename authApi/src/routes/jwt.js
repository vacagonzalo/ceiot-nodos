const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const cache = require('../cache');
const SECRET_KEY = process.env.SECRET_KEY || 'secret';
const TIME_TO_LIVE = process.env.TIME_TO_LIVE || 120;

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        let user = await User.findOne({ name: body.name });
        if (user) {
            if(user.password == body.password) {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, SECRET_KEY);
                cache.SETEX(token, TIME_TO_LIVE, user.rank);
                res.status(201).send(token);
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;