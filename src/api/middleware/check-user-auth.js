const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY);
        req.userData = decoded;
        next();
    } catch (err) {
        res.statusMessage = "Auth failed"
        return res.status(401).end()
    }
}