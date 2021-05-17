import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {configure, shallow} from 'enzyme/build';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Paginator from "../Paginator";

configure({adapter: new Adapter()});

const PaginatorProps = {
  onClick: jest.fn(),
  paginate: null,
};

describe('Paginator component shallow', () => {

  describe('render Paginator with props', () => {
    it('should not have buttons', () => {
      const container = shallow(<Paginator {...PaginatorProps} />);
      expect(container.find('Button').length).toEqual(0);
    });
    it('should have Buttons', () => {
      const container = shallow(<Paginator {...PaginatorProps} paginate={{next: 'asd', prev: 'ddd'}} />);
      expect(container.find('Button').length).toEqual(4);
    });
    it('Paginator snapshot', () => {
      const container = shallow(<Paginator {...PaginatorProps} paginate={{next: 'asd', prev: 'ddd'}} />);
      expect(container).toMatchSnapshot();
    });
  });
});