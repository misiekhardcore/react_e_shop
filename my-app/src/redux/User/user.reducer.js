import userTypes from "./user.types";

const INITIAL_STATES = {
  currentUser: null,
  resetPasswordSuccess: false,
  userErr: [],
};

const userReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErr: [],
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.SIGN_IN_GOOGLE_START:
      return {
        ...state,
      };
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATES,
      };
    default:
      return state;
  }
};

export default userReducer;
