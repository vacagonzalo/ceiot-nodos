const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        let user = await User.findOne({ name: body.name });
        if(user) {
            let payload = { subject: user._id};
            let token = jwt.sign(payload, 'secret');
            //TODO: save JWT in redis
            res.status(201).send(token);
        }else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;