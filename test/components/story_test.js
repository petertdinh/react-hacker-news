import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Story from '../../src/components/story';

describe('Story' , () => {
	let component;

	beforeEach(() => {
		component = mount(<Story />);
	});

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('fetches the story with the id passed into it', () => {
    component.setProps({id: 1});
  });
});