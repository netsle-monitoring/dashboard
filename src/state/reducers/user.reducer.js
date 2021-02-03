import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  SIGNOUT_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS
} from "../constants/user.constants";

const initialState = {
  status: "uninit",
  error: null,
  loginAssets: null // This one contains expiresOn access_token refresh_token
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        status: "uninit",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: "success",
        loginAssets: action
      };
    case LOGIN_FAILURE:
      return {
        status: "error",
        error: action.error,
      };
    //   case userConstants.LOGOUT:
    //     return {};
    default:
      return state;
  }
}

export function refreshToken(state = initialState, action) {
  switch (action.type) {
    case REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        status: "pending",
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        status: "success",
        loginAssets: action
      };
    case REFRESH_TOKEN_FAILURE:
      return {
        status: "error",
        error: action.error,
      };
    //   case userConstants.LOGOUT:
    //     return {};
    default:
      return state;
  }
}

export function signout(state = initialState, action) {
  switch (action.type) {
    case SIGNOUT_REQUEST:
      return {
        ...state,
        status: "pending",
      };
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        status: "success",
      };
    case SIGNOUT_FAILURE:
      return {
        status: "error",
        error: action.error,
      };
    //   case userConstants.LOGOUT:
    //     return {};
    default:
      return state;
  }
}
