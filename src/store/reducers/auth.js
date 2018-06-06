import {
  REGISTER_UID
} from "../actions/actionTypes";

const initialState = {
  messages: []
};

const reducer = (state = initialState, action) => {
  switch (action.type){

    case REGISTER_UID:
    return {
      ...state,
      uid: action.uid
    };

    default: return state;
  }
};

export default reducer;