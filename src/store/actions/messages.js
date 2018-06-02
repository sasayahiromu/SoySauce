import { SET_MESSAGES } from './actionTypes';
import firebase from 'react-native-firebase';


export const addMessage = (text, sender, type) => {
  return dispatch => {
    const messageData = {
      text: text,
      sender: sender,
      type: type,
    }
    this.ref = firebase.firestore().collection('messages')
    this.ref.add(messageData)
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

export const setMessages = messages => {
  return {
    type: SET_MESSAGES,
    messages: messages
  };
};

export const getMessages = () => {
  return dispatch => {
    console.log('gett')
    this.ref = firebase.firestore().collection('messages');
    this.ref
      .get()
      .then(querySnapshot => {
        const messages = [];
        console.log(querySnapshot)
        for (let i in querySnapshot.docs) {
          value = querySnapshot.docs[i].data();
          console.log('hrllo')
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