const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.sendChatNotification = functions.firestore.document('users/{userUid}')
  .onUpdate((change, context) => {
    const data = change.after.data();
    const payload = {
      notification: {
        title: context.timestamp + ' ' + context.eventId,
        message: context.eventId
      }
    };

    token = data.push_token;
    console.log('context', context)
    console.log('token: ',token)
    console.log('1')
     return admin.messaging().sendToDevice(token, payload);
  })