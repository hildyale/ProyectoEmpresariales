import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Page404 from 'components/Page404';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


describe('Page404 test ', () =>{

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render((
        <Page404/>
      ), div);
      ReactDOM.unmountComponentAtNode(div);
  });

  it('texto page404', () => {
    const componente = shallow(<Page404 />);
    expect(componente.find('h1').text()).toEqual('Page404');
  });


});