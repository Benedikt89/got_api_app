import {AppStateType} from "../store";
import {DataPayloadType, DataType} from "../../types/data-types";

export const selectListsArr = (state: AppStateType, dataType: DataType): DataPayloadType[] => {
  let res:DataPayloadType[] = [];
  Object.keys(state.data[dataType]).forEach((key: string) => res.push(state.data[dataType][key] as DataPayloadType));
  return res;
};

export const selectDataByKey = (state: AppStateType, dataType: DataType, key: string): DataPayloadType | null =>
  !!state.data[dataType][key] ? state.data[dataType][key] as DataPayloadType : null;
