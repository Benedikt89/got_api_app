import {QueryObject} from "../types/app-types";

export const parseQuery = (query: string): QueryObject => {
  let res: QueryObject = {};
  query.split('&').forEach(string => {
    let splitted = string.split('=');
    if (splitted[0] && splitted[1]) {
      res[splitted[0]] = splitted[1];
    }
  });
  return res;
};
export const stringifyQuery = (queryObj?: QueryObject):string => {
  console.log(queryObj)
  if (!queryObj || !Object.keys(queryObj).length) return '';
  let res: string[] = [];
  Object.keys(queryObj).forEach(key => {
    if (queryObj[key]) {
      res.push(`${key}=${queryObj[key]}`)
    }
  });
  return res.length ? '?' + res.join('&') : '';
};

export const getQuery = (url: string): string => {
  const splitted = url.split('?');
  return splitted[splitted.length -1];
};