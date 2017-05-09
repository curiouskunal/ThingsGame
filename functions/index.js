var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.countWords = functions.database.ref('/Words/').onWrite(event => {
  return event.data.ref.child('count').set(event.data.numChildren());
});

exports.countThings = functions.database.ref('/Things/').onWrite(event => {
  return event.data.ref.child('count').set(event.data.numChildren());
});