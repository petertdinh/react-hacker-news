import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import NavBar from '../../src/components/nav_bar';

describe('NavBar' , () => {
	let component;

	beforeEach(() => {
		component = shallow(<NavBar />);
	});

  it('to be a nav element', () => {
    expect(component.type()).to.equal('nav');
  });

  it('uses the Bootstrap NavBar classes', () => {
    expect(component.hasClass('navbar-default')).to.be.true;
  });

  it('has three buttons, each for Top, Newest, and Best stories', () => {
    expect(component.find('button').hasClass('top')).to.be.true;
    expect(component.find('button').hasClass('new')).to.be.true;
    expect(component.find('button').hasClass('best')).to.be.true;
  });

  it('allows us to set props', () => {
    component.setProps({id: 1});
    expect(component.props().id).to.equal(1);
  });
});