import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import LoginNeed from 'components/LoginNeed';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


describe('LoginNeed test ', () =>{

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render((
        <LoginNeed/>
      ), div);
      ReactDOM.unmountComponentAtNode(div);
  });

  it('texto LoginNeed', () => {
    const componente = shallow(<LoginNeed />);
    expect(componente.find('h1').text()).toEqual('Sin permisos');
  });


});