import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Submission from '../client/components/Submission';
import SoloInput from '../client/components/SoloInput';

configure({ adapter: new Adapter() });

describe('Unit Test: Submission Component', () => {
  describe('text of children elements', () => {
    const props = {
      playerIndex: 0,
      input: 'you got this!',
      isJudge: true,
    };
    let wrapper = shallow(<Submission {...props} />);

    it('should render 2 children', () => {
      expect(wrapper.children()).toHaveLength(2);
    });

    it('should have props.input as text of first child', () => {
      expect(wrapper.childAt(0).text()).toEqual(props.input);
    });

    it('should have "Give this your LOLs" as text of second child', () => {
      expect(wrapper.childAt(1).text()).toEqual('Give this your LOLs');
    });
  });

  describe('isJudge prop set to true', () => {
    const props = {
      playerIndex: 0,
      input: 'you got this!',
      isJudge: true,
    };
    let wrapper = shallow(<Submission {...props} />);

    it('should render 2 children', () => {
      expect(wrapper.children()).toHaveLength(2);
    });

    it('should render span as first child', () => {
      expect(wrapper.childAt(0).type()).toEqual('span');
    });

    it('should render button as second child', () => {
      expect(wrapper.childAt(1).type()).toEqual('button');
    });
  });

  describe('isJudge prop set to false', () => {
    const props = {
      playerIndex: 0,
      input: 'you got this!',
      isJudge: false,
    };
    let wrapper = shallow(<Submission {...props} />);

    it('should render 1 child', () => {
      expect(wrapper.children()).toHaveLength(1);
    });

    it('should render span as first child', () => {
      expect(wrapper.childAt(0).type()).toEqual('span');
    });
  });
});

describe('Unit Test: SoloInput Component', () => {
  let wrapper = shallow(<SoloInput />);
  it('should render a div', () => {
    expect(wrapper.type()).toEqual('div');
  });

  it('should render 2 children', () => {
    expect(wrapper.children()).toHaveLength(2);
  });

  it('should render input as first child', () => {
    expect(wrapper.childAt(0).type()).toEqual('input');
  });

  it('should render button as second child', () => {
    expect(wrapper.childAt(1).type()).toEqual('button');
  });
});
