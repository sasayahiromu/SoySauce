import { SET_MESSAGES } from './actionTypes';
import firebase from 'react-native-firebase';


export const addMessage = (message, type) => {
  return (dispatch, getState) => {
    sender_uid = getState().auth.uid.slice(0);
    sender_nick_name = getState().auth.nickname.slice(0);
    dispatch(tempAddMessage(message, sender_nick_name, sender_uid, type))
    const messageData = {
      deal_status: 0,
      message: message,
      sender_nick_name: sender_nick_name,
      sender_uid: sender_uid,
      type: type,
      sent_at: firebase.firestore.FieldValue.serverTimestamp()
    }
    firebase.firestore()
      .collection('chat_messages')
      .doc('chat-01')
      .collection('messages')
      .add(messageData)
      .then(res => {
        console.log(res.id);
        dispatch(getMessages());
      })
      .catch(err => {
        alert('Try again');
        console.log(err);
      });
  }
}

//addを即時反映させるため
export const tempAddMessage = (message, sender_nick_name, sender_uid, type) => {
  return (dispatch, getState) => {
    const messages = getState().messages.messages.slice(0)
    const messageData = {
      message: message,
      sender_nick_name: sender_nick_name,
      sender_uid: sender_uid,
      type: type,
      key: "temporary"
    }
    console.log(messages)
    messages.push(messageData)
    dispatch(setMessages(messages))
  }
}

export const setMessages = messages => {
  return {
    type: SET_MESSAGES,
    messages: messages
  };
};

export const getMessages = () => {
  return dispatch => {
    firebase.firestore()
      .collection('chat_messages')
      .doc('chat-01')
      .collection('messages')
      .orderBy('sent_at')
      .get()
      .then(querySnapshot => {
        const messages = [];
        for (let i in querySnapshot.docs) {
          value = querySnapshot.docs[i].data();
          messages.push({
            ...value,
            key: querySnapshot.docs[i].id
          });
        }
        dispatch(setMessages(messages));
      })
      .catch(err => {
        alert('something wrong');
        console.log(err)
      })
  };
};