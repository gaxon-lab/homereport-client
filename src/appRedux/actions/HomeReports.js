import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import axios from 'util/Api'
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

export const onGetReportsList = (currentPage, itemsPerPage, filterText, updatingContent, status) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.get('/reports/list', {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterText,
        status: status
      }
    }).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_HOME_REPORTS, payload: data.data});
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

export const onGetReportDetail = (recordId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/reports/${recordId}`).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_REPORT_DETAIL, payload: data.data});
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

export const onAssignStaffToReport = (reportId, id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`reports/${reportId}/assign`, {user_id: id}).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ASSIGN_STAFF, payload: id})
        dispatch({type: SHOW_MESSAGE, payload: "The Report has been assigned to selected staff successfully"});
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

export const onNullifyCurrentReport = () => {
  return {
    type: NULLIFY_CURRENT_REPORT
  }
};

export const onGetReportComments = (reportId) => {
  return (dispatch) => {
    axios.get(`/reports/${reportId}/comments`).then(({data}) => {
      if (data.success) {
        const Comments = data.data.length > 0 ? data.data.reverse() : data.data;
        dispatch({type: GET_REPORT_COMMENTS, payload: Comments});
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

export const onAddNewComment = (reportId, message) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/reports/${reportId}/comments/store`, message).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_NEW_COMMENT, payload: data.data});
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

export const onGetReportDocuments = (reportId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/reports/${reportId}/media/list`).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_REPORT_DOCUMENTS, payload: data.data});
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

export const onAddReportDocument = (reportId, file) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/reports/${reportId}/media/upload`, file).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPLOAD_REPORT_DOCUMENT, payload: data.data});
        dispatch({type: SHOW_MESSAGE, payload: "The document has been uploaded successfully!"})
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

export const onDeleteHomeReport = (reportId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/reports/${reportId}`).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_HOME_REPORT, payload: reportId});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Selected Report has been deleted successfully"});
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

export const onSetSurveyDate = (reportId, details) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/reports/${reportId}/inspection/detail/store`, details).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SET_SURVEY_DATE, payload: data.data});
        dispatch({type: SHOW_MESSAGE, payload: "The  Survey Date has been assigned successfully!"})
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

export const onChangeReportStatus = (details) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/reports/update/status', details).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: CHANGE_REPORT_STATUS, payload: details});
        dispatch({type: SHOW_MESSAGE, payload: "The status of Selected Reports has been updated successfully!"})
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
