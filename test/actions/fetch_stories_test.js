import axios from 'axios';
import { expect } from 'chai';
import { fetchStories } from '../../src/actions/fetch_stories';

describe('fetchStories', () => {
	it('has the correct type', () => {
		const action = fetchStories();
		expect(action.type).to.equal(FETCH_STORIES);
	});

	it('has the correct payload', () => {
		const action = fetchStories();
		expect(action.payload).to.be.instanceOf(Array);
	});
})