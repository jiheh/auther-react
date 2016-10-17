import React, { Component } from 'react';
import ContentEditable from "react-contenteditable";
import {Link} from 'react-router';
import NewStoryWidgetContainer from './NewStoryWidgetContainer';

export default class StoriesList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      search_title: '',
      search_name: ''
    }

    this.filterStoryItem = this.filterStoryItem.bind(this);
    this.renderStoryItem = this.renderStoryItem.bind(this);
  }

  render() {
    const { stories, currentUser } = this.props;
    return (  
      <div className="container">
        { /* SEARCH */}
        <div className="list-group-item story-item">
          <ul className="list-inline">
            <li>
              <ContentEditable
                placeholder="Story Title"
                className="large-font" 
                onChange={e => this.setState({ search_title: e.target.value })}
              />
            </li>
            <li>
              <span>by</span>
            </li>
            <li>
              <ContentEditable
                placeholder="Jean Doe"               
                onChange={e => this.setState({ search_name: e.target.value })}
              />
            </li>
          </ul>
          <span className="glyphicon glyphicon-search"></span>
        </div>
        { /* END SEARCH */}
        <br />

        <ul className="list-group">
        { currentUser ?
          <NewStoryWidgetContainer />
          : <div></div>
        }
          { 
            stories
              .filter(this.filterStoryItem) 
              .map(this.renderStoryItem) 
          }  
        </ul>
      </div>
    );
  }

  filterStoryItem(story) {
    const { author, title } = story;
    const name = author ? author.name : "";
    const { search_title, search_name } = this.state;

    const titleMatch = new RegExp(search_title, 'i');
    const nameMatch = new RegExp(search_name, 'i');

    return titleMatch.test(title) 
        && nameMatch.test(name);
  } 

  renderStoryItem(story, index) {
    const { removeStory, currentUser } = this.props;

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
        { currentUser ?
        <button className="btn btn-default btn-xs" onClick={ () => removeStory(story.id) }>
          <span className="glyphicon glyphicon-remove"></span>
        </button>
        : <div></div>
        }
      </li>
    );
  }
}
 


