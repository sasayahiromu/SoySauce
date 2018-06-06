import { SET_MESSAGES } from './actionTypes';
import firebase from 'react-native-firebase';


export const addMessage = (text, sender, type) => {
  return dispatch => {
    dispatch(tempAddMessage(text, sender, type))
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

//addを即時反映させるため
export const tempAddMessage = (text, sender, type) => {
  return (dispatch,getState) => {
    const messages = getState().messages.messages.slice(0)
    const messageData = {
      text: text,
      sender: sender,
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
    this.ref = firebase.firestore().collection('messages');
    this.ref
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