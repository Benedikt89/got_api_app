import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow, configure } from 'enzyme/build';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({adapter: new Adapter()});

describe('App component', () => {
  const wrapper = shallow(<App />);
  it('Should have HashRouter Provider', () => {
    expect(wrapper.find('HashRouter').length).toEqual(1);
    expect(wrapper.find('Provider').length).toEqual(1);
  });

  it('App component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});


