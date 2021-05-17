import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {configure, mount} from 'enzyme/build';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RenderItemTitle from "../ItemTitle";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {initialState} from "../../../redux/data/reducer";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router";

configure({adapter: new Adapter()});

describe('RenderItemTitle component shallow', () => {
  const middlewares = [thunk];
  let dataItem = {id: '15', name: 'someName', _dataType: 'books'};
  const link = `aaa/${dataItem._dataType}/${dataItem.id}`;
  const initialTState = {
    data: { ...initialState, books: {[dataItem.id]: dataItem} },
    app: {isFetching: { [`fetchMentionDataItem=${dataItem._dataType + dataItem.id}`]: 'SIGNED_UP' }},
  };
  const mockStore = configureMockStore(middlewares);
  let store, container;
  beforeEach(() => {
    store = mockStore(initialTState);
    container = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/books/15']} initialIndex={0}>
            <RenderItemTitle link={link}/>
          </MemoryRouter>
        </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('Renders correct ItemTitle', () => {
    const text = container.text();
    expect(text).toEqual(dataItem.name);
    expect(container.find('Link').length).toEqual(1);
    expect(container.find('a').length).toEqual(1);
  });

  it('Paginator snapshot', () => {
    // const container = shallow(<RenderItemTitle link={link}/>);
    expect(container).toMatchSnapshot();
  });
});