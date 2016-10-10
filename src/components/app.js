import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Story from './story';
import NavBar from './nav_bar';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { stories: [], currentPage: 0, storiesPerPage: 30, hidden: '', wait: 900, forceSelected: 0 };
	}

	componentDidMount() {
    this.setActiveStories('top');
    this.toggleLoader();
	}

  componentDidUpdate() {
    //to bring the user to the top of the page
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  //users can choose between the top, newest, or best stories. defaults to top on page load
  setActiveStories = (type) => {
    fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json?print=pretty`)
      .then(resp => resp.json())
      .then(json => this.setState({ stories: json }));
    this.toggleLoader();
    //send user back to the first 30 stories on selection
    this.setState({currentPage: 0,forceSelected: 0});
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
          setActiveStories={this.setActiveStories} />
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
          previousClassName="prev"
          nextClassName="next"
          breakClassName="break"
          activeClassName="active"
          disabledClassName="disabled-transition"
          forceSelected={this.state.forceSelected} />
      </div>
    );
  }
}
