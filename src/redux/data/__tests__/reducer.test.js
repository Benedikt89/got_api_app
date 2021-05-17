import dataReducer, {initialState} from "../reducer";
import {selectDataByKey, selectPageData, selectPaginateByKey} from "../selectors";
import {setFetchedData, setMentionedDataItem, setPaginate} from "../actions";


describe('Data Reducer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  let testDataType = 'books';

  it('should return initial state with no action type', () => {
    const res = dataReducer(initialState, {
      type: 'some fake type',
      payload: 1,
    });
    expect(Object.keys(res.books).length).toEqual(Object.keys(initialState.books).length);
    expect(Object.keys(res.ids.books).length).toEqual(Object.keys(initialState.ids.books).length);
  });

  describe('setFetchedData', () => {
    let dataArr = [
        {id: '1', name: 'first'},
        {id: '2', name: 'second'},
        ];
    let secondDataArr = [{id: '3', name: 'third'},];
    let res = {...initialState};
    it('should add fetched data to books', () => {
      res = dataReducer(initialState, setFetchedData(testDataType, dataArr));
      expect(selectDataByKey({data: res}, testDataType, '2').name).toEqual(dataArr[1].name);
      expect(selectPageData({data: res}, testDataType).length).toEqual(dataArr.length);
      expect(selectPageData({data: res}, testDataType)[0].id).toEqual(dataArr[0].id);
    });
    it('should add second array and replace ids array on page', () => {
      res = dataReducer(res, setFetchedData(testDataType, secondDataArr));
      expect(selectDataByKey({data: res}, testDataType, '2').name).toEqual(dataArr[1].name);
      expect(selectPageData({data: res}, testDataType).length).toEqual(secondDataArr.length);
      expect(selectPageData({data: res}, testDataType)[0].id).toEqual(secondDataArr[0].id);
    });
  });
  describe('mentioned data items', () => {
    let dataItem = {id: 'asd', name: 'first'};
    let res = {...initialState};
    it('should not add mentioned data item to without id', () => {
      res = dataReducer(initialState, setMentionedDataItem(testDataType, {}));
      expect(Object.keys(res[testDataType]).length).toEqual(3);
    });
    it('should add mentioned data item to books', () => {
      res = dataReducer(res, setMentionedDataItem(testDataType, dataItem));
      expect(selectDataByKey({data: res}, testDataType, dataItem.id).name).toEqual(dataItem.name);
      expect(selectPageData({data: res}, testDataType).length).toEqual(0);
    });
    it('should not add mentioned data item to books', () => {
      res = dataReducer(res, setMentionedDataItem(testDataType, {...dataItem, name: 'another'}));
      expect(selectDataByKey({data: res}, testDataType, dataItem.id).name).toEqual(dataItem.name);
      expect(Object.keys(res[testDataType]).length).toEqual(4);
    });
  });
  describe('_paginate', () => {
    let paginateObj = {
      prev: '_test_url',
      next: '_test_url'
    };
    let res = {...initialState};
    it('should add _paginate', () => {
      res = dataReducer(initialState, setPaginate(testDataType, paginateObj));
      expect(selectPaginateByKey({data: res}, testDataType).prev).toEqual(paginateObj.prev);
      expect(selectPaginateByKey({data: res}, testDataType).next).toEqual(paginateObj.next);
    });
    it('should replace _paginate', () => {
      paginateObj.next = 'another';
      paginateObj.prev = 'another_test_url';
      paginateObj.last = 'last';
      res = dataReducer(initialState, setPaginate(testDataType, paginateObj));
      expect(selectPaginateByKey({data: res}, testDataType).prev).toEqual(paginateObj.prev);
      expect(selectPaginateByKey({data: res}, testDataType).next).toEqual(paginateObj.next);
      expect(selectPaginateByKey({data: res}, testDataType).last).toEqual(paginateObj.last);
    });
  });
});
