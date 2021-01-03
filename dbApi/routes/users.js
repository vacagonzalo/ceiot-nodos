const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const User = require('../models/User');
const cache = require('../cache');
const TIME_TO_LIVE = process.env.TIME_TO_LIVE || 120;

const bcrypt = require('bcrypt');
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const ADMINISTRATOR = 3;

router.get('/all', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return
                }
                if (reply) {
                    if (reply == ADMINISTRATOR) {
                        let data = await User.find({}, { _id: 0, password: 0, __v: 0 });
                        cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                        res.status(200).send(data);
                        return;
                    }
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
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return
                }
                if (reply) {
                    if (reply == ADMINISTRATOR) {
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
                            let user = new User({
                                name: body.name,
                                email: body.email,
                                password: HASH,
                                rank: body.rank
                            });
                            await user.save();
                            cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                            let log = new Log({
                                timestamp: new Date(),
                                endpoint: `POST:/users/new`,
                                user: req.headers['user-agent'],
                                body: `${body.name},${body.email},${body.rank}`
                            });
                            await log.save();
                            res.sendStatus(201);
                            return;
                        }
                    }
                }
                res.sendStatus(401);
                return;
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/change/rank', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    if (reply == ADMINISTRATOR) {
                        const body = req.body;
                        let updated = await User.findOneAndUpdate(
                            { name: body.name },
                            { rank: body.rank }
                        );
                        if (updated) {
                            cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                            let log = new Log({
                                timestamp: new Date(),
                                endpoint: `PUT:/users/change/rank`,
                                user: req.headers['user-agent'],
                                body: `${body.name},${body.rank}`
                            });
                            await log.save();
                            res.sendStatus(200);
                            return;
                        } else {
                            res.sendStatus(403);
                            return;
                        }
                    }
                }
                res.sendStatus(401);
                return;
            });

        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/reset/password', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    if (reply == ADMINISTRATOR) {
                        const body = req.body;
                        const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
                        const HASH = bcrypt.hashSync("reset", SALT);
                        let updated = await User.findOneAndUpdate(
                            { name: body.name },
                            { password: HASH }
                        );
                        if (updated) {
                            cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                            let log = new Log({
                                timestamp: new Date(),
                                endpoint: `PUT:/users/reset/password`,
                                user: req.headers['user-agent'],
                                body: `${body.name}`
                            });
                            await log.save();
                            res.sendStatus(200);
                            return;
                        } else {
                            res.sendStatus(403);
                            return;
                        }
                    }
                }
                res.sendStatus(401);
                return;
            });

        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/change/password', (req, res) => {
    try {
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    if (reply == ADMINISTRATOR) {
                        const body = req.body;
                        let user = await User.findOne({ name: body.name });
                        if (bcrypt.compareSync(body.oldPassword, user.password)) {
                            const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
                            const HASH = bcrypt.hashSync(body.newPassword, SALT);
                            user.password = HASH;
                            await user.save({ isNew: false });
                            let log = new Log({
                                timestamp: new Date(),
                                endpoint: `PUT:/users/change/password`,
                                user: req.headers['user-agent'],
                                body: `${body.name}`
                            });
                            await log.save();
                            res.sendStatus(200);
                            return;
                        } else {
                            res.sendStatus(401);
                            return;
                        }
                    }
                }
                res.sendStatus(401);
                return;
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
        if (req.headers.authorization && req.headers['user-agent']) {
            cache.GET(req.headers.authorization, async (error, reply) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(401);
                    return;
                }
                if (reply) {
                    if (reply == ADMINISTRATOR) {
                        const body = req.body;
                        let deleted = await User.findOneAndDelete({ name: body.name });
                        if (deleted) {
                            cache.EXPIRE(req.headers.authorization, TIME_TO_LIVE);
                            let log = new Log({
                                timestamp: new Date(),
                                endpoint: `DELETE:/users`,
                                user: req.headers['user-agent'],
                                body: `${body.name}`
                            });
                            await log.save();
                            res.sendStatus(202);
                            return;
                        } else {
                            res.sendStatus(403);
                            return;
                        }
                    }
                    res.sendStatus(401);
                    return;
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