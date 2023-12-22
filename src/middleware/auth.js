const jwt = require('jsonwebtoken');
// const passport = require('passport');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    let token = req.headers.authorization

    if (token) {
        if (token.startsWith('Bearer ')) {

            jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
                if (err) {
                    res.status(400).send("Invalid User")
                }
                else {
                    req.body.userId = decoded.user.id
                    req.body.email = decoded.user.email
                    next()
                }
            });
        }
    }
    else {
        res.status(401).send('Access Denied')
    }
}

module.exports = authenticate;