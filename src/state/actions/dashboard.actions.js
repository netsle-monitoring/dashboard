import {
    DASHBOARD_PACKET_COUNT_FAILURE,
    DASHBOARD_PACKET_COUNT_SUCCESS,
    DASHBOARD_PACKET_COUNT_REQUEST
  } from "../constants/dashboard.constants";
  
  export function getPacketCount() {
    return (dispatch) => {
      dispatch(request());
      fetch("http://localhost:8000/dashboard/packet_count_graph", {
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          dispatch(success(body));
        })
        .catch((e) => dispatch(failure(e)));
    };
  
    function request() {
      return { type: DASHBOARD_PACKET_COUNT_REQUEST };
    }
  
    function success({
      data
    }) {
      return { type: DASHBOARD_PACKET_COUNT_SUCCESS, data };
    }
  
    function failure(error) {
      return { type: DASHBOARD_PACKET_COUNT_FAILURE, error };
    }
  }