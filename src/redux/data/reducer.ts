import {ticketsActionTypes} from "./actions";
import {AppActionsType} from "../store";
import {I_DataState, PersonItemType} from "../../types/data-types";

export const newTicketId = '_NEW_TICKET';

const initialState:I_DataState = {
  data: [],
  persons: {},
};

const dataReducer = (state: I_DataState = initialState, action: AppActionsType): I_DataState => {
  switch (action.type) {
    //adding fetched data
    case ticketsActionTypes.SET_FETCHED_DATA: {
      let newState = {...state};
      action.data.forEach((d: PersonItemType) => {
        newState.persons[d.id] = d;
      });

      return newState;
    }
    //merge common data with existing or create new
    case ticketsActionTypes.UPDATE_ITEM_SUCCESS: {
      let newState = {...state};
      if (newState.persons[action.data.id]) {
        newState.persons[action.data.id] = {
          ...newState.persons[action.data.id],
          ...action.data
        };
      } else {
        newState.persons[action.data.id] = action.data;
      }

      return newState;
    }
    default:
      return state;
  }
};

export default dataReducer;