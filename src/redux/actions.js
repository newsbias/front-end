import { SEARCH } from './action-types';

export const search = query => ({
  type: SEARCH,
  data: query
});
