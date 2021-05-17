import {
  appActionTypes
} from "./actions";
import {I_appState} from "../../types/app-types";
import {AppActionsType} from "../store";

export const initialState: I_appState = {
  isFetching: {},
  error: {},
};


const appReducer = (state: I_appState = initialState, action: AppActionsType):I_appState => {
  switch (action.type) {
    //setting fetching and frozen status
    case appActionTypes.SET_IS_FETCHING: {
      if (state.isFetching[action.key] && !action.status) {
        let newState = {...state};
        delete newState.isFetching[action.key];
        return newState
      }
      if (!state.isFetching[action.key] && action.status) {
        return {
          ...state,
          isFetching: {...state.isFetching, [action.key]: action.status},
        };
      } else return state;
    }

    /* ====================
      set error by key
     ==================== */
    case appActionTypes.SET_ERROR: {
      if (state.error[action.key] && !action.message) {
        let newState = {...state};
        delete newState.error[action.key];
        return newState
      }
      if (action.message) {
        return {
          ...state,
          error: {...state.error, [action.key]: {message: action.message}},
        };
      } else return state;
    }
    default:
      return state;
  }
};


export default appReducer;