import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import App from '../../src/components/app';
import Story from '../../src/components/story';
import NavBar from '../../src/components/nav_bar';
import ReactPaginate from 'react-paginate';
import fetch from 'isomorphic-fetch';

describe('App' , () => {
  //comment out line 20 in App before running this test
	let component;

	beforeEach(() => {
		component = mount(<App />);
	});

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('calls componentDidMount', () => {
  	sinon.spy(App.prototype, 'componentDidMount');
    component = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('renders x amount of Story components', () => {
    component.setState({stories: [12680329, 12677279,12680380], storiesPerPage: 3});
  	expect(component.find(Story)).to.have.lengthOf(3);
  });

  it('features pagination', () => {
  	expect(component.find(ReactPaginate)).to.have.lengthOf(1);
  });

  it('it forces you back to the first page when you select a different story type', () => {
    component.setState({stories: [12680329, 12677279,12680380], storiesPerPage: 1, forceSelected: 0});
    const prevButton = component.find(ReactPaginate).childAt(0);
    const navBarButton = component.find(NavBar).childAt(0).childAt(0).childAt(2);
    const numberTwo = component.find(ReactPaginate).childAt(2);
    expect(prevButton.hasClass('disabled')).to.be.true;
    numberTwo.simulate('click');
    expect(prevButton.hasClass('disabled')).to.be.false;
  });
});
