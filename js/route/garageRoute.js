const router = require('express').Router();
const database = require('../util/database.js');

router.get('/garage', function (req, res, next) {
    const user = req.user;
    database.query("select * from mymechanic.garage", []).then(function (garages) {
        res.json(garages);
    });
});

module.exports = router;
