import _ from 'lodash';

export const wikiUrl = 'https://secure-shelf-84926.herokuapp.com/wikipedia?q=';
export const resultsUrl = 'https://secure-shelf-84926.herokuapp.com/search?q=';

export function filterQuery(q) {
  if (_.isEmpty(q)) {
    return null;
  }
  return q.toLowerCase().replace(/ /g, '+');
}
