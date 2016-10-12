import React, { Component } from 'react';
import moment from 'moment';

export default class Story extends Component {
	constructor(props) {
		super(props);
		this.state = { id: 0, title: '', url: '', score: 0, author: '', time: 0, numComments: 0, storyNum: 0, hidden: 'hidden', wait: 900 }
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
		//a rendered story requires an asynchronous call to the api to fetch the story data
		fetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json`)
			.then(resp => resp.json())
			.then(json => {
				const { id, title, url, score, by, descendants, time } = json, { storyNum } = props;
				//when a story isn't linked to an external site, no url is provided, so we redirect them to the comments page
				url ? this.setState({ url }) : this.setState({url: `https://news.ycombinator.com/item?id=${id}`});
				//job stories don't have comments, this check is to prevent undefined comments
				descendants ? this.setState({id, title, score, time, storyNum, author: by, numComments: descendants}) : this.setState({id, title, score, time, storyNum, author: by, numComments: 0});
			});
	}

	//stories are rendered after the asynchronous operation to ease transitions
	makeStoryVisible = () => {
		setTimeout(() => {
			this.setState({hidden: ''});
		}, this.state.wait);
	}

  render() {
  	//first conditional - line 50 to check to see if there are any comments in a story. if there are, display comments otherwise exclude it
  	//second conditional - line 61 to check whether or not we needed to pluralize 'comment'
    return (
      <div className={`story ${this.state.hidden}`}>
      	<div className="story-title">
      		<span><strong>{this.state.storyNum}. </strong></span>
      		<a ref="title" href={this.state.url}>{this.state.title}</a>
      	</div>
      	<div>
      		{
      			this.state.numComments === 0 ?
      			<div className="story-info">
	      			<span>{`${this.state.score} points by `}</span>
	      			<a href={`https://news.ycombinator.com/user?id=${this.state.author}`}>{this.state.author}</a>
	      			<span>{` ${moment.unix(this.state.time).fromNow()}`}</span>
	      		</div> : 
      			<div className="story-info">
	      			<span>{`${this.state.score} points by `}</span>
	      			<a ref="author" href={`https://news.ycombinator.com/user?id=${this.state.author}`}>{this.state.author}</a>
	      			<span>{` ${moment.unix(this.state.time).fromNow()} `}</span>
	      			<span>| <a ref="comments" href={`https://news.ycombinator.com/item?id=${this.state.id}`}>{this.state.numComments === 1 ? `${this.state.numComments} comment` : `${this.state.numComments} comments` }</a> |</span>
	      		</div>
      		}
      	</div>
      </div>
    );
  }
}
