import {DataType, PaginatorKeys, PaginatorProps} from "../types/data-types";
import {QueryObject} from "../types/app-types";
import {stringifyQuery} from "./queryHelpers";

const baseUrl = process.env.REACT_APP_BASE_URL || 'https://anapioficeandfire.com/api';

export const dataTypes:DataType[] = ['books', 'characters', 'houses'];

type APIurlType = {
  readonly [key in DataType]: string
}

export const API:APIurlType = {
  books: `${baseUrl}/books`,
  characters: `${baseUrl}/characters`,
  houses: `${baseUrl}/houses`,
};

export const getUrl = (dataType: DataType, query?: QueryObject): string => {
  return API[dataType] + stringifyQuery(query);
};

export const getPaginateFromHeaders = (header: string): PaginatorProps => {
  let res:PaginatorProps = {
    next: '',
    first: '',
    last: '',
    prev: ''
  };
  let parts = header.split(',');
  // Parse each part into a named link
  parts.forEach((p) => {
    let section = p.split(';');
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    let url = section[0].replace(/<(.*)>/, '$1').trim();
    let name: PaginatorKeys = section[1].replace(/rel="(.*)"/, '$1').trim() as PaginatorKeys;
    res[name] = url;
  });
  return res;
};

export const getDataIdFromUrl = (url: string): string | null => {
  let arr = url.split('/');
  return Number(arr[arr.length -1]) ? arr[arr.length -1] : null;
};
export type ParsedUrl = {_dataType: DataType, id: string | null, url: string}

export const parseUrl = (url: string): ParsedUrl => {
  let arr = url.split('/');
  return {url, id: Number(arr[arr.length -1]) ? arr[arr.length -1] : null, _dataType: arr[arr.length -2] as DataType}
};