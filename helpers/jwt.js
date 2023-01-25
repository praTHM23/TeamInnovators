const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.decodeJWT = (jwtString) => {
    let decodedValue = jwt.decode(jwtString, process.env.PASS_SECRET);
    return decodedValue;
}

exports.generateJwtToken = (userId) => {
    // create a jwt token containing the id that expires in 15 minutes
    return jwt.sign({ sub: userId }, process.env.PASS_SECRET);
}

exports.decode = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, process.env.PASS_SECRET);
        console.log(decoded.sub)
        req.userId = decoded.sub;
        return next();
    } catch (error) {

        return res.status(401).json({ success: false, message: error.message });
    }
}