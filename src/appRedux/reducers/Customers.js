import {
  GET_CUSTOMER_QUOTES,
  GET_CUSTOMERS_LIST,
  GET_CUSTOMERS_REPORTS,
  NULLIFY_CUSTOMER_QUOTES, NULLIFY_CUSTOMER_REPORTS
} from "../../constants/Customers";


const initialState = {
  customersList: [],
  totalItems: null,
  customerQuotes: [],
  customerReports: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_LIST:
      return {
        ...state,
        customersList: action.payload.data,
        totalItems: action.payload.total
      };

    case GET_CUSTOMER_QUOTES:
      return {
        ...state,
        customerQuotes: action.payload.data,
      };

    case GET_CUSTOMERS_REPORTS:
      return {
        ...state,
        customerReports: action.payload.data,
      };

    case NULLIFY_CUSTOMER_QUOTES: {
      return {
        ...state,
        customerQuotes: []
      }
    }

    case NULLIFY_CUSTOMER_REPORTS: {
      return {
        ...state,
        customerReports: []
      }
    }

    default:
      return state;
  }
}
