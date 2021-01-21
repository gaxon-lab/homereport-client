import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {
  ADD_NEW_QUOTE, CHANGE_QUOTE_REQUESTS_STATUS,
  FILTER_QUOTE_LIST,
  GET_PROPERTY_OPTIONS,
  GET_QUOTE_DETAIL,
  GET_QUOTES_LIST,
  NULLIFY_CURRENT_QUOTE
} from "../../constants/QuoteRequests";
import {DECREASE_QUOTE_REQUESTS, INCREASE_CUSTOMER_QUOTES} from "../../constants/Customers";

export const onGetQuotesList = (currentPage, itemsPerPage, filterText, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.get('/quotes/requests/list', {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterText
      }
    }).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_QUOTES_LIST, payload: data.data});
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

export const onGetQuoteRequestDetail = (recordId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`quotes/requests/${recordId}`).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_QUOTE_DETAIL, payload: data.data});
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

export const onGetPropertyOptions = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/customer/property/options').then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_PROPERTY_OPTIONS, payload: data.data});
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

export const onAddNewQuote = (customerId, details) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`quotes/requests/customer/${customerId}`, details).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_NEW_QUOTE, payload: data.data});
        dispatch({type: INCREASE_CUSTOMER_QUOTES, payload: customerId})
        dispatch({type: SHOW_MESSAGE, payload: "The Quote Request has been successfully Raised!"})
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

export const onUpdatePaymentDetail = (quoteId, details, customerId, quoteFilterFunction) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`quotes/requests/${quoteId}/update`, details).then(({data}) => {
      if (data.success) {
        quoteFilterFunction(quoteId);
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Payment Details has been successfully Updated!"});
        dispatch({type: FILTER_QUOTE_LIST, payload: quoteId})
        dispatch({type: DECREASE_QUOTE_REQUESTS, payload: {customerId: customerId, quoteId: quoteId}});
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

export const onNullifyCurrentQuote = () => {
  return {
    type: NULLIFY_CURRENT_QUOTE
  }
};

export const changeQuoteRequestsStatus = (postData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/quotes/update/status', postData).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: CHANGE_QUOTE_REQUESTS_STATUS, payload: postData});
        dispatch({type: SHOW_MESSAGE, payload: "The status of selected Quote requests has been updated successfully!"})
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
