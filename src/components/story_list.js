import React, { Component } from 'react';
import Story from './story';

export default class StoryList extends Component {
	render() {
		let startingPoint = this.props.currentPage * this.props.storiesPerPage;
		const currentStoriesOnPage = this.props.stories.slice(startingPoint, startingPoint + this.props.storiesPerPage);
		const renderedStories = currentStoriesOnPage.map((story, index) => {
  		return ( 
  			<Story
					key={index}
          storyNum={index + startingPoint + 1}
					id={story} /> 
  		);
  	});
  	
		if(!this.props.stories.length) {
			return <div className="loader"></div>
		}

		return (
			<div>
				{renderedStories}
			</div>
		)
	}
}