import * as ActionTypes from './action-types';

const initState = {
  query: null,
  sites: {
    'cnn': true,
    'fox-news': true,
    'google-news': true,
    'nbc-news': true,
    'the-new-york-times': true,
    'cnbc': true,
    'business-insider': true,
    'usa-today': true,
    'the-wall-street-journal': true,
    'buzzfeed': true
  }
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return { ...state, ...{ query: action.data } };
    case ActionTypes.CHECK_SITE:
      return { ...state, ...{ sites: { ...state.sites, ...action.data } } }
    default:
      return state;
  }
};

export default Reducer;
