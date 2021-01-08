import {
    DASHBOARD_PACKET_GRAPH_FAILURE,
    DASHBOARD_PACKET_GRAPH_SUCCESS,
    DASHBOARD_PACKET_GRAPH_REQUEST
  } from "../constants/dashboard.constants";
  import ServiceApi from '../../service/api';

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
  
    function success({
      data
    }) {
      return { type: DASHBOARD_PACKET_GRAPH_SUCCESS, data };
    }
  
    function failure(error) {
      return { type: DASHBOARD_PACKET_GRAPH_FAILURE, error };
    }
  }