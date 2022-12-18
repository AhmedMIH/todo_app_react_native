import api from '../api';
import {
  LOGIN_SUBMIT_START,
  LOGIN_SUBMIT_FAILED,
  LOGIN_SUBMIT_SUCESS,
  Signup_SUBMIT_FAILED,
  Signup_SUBMIT_SUCESS,
  Signup_SUBMIT_START,
  Change_Password_SUBMIT_START,
  Change_Password_SUBMIT_FAILED,
  Change_Password_SUBMIT_SUCESS,
} from './types';
import {AsyncStorage} from 'react-native';
import constants from '../common/constants';
import {removeAllItem} from '../common/commonFunction';
import RNRestart from 'react-native-restart';

export function sumbitLogin(navigation, email, password) {
  return async dispatch => {
    if (email == null || email.length == 0)
      return handleLoginRequestError('please enter your email', dispatch);

    if (password == null || password.length == 0)
      return handleLoginRequestError('please enter your password', dispatch);

    dispatch({
      type: LOGIN_SUBMIT_START,
    });
    let params = {
      email: email,
      password: password,
    };
    let response = await api.login(params),
      responseJson;
    if (constants.successStatusCode.includes(response.status)) {
      /* Handling response */
      responseJson = await response.json();
      dispatch(handleLoginSuccess(responseJson, navigation));
    }
    if (constants.errorStatusCodeWithResponse.includes(response.status)) {
      responseJson = await response.json();
      return handleLoginRequestError(responseJson, dispatch);
    } else {
      return handleLoginRequestError(null, dispatch);
    }
  };
}

handleLoginSuccess = async (response, navigation) => {
  await saveUserInfo(navigation, response.name, response.email, response.token);
  return {
    type: LOGIN_SUBMIT_SUCESS,
  };
};

handleLoginRequestError = (response, dispatch) => {
  let errorMessage;
  if (response == (null || undefined))
    errorMessage = 'something wrong please try agin later';
  if (typeof response == 'string') errorMessage = response;
  if (typeof response == 'object') errorMessage = response?.message;

  dispatch({
    type: LOGIN_SUBMIT_FAILED,
    errorMessage: errorMessage,
  });
};

export function sumbitRegister(navigation, name, email, password) {
  return async dispatch => {
    if (email == null || email.length == 0)
      return handleLoginRequestError('please enter your email', dispatch);

    if (password == null || password.length == 0)
      return handleLoginRequestError('please enter your password', dispatch);

    if (name == null || name.length == 0)
      return handleLoginRequestError('please enter your name', dispatch);

    dispatch({
      type: Signup_SUBMIT_START,
    });
    let params = {
      name: name,
      email: email,
      password: password,
    };
    let response = await api.register(params),
      responseJson;

    if (response) {
      if (constants.successStatusCode.includes(response?.status)) {
        responseJson = await response.json();
        dispatch(handleRegisterSuccess(responseJson, navigation));
      }
      if (constants.errorStatusCodeWithResponse.includes(response?.status)) {
        responseJson = await response.json();
        return handleRegisterRequestError(responseJson, dispatch);
      } else {
        return handleRegisterRequestError(null, dispatch);
      }
    }
  };
}

handleRegisterSuccess = async (response, navigation) => {
  await saveUserInfo(navigation, response.name, response.email, response.token);

  return {
    type: Signup_SUBMIT_SUCESS,
  };
};

handleRegisterRequestError = (response, dispatch) => {
  let errorMessage;
  if (response == (null || undefined))
    errorMessage = 'something wrong please try agin later';
  if (typeof response == 'string') errorMessage = response;
  if (typeof response == 'object')
    errorMessage = response?.message || 'something wrong please try agin later';
  dispatch({
    type: Signup_SUBMIT_FAILED,
    errorMessage: errorMessage,
  });
};

export async function saveUserInfo(navigation, name, email, token) {
  try {
    await AsyncStorage.multiSet(
      [
        [constants.NAME_KEY, name],
        [constants.EMAIL_KEY, email],
        [constants.TOKEN_KEY, token],
      ],
      () => {
        navigation.navigate(constants.HomeScreen);
      },
    );
  } catch (error) {
    console.log(error);
  }
}

export function changePassword(oldPass, newPass) {
  return async dispatch => {
    if (oldPass === null || oldPass.length == 0)
      return handleChangePasswordError(
        'old password or new password are empty',
        dispatch,
      );
    if (newPass === null || newPass.length == 0)
      return handleChangePasswordError(
        'old password or new password are empty',
        dispatch,
      );

    if (oldPass && newPass) {
      dispatch({
        type: Change_Password_SUBMIT_START,
      });
      let params = {
        oldPassword: oldPass,
        newPassword: newPass,
      };
      let response = await api.changePassword(params);
      if (constants.successStatusCode.includes(response?.status)) {
        dispatch(handleChangePasswordSuccess());
      }
      if (constants.errorStatusCodeWithResponse.includes(response?.status)) {
        const responseJson = await response.json();
        return handleChangePasswordError(responseJson, dispatch);
      } else {
        return handleChangePasswordError(null, dispatch);
      }
    }
  };
}

handleChangePasswordSuccess = async () => {
  await removeAllItem();
  RNRestart.Restart();
  return {
    type: Change_Password_SUBMIT_SUCESS,
  };
};
handleChangePasswordError = (response, dispatch) => {
  let errorMessage;
  if (response == (null || undefined))
    errorMessage = 'something wrong please try agin later';
  if (typeof response == 'string') errorMessage = response;
  if (typeof response == 'object')
    errorMessage = response?.message || 'something wrong please try agin later';

  dispatch({
    type: Change_Password_SUBMIT_FAILED,
    errorMessage: errorMessage,
  });
};
