import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Story from '../../src/components/story';

describe('Story' , () => {
	let component;

	beforeEach(() => {
		component = mount(<Story />);
	});

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('allows us to set props', () => {
  	component = mount(<Story bar="baz" />);
  	expect(component.props().bar).to.equal('baz');
  });

  it('fetches the story with the id passed into it', () => {
  	component = mount(<Story id="1" />);
  });
});