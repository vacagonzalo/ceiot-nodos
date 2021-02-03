const Log = require('../../models/Log');
const cache = require('../../connection/cache');
const jwt = require('jsonwebtoken');
const TIME_TO_LIVE = process.env.TIME_TO_LIVE || 120;
const SECRET_KEY = process.env.SECRET_KEY || 'secret';
const UNAUTHORIZED = 0;
const ASSISTANT = 1;
const ENGINEER = 2;
const ADMINISTRATOR = 3;

var middleware = {};

middleware.verifyToken = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.sendStatus(401);
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.sendStatus(401);
        }
        cache.GET(token, (error, reply) => {
            if (error) {
                return res.sendStatus(401);
            }
            if (!reply) {
                return res.sendStatus(401);
            }
            if (reply == UNAUTHORIZED) {
                return res.sendStatus(401);
            }
            let payload = jwt.verify(token, SECRET_KEY);
            if (!payload) {
                return res.sendStatus(401);
            }
            req.userId = payload.subject
            req.rank = reply;
            cache.EXPIRE(token, TIME_TO_LIVE);
            next();
        });
    } catch (error) {
        return res.sendStatus(401);
    }
}

middleware.verifyRankAssistant = (req, res, next) => {
    if (req.rank >= ASSISTANT) {
        next();
    } else {
        return res.sendStatus(401);
    }
}

middleware.verifyRankEngineer = (req, res, next) => {
    if (req.rank >= ENGINEER) {
        next();
    } else {
        return res.sendStatus(401);
    }
}

middleware.verifyRankAdministrator = (req, res, next) => {
    if (req.rank >= ADMINISTRATOR) {
        next();
    } else {
        return res.sendStatus(401);
    }
}

middleware.logRequest = async (req, res, next) => {
    try {
        let body = JSON.stringify(req.body);
        let log = new Log({
            timestamp: new Date(),
            method: req.method,
            endpoint: req.originalUrl,
            user: req.userId,
            body: body
        });
        await log.save();
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = middleware;