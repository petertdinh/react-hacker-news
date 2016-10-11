import React from 'react';
import { animateScroll } from 'react-scroll';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import App from '../../src/components/app';
import Story from '../../src/components/story';
import NavBar from '../../src/components/nav_bar';
import ReactPaginate from 'react-paginate';
import fetch from 'isomorphic-fetch';

describe('App' , () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<App />);
    
	});

  it('renders something', () => {
    expect(wrapper).to.exist;
  });

  it('calls componentDidMount', () => {
  	sinon.spy(App.prototype, 'componentDidMount');
    wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.be.true;
  });

  it('renders x amount of Story components', () => {
    wrapper.setState({stories: [12680329, 12677279,12680380], storiesPerPage: 3});
  	expect(wrapper.find(Story)).to.have.lengthOf(3);
  });

  it('features pagination', () => {
  	expect(wrapper.find(ReactPaginate)).to.have.lengthOf(1);
  });

  it('forces you back to the first page when you switch stories', () => {
    wrapper.setState({stories: [12680329, 12677279,12680380], storiesPerPage: 1, forceSelected: 0});
    const prevButton = wrapper.find(ReactPaginate).childAt(0);
    const numberTwo = wrapper.find(ReactPaginate).childAt(2);
    const navBarButton = wrapper.find(NavBar).childAt(0).childAt(0).childAt(3);
    //the prevButton is disabled when the first page is selected
    //a selected page also has the 'selected' class but for some reason the enzyme methods weren't giving me the correct assertion
    expect(prevButton.hasClass('disabled')).to.be.true;
    numberTwo.simulate('click');
    //page 2 is click so the prevButton should now be enabled
    expect(prevButton.hasClass('disabled')).to.be.false;
    navBarButton.simulate('click');
    //newest stories is selected
    expect(prevButton.hasClass('disabled')).to.be.true;
    //back to page 1
  });
});
