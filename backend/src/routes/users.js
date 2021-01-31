const express = require('express');
const bcrypt = require('bcrypt');
const Log = require('../models/Log');
const User = require('../models/User');
const router = express.Router();
const middleware = require('./middleware/middleware');

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

router.get('/all',
    middleware.verifyToken,
    middleware.verifyRankAdministrator,
    async (req, res) => {
        try {
            let users = await User.find({}, { _id: 0, password: 0, __v: 0 });
            res.status(200).send({ users });
        } catch (error) {
            res.sendStatus(500);
        }
    });

router.get('/one/:name',
    middleware.verifyToken,
    middleware.verifyRankAdministrator,
    async (req, res) => {
        try {
            let user = await User.findOne(
                { name: req.params.name },
                { _id: 0, password: 0, __v: 0 }
            );
            res.status(200).send(user);
        } catch (error) {
            res.sendStatus(500);
        }
    });

router.post('/new',
    middleware.verifyToken,
    middleware.verifyRankAdministrator,
    async (req, res) => {
        try {
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
                let log = new Log({
                    timestamp: new Date(),
                    method: 'post',
                    endpoint: `POST:/users/new`,
                    user: req.userId,
                    body: `${body.name},${body.email},${body.rank}`
                });
                await log.save();
                res.sendStatus(201);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });

router.put('/change-rank/:name/:rank',
    middleware.verifyToken,
    middleware.verifyRankAdministrator,
    async (req, res) => {
        try {
            let updated = await User.findOneAndUpdate(
                { name: req.params.name },
                { rank: req.params.rank }
            );
            if (updated) {
                let log = new Log({
                    timestamp: new Date(),
                    method: 'put',
                    endpoint: `PUT:/users/change-rank/:name/:rank`,
                    user: req.userId,
                    body: `${req.params.name},${req.params.rank}`
                });
                await log.save();
                res.sendStatus(200);
            } else {
                res.sendStatus(403);
            }
        } catch (error) {
            res.sendStatus(500);
        }
    });

router.put('/reset-password/:name',
    middleware.verifyToken,
    middleware.verifyRankAdministrator,
    async (req, res) => {
        try {
            const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
            const HASH = bcrypt.hashSync("reset", SALT);
            let updated = await User.findOneAndUpdate(
                { name: req.params.name },
                { password: HASH }
            );
            if (updated) {
                let log = new Log({
                    timestamp: new Date(),
                    method: 'put',
                    endpoint: `PUT:/users/reset-password/:name`,
                    user: req.userId,
                    body: `${req.params.name}`
                });
                await log.save();
                res.sendStatus(200);
            } else {
                res.sendStatus(403);
            }
        } catch (error) {
            res.sendStatus(500);
        }
    });

router.post('/change/password',
    middleware.verifyToken,
    middleware.verifyRankAdministrator,
    async (req, res) => {
        try {
            const body = req.body;
            let user = await User.findOne({ name: body.name });
            if (bcrypt.compareSync(body.oldPassword, user.password)) {
                const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
                const HASH = bcrypt.hashSync(body.newPassword, SALT);
                user.password = HASH;
                await user.save({ isNew: false });
                let log = new Log({
                    timestamp: new Date(),
                    method: 'post',
                    endpoint: `POST:/users/change/password`,
                    user: req.userId,
                    body: `${body.name}`
                });
                await log.save();
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }

        } catch (error) {
            console.log(error)
            res.sendStatus(500);
        }
    });

router.delete('/delete-user/:name',
    middleware.verifyToken,
    middleware.verifyRankAdministrator,
    async (req, res) => {
        try {
            let deleted = await User.findOneAndDelete({ name: req.params.name });
            if (deleted) {
                let log = new Log({
                    timestamp: new Date(),
                    method: 'post',
                    endpoint: `DELETE:/users`,
                    user: req.userId,
                    body: `${req.params.name}`
                });
                await log.save();
                res.sendStatus(202);
                return;
            } else {
                res.sendStatus(403);
                return;
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500);
        }
    })

module.exports = router;