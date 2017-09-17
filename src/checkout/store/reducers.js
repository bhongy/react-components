const initialState = {
  isFetching: false,
  data: null,
};

function rootReducer(state = initialState, action) {
  // const { offer } = action.payload;
  switch (action.type) {
    case 'CHECK_OFFER_CODE':
      return { ...state, isFetching: true };
    case 'RECEIVE_OFFER_CODE':
      return {
        ...state,
        // ...(offer ? { offer } : { isCodeInvalid: true }),
        isFetching: false,
      };
    default:
      return state;
  }
}

export default rootReducer;
