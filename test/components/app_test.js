import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import App from '../../src/components/app';
import Story from '../../src/components/story';
import ReactPaginate from 'react-paginate';
import fetch from 'isomorphic-fetch';

describe('App' , () => {
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

  it('renders 30 Story components', () => {
  	expect(component.find(Story)).to.have.length(30);
  });

  it('features pagination', () => {
  	expect(component.find(ReactPaginate)).to.have.length(1);
  });
});
