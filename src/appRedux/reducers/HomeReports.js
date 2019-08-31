import {GET_HOME_REPORTS, GET_REPORT_DETAIL, NULLIFY_CURRENT_REPORT} from "../../constants/HomeReports";


const initialState = {
  reportsList: [],
  totalItems: null,
  currentReport: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_REPORTS:
      return {
        ...state,
        reportsList: action.payload.data,
        totalItems: action.payload.total
      };

    case GET_REPORT_DETAIL:
      return {
        ...state,
        currentReport: action.payload
      };

    case NULLIFY_CURRENT_REPORT:
      return {
        ...state,
        currentReport: null
      };

    default:
      return state;
  }
}
