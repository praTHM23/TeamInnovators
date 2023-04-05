const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const admin = require('firebase-admin');
const serviceAccount = require('../helpers/workit-auth-firebase-adminsdk-zdnlr-770c142f63.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.decodeJWT = (jwtString) => {
    let decodedValue = jwt.decode(jwtString, process.env.PASS_SECRET);
    return decodedValue;
}

exports.generateJwtToken = (userId) => {
    // create a jwt token containing the id that expires in 15 minutes
    return jwt.sign({ sub: userId }, process.env.PASS_SECRET);
}

// exports.decode = (req, res, next) => {
//     if (!req.headers['authorization']) {
//         return res.status(400).json({ success: false, message: 'No access token provided' });
//     }
//     const accessToken = req.headers.authorization.split(' ')[1];
//     try {
//         const decoded = jwt.verify(accessToken, process.env.PASS_SECRET);
//         console.log(decoded.sub)
//         req.userId = decoded.sub;
//         return next();
//     } catch (error) {

//         return res.status(401).json({ success: false, message: error.message });
//     }
// }const admin = require('firebase-admin');

// Middleware function to verify user
exports.verifyUser = (req, res, next) => {
    console.log("hi")
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        // No token provided, return error
        return res.status(401).send('Unauthorized');
    }
    const token = authorizationHeader.split(' ')[1];
    console.log(token)

    admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            console.log(decodedToken)
            req.uid = decodedToken.uid; // Save the user ID to the request object
        
            req.mobile=decodedToken.phone_number // Save the user ID to the request object
            next(); // Continue to the next middleware or route handler
        })
        .catch((error) => {
            console.error(error);
            res.status(401).send('Unauthorized');
        });
}

