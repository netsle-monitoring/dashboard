import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
} from "../constants/user.constants";
import ApiService from '../../service/api';
import { stringify } from "querystring";

export function login(username, password) {
  return async (dispatch) => {
    dispatch(request());
    try {
      let body = await ApiService.login(username, password);
      dispatch(success(body));
    } catch (e) {
      dispatch(failure(e.message));
    }
  };

  function request() {
    return { type: LOGIN_REQUEST };
  }

  function success({
    access_token: accessToken,
    expiry: expiresOn,
    refresh_token: refreshToken,
  }) {
    return { type: LOGIN_SUCCESS, accessToken, expiresOn, refreshToken };
  }

  function failure(error) {
    return { type: LOGIN_FAILURE, error };
  }
}

export function refreshToken() {
  return async (dispatch) => {
    dispatch(request());
    try {
      let body = await ApiService.refresh();
      dispatch(success(body));
    } catch (e) {
      dispatch(failure(e.message));
    }
  };

  function request() {
    return { type: REFRESH_TOKEN_REQUEST };
  }

  function success({
    access_token: accessToken,
    expiry: expiresOn,
    refresh_token: refreshToken,
  }) {
    return {
      type: REFRESH_TOKEN_SUCCESS,
      accessToken,
      expiresOn,
      refreshToken,
    };
  }

  function failure(error) {
    return { type: REFRESH_TOKEN_FAILURE, error };
  }
}
