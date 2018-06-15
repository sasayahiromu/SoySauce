import { TRY_AUTH, REGISTER_UID, REGISTER_NICKNAME } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index'
import firebase from 'react-native-firebase';
import startMainTabs from '../../models/startMainTabs/startMainTabs'
import communityCorrespondingId from '../../utility/communityId'

//userの他の情報をあとで適用

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    if (authMode === "login") {
      dispatch(authSignin(authData))
    } else {
      dispatch(authSignup(authData))
    }
  }
};

export const authSignup = authData => {
  return dispatch => {
    firebase.auth()
      .createUserAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        const uid = res.user._user.uid;
        const community_id = communityCorrespondingId(authData.apartmentName);
        const userData = {
          community_id: community_id,
          nick_name: authData.nickname,
          room_id: authData.roomNumber,
          deals: {}
        }
        firebase.firestore()
        .collection('users')
        .doc(uid)
        .set(userData)
        .then(() => {
          dispatch(uiStopLoading());
          dispatch(registerUid(uid))
          startMainTabs();

          firebase.firestore()
          .collection('communities')
          .doc(community_id)
          .get()
          .then(documentSnapshot => {
            let users = documentSnapshot._data.users;
            users[uid] = true
            firebase.firestore()
            .collection('communities')
            .doc(community_id)
            .update({users: users})
          })
          .catch(err => {
            console.log(err)
            alert('community register error');
          })
  
        })
        .catch(err => {
          dispatch(uiStopLoading());
          alert('signUp failed. Try again.');
          console.log(err)
          // dispatch(uiStopLoading());
        })
        // dispatch(registerUid(uid))
        // startMainTabs();
      // )
      })
      .catch(err => {
        dispatch(uiStopLoading());
        alert('Authentication failed. Try again.');
        console.log(err)
        // dispatch(uiStopLoading());
      })
      
  };
};

export const authSignin = authData => {
  return dispatch => {
    console.log(authData)
    firebase.auth()
      .signInAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        dispatch(uiStopLoading());
        console.log(res);
        const uid = res.user._user.uid
        dispatch(registerUid(uid))
        // dispatch(uiStopLoading());
        startMainTabs();
      })
      .catch(err => {
        dispatch(uiStopLoading());
        alert('Authentication failed. Try again.');
        console.log(err)
        // dispatch(uiStopLoading());
      })
  }
}

export const registerUser = uid => {
  return dispatch => {
    firebase.firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        console.log(documentSnapshot._data)
        dispatch(registerUid(uid))
        dispatch(registerNickname(documentSnapshot._data.nick_name));
      })
      .catch(err => {
        console.log(err);
        alert('something error happen')
      })

  }
}

export const registerUid = uid => {
  console.log(uid)
  return {
    type: REGISTER_UID,
    uid: uid
  };
};

export const registerNickname = nickname => {
  return {
    type: REGISTER_NICKNAME,
    nickname: nickname
  };
}