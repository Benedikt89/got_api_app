import {dataActionTypes} from "./actions";
import {AppActionsType} from "../store";
import {I_DataState, DataPayloadType} from "../../types/data-types";

export const initialState:I_DataState = {
  _paginate: {
    books: null,
    characters: null,
    houses: null,
  },
  books: {},
  characters: {},
  houses: {},
  ids: {
    books: [],
    characters: [],
    houses: [],
  }
};

const dataReducer = (state: I_DataState = initialState, action: AppActionsType): I_DataState => {
  switch (action.type) {
    //adding fetched data
    case dataActionTypes.SET_FETCHED_DATA: {
      let newState = {...state};
      let ids: string[] = [];
      action.data.forEach((d: DataPayloadType) => {
        newState[action._dataType][d.id] = d;
        ids.push(d.id);
      });
      newState.ids = {...newState.ids, [action._dataType]: ids};
      return newState;
    }
    //merge common data with existing or create new
    case dataActionTypes.SET_PAGINATE_DATA: {
      return {
        ...state,
        _paginate: {...state._paginate, [action._dataType]: action.paginate}
      };
    }
    //delete data
    case dataActionTypes.SET_MENTIONED_DATA_ITEM: {
      if (state[action._dataType][action.data.id] || !action.data.id) {
        return state;
      }
      return {
        ...state,
        [action._dataType]: {
          ...state[action._dataType],
          [action.data.id]: action.data
        }
      };
    }
    default:
      return state;
  }
};

export default dataReducer;