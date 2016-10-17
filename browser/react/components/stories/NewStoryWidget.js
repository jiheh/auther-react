import React, { Component } from 'react';

// I need to use a classic Component to utilize 'ref'
export default class NewStoryWidget extends Component {
  render() {
    return (
      <li className="list-group-item story-item">
        <ul className="list-inline">
          <li>
            <span className="large-font" 
                  contentEditable 
                  placeholder="Story Title"
                  ref="title">
            </span>
          </li>
          <li>
            <span>by</span>
          </li>
          <li>
            <select defaultValue="noId" ref="authorId">
              <option value="noId" disabled>(select an author)</option>
              { 
                this.props.users.map((user, index) => (
                  <option key={index} value={user.id}>{user.name}</option>
                ))
              }
            </select>
          </li>
        </ul>
        <button className="btn btn-warning btn-xs" onClick={ this.validateStory.bind(this) }>
          <span className="glyphicon glyphicon-plus"></span>
        </button>
      </li>
    );
  }

  validateStory() {
    const title = this.refs.title.innerText;
    const author_id = this.refs.authorId.value;

    // only dispatch if valid
    if (title && title.length && author_id !== "noId") {
      const story = { title, author_id };
      this.props.addStory(story);
      // reset inputs
      this.refs.title.innerText = ""
      this.refs.authorId.value = "noId"
    }
  }
}