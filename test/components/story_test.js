import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import nock from 'nock';
import Story from '../../src/components/story';

describe('Story' , () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<Story />);
	});

  it('renders something', () => {
    expect(wrapper).to.exist;
  });

  it('fetches the story with the id passed into it after an AJAX call', (done) => {
    nock('https://hacker-news.firebaseio.com')
      .get('/v0/item/1.json')
      .reply(200, {
          "by": "pg",
          "descendants": 15,
          "id": 1,
          "score": 61,
          "time": 1160418111,
          "title": "Y Combinator",
          "type": "story",
          "url": "http://ycombinator.com"
      });
    wrapper = mount(<Story id={1} />);
    setTimeout(() => {
      expect(wrapper.state().title).to.equal('Y Combinator');
      expect(wrapper.state().author).to.equal('pg');
      nock.cleanAll();
      done();
    }, 500);
  });
});