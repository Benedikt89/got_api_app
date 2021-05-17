import {DataPayloadType, DataType, PaginatorProps} from "../../types/data-types";
import axios from "axios";
import {getDataIdFromUrl, getPaginateFromHeaders, getUrl} from "../../constants/api-url";

export const dataAPI = {
  getPageData: async (_dataType: DataType, link: string, query: string)
    : Promise<never | {data: DataPayloadType[], paginate: PaginatorProps}> => {
    let result: DataPayloadType[] = [];
    let url = link ? link : getUrl(_dataType) + query;
    const res = await axios.get(url);
    const paginate = getPaginateFromHeaders(res.headers.link);
    if (res.data) {
      result = res.data.map((item: any) => ({...item, id: getDataIdFromUrl(item.url), _dataType}))
    }
    return {data: result, paginate};
  },
  getDataItem: async (link: string): Promise<never | DataPayloadType | null> => {
    const res = await axios.get(link);
    if (res.data) {
      return  res.data;
    }
    return null;
  }
};