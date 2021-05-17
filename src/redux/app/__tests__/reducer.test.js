import {_setError, _setFetching} from '../actions';
import appReducer, {initialState} from "../reducer";
import {selectErrorByKey, selectFetchingByKey} from "../selectors";

describe('App Reducer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state with no action type', () => {
    const res = appReducer(initialState, {
      type: 'some fake type',
      payload: 1,
    });
    expect(Object.keys(res.error).length).toEqual(Object.keys(initialState.error).length);
    expect(Object.keys(res.isFetching).length).toEqual(Object.keys(initialState.isFetching).length);
  });

  describe('errors', () => {
    let error_key = '_test_wow';
    let error_message = '_test_wow_message';
    let res;
    it('should add error with _test_wow key', () => {
      res = appReducer(initialState, _setError(error_key, error_message));
      expect(selectErrorByKey({app: res}, error_key).message).toEqual(error_message);
    });
    it('should remove error with _test_wow key', () => {
      res = appReducer(initialState, _setError(error_key, null));
      expect(Object.keys(res.error).length).toEqual(0);
    });
  });
  describe('loading', () => {
    let loading_key = '_test_loading';
    let res;
    it('should add loading with _test_loading key', () => {
      res = appReducer(initialState, _setFetching(loading_key, true));
      expect(selectFetchingByKey({app: res}, loading_key)).toEqual(true);
    });
    it('should remove loading with _test_loading key', () => {
      res = appReducer(initialState, _setFetching(loading_key, false));
      expect(Object.keys(res.isFetching).length).toEqual(0);
    });
  });
});
