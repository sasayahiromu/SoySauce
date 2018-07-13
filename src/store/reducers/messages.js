import {
  SET_MESSAGES,
  SET_INDIVIDUAL_MESSAGES,
  SET_DEALS,
  SEARCH_BAR_TEXT
} from "../actions/actionTypes";

const initialState = {
  messages: [],
  individualMessages: {},
  messagetriger: 0,
  deals: [],
  searchBarText: ''
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

    case SET_DEALS:
    return {
      ...state,
      deals: action.deals
    };

    case SEARCH_BAR_TEXT:
    return {
      ...state,
      searchBarText: action.text
    };

    default: return state;
  }
};

export default reducer;