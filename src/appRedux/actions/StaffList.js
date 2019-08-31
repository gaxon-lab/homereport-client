import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import {ADD_NEW_STAFF, DELETE_STAFF, EDIT_STAFF_DETAILS, GET_STAFF_LIST} from "../../constants/StaffList";
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

export const onDeleteStaff = (staffId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/staffs/${staffId}`).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_STAFF, payload: staffId});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The selected Staff has been deleted successfully"});
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

// export const onChangeStaffStatus = (staffId, status, updatingContent, context) => {
//   const {messages} = context.props.intl;
//   return (dispatch) => {
//       dispatch({type: FETCH_START});
//     axios.post(`/setup`, staffId).then(({data}) => {
//       if (data.success) {
//         dispatch({type: STAFF_STATUS_CHANGE, payload: {id: data.data, status: status}});
//         dispatch({type: FETCH_SUCCESS});
//         dispatch({
//           type: SHOW_MESSAGE,
//           payload: status === 0 ? "" : messages["action.staff.active"]
//         });
//       } else if (data.message) {
//         dispatch({type: FETCH_ERROR, payload: data.message});
//       } else {
//         dispatch({type: FETCH_ERROR, payload: data.errors[0]});
//       }
//     }).catch(function (error) {
//       dispatch({type: FETCH_ERROR, payload: error.message});
//       console.info("Error****:", error.message);
//     });
//   }
// };
