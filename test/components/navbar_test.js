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
    expect(component.find('button.navbar-btn.top')).to.have.lengthOf(1);
    expect(component.find('button.navbar-btn.new')).to.have.lengthOf(1);
    expect(component.find('button.navbar-btn.best')).to.have.lengthOf(1);
  });
});