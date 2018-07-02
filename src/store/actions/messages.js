import { SET_MESSAGES, SET_INDIVIDUAL_MESSAGES, SET_DEALS } from './actionTypes';
import firebase from 'react-native-firebase';


export const addMessage = (message, type) => {
  return (dispatch, getState) => {
    console.log('addMessage')
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
    console.log('tempAddMessage')
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
    console.log('deleteMessage')
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
    console.log('tempDeleteMessage')
    var messages = getState().messages.messages.slice(0)
    console.log(messages);
    messages.some(function (v, i) {
      if (v.key === messageId) messages.splice(i, 1)
    })
    dispatch(setMessages(messages))
  }
}

export const setMessages = messages => {
  console.log('setMessages')

  return {
    type: SET_MESSAGES,
    messages: messages
  };
};

export const getMessages = () => {
  return dispatch => {
    console.log('getMessages')
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
  console.log('getIndividualMessages')
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
        console.log(messages.length,'messageLength')
        dispatch(setIndividualMessages(messages, messageId));
      })
      .catch(err => {
        alert('something wrong');
        console.log(err)
      })
  };
};

export const setIndividualMessages = (messages, messageId) => {
  console.log('setIndividualMessages')
  return {
    type: SET_INDIVIDUAL_MESSAGES,
    messages: messages,
    messageId: messageId
  };
};


export const addIndividualMessage = (message, messageId) => {
  console.log('addIndividualMessage')
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
  console.log('deleteIndividualMessage')
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
  console.log('tempDeleteIndividualMessage')
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
  console.log('updateUserLaseMessageAt')
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
  console.log('updateDealMessageState')
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
export const tempAddIndividualMessage= (message, sender_nick_name, sender_uid, messageId) => {
  console.log('tempAddIndividualMessage')
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

export const updateOpenIndividualMessageAt = (messageId) => {
  console.log('updateOpenIndividualMessageAt')
  return (dispatch, getState) => {
    const authUid = getState().auth.uid.slice(0);
    let borrowerUid = '';
    let lenderUid = '';

    firebase.firestore()
      .collection('deals')
      .doc(messageId)
      .get()
      .then(documentSnapshot => {
        dealLastAt = documentSnapshot._data.deal_last_at
        borrowerUid = documentSnapshot._data.borrower_uid;
        lenderUid = documentSnapshot._data.lender_uid;
        borrowerReadAt = documentSnapshot._data.borrower_last_read_at;
        lenderReadAt = documentSnapshot._data.lender_last_read_at;

        let lastReadAt;
        if (borrowerUid === authUid) {
          lastReadAt = borrowerReadAt
        }
        if (lenderUid === authUid) {
          lastReadAt = lenderReadAt
        }

        if (!!dealLastAt  && (!lastReadAt || dealLastAt.getTime() > lastReadAt.getTime())) {

          firebase.firestore()
          .collection('users')
          .doc(authUid)
          .update({
            last_read_at: firebase.firestore.FieldValue.serverTimestamp()
          })


          if (borrowerUid === authUid) {
            console.log('1')
            firebase.firestore()
              .collection('deals')
              .doc(messageId)
              .update({
                borrower_last_read_at: firebase.firestore.FieldValue.serverTimestamp()
              })
          }
          if (lenderUid === authUid) {
            firebase.firestore()
              .collection('deals')
              .doc(messageId)
              .update({
                lender_last_read_at: firebase.firestore.FieldValue.serverTimestamp()
              })
          }
        }
      })
      .catch(err => {
        console.log(err)
        alert('updateOpenIndividualMessageAt error');
      })
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
      console.log('addDeals')
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
  console.log('disabledButton')
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
  console.log('addDealsToUser')
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
  console.log('getDeals')
  return (dispatch, getState) => {
    const auth_uid = getState().auth.uid.slice(0);
    if(!!auth_uid)
    {
    firebase.firestore()
      .collection('users')
      .doc(auth_uid)
      .get()
      .then(documentSnapshot => {
        let deals = []
        console.log(documentSnapshot)
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
              if (roopNum === Object.keys(dealsIds).length) {
                deals.sort(function (a, b) {
                  // あとでlastupdateに変える
                  return a.deal_last_at > b.deal_last_at ? -1 : 1;
                })
                dispatch(setDeals(deals));
              }
            })
            .catch(err => {
              console.log(err)
              alert(err)
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

}

export const setDeals = (deals) => {
  console.log('setDeals')
  return {
    type: SET_DEALS,
    deals: deals
  };
}