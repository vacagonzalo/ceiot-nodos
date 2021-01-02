const express = require('express');
const router = express.Router();
const User = require('../models/User');
const cache = require('../cache');
const TIME_TO_LIVE = process.env.TIME_TO_LIVE || 120;

const bcrypt = require('bcrypt');
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

router.get('/all', (req, res) => {
    try {
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return
                }
                if (reply) {
                    let data = await User.find({}, { _id: 0, password: 0, __v: 0 });
                    cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                    res.status(200).send(data);
                    return;
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.status(500).send("Error");
    }
});

router.post('/new', (req, res) => {
    try {
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return
                }
                if (reply) {
                    const body = req.body;
                    let dupplicated = await User.findOne(
                        { $or: [{ name: body.name }, { email: body.email }] },
                        {}
                    );
                    if (dupplicated) {
                        res.sendStatus(403)
                        return;
                    } else {
                        const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
                        const HASH = bcrypt.hashSync(body.password, SALT);
                        console.log(HASH);
                        let user = new User({
                            name: body.name,
                            email: body.email,
                            password: HASH,
                            rank: body.rank
                        });
                        await user.save();
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        res.sendStatus(201);
                        return;
                    }
                }
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/', (req, res) => {
    try {
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
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
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        res.sendStatus(200);
                        return;
                    } else {
                        res.sendStatus(403);
                        return;
                    }
                }
            });

        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/', async (req, res) => {
    try {
        if (req.headers.authorization) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    const body = req.body;
                    let deleted = await User.findOneAndDelete({ name: body.name });
                    if (deleted) {
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        res.sendStatus(202);
                    } else {
                        res.sendStatus(403);
                    }
                } else {
                    res.sendStatus(401);
                    return;
                }
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports = router;