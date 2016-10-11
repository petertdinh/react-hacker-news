import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { animateScroll } from 'react-scroll';
import ReactPaginate from 'react-paginate';
import Story from './story';
import NavBar from './nav_bar';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { stories: [], currentPage: 0, currentStories: '', storiesPerPage: 30, hidden: '', wait: 900, forceSelected: 0 };
	}

	componentDidMount() {
    this.setActiveStories('top');
    this.toggleLoader();
	}

  componentDidUpdate() {
    //on page change, user is taken back to the top
    animateScroll.scrollTo(0, {
      smooth: true,
      duration: 200
    });
  }

  //users can navigate between the top, newest, best, ask, show, and job stories. defaults to top on page load.
  //each call is a fetch to the HN API
  setActiveStories = (type) => {
    if(type !== this.state.currentStories) {
      fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json?print=pretty`)
        .then(resp => resp.json())
        .then(json => this.setState({ stories: json }));
      this.toggleLoader();
      //send user back to the first 30 stories on selection
      this.setState({currentStories: type, currentPage: 0, forceSelected: 0});
    }
  }

  //callback that's passed into ReactPaginate module
	setActivePage = (data) => {
		this.setState({currentPage: data.selected, forceSelected: data.selected});
    this.toggleLoader();
	}

  //because of the asynchronous nature of the each of the stories, I implemented a loader to ease the transition
  toggleLoader = () => {
    this.setState({hidden: ''});
    setTimeout(() => this.setState({hidden: 'hidden'}), this.state.wait);
  }

  render() {
  	let startingPoint = this.state.currentPage * this.state.storiesPerPage;
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
          setActiveStories={this.setActiveStories}
          active={this.state.currentStories} />
        <div className={`loader ${this.state.hidden}`}></div>
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
          forceSelected={this.state.forceSelected} />
      </div>
    );
  }
}
