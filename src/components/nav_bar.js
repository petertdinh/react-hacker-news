import React, { Component } from 'react';

export default class NavBar extends Component {
	render() {
		return (
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <img alt="react-logo" src="https://upload.wikimedia.org/wikipedia/commons/5/57/React.js_logo.svg" height={32} width={32}/>
				      <span className="title" >React Hacker News</span>
			        <button type="button" className="top btn btn-default navbar-btn">Top</button>
			        <button type="button" className="new btn btn-default navbar-btn">New</button>
			        <button type="button" className="best btn btn-default navbar-btn">Best</button>
				    </div>
				  </div>
				</nav>
		)
	}
}