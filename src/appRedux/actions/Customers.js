import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {
  ADD_NEW_CUSTOMER,
  EDIT_CUSTOMER_DETAILS,
  GET_CUSTOMER_ADDRESS,
  GET_CUSTOMER_DETAIL,
  GET_CUSTOMER_QUOTES,
  GET_CUSTOMERS_LIST,
  GET_CUSTOMERS_REPORTS,
  NULLIFY_CUSTOMER_DETAIL,
  NULLIFY_CUSTOMER_QUOTES,
  NULLIFY_CUSTOMER_REPORTS
} from "../../constants/Customers";

export const onGetCustomersList = (currentPage, itemsPerPage, filterText, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.get('/customers', {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterText
      }
    }).then(({data}) => {
      console.info("onGetCustomersList: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMERS_LIST, payload: data.data});
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

export const onSearchCustomers = (filterText) => {
  return (dispatch) => {
    axios.get('/customers', {
      params: {
        search: filterText
      }
    }).then(({data}) => {
      console.info("onGetCustomersList: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMERS_LIST, payload: data.data});
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

export const onGetCustomerDetail = (customerId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/customers/${customerId}`).then(({data}) => {
      console.info("onGetCustomerDetail: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMER_DETAIL, payload: data.data});
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

export const onAddNewCustomer = (details) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/customers', details).then(({data}) => {
      console.log("onAddNewCustomer", data);
      if (data.success) {
        dispatch({type: ADD_NEW_CUSTOMER, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The new Customer has been added successfully"});
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

export const onEditCustomerDetails = (details, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.put(`/customers/${details.id}`, details).then(({data}) => {
      if (data.success) {
        dispatch({type: EDIT_CUSTOMER_DETAILS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Customer details has been updated successfully"});
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

export const onGetCustomerQuotes = (customerId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/customers/${customerId}/quote/requests`).then(({data}) => {
      console.info("onGetCustomerQuotes: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMER_QUOTES, payload: data.data});
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

export const onGetCustomerReports = (customerId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/customers/${customerId}/reports`).then(({data}) => {
      console.info("onGetCustomerReports: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMERS_REPORTS, payload: data.data});
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

export const onDownloadCustomerList = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get("/customers/export/data").then(({data}) => {
      console.info("onDownloadCustomerList: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        // dispatch({type: GET_CUSTOMER_DETAIL, payload: data.data});
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

export const onGetCustomerAddress = (customerId, type) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`addresses/${type}/customer/${customerId}`).then(({data}) => {
      console.info("onGetCustomerAddress: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMER_ADDRESS, payload: data.data});
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

export const onNullifyCustomerDetails = () => {
  return {
    type: NULLIFY_CUSTOMER_DETAIL
  }
};

export const onNullifyCustomerQuotes = () => {
  return {
    type: NULLIFY_CUSTOMER_QUOTES
  }
};

export const onNullifyCustomerReports = () => {
  return {
    type: NULLIFY_CUSTOMER_REPORTS
  }
};
