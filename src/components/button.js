import React, { Component } from 'react';

const Button = (props) => (
	<button type="button" className={`btn ${props.active === props.text.toLowerCase() ? `btn-default` : `btn-info`} navbar-btn`} onClick={() => props.handleButtonClick() }>{props.text}</button>
)

export default Button;