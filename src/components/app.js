import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Story from './story';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { stories: [] };
	}

	componentDidMount() {
		fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
			.then(resp => resp.json())
			.then(json => this.setState({ stories: json }));
	}

  render() {
  	const renderedStories = this.state.stories.map((story, index) => {
  		return (
  			<Story 
					key={index}
					id={story} />
			)
  	});

    return (
      <div>
      	<div>{renderedStories}</div>
      	<ReactPaginate 
      		previousLabel={'previous'}
      		nextLabel={'next'} 
      		pageNum={Math.ceil(this.state.stories.length)} 
      		marginPagesDisplayed={2} 
      		pageRangeDisplayed={5} />
      </div>
    );
  }
}
