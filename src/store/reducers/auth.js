import {
  REGISTER_UID,
  REGISTER_NICKNAME
} from "../actions/actionTypes";

const initialState = {
  uid: "",
  nickname: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case REGISTER_UID:
    return {
      ...state,
      uid: action.uid
    };

    case REGISTER_NICKNAME:
    return {
      ...state,
      nickname: action.nickname
    };

    default: return state;
  }
};

export default reducer;