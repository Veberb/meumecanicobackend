const jwt = require('jsonwebtoken');
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const router = require('express').Router();
const co = require('co');

router.post('/signin', function (req, res, next) {
    console.log(req);
    console.log(req.body.user, req.body.password);
    if (req.body.user === "lucas" && req.body.password === 123456) {
        const token = jwt.sign(req.body, 'cremefraiche');
        res.json(token);
    }
    res.end();
});

module.exports = router;
