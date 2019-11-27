import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {GET_DASHBOARD_INFO} from "../../constants/Dashboard";

export const onGetDashboardInfo = () => {
  return (dispatch) => {
      dispatch({type: FETCH_START});
    axios.get('/dashboard').then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_DASHBOARD_INFO, payload: data.data});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    });
  }
};
