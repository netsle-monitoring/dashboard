import {
    DASHBOARD_PACKET_GRAPH_FAILURE,
    DASHBOARD_PACKET_GRAPH_SUCCESS,
    DASHBOARD_PACKET_GRAPH_REQUEST,
    DASHBOARD_TOTAL_PACKETS_FAILURE,
    DASHBOARD_TOTAL_PACKETS_REQUEST,
    DASHBOARD_TOTAL_PACKETS_SUCCESS
  } from "../constants/dashboard.constants";
  
  const initialPacketGraphState = {
    status: "uninit",
    error: null,
    data: null // This one contains expiresOn access_token refresh_token
  };
  
  export function packetCountGraph(state = initialPacketGraphState, action) {
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

  const initialTotalPacketsState = {
    status: "uninit",
    error: null,
    data: null // This one contains expiresOn access_token refresh_token
  };
  
  export function totalPackets(state = initialTotalPacketsState, action) {
    console.log("ACTIONNNN", action);
    switch (action.type) {
      case DASHBOARD_TOTAL_PACKETS_REQUEST:
        return {
          ...state,
          error: null,
          status: "pending",
        };
      case DASHBOARD_TOTAL_PACKETS_SUCCESS:
        return {
          ...state,
          status: "success",
          data: action.count
        };
      case DASHBOARD_TOTAL_PACKETS_FAILURE:
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