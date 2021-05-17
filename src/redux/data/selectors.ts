import {AppStateType} from "../store";
import {DataPayloadType, DataType, PaginatorProps} from "../../types/data-types";

export const selectPageData = (state: AppStateType, _dataType: DataType): DataPayloadType[] => {
  let res:DataPayloadType[] = [];
  state.data.ids[_dataType].forEach(id => {
    if (state.data[_dataType][id]) {
      res.push(state.data[_dataType][id] as DataPayloadType)
    }
  });
  return res;
};

export const selectDataByKey = (state: AppStateType, _dataType: DataType, key: string | null): DataPayloadType | null => {
  if (!key) return null;
  return !!state.data[_dataType][key] ? state.data[_dataType][key] as DataPayloadType : null
};

export const selectPaginateByKey = (state: AppStateType, _dataType: DataType): PaginatorProps | null =>
  !!state.data._paginate[_dataType] ? state.data._paginate[_dataType] as PaginatorProps : null;
