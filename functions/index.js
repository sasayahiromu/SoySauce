const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.sendChatNotification = functions.firestore.document('users/{userUid}')
  .onUpdate((change, context) => {
    const data = change.after.data();
    const payload = {
      notification: {
        title: 'You recieve a message',
      }
    };

    token = data.push_token;
    console.log('token: ',token)
     return admin.messaging().sendToDevice(token, payload);
  })