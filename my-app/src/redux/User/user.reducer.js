import userTypes from "./user.types";

const INITIAL_STATES = {
  currentUser: null,
  signInSuccess: false,
  signUPSuccess: false,
  signUpError: [],
  reserPassSuccess: false,
  resetPassError: [],
  signInGoogleSuccess: false,
  signInGoogleError: [],
};

const userReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload,
      };
    case userTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: action.payload,
      };
    case userTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case userTypes.RESET_PASS_SUCCESS:
      return {
        ...state,
        resetPassSuccess: action.payload,
      };
    case userTypes.RESET_PASS_ERROR:
      return {
        ...state,
        resetPassError: action.payload,
      };
    case userTypes.SIGN_IN_GOOGLE_SUCCESS:
      return {
        ...state,
        signInGoogleSuccess: action.payload,
      };
    case userTypes.signInGoogleError:
      return {
        ...state,
        signInGoogleError: action.payload,
      };
    case userTypes.RESET_AUTH_FORM:
      return {
        ...state,
        signInSuccess: false,
        signUPSuccess: false,
        signUpError: [],
        reserPassSuccess: false,
        resetPassError: [],
        signInGoogleSuccess: false,
        signInGoogleError: [],
      };
    default:
      return state;
  }
};

export default userReducer;
