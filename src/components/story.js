import React, { Component } from 'react';
import moment from 'moment';

export default class Story extends Component {
	constructor(props) {
		super(props);
		this.state = { id: 0, title: '', url: '', score: 0, author: '', time: 0, comments: 0, storyNum: 0, hidden: 'hidden', wait: 900 }
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
				//when a story isn't linked to an external site, no url is provided, so we redirect them to the comments page
				url ? this.setState({ url }) : this.setState({url: `https://news.ycombinator.com/item?id=${id}`})
				this.setState({id, title, score, time, storyNum, author: by, comments: descendants});
			});
	}

	//stories are rendered after the asynchronous operation
	makeStoryVisible = () => {
		setTimeout(() => {
			this.setState({hidden: ''});
		}, this.state.wait);
	}

  render() {
    return (
      <div className={`story ${this.state.hidden}`}>
      	<div className="story-title">
      		<span><strong>{this.state.storyNum}. </strong></span>
      		<a href={this.state.url}>{this.state.title}</a>
      	</div>
      	<div>
      		{
      			this.state.comments === 0 ?
      			<div className="story-info">
	      			<span>{`${this.state.score} points by `}</span>
	      			<a href={`https://news.ycombinator.com/user?id=${this.state.author}`}>{this.state.author}</a>
	      			<span>{` ${moment.unix(this.state.time).fromNow()}`}</span>
	      		</div> : 
      			<div className="story-info">
	      			<span>{`${this.state.score} points by `}</span>
	      			<a href={`https://news.ycombinator.com/user?id=${this.state.author}`}>{this.state.author}</a>
	      			<span>{` ${moment.unix(this.state.time).fromNow()} `}</span>
	      			<span>| <a href={`https://news.ycombinator.com/item?id=${this.state.id}`}>{`${this.state.comments} comments`}</a> |</span>
	      		</div>
      		}
      	</div>
      </div>
    );
  }
}
