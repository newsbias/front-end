import { SEARCH, MODUL } from './action-types';

export const search = query => ({
  type: SEARCH,
  data: query
});

export const modul = data => ({
  type: MODUL,
  data
});
