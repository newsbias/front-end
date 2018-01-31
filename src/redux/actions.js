import { SEARCH, CHECK_SITE } from './action-types';

export const search = query => ({
  type: SEARCH,
  data: query
});

export const checkSite = data => ({
  type: CHECK_SITE,
  data
});
