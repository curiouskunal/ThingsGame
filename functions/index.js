var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

'use strict';

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.countWords = functions.database.ref('/Words/').onWrite(event => {
  return event.data.ref.child('count').set(event.data.numChildren());
});

exports.countThings = functions.database.ref('/Things/').onWrite(event => {
  return event.data.ref.child('count').set(event.data.numChildren());
});

// ---------------------------------------------------
// Structure of Database
// /functions-project-12345
//     /path
//         /to
//             /items
//                 item1: {
//                     timestamp: 1497911193083
//                 },
//                 item2: {
//                     timestamp: 1597911193083                    
//                 }
//                 ...
// ---------------------------------------------------

// // Cut off time. Child nodes older than this will be deleted.
// const CUT_OFF_TIME = 24 * 60 * 60 * 1000; // 24 Hours in milliseconds.

// /**
//  * This database triggered function will check for child nodes that are older than the
//  * cut-off time. Each child needs to have a `timestamp` attribute.
//  */
// exports.deleteOldItems = functions.database.ref('/path/to/items/{pushId}')
//     .onWrite(event => {
//       const ref = event.data.ref.parent; // reference to the items
//       const now = Date.now();
//       const cutoff = now - CUT_OFF_TIME;
//       const oldItemsQuery = ref.orderByChild('timestamp').endAt(cutoff);
//       return oldItemsQuery.once('value').then(snapshot => {
//         // create a map with all children that need to be removed
//         const updates = {};
//         snapshot.forEach(child => {
//           updates[child.key] = null;
//         });
//         // execute all updates in one go and return the result to end the function
//         return ref.update(updates);
//       });
//     });