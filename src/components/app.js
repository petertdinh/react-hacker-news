import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Story from './story';
import NavBar from './nav_bar';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { stories: [], pageNum: 0, storiesPerPage: 30, currentType: 'top' };
	}

	componentDidMount() {
    this.setActiveStories('top');
	}

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  setActiveStories = (type) => {
    fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json?print=pretty`)
      .then(resp => resp.json())
      .then(json => this.setState({ stories: json }));
    this.setState({currentType: type});
  }

	setActivePage = (data) => {
		this.setState({pageNum: data.selected});
	}

  render() {
  	let startingPoint = this.state.pageNum * this.state.storiesPerPage;
  	const currentStoriesOnPage = this.state.stories.slice(startingPoint, startingPoint + this.state.storiesPerPage);
  	const renderedStories = currentStoriesOnPage.map((story, index) => {
  		return ( 
  			<Story
					key={index} 
          storyNum={index+startingPoint+1}
					id={story} /> 
  		);
  	});

    return (
      <div>
      	<NavBar 
          setActiveStories={this.setActiveStories} />
      	<div>{renderedStories}</div>
      	<ReactPaginate 
      		previousLabel="<"
      		nextLabel=">" 
      		pageNum={Math.ceil(this.state.stories.length/this.state.storiesPerPage)} 
      		marginPagesDisplayed={2} 
      		pageRangeDisplayed={5} 
      		clickCallback={this.setActivePage}
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
