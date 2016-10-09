import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Story from './story';
import NavBar from './nav_bar';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { stories: [], pageNum: 0, storiesPerPage: 30 };
	}

	componentDidMount() {
		fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
			.then(resp => resp.json())
			.then(json => this.setState({ stories: json }));
	}

	handlePaginationClick = (data) => {
		this.setState({pageNum: data.selected});
	}

  render() {
  	let startingPoint = this.state.pageNum * this.state.storiesPerPage;
  	const currentStories = this.state.stories.slice(startingPoint, startingPoint + this.state.storiesPerPage);
  	const renderedStories = currentStories.map((story, index) => {
  		return ( 
  			<Story
					key={index} 
          storyNum={index+startingPoint+1}
					id={story} /> 
  		);
  	});

    return (
      <div>
      	<NavBar />
      	<div>{renderedStories}</div>
      	<ReactPaginate 
      		previousLabel="<"
      		nextLabel=">" 
      		pageNum={Math.ceil(this.state.stories.length/this.state.storiesPerPage)} 
      		marginPagesDisplayed={2} 
      		pageRangeDisplayed={5} 
      		clickCallback={this.handlePaginationClick}
          containerClassName="react-paginate" 
          pageClassName="page"
          previousClassName="prev"
          nextClassName="next"
          breakClassName="break"
          activeClassName="active" />
      </div>
    );
  }
}
