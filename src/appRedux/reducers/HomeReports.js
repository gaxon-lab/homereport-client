import {
  ADD_NEW_COMMENT,
  ASSIGN_STAFF,
  CHANGE_REPORT_STATUS,
  DELETE_HOME_REPORT,
  GET_HOME_REPORTS,
  GET_REPORT_COMMENTS,
  GET_REPORT_DETAIL,
  GET_REPORT_DOCUMENTS,
  NULLIFY_CURRENT_REPORT,
  SET_SURVEY_DATE,
  UPLOAD_REPORT_DOCUMENT
} from "../../constants/HomeReports";


const initialState = {
  reportsList: [],
  totalItems: null,
  currentReport: null,
  reportComments: [],
  reportDocuments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_REPORTS:
      return {
        ...state,
        reportsList: action.payload.data,
        totalItems: action.payload.total
      };

    case DELETE_HOME_REPORT:
      return {
        ...state,
        reportsList: state.reportsList.filter(report => report.report_id !== action.payload),
        totalItems: state.totalItems - 1
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

    case GET_REPORT_COMMENTS:
      return {
        ...state,
        reportComments: action.payload
      };

    case ADD_NEW_COMMENT:
      return {
        ...state,
        reportComments: [...state.reportComments, action.payload]
      };

    case GET_REPORT_DOCUMENTS:
      return {
        ...state,
        reportDocuments: action.payload
      };

    case UPLOAD_REPORT_DOCUMENT:
      return {
        ...state,
        reportDocuments: action.payload
      };

    case SET_SURVEY_DATE:
      return {
        ...state,
        currentReport: action.payload
      };

    case ASSIGN_STAFF:
      const report = state.currentReport;
      report.assigned_user_id = action.payload;
      return {
        ...state,
        currentReport: report
      };

    case CHANGE_REPORT_STATUS:
      const updatedReports = state.reportsList.map(report => {
        if (action.payload.report_ids.includes(report.report_id)) {
          report.status = action.payload.status;
          return report;
        } else {
          return report;
        }
      });
      return {
        ...state,
        reportsList: updatedReports
      };

    default:
      return state;
  }
}
