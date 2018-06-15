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

    token = data.pushToken;
    admin.messaging().sendToDevice(token, payload)
      .then(function (response) {
        console.log('Successfully sent message:', response);
        return 'ok'
      })
      .catch(function (error) {
        console.log('Error sending message:', error);
        return 'error'
      });
  })