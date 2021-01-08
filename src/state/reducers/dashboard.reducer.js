import {
    DASHBOARD_PACKET_GRAPH_FAILURE,
    DASHBOARD_PACKET_GRAPH_SUCCESS,
    DASHBOARD_PACKET_GRAPH_REQUEST
  } from "../constants/dashboard.constants";
  
  const initialState = {
    status: "uninit",
    error: null,
    data: null // This one contains expiresOn access_token refresh_token
  };
  
  export function packetCount(state = initialState, action) {
    switch (action.type) {
      case DASHBOARD_PACKET_GRAPH_REQUEST:
        return {
          ...state,
          error: null,
          status: "pending",
        };
      case DASHBOARD_PACKET_GRAPH_SUCCESS:
        return {
          ...state,
          status: "success",
          data: action.data
        };
      case DASHBOARD_PACKET_GRAPH_FAILURE:
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