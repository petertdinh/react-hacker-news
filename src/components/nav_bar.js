import React, { Component } from 'react';

export default class NavBar extends Component {
	render() {
		return (
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <img alt="react-logo" src="http://red-badger.com/blog/wp-content/uploads/2015/04/react-logo-1000-transparent.png" height={32} width={32}/>
				      <span className="title" >React Hacker News</span>
			        <button type="button" className="top btn btn-default navbar-btn" onClick={() => { this.props.setActiveStories('top') }}>Top</button>
			        <button type="button" className="new btn btn-default navbar-btn" onClick={() => { this.props.setActiveStories('new') }}>New</button>
			        <button type="button" className="best btn btn-default navbar-btn" onClick={() => { this.props.setActiveStories('best') }}>Best</button>
				    </div>
				  </div>
				</nav>
		)
	}
}