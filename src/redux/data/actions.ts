import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, GetStateType} from "../store";
import {dataAPI} from "./api";
import {batch} from "react-redux";
import {fetchHandler} from "../fetchHandler";
import {CharacterType, DataPayloadType, DataType, PaginatorProps} from "../../types/data-types";

export const dataActionTypes: {
  SET_FETCHED_DATA: "data/SET_FETCHED_DATA"
  UPDATE_ITEM_SUCCESS: "data/UPDATE_ITEM_SUCCESS"
  DELETE_DATA_SUCCESS: "data/DELETE_ITEM_SUCCESS"
} = {
  SET_FETCHED_DATA: "data/SET_FETCHED_DATA",
  UPDATE_ITEM_SUCCESS: "data/UPDATE_ITEM_SUCCESS",
  DELETE_DATA_SUCCESS: "data/DELETE_ITEM_SUCCESS"
};

export type I_dataActions = I_setFetchedData | I_updateItemSuccess |
  I_deleteDataSuccess

//interfaces
interface I_setFetchedData {
  type: typeof dataActionTypes.SET_FETCHED_DATA,
  data: Array<DataPayloadType>
  dataType: DataType
}
interface I_updateItemSuccess {
  type: typeof dataActionTypes.UPDATE_ITEM_SUCCESS,
  data: DataPayloadType
  dataType: DataType
}

interface I_deleteDataSuccess {
  type: typeof dataActionTypes.DELETE_DATA_SUCCESS,
  data: DataPayloadType
}

// /* ====================
//   thunk actions
//  ==================== */

export const fetchData = (dataType: DataType, paginatorProps?: PaginatorProps) =>
  fetchHandler(
    `fetchAllData=${dataType}`,
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      //array of data to fetch
      let success = true;
      const res = await dataAPI.getData(dataType, paginatorProps);
      console.log(res);
      if (success) {
        return true;
      }
  });