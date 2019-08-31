import {GET_QUOTE_DETAIL, GET_QUOTES_LIST, NULLIFY_CURRENT_QUOTE} from "../../constants/QuoteRequests";


const initialState = {
  quotesList: [],
  totalItems: null,
  currentQuote: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUOTES_LIST:
      return {
        ...state,
        quotesList: action.payload.data,
        totalItems: action.payload.total
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


    default:
      return state;
  }
}
