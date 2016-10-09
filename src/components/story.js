import React, { Component } from 'react';
import moment from 'moment';

export default class Story extends Component {
	constructor(props) {
		super(props);
		this.state = { id: 0, title: '', url: '', score: 0, comments: 0, author: '', time: 0 }
	}

	componentDidMount() {
		this.mapDataToProps(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.mapDataToProps(nextProps);
	}

	mapDataToProps = (props) => {
		fetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json`)
			.then(resp => resp.json())
			.then(json => {
				const { id, title, url, score, by, kids, time } = json;
				kids ? this.setState({id, title, url, score, time, author: by, comments: kids.length}) : this.setState({id, title, url, score, time, author: by})
			});
	}

  render() {
    return (
      <div>
      	<div className="story-title">
      		{this.state.title}
      	</div>
      	<div className="story-info">
      		{ 
      			this.state.comments === 0 ?
      			<div>
	      			<span>{this.state.score} by {this.state.author} </span>
	      		  <span>{moment.unix(this.state.time).fromNow()}</span>
	      		</div> : 
	      		<div>
	    		  	<span>{this.state.score} by {this.state.author} </span>
	    		    <span>{moment.unix(this.state.time).fromNow()}</span>
	    		    <span>|{`${this.state.comments} comments`}|</span>
    		    </div>
      		}
      	</div>
      </div>
    );
  }
}
