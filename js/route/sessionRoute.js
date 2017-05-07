const jwt = require('jsonwebtoken');
const router = require('express').Router();
const co = require('co');

router.post('/signin', function (req, res, next) {
    if (req.body.user === "lucas" && req.body.password === 123456) {
        const token = jwt.sign(req.body, 'cremefraiche');
        res.json(token);
    }
    res.end();
});

module.exports = router;
