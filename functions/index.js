const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.makeUppercase = functions.database.ref('/gameroom/{roomID}/things/{playerID}').onCreate((snapshot,context)=>{
  const text = snapshot.val();
  const uppercase = text.toUpperCase();
  return snapshot.ref.parent.child(snapshot.key).set(uppercase);
});

exports.initGameRoom = functions.database.ref('/gameroom/{roomID}').onCreate((snapshot,context)=>{
  const playerObj = snapshot.val().players;
  const host = Object.keys(playerObj)[0];
  return snapshot.ref.child('hooks').set({status: 'lobby', host: host});
});
