import {
  ADD_NEW_COMMENT,
  GET_HOME_REPORTS,
  GET_REPORT_COMMENTS,
  GET_REPORT_DETAIL, GET_REPORT_DOCUMENTS,
  NULLIFY_CURRENT_REPORT, UPLOAD_REPORT_DOCUMENT
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
        reportDocuments: [...state.reportDocuments, action.payload]
      }

    default:
      return state;
  }
}
