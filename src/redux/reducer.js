import * as ActionTypes from './action-types';


const initState = {
  query: null,
  sites: [
    'cnn',
    'fox-news',
    'google-news',
    'nbc-news',
    'the-new-york-times',
    'cnbc',
    'business-insider',
    'usa-today',
    'the-wall-street-journal',
    'buzzfeed'
  ]
};


const Reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return { ...state, ...{ query: action.data } };
    default:
      return state;
  }
};

export default Reducer;
