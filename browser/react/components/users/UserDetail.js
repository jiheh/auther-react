import React, { Component } from 'react';
import UserItem from './UserItem';
import { Link } from 'react-router';
import { connect } from 'react-redux';


export default class UserDetail extends Component {
	constructor(props) {
		super(props);

		this.renderStory = this.renderStory.bind(this); 
	}

	render() {
		const {user, stories} = this.props;
		return (
			<div className="container">
		 		<UserItem user={user}></UserItem>
			  <div className="panel panel-warning">
			    <div className="panel-heading">
			      <h2 className="panel-title large-font">stories</h2>
			    </div>
			    <ul className="list-group">
			      <p className="list-group-item story-item">
			        <span>
			        </span>
			        <button className="btn btn-warning btn-xs">
			          <span className="glyphicon glyphicon-plus"></span>
			        </button>
			      </p>
			      {
			      	stories.map(this.renderStory)
			      }
			    </ul>
			  </div>
			</div>
		);
	}

	renderStory(story, index) {
		const { currentUser } = this.props;
    return (
    	<li key={index} 
          className="list-group-item story-item">
        <ul className="list-inline">
          <li>
            <Link className="large-font" to={`/stories/${story.id}`}>{story.title}</Link>
          </li>
          <li>
            <span>by</span>
          </li>
          <li>
            <Link to={`/users/${story.author_id}`}>{story.author.name}</Link>
          </li>
        </ul>
        { !currentUser ?
        <button className="btn btn-default btn-xs" onClick={ () => removeStory(story.id) }>
          <span className="glyphicon glyphicon-remove"></span>
        </button>
        : <div></div>
        }
      </li>
    )
	}
}