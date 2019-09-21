import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import {
  ADD_NEW_STAFF,
  BULK_DELETE_SUPPORT_STAFF,
  EDIT_STAFF_DETAILS,
  GET_STAFF_LIST,
  GET_USER_PERMISSION
} from "../../constants/StaffList";
import axios from 'util/Api'


export const onGetStaff = (currentPage, itemsPerPage, filterText, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.get('/staffs', {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterText
      }
    }).then(({data}) => {
      console.info("onGetStaff: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_STAFF_LIST, payload: data.data});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddStaffMember = (staffMember) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/staffs', staffMember).then(({data}) => {
      console.log("onAddSupportStaff", data);
      if (data.success) {
        dispatch({type: ADD_NEW_STAFF, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The new Staff member has been added successfully"});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditStaffMember = (staffMember, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.put(`/staffs/${staffMember.id}`, staffMember).then(({data}) => {
      if (data.success) {
        dispatch({type: EDIT_STAFF_DETAILS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The staff details has been updated successfully"});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDeleteStaff = (staffIds, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.post('/staffs/delete', staffIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_SUPPORT_STAFF, payload: staffIds.ids});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Selected Staff(s) have been deleted successfully"});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetSelectedStaffPermission = (staffId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/user/${staffId}/permissions`, staffId).then(({data}) => {
      console.log("onGetSelectedStaffPermission", data);
      if (data.success) {
        dispatch({type: GET_USER_PERMISSION, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
