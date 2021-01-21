import {
  ADD_NEW_QUOTE, CHANGE_QUOTE_REQUESTS_STATUS, FILTER_QUOTE_LIST,
  GET_PROPERTY_OPTIONS,
  GET_QUOTE_DETAIL,
  GET_QUOTES_LIST,
  NULLIFY_CURRENT_QUOTE
} from "../../constants/QuoteRequests";


const initialState = {
  quotesList: [],
  totalItems: null,
  currentQuote: null,
  propertyOptions: {
    property_age: [],
    property_price: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUOTES_LIST:
      return {
        ...state,
        quotesList: action.payload.data,
        totalItems: action.payload.total
      };

    case CHANGE_QUOTE_REQUESTS_STATUS:
      const updatedList = state.quotesList.map(item => {
        if (action.payload.quote_ids.includes(item.quote_request_id)) {
          item.status = action.payload.status;
          return item;
        } else {
          return item;
        }
      });

      return {
        ...state,
        quotesList: updatedList,
      };

    case GET_QUOTE_DETAIL:
      return {
        ...state,
        currentQuote: action.payload
      };

    case NULLIFY_CURRENT_QUOTE:
      return {
        ...state,
        currentQuote: null
      };

    case GET_PROPERTY_OPTIONS:
      return {
        ...state,
        propertyOptions: action.payload
      };

    case ADD_NEW_QUOTE:
      return {
        ...state,
        quotesList: [action.payload, ...state.quotesList]
      };

    case FILTER_QUOTE_LIST:
      return {
        ...state,
        quotesList: state.quotesList.filter(quote => quote.quote_request_id !== action.payload)
      };

    default:
      return state;
  }
}
