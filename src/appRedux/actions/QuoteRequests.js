import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {
  ADD_NEW_QUOTE,
  GET_PROPERTY_OPTIONS,
  GET_QUOTE_DETAIL,
  GET_QUOTES_LIST,
  NULLIFY_CURRENT_QUOTE
} from "../../constants/QuoteRequests";
import {INCREASE_CUSTOMER_QUOTES} from "../../constants/Customers";

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
      console.info("onGetQuotesList: ", data);
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
      console.info("Error****:", error.message);
    });
  }
};

export const onGetQuoteRequestDetail = (recordId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`quotes/requests/${recordId}`).then(({data}) => {
      console.info("onGetQuoteRequestDetail: ", data);
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
      console.info("Error****:", error.message);
    });
  }
};

export const onGetPropertyOptions = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/customer/property/options').then(({data}) => {
      console.info("onGetPropertyOptions: ", data);
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
      console.info("Error****:", error.message);
    });
  }
};

export const onAddNewQuote = (customerId, details) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`quotes/requests/customer/${customerId}`, details).then(({data}) => {
      console.info("onAddNewQuote: ", data);
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
      console.info("Error****:", error.message);
    });
  }
};


export const onNullifyCurrentQuote = () => {
  return {
    type: NULLIFY_CURRENT_QUOTE
  }
}
