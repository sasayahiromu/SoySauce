import { TRY_AUTH, REGISTER_UID, REGISTER_NICKNAME } from './actionTypes';
import firebase from 'react-native-firebase';
import startMainTabs from '../../models/startMainTabs/startMainTabs'
import communityCorrespondingId from '../../utility/communityId'

//userの他の情報をあとで適用

export const tryAuth = (authData, authMode) => {
  console.log(authData);

  return dispatch => {
    // dispatch(uiStartLoading());
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
        const userData = {
          community_id: communityCorrespondingId(authData.apartmentName),
          nick_name: authData.nickname,
          room_id: authData.roomNumber
        }
        firebase.firestore()
        .collection('users')
        .doc(uid)
        .set(userData)
        .then(() => {
          dispatch(registerUid(uid))
          startMainTabs();
        })
        .catch(err => {
          alert('signUp failed. Try again.');
          console.log(err)
          // dispatch(uiStopLoading());
        })
        // dispatch(registerUid(uid))
        // startMainTabs();
      })
      .catch(err => {
        alert('Authentication failed. Try again.');
        console.log(err)
        // dispatch(uiStopLoading());
      })
  };
};

export const authSignin = authData => {
  return dispatch => {
    firebase.auth()
      .signInAndRetrieveDataWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        const uid = res.user._user.uid
        dispatch(registerUid(uid))
        // dispatch(uiStopLoading());
        startMainTabs();
      })
      .catch(err => {
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