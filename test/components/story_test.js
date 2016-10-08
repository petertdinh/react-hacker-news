import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Story from '../../src/components/story';

describe('Story' , () => {
	let component;

	beforeEach(() => {
		component = mount(<Story />);
		component.setProps({bar: 'baz', id: 1});
	});

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('allows us to set props', () => {
  	expect(component.props().bar).to.equal('baz');
  });

  it('fetches the story with the id passed into it', () => {
  	expect(component.containsAllMatchingElements([
  		<a href="http://ycombinator.com">Y Combinator</a>,
  		<span>61</span>,
  		<span>5 comments</span>,
  		<a href="https://news.ycombinator.com/user?id=pg">pg</a>,
  	])).to.be.true;
  });
});