const database = require('../util/database.js');
const jwt = require('jsonwebtoken');

const authenticate = {
    customer: function (email, password) {
        return database.get("select customer.* from mymechanic.customer join mymechanic.user u on u.id_customer = customer.id where customer.email = $1 and u.password = $2", [email, password]);
    },
    garage: function (email, password) {
        return database.get("select garage.* from mymechanic.garage join mymechanic.user u on u.id_garage = garage.id where garage.email = $1 and u.password = $2", [email, password]);
    }
};

const isAuthenticated = function (req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, 'cremefraiche', function (err, user) {
        if (err) {
            console.error(err);
            res.status(401).end();
        } else {
            req.user = user;
            next();
        }
    });
};


module.exports = {
    authenticate: authenticate,
    isAuthenticated: isAuthenticated
};
