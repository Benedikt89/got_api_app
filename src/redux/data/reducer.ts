import {dataActionTypes} from "./actions";
import {AppActionsType} from "../store";
import {I_DataState, DataPayloadType} from "../../types/data-types";

export const newTicketId = '_NEW_TICKET';

const initialState:I_DataState = {
  books: {},
  characters: {},
  houses: {},
};

const dataReducer = (state: I_DataState = initialState, action: AppActionsType): I_DataState => {
  switch (action.type) {
    //adding fetched data
    case dataActionTypes.SET_FETCHED_DATA: {
      let newState = {...state};
      action.data.forEach((d: DataPayloadType) => {
        newState[action.dataType][d.id] = d;
      });
      return newState;
    }
    //merge common data with existing or create new
    case dataActionTypes.UPDATE_ITEM_SUCCESS: {
      let newState = {...state};
      if (newState[action.dataType][action.data.id]) {
        newState[action.dataType][action.data.id] = {
          ...newState[action.dataType][action.data.id],
          ...action.data
        };
      } else {
        newState[action.dataType][action.data.id] = action.data;
      }

      return newState;
    }
    //delete data
    case dataActionTypes.DELETE_DATA_SUCCESS: {
      let newState = {...state};
      return newState;
    }
    default:
      return state;
  }
};

export default dataReducer;