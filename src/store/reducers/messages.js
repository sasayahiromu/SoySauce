import {
  SET_MESSAGES,
  SET_INDIVIDUAL_MESSAGES
} from "../actions/actionTypes";

const initialState = {
  messages: [],
  individualMessages: {},
  messagetriger: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type){

    case SET_MESSAGES:
    return {
      ...state,
      messages: action.messages
    };

    case SET_INDIVIDUAL_MESSAGES:
    const newState = state.individualMessages;
    newState[action.messageId] = action.messages;
    ///messagetrigerは、javascriptにindividualMessagesの変化を通知するため
    return {
      ...state,
      individualMessages: newState,
      messagetriger: state.messagetriger + 1
    };

    default: return state;
  }
};

export default reducer;