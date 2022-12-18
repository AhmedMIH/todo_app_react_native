import {
  LOGIN_SUBMIT_START,
  LOGIN_SUBMIT_FAILED,
  LOGIN_SUBMIT_SUCESS,
  Signup_SUBMIT_START,
  Signup_SUBMIT_FAILED,
  Signup_SUBMIT_SUCESS,
  Change_Password_SUBMIT_START,
  Change_Password_SUBMIT_SUCESS,
  Change_Password_SUBMIT_FAILED,
} from '../actions/types';

const INIT_STATE = {
  errorMessage: null,
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUBMIT_START:
      return {...state, loading: true, errorMessage: null};
    case LOGIN_SUBMIT_SUCESS:
      return {...state, loading: false, errorMessage: null};
    case LOGIN_SUBMIT_FAILED:
      return {...state, loading: false, errorMessage: action.errorMessage};

    case Signup_SUBMIT_START:
      return {...state, loading: true, errorMessage: null};
    case Signup_SUBMIT_SUCESS:
      return {...state, loading: false, errorMessage: null};
    case Signup_SUBMIT_FAILED:
      return {...state, loading: false, errorMessage: action.errorMessage};

    case Change_Password_SUBMIT_START:
      return {...state, loading: true, errorMessage: null};
    case Change_Password_SUBMIT_SUCESS:
      return {...state, loading: false, errorMessage: null};
    case Change_Password_SUBMIT_FAILED:
      return {...state, loading: false, errorMessage: action.errorMessage};

    default:
      return state;
  }
};
