import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import App from '../../src/components/app';

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
  	expect(App.prototype.componentDidMount).to.have.property('callCount', 1);
    App.prototype.componentDidMount.restore();
  });

  it('renders 30 top stories', () => {

  });
});
