import {ThunkDispatch} from "redux-thunk";
import {AppActionsType} from "../store";
import {dataAPI} from "./api";
import {fetchHandler} from "../fetchHandler";
import {DataPayloadType, DataType, PaginatorProps} from "../../types/data-types";
import {ParsedUrl} from "../../constants/api-url";
import {batch} from "react-redux";

export const dataActionTypes: {
  SET_FETCHED_DATA: "data/SET_FETCHED_DATA"
  SET_PAGINATE_DATA: "data/SET_PAGINATE_DATA"
  SET_MENTIONED_DATA_ITEM: "data/SET_MENTIONED_DATA_ITEM"
  DELETE_DATA_SUCCESS: "data/DELETE_ITEM_SUCCESS"
} = {
  SET_FETCHED_DATA: "data/SET_FETCHED_DATA",
  SET_PAGINATE_DATA: "data/SET_PAGINATE_DATA",
  SET_MENTIONED_DATA_ITEM: "data/SET_MENTIONED_DATA_ITEM",
  DELETE_DATA_SUCCESS: "data/DELETE_ITEM_SUCCESS"
};

export type I_dataActions = I_setFetchedData | I_setMentionedDataItem | I_setPaginate

//interfaces
interface I_setFetchedData {
  type: typeof dataActionTypes.SET_FETCHED_DATA,
  data: Array<DataPayloadType>
  _dataType: DataType
}
interface I_setPaginate {
  type: typeof dataActionTypes.SET_PAGINATE_DATA,
  paginate: PaginatorProps
  _dataType: DataType
}
interface I_setMentionedDataItem {
  type: typeof dataActionTypes.SET_MENTIONED_DATA_ITEM,
  data: DataPayloadType
  _dataType: DataType
}

export const setFetchedData = (_dataType: DataType, data: DataPayloadType[]): I_setFetchedData =>
  ({type: dataActionTypes.SET_FETCHED_DATA, data, _dataType});

export const setMentionedDataItem = (_dataType: DataType, data: DataPayloadType): I_setMentionedDataItem =>
  ({type: dataActionTypes.SET_MENTIONED_DATA_ITEM, _dataType, data});

export const setPaginate = (_dataType: DataType, paginate: PaginatorProps): I_setPaginate =>
  ({type: dataActionTypes.SET_PAGINATE_DATA, paginate, _dataType});

// /* ====================
//   thunk actions
//  ==================== */

export const fetchDataThunk = (_dataType: DataType, url: string, query?: string) =>
  fetchHandler(
    `fetchAllData=${_dataType}`,
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      //array of data to fetch
      const {data, paginate} = await dataAPI.getPageData(_dataType, url, query || '');
      if (data) {
        batch(() => {
          dispatch(setFetchedData(_dataType, data));
          dispatch(setPaginate(_dataType, paginate));
        });
        return true;
      }
  });



export const fetchMentionDataItem = ({_dataType, id, url}: ParsedUrl) => fetchHandler(
  `fetchMentionDataItem=${_dataType + id}`,
  async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
    if (id) {
      const data = await dataAPI.getDataItem(url);
      if (data) {
        dispatch(setMentionedDataItem(_dataType, {...data, id, _dataType} as DataPayloadType));
        return true;
      }
    }
  });