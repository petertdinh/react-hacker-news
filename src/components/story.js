import React, { Component } from 'react';
import moment from 'moment';

export default class Story extends Component {
	constructor(props) {
		super(props);
		this.state = { id: 0, title: '', url: '', score: 0, author: '', time: 0, comments: 0, storyNum: 0, hidden: 'hidden', wait: 1000 }
	}

	componentDidMount() {
		this.mapStoryToState(this.props);
		this.makeStoryVisible();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({hidden: 'hidden'});
		this.mapStoryToState(nextProps);
		this.makeStoryVisible();
	}

	mapStoryToState = (props) => {
		fetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json`)
			.then(resp => resp.json())
			.then(json => {
				const { id, title, url, score, by, descendants, time } = json, { storyNum } = props;
				this.setState({id, title, url, score, time, storyNum, author: by, comments: descendants});
			});
	}

	makeStoryVisible = () => {
		const that = this;
		setTimeout(() => {
			that.setState({hidden: ''});
		}, that.state.wait);
	}

  render() {
    return (
      <div className={this.state.hidden}>
      	<div className="story-title">
      		<span>{this.state.storyNum}. </span>
      		<a href={this.state.url}>{this.state.title}</a>
      	</div>
      	<div className="story-info">
      		{ 
      			this.state.comments === 0 ?
      			<div>
	      			<span>{`${this.state.score} points by ${this.state.author} ${moment.unix(this.state.time).fromNow()}`}</span>
	      		</div> : 
	      		<div>
	    		  	<span>{`${this.state.score} points by ${this.state.author} ${moment.unix(this.state.time).fromNow()} | ${this.state.comments} comments |`}</span>
    		    </div>
      		}
      	</div>
      </div>
    );
  }
}
