

const admin = require('firebase-admin');
const serviceAccount = require('../helpers/hackathon2-ba994-firebase-adminsdk-k8jqy-f7c24a0a68.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Middleware function to verify user
exports.verifyUser = (req, res, next) => {
    console.log("hi from middle ware")

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

            req.mobile = decodedToken.phone_number;

            // Save the user ID to the request object
            next(); // Continue to the next middleware or route handler
        })
        .catch((error) => {
            console.error(error);
            res.status(401).send('Unauthorized');
        });
}

