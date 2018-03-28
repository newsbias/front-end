import { SEARCH, MODUL } from './action-types';

export const search = query => ({
  type: SEARCH,
  data: query
});

export const modul = modul => ({
  type: MODUL,
  data: modul
});
