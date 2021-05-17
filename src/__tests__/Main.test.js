import React from 'react';
import Main from '../Main';
import {configure, mount} from 'enzyme/build';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router";
configure({adapter: new Adapter()});

describe('Main component', () => {
  const mainProps = {};
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store, container;

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve());
    store = mockStore({app: {error: {}, isFetching: {}}});
    container = mount(
        <Provider store={store}>
          <MemoryRouter
              initialEntries={['/', '/page/10', '/next']}
              initialIndex={1}
          >
            <Main {...mainProps} />
          </MemoryRouter>
        </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('Render Main with connected redux', () => {
    it('should have an div .content-wrapper', () => {
      expect(container.find('div.content-wrapper').length).toEqual(1);
    });
    it('should have an Switch', () => {
      expect(container.find('Switch').length).toEqual(1);
    });
    it('should have an Link', () => {
      expect(container.find('Link').length).toEqual(4);
    });
    it('should have an AppHeader', () => {
      expect(container.find('AppHeader').length).toEqual(1);
    });
  });
});
