import {GET_DASHBOARD_INFO} from "../../constants/Dashboard";

const initialState = {
  dashboardData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_INFO:
      return {
        ...state,
        dashboardData: action.payload
      };

    default:
      return state;
  }
}
