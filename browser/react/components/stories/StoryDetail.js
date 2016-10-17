import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ContentEditable from "react-contenteditable";

export default class StoryDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edited_title: '',
      edited_author_id: '', 
      edited_paragraphs: [],
    }
    this.onStoryUpdate = this.onStoryUpdate.bind(this);
    this.renderRawHTML = this.renderRawHTML.bind(this);
  }

  render() {
    const {users, story, currentUser} = this.props;

    // error case should only happen if stories hasn't loaded yet
    return (!story) ? (<div></div>) : (
      <div className="container story-container">
        <ul className="list-inline large-font">
          <li>
            <ContentEditable 
              className="large-font"
              html={story.title}
              onChange={e => this.onStoryUpdate({ title: e.target.value })}
            />
          </li>
          <li><span className="muted">by</span></li>
          <li>
            <select defaultValue={story.author_id} 
                    onChange={e => this.onStoryUpdate({ author_id: e.target.value })}>
              { 
                users.map((user, index) => (
                  <option key={index} value={user.id}>{user.name}</option>
                ))
              }
            </select>
          </li>
        </ul>
        <br />
        <ContentEditable 
           id="storytext"
           placeholder="(text here)"
           html={this.renderRawHTML()}
           onChange={e => this.onStoryUpdate({ paragraphs: e.target.value })}>
        </ContentEditable>
        <span contentEditable
              dangerouslySetInnerHTML={{ __html: "<script>console.log('hello');</script>"}}
        ></span>
      </div>
    );
  }

  renderRawHTML() {
    const {story} = this.props;
    const {edited_paragraphs} = this.state;
    let storyHTML = "";
    if (edited_paragraphs.length) {
      storyHTML = edited_paragraphs.join('<br><br>');
    } else if (story && story.paragraphs && story.paragraphs.length) {
      storyHTML = story.paragraphs.join('<br><br>');
    }
    return storyHTML;
  }

  componentDidUpdate() {
    const {story} = this.props;
    if (!story) return;
    const storyHTML = story.paragraphs.join('<br><br>');
    document.getElementById("storytext").innerHTML = storyHTML;
    // var script = document.createElement("script");
    // script.setInnerHTML = "alert('hello');";

    // foo.appendChild(script)
  }

  onStoryUpdate(storyUpdateObj) {
    const {story, updateStory} = this.props;
    // this is probsbly pretty fragile
    if (storyUpdateObj.paragraphs) {
      storyUpdateObj.paragraphs = storyUpdateObj.paragraphs.split('<br><br>')
    }
    this.setState(storyUpdateObj);
    updateStory(story.id, storyUpdateObj)
  }
}
