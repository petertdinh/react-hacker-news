import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import App from '../../src/components/app';
import NavBar from '../../src/components/nav_bar';

const fillerFunc = () => {};

describe('NavBar' , () => {
	let mountedWrapper;
  let shallowWrapper;

	beforeEach(() => {
		mountedWrapper = mount(<NavBar 
                            setActiveStories={fillerFunc} />);
    shallowWrapper = shallow(<NavBar 
                              setActiveStories={fillerFunc} />);
	});

  it('to be a nav element', () => {
    expect(shallowWrapper.type()).to.equal('nav');
  });

  it('uses Bootstrap NavBar classes', () => {
    expect(shallowWrapper.hasClass('navbar-default')).to.be.true;
  });

  it('lets the user navigate between six of the stories', () => {
    expect(mountedWrapper.childAt(0).childAt(0).childAt(2).text()).to.be.equal('Top');
    expect(mountedWrapper.childAt(0).childAt(0).childAt(3).text()).to.be.equal('New');
    expect(mountedWrapper.childAt(0).childAt(0).childAt(4).text()).to.be.equal('Best');
    expect(mountedWrapper.childAt(0).childAt(0).childAt(5).text()).to.be.equal('Ask');
    expect(mountedWrapper.childAt(0).childAt(0).childAt(6).text()).to.be.equal('Show');
    expect(mountedWrapper.childAt(0).childAt(0).childAt(7).text()).to.be.equal('Job');
  });

  it('allows us to set props', () => {
    mountedWrapper.setProps({id: 1});
    expect(mountedWrapper.props().id).to.equal(1);
  });
});