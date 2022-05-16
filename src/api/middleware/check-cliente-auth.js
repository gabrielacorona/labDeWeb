const jwt = require('jsonwebtoken')
const {
    JWT_KEY
} = require('../../config');

// middleware para evitar que operadores hagan lo que un cliente puede hacer

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log('CHECK client ', token);
        const decoded = jwt.verify(token, JWT_KEY);
        req.userData = decoded;
        if (req.userData.userType == 'o' ) { 
            res.statusMessage = "Auth failed, you are not allowed to do this operation"
            return res.status(401).end()
        }
        next();
    } catch (err) {
        console.log(err)
        res.statusMessage = "Auth failed"
        return res.status(401).end()
    }
}
