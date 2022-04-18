const formReducer = (state, action) => {
  switch (action.type) {
    case "GET_FORM_DATA":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default formReducer;
