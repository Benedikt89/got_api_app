import {DataPayloadType, DataType, PaginatorProps} from "../../types/data-types";
import axios from "axios";
import {getPaginateFromHeaders, getUrl} from "../../constants/api-url";

export const dataAPI = {
  getData: async (dataType: DataType, paginator?: PaginatorProps): Promise<never | DataPayloadType[]> => {
    let result: DataPayloadType[] = [];
    let url = getUrl(dataType);
    console.log(url);
    const res = await axios.get(url);
    const paginate = getPaginateFromHeaders(res.headers.link);
    console.log(dataType + '=========>', res);
    return result;
  }
};