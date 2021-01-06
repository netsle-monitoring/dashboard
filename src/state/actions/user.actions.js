import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
} from "../constants/user.constants";

import { stringify } from "querystring";

export function login(username, password) {
  return (dispatch) => {
    dispatch(request());
    fetch("http://localhost:8000/login", {
      method: "POST",
      body: stringify({ username, password }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        if (res.status === 400) throw "Invalid Credentials.";
        return res.json();
      })
      .then((body) => {
        dispatch(success(body));
      })
      .catch((e) => dispatch(failure(e)));
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

export function refreshToken(token) {
  return (dispatch) => {
    dispatch(request());
    fetch("http://localhost:8000/refresh_token", {
      method: "POST",
      body: "",
      headers: {
        "Refresh-Token": token,
      },
    })
      .then((res) => {
        if (res.status === 400) throw "Invalid Token.";
        if (res.status === 403) throw "Expired Token.";
        return res.json();
      })
      .then((body) => {
        setTimeout(() => {
          dispatch(success(body));
        }, 5000)
      })
      .catch((e) => dispatch(failure(e)));
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
