import { SET_MESSAGES, SET_INDIVIDUAL_MESSAGES, SET_DEALS } from './actionTypes';
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
///////ここでエラーでまくり
//addを即時反映させるため
export const tempAddMessage = (message, sender_nick_name, sender_uid, type) => {
  return (dispatch, getState) => {
    // console.log(getState().messages.messages)
    console.log(getState().messages.messages)

    const messages = getState().messages.messages.slice(0)
    // var messages = {}
    // Object.assign(messages , getState().messages.messages);
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

export const deleteMessage = (messageId) => {
  return (dispatch) => {
    dispatch(tempDeleteMessage(messageId))
    firebase.firestore()
      .collection('chat_messages')
      .doc('chat-01')
      .collection('messages')
      .doc(messageId)
      .delete()
      .then(res => {
        dispatch(getMessages());
      })
      .catch(err => {
        alert('Error in delete message');
        console.log(err);
      });
  }
}

export const tempDeleteMessage = (messageId) => {
  return (dispatch, getState) => {
    var messages = getState().messages.messages.slice(0)
    console.log(messages);
    messages.some(function (v, i) {
      if (v.key === messageId) messages.splice(i, 1)
    })
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

export const getIndividualMessages = (messageId) => {
  return dispatch => {
    firebase.firestore()
      .collection('deals')
      .doc(messageId)
      .collection('messages')
      .orderBy('sent_at')
      .get()
      .then(querySnapshot => {
        console.log('here')
        const messages = [];
        for (let i in querySnapshot.docs) {
          value = querySnapshot.docs[i].data();
          messages.push({
            ...value,
            key: querySnapshot.docs[i].id
          });
        }
        dispatch(setIndividualMessages(messages, messageId));
      })
      .catch(err => {
        alert('something wrong');
        console.log(err)
      })
  };
};

export const setIndividualMessages = (messages, messageId) => {
  return {
    type: SET_INDIVIDUAL_MESSAGES,
    messages: messages,
    messageId: messageId
  };
};


export const addIndividualMessage = (message, messageId) => {
  return (dispatch, getState) => {
    sender_uid = getState().auth.uid.slice(0);
    sender_nick_name = getState().auth.nickname.slice(0);
    dispatch(tempAddIndividualMessage(message, sender_nick_name, sender_uid, messageId))
    const messageData = {
      message: message,
      sender_nick_name: sender_nick_name,
      sender_uid: sender_uid,
      sent_at: firebase.firestore.FieldValue.serverTimestamp()
    }
    firebase.firestore()
      .collection('deals')
      .doc(messageId)
      .collection('messages')
      .add(messageData)
      .then(res => {
        dispatch(getIndividualMessages(messageId));
        dispatch(updateDealMessageState(message, messageId));
        dispatch(updateUserLaseMessageAt(messageId));
      })
      .catch(err => {
        alert('Try again');
        console.log(err);
      });
  }
}

export const deleteIndividualMessage = (messageId, Individualkey) => {
  return (dispatch) => {
    dispatch(tempDeleteIndividualMessage(messageId, Individualkey));
    firebase.firestore()
      .collection('deals')
      .doc(messageId)
      .collection('messages')
      .doc(Individualkey)
      .delete()
      .then(res => {
        dispatch(getIndividualMessages(messageId));
        //updateDealMessageState
        //updateUserLaseMessageAt
        //変更していない
      })
      .catch(err => {
        alert('Error in delete individual message');
        console.log(err);
      });
  }
}

export const tempDeleteIndividualMessage = (messageId, Individualkey) => {
  return (dispatch, getState) => {
    var individualMessages = getState().messages.individualMessages[messageId].slice()
    console.log(individualMessages)
    individualMessages.some(function (v, i) {
      if (v.key === Individualkey) individualMessages.splice(i, 1)
    })
    dispatch(setIndividualMessages(individualMessages, messageId))
  }
}

export const updateUserLaseMessageAt = (messageId) => {
  return (dispatch, getState) => {
    const authUid = getState().auth.uid.slice(0);
    let senderUid = '';
    let lenderUid = '';

    firebase.firestore()
      .collection('deals')
      .doc(messageId)
      .get()
      .then(documentSnapshot => {
        senderUid = documentSnapshot._data.borrower_uid;
        lenderUid = documentSnapshot._data.lender_uid;
        uidArray = [senderUid, lenderUid];
        for (uidIndex in uidArray) {
          if (uidArray[uidIndex] !== authUid) {
            firebase.firestore()
              .collection('users')
              .doc(uidArray[uidIndex])
              .update({
                last_deal_message_at: firebase.firestore.FieldValue.serverTimestamp()
              })
          }
        }
      })
      .catch(err => {
        console.log(err)
        alert('updateUserLaseMessageAt error');
      })
  }
}

export const updateDealMessageState = (message, messageId) => {
  return (dispatch) => {
    let lastMessage = '';
    if (message.length < 25) { lastMessage = message }
    else { lastMessage = message.slice(0, 23) + '...' }
    firebase.firestore()
      .collection('deals')
      .doc(messageId)
      .update({
        last_deal_message: lastMessage,
        deal_last_at: firebase.firestore.FieldValue.serverTimestamp()
      })
  }
}


//addを即時反映させるため
export const tempAddIndividualMessage = (message, sender_nick_name, sender_uid, messageId) => {
  return (dispatch, getState) => {
    const messages = getState().messages.individualMessages
    const messageData = {
      message: message,
      sender_nick_name: sender_nick_name,
      sender_uid: sender_uid,
      key: "temporary"
    }
    console.log(messages)
    messages[messageId].push(messageData);
    dispatch(setIndividualMessages(messages))
  }
}

export const addDeals =
  (borrowerNickname,
    borrowerUid,
    lenderNickname,
    lenderUid,
    messageId,
    initialMessage,
  ) => {
    return (dispatch) => {

      let newInitialMessage = '';
      if (initialMessage.length < 19) { newInitialMessage = initialMessage }
      else { newInitialMessage = initialMessage.slice(0, 17) + '...' }

      const dealData = {
        borrower_nick_name: borrowerNickname,
        borrower_uid: borrowerUid,
        deal_start_at: firebase.firestore.FieldValue.serverTimestamp(),
        deal_last_at: firebase.firestore.FieldValue.serverTimestamp(),
        lender_nick_name: lenderNickname,
        lender_uid: lenderUid,
        initial_message: initialMessage,
        last_deal_message: ''
      }
      firebase.firestore()
        .collection('deals')
        .doc(messageId)
        .set(dealData)
        .then(res => {
          dispatch(addDealsToUser(messageId, borrowerUid))
          dispatch(addDealsToUser(messageId, lenderUid))
          dispatch(disabledButton(messageId))
        })
        .catch(err => {
          alert('deals add error');
          console.log(err);
        });
    }
  }

export const disabledButton = (messageId) => {
  return (dispatch) => {
    firebase.firestore()
      .collection('chat_messages')
      .doc('chat-01')
      .collection('messages')
      .doc(messageId)
      .update({
        deal_status: 1
      })
      .then(res => console.log(res))
  }
}

export const addDealsToUser = (messageId, userUid) => {
  return (dispatch) => {
    firebase.firestore()
      .collection('users')
      .doc(userUid)
      .get()
      .then(documentSnapshot => {
        let deals = documentSnapshot._data.deals;
        deals[messageId] = true
        firebase.firestore()
          .collection('users')
          .doc(userUid)
          .update({
            deals: deals,
            last_deal_message_at: firebase.firestore.FieldValue.serverTimestamp()
          })
        dispatch(getDeals())
      })
      .catch(err => {
        console.log(err)
        alert('addDealsToUser error');
      })
  }
}


export const getDeals = () => {
  return (dispatch, getState) => {
    const auth_uid = getState().auth.uid.slice(0);
    firebase.firestore()
      .collection('users')
      .doc(auth_uid)
      .get()
      .then(documentSnapshot => {
        let deals = []
        const dealsIds = documentSnapshot._data.deals;
        let roopNum = 0
        console.log(dealsIds)
        for (key in dealsIds) {
          firebase.firestore()
            .collection('deals')
            .doc(key)
            .get()
            .then(documentSnapshot => {
              deals.push(
                {
                  ...documentSnapshot._data,
                  messageId: documentSnapshot.id
                }
              )
              roopNum += 1;
              console.log(roopNum)
              console.log(Object.keys(dealsIds).length)
              console.log(deals, 'a')
              if (roopNum === Object.keys(dealsIds).length) {
                deals.sort(function (a, b) {
                  // あとでlastupdateに変える
                  return a.deal_last_at > b.deal_last_at ? -1 : 1;
                })
                console.log(deals, 'b');
                dispatch(setDeals(deals));
              }
            })
            .catch(err => {
              console.log(err)
              alert('importDeals error');
            })
        }
      })
      .catch(err => {
        console.log(err)
        alert('getDeals error');
      })
  }

}

export const setDeals = (deals) => {
  return {
    type: SET_DEALS,
    deals: deals
  };
}