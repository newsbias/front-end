import * as ActionTypes from './action-types';

const initState = {
  query: null,
  modul: {
    visible: false
  }
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return { ...state, ...{ query: action.data } };
    case ActionTypes.MODUL:
      return { ...state, ...{ modul: action.data } };
    default:
      return state;
  }
};

export default Reducer;
