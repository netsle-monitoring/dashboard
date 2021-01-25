import {
  DASHBOARD_PACKET_GRAPH_FAILURE,
  DASHBOARD_PACKET_GRAPH_SUCCESS,
  DASHBOARD_PACKET_GRAPH_REQUEST,
  DASHBOARD_TOTAL_PACKETS_FAILURE,
  DASHBOARD_TOTAL_PACKETS_REQUEST,
  DASHBOARD_TOTAL_PACKETS_SUCCESS,
  DASHBOARD_TOTAL_USAGE_FAILURE,
  DASHBOARD_TOTAL_USAGE_REQUEST,
  DASHBOARD_TOTAL_USAGE_SUCCESS,
  DASHBOARD_PORTS_COUNT_FAILURE,
  DASHBOARD_PORTS_COUNT_REQUEST,
  DASHBOARD_PORTS_COUNT_SUCCESS
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

const initialTotalUsageState = {
  status: "uninit",
  error: null,
  usage: null
};

export function totalUsage(state = initialTotalUsageState, action) {
  switch (action.type) {
    case DASHBOARD_TOTAL_USAGE_REQUEST:
      return {
        ...state,
        error: null,
        status: "pending",
      };
    case DASHBOARD_TOTAL_USAGE_SUCCESS:
      return {
        ...state,
        status: "success",
        data: action.usage
      };
    case DASHBOARD_TOTAL_USAGE_FAILURE:
      return {
        status: "error",
        error: action.error,
      };
    default:
      return state;
  }
}

const initialPortsCountState = {
  status: "uninit",
  error: null,
  usage: null
};

export function portsCount(state = initialPortsCountState, action) {
  switch (action.type) {
    case DASHBOARD_PORTS_COUNT_REQUEST:
      return {
        ...state,
        error: null,
        status: "pending",
      };
    case DASHBOARD_PORTS_COUNT_SUCCESS:
      return {
        ...state,
        status: "success",
        data: action.ports
      };
    case DASHBOARD_PORTS_COUNT_FAILURE:
      return {
        status: "error",
        error: action.error,
      };
    default:
      return state;
  }
}