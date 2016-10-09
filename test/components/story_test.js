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
  	expect(component.containsAllMatchingElements([
  		<a href="http://ycombinator.com">Y Combinator</a>,
  		<span>61</span>,
  		<span>5 comments</span>,
  		<a href="https://news.ycombinator.com/user?id=pg">pg</a>,
  	])).to.be.true;
  });
});