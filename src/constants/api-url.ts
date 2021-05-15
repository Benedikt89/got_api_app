import {DataPayloadType, DataType, PaginatorKeys, PaginatorProps} from "../types/data-types";

const baseUrl = process.env.REACT_APP_BASE_URL || 'https://anapioficeandfire.com/api';

type APIurlType = {
  readonly [key in DataType]: string
}

export const API:APIurlType = {
  books: `${baseUrl}/books`,
  characters: `${baseUrl}/characters`,
  houses: `${baseUrl}/houses`,
};

export const getUrl = (dataType: DataType, method?: string): string => {
  return API[dataType];
};

export const getPaginateFromHeaders = (header: string): PaginatorProps => {
  let res:PaginatorProps = {
    next: '',
    first: '',
    last: ''
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