import {
  DASHBOARD_PACKET_GRAPH_FAILURE,
  DASHBOARD_PACKET_GRAPH_SUCCESS,
  DASHBOARD_PACKET_GRAPH_REQUEST,
  DASHBOARD_TOTAL_PACKETS_FAILURE,
  DASHBOARD_TOTAL_PACKETS_REQUEST,
  DASHBOARD_TOTAL_PACKETS_SUCCESS,
} from "../constants/dashboard.constants";
import ServiceApi from "../../service/api";

export function getPacketGraph() {
  return async (dispatch) => {
    dispatch(request());
    try {
      let result = await ServiceApi.getDashboardPacketGraph();
      dispatch(success(result));
    } catch (e) {
      dispatch(failure(e.message));
    }
  };

  function request() {
    return { type: DASHBOARD_PACKET_GRAPH_REQUEST };
  }

  function success({ data }) {
    return { type: DASHBOARD_PACKET_GRAPH_SUCCESS, data };
  }

  function failure(error) {
    return { type: DASHBOARD_PACKET_GRAPH_FAILURE, error };
  }
}

export function getTotalPackets() {
  return async (dispatch) => {
    dispatch(request());
    try {
      let result = await ServiceApi.getDashboardTotalPackets();
      dispatch(success(result));
    } catch (e) {
      dispatch(failure(e.message));
    }
  };

  function request() {
    return { type: DASHBOARD_TOTAL_PACKETS_REQUEST };
  }

  function success({count}) {
    return { type: DASHBOARD_TOTAL_PACKETS_SUCCESS, count };
  }

  function failure(error) {
    return { type: DASHBOARD_TOTAL_PACKETS_FAILURE, error };
  }
}
