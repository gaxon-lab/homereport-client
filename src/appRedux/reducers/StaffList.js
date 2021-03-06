import {
  ADD_NEW_STAFF,
  BULK_DELETE_SUPPORT_STAFF,
  EDIT_STAFF_DETAILS,
  GET_STAFF_LIST, GET_USER_PERMISSION,
  STAFF_STATUS_CHANGE
} from "../../constants/StaffList";


const initialState = {
  staffList: [],
  totalItems: null,
  selectedStaffPermissions: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STAFF_LIST:
      return {
        ...state,
        staffList: action.payload.data,
        totalItems: action.payload.total
      };

    case ADD_NEW_STAFF:
      return {
        ...state,
        staffList: [action.payload, ...state.staffList],
        totalItems: state.totalItems + 1,
      };

    case EDIT_STAFF_DETAILS:
      const updatedStaffList = state.staffList.map((member) => member.id === action.payload.id ? action.payload : member);
      return {
        ...state,
        staffList: updatedStaffList
      };

    case STAFF_STATUS_CHANGE:
      const updatedStaff = state.staffList.map(staff => {
        if (action.payload.id.indexOf(staff.id) !== -1) {
          staff.status = action.payload.status;
          return staff;
        }
        return staff;
      });
      return {
        ...state,
        staffList: updatedStaff
      };

    case BULK_DELETE_SUPPORT_STAFF:
      return {
        ...state,
        staffList: state.staffList.filter(member => (action.payload.indexOf(member.id) === -1)),
        totalItems: state.totalItems - action.payload.length
      };

    case GET_USER_PERMISSION:
      return {
        ...state,
        selectedStaffPermissions: action.payload
      };

    default:
      return state;
  }
}
