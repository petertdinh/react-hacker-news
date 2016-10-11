import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import NavBar from '../../src/components/nav_bar';

describe('NavBar' , () => {
	let mountedComponent;
  let shallowComponent;

	beforeEach(() => {
		mountedComponent = mount(<NavBar />);
    shallowComponent = shallow(<NavBar />);
	});

  it('to be a nav element', () => {
    expect(shallowComponent.type()).to.equal('nav');
  });

  it('uses Bootstrap NavBar classes', () => {
    expect(shallowComponent.hasClass('navbar-default')).to.be.true;
  });

  it('lets the user navigate between six of the stories', () => {
    expect(mountedComponent.childAt(0).childAt(0).childAt(2).text()).to.be.equal('Top');
    expect(mountedComponent.childAt(0).childAt(0).childAt(3).text()).to.be.equal('New');
    expect(mountedComponent.childAt(0).childAt(0).childAt(4).text()).to.be.equal('Best');
    expect(mountedComponent.childAt(0).childAt(0).childAt(5).text()).to.be.equal('Ask');
    expect(mountedComponent.childAt(0).childAt(0).childAt(6).text()).to.be.equal('Show');
    expect(mountedComponent.childAt(0).childAt(0).childAt(7).text()).to.be.equal('Job');
  });

  it('allows us to set props', () => {
    mountedComponent.setProps({id: 1});
    expect(mountedComponent.props().id).to.equal(1);
  });
});