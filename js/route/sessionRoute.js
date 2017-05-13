const jwt = require('jsonwebtoken');
const router = require('express').Router();
const co = require('co');
const sessionService = require('../service/sessionService.js');

router.post('/signin', co.wrap(function* (req, res, next) {
    const user = yield sessionService.authenticate[req.body.type](req.body.email, req.body.password);
    if (user) {
        const token = jwt.sign(user, 'cremefraiche');
        res.json(token);
        res.end();
    }
    res.status(403);
    res.end();
}));

module.exports = router;
