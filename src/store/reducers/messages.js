const initialState = {
  messages: []
};

const reducer = (state = initialState, action) => {
  switch (action.type){

    case SET_MESSAGES:
    return {
      ...state,
      messages: action.messages
    };

    default: return state;
  }
};

export default reducer;