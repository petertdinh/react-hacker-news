import React, { Component } from 'react';

export default class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = { top: 'btn-default', new: 'btn-info', best: 'btn-info' };
	}
	render() {
		return (
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <img alt="react-logo" src="http://red-badger.com/blog/wp-content/uploads/2015/04/react-logo-1000-transparent.png" height={32} width={32}/>
				      <span className="title" >React Hacker News</span>
			        <button type="button" className={`btn ${this.state.top} navbar-btn`} onClick={() => { this.props.setActiveStories('top'), this.setState({top: 'btn-default', new: 'btn-info', best: 'btn-info'}) }}>Top</button>
			        <button type="button" className={`btn ${this.state.new} navbar-btn`} onClick={() => { this.props.setActiveStories('new'), this.setState({top: 'btn-info', new: 'btn-default', best: 'btn-info'}) }}>New</button>
			        <button type="button" className={`btn ${this.state.best} navbar-btn`} onClick={() => { this.props.setActiveStories('best'), this.setState({top: 'btn-info', new: 'btn-info', best: 'btn-default'}) }}>Best</button>
				    </div>
				  </div>
				</nav>
		)
	}
}