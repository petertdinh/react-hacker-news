import React, { Component } from 'react';
import Button from './button';

export default class NavBar extends Component {
	constructor(props) {
		super(props);
		//to make this component a little bit more reusable, one can set get rid of the line below and pass buttons in as props
		this.state = { buttons: ['Top', 'New', 'Best', 'Ask', 'Show', 'Job'] };
	}
	render() {
		const buttons = this.state.buttons.map((button, index) => {
			return <Button 
								key={index} 
								text={button === 'Job' ? 'Jobs' : button}
								active={this.props.active}
								handleButtonClick={this.props.setActiveStories.bind(null, button.toLowerCase())} />
		});
		return (
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <img alt="react-logo" src="http://red-badger.com/blog/wp-content/uploads/2015/04/react-logo-1000-transparent.png" height={32} width={32}/>
				      <span className="title" >React Hacker News</span>
				      {buttons}
				    </div>
				  </div>
				</nav>
		)
	}
}