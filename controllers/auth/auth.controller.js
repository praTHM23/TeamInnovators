const User = require("../../models/user.model");
const httpStatusCodes = require("../../constants/http-status-codes");
const { formResponse } = require("../../helpers/response");
const firebase = require('firebase-admin');

exports.login = async (req, res) => {


  try {
    console.log(req.mobile)
    const ipObj = req.mobile;
    const user = await User.findOne({ mobile: req.mobile });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found try Resgistering!' });
    }

    return res.status(200).json({ user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
// db.collection('myCollection').add({
//   name: 'Example document'
// })
//   .then(docRef => {
//     console.log('Document added with ID:', docRef.id);
//     res.status(201).json({ message: 'Collection created successfully.' });
//   })
//   .catch(error => {
//     console.error('Error creating collection:', error);
//     res.status(500).json({ message: 'Internal Server Error.' });
//   });

// exports.register = async (req, res) => {

//   const db = firebase.firestore();

//   // Create a new collection named "myCollection"


//   // Extract the decoded user information from req.user
//   const uid = req.user.uid;
//   const email = req.user.email;
//   const displayName = req.user.name;

//   // Store the user information in Firebase Cloud Firestore
//   firebase.firestore().collection('users').doc(uid).set({
//     email: email,
//     Name: displayName
//   }).then(() => {
//     // Store the user information in MongoDB using Mongoose
//     const user = new User({
//       // uid: uid,
//       email: email,
//       Name: displayName
//     });
//     user.save()
//       .then(() => {
//         res.status(201).json({ message: 'User registered successfully.' });
//       })
//       .catch(error => {
//         console.error('Error saving user to MongoDB:', error);
//         res.status(500).json({ message: 'Internal Server Error.' });
//       });
//   }).catch(error => {
//     console.error('Error saving user to Firebase Cloud Firestore:', error);
//     res.status(500).json({ message: 'Internal Server Error.' });
//   });
// }
exports.register = async (req, res) => {
  // Extract the decoded user information from req.user
  console.log(req.body);
  const uid = req.uid;
  const email = req.body.email;
  const displayName = req.body.name;
  const mobile = req.mobile;
  const db = firebase.firestore();
  // Store the user information in Firebase Cloud Firestore
  db.collection('users').doc(uid).set({
    email: email,
    full_name: displayName,
    mobile: mobile
  })
    .then(() => {
      // Store the user information in MongoDB using Mongoose
      const user = new User({
        uid: uid,
        email: email,
        full_name: displayName,
        mobile: mobile
      });
      user.save()
        .then(() => {
          // Retrieve the user details from MongoDB and send them back in the response
          User.findOne({ uid: uid }, (err, user) => {
            if (err) {
              console.error('Error retrieving user from MongoDB:', err);
              return res.status(500).json({ message: 'Internal Server Error.' });
            }
            if (!user) {
              console.error('User not found in MongoDB:', uid);
              return res.status(404).json({ message: 'User not found.' });
            }
            res.status(201).json({
              message: 'User registered successfully.',
              user: {
                uid: user.uid,
                email: user.email,
                full_name: user.full_name
              }
            });
          });
        })
        .catch(error => {
          console.error('Error saving user to MongoDB:', error);
          res.status(500).json({ message: 'Internal Server Error.' });
        });
    }).catch(error => {
      console.error('Error saving user to Firebase Cloud Firestore:', error);
      res.status(500).json({ message: 'Internal Server Error.' });
    });
}