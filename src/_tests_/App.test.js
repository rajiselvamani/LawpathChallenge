import React from 'react';
import Enzyme,{shallow,mount} from "enzyme";
import Form from '../Form';
import Adapter from 'enzyme-adapter-react-16';
import { TextField, Button,Card} from '@mui/material';

Enzyme.configure({adapter:new Adapter()});

describe('Form component', () => {
  it('Contains 3 text fields', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find(TextField)).toHaveLength(3);
  });
  it('Contains 1 button', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
  it('Contains 1 card component', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find(Card)).toHaveLength(1);
  });
  it('Contains 1 image', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find('img')).toHaveLength(1);
  });

});

