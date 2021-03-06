import {
  ADD_CUSTOMER_ADDRESS,
  ADD_NEW_CUSTOMER,
  DECREASE_QUOTE_REQUESTS,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER_DETAILS,
  GET_CUSTOMER_ADDRESS,
  GET_CUSTOMER_DETAIL,
  GET_CUSTOMER_QUOTES,
  GET_CUSTOMERS_LIST,
  GET_CUSTOMERS_REPORTS,
  INCREASE_CUSTOMER_QUOTES,
  NULLIFY_CUSTOMER_DETAIL,
  NULLIFY_CUSTOMER_QUOTES,
  NULLIFY_CUSTOMER_REPORTS
} from "../../constants/Customers";


const initialState = {
  customersList: [],
  totalItems: null,
  currentCustomer: null,
  customerQuotes: [],
  customerReports: [],
  customerAddresses: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_LIST:
      return {
        ...state,
        customersList: action.payload.data,
        totalItems: action.payload.total
      };

    case ADD_NEW_CUSTOMER:
      return {
        ...state,
        customersList: [action.payload, ...state.customersList],
        totalItems: state.totalItems + 1,
      };

    case EDIT_CUSTOMER_DETAILS:
      const updatedCustomerList = state.customersList.map((customer) => customer.id === action.payload.id ? action.payload : customer);
      return {
        ...state,
        customersList: updatedCustomerList
      };

    case DELETE_CUSTOMER:
      return {
        ...state,
        customersList: state.customersList.filter(customer => customer.id !== action.payload),
        totalItems: state.totalItems - 1
      };

    case GET_CUSTOMER_DETAIL:
      return {
        ...state,
        currentCustomer: action.payload
      };

    case NULLIFY_CUSTOMER_DETAIL:
      return {
        ...state,
        currentCustomer: null
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

    case INCREASE_CUSTOMER_QUOTES:
      const updatedList = state.customersList.map(customer => {
        if (customer.id === action.payload) {
          customer.quote_requests_count = customer.quote_requests_count + 1
          return customer;
        } else {
          return customer;
        }
      });
      return {
        ...state,
        customersList: updatedList
      };

    case DECREASE_QUOTE_REQUESTS:
      let updatedCustomer = null;
      const list = state.customersList.map(customer => {
        if (customer.id === action.payload.customerId) {
          customer.quote_requests_count = customer.quote_requests_count - 1;
          customer.reports_count = customer.reports_count + 1;
          return customer;
        } else {
          return customer;
        }
      });
      if (state.currentCustomer) {
        updatedCustomer = state.currentCustomer;
        updatedCustomer.quoteRequests = updatedCustomer.quoteRequests.filter(quote => quote.quote_request_id !== action.payload.quoteId);
      }
      return {
        ...state,
        customersList: list,
        customerQuotes: state.customerQuotes.filter(quote => quote.quote_request_id !== action.payload.quoteId),
        currentCustomer: updatedCustomer
      };

    case NULLIFY_CUSTOMER_QUOTES:
      return {
        ...state,
        customerQuotes: []
      };

    case NULLIFY_CUSTOMER_REPORTS:
      return {
        ...state,
        customerReports: []
      };

    case GET_CUSTOMER_ADDRESS:
      return {
        ...state,
        customerAddresses: action.payload
      };

    case ADD_CUSTOMER_ADDRESS:
      return {
        ...state,
        customerAddresses: state.customerAddresses.concat(action.payload)
      };

    default:
      return state;
  }
}
