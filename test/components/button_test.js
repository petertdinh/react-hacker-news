import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Button from '../../src/components/button';

describe('Button', () => {
	let wrapper;

	it('is a button element', () => {
		wrapper = shallow(<Button active="top" text="New"/>);
		expect(wrapper.type()).to.equal('button');
	});

	it('is disabled when it is the current story', () => {
		wrapper = shallow(<Button active="top" text="Top" />);
		expect(wrapper.hasClass('btn-default')).to.be.true;
	})
})