import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		return (
			<button type="button" className={`btn ${this.props.active === this.props.text.toLowerCase() ? `btn-default` : `btn-info`} navbar-btn`} onClick={() => this.props.handleButtonClick() }>{this.props.text}</button>
		)
	}
}