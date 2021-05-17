
export const appActionTypes: {
  SET_IS_FETCHING: 'app/SET_IS_FETCHING'
  SET_ERROR: 'app/SET_ERROR'
} = {
  SET_IS_FETCHING: 'app/SET_IS_FETCHING',
  SET_ERROR: 'app/SET_ERROR',
};

export type I_appActions = I_setFetching | I_setError

//interfaces
interface I_setFetching {
  type: typeof appActionTypes.SET_IS_FETCHING,
  key: string
  status: boolean
}
interface I_setError {
  type: typeof appActionTypes.SET_ERROR,
  key: string
  message: null | string
}

//Internal ACTIONS CREATORS
export const _setFetching = (key: string, status: boolean): I_setFetching =>
  ({type: appActionTypes.SET_IS_FETCHING, key, status});

export const _setError = (key: string, message: string | null): I_setError =>
  ({type: appActionTypes.SET_ERROR, key, message});

/* ====================
  thunk actions
 ==================== */
