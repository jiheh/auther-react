import React, { Component } from 'react';
import UserItem from './UserItem';
import { Link } from 'react-router';
import ContentEditable from "react-contenteditable";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
        search_name: '',
        search_email: '',
        search_phone: ''
    };

    this.filterUserItem = this.filterUserItem.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.validateUser = this.validateUser.bind(this);
  }

  render() {
    const { users, currentUser } = this.props;
    return (
      <div className="container">
        <div className="user-query">
          <div className="list-group-item min-content user-item">
            <div className="media">
              <div className="media-left media-middle icon-container">
                <span className="glyphicon glyphicon-search"></span>
              </div>
              <div className="media-body">
                <h4 className="media-heading tucked">
                  <ContentEditable
                    placeholder="Jean Doe"
                    className="form-like"
                    onChange={e => this.setState({ search_name: e.target.value })}
                  />
                </h4>
                <h5 className="tucked">
                  <ContentEditable
                     placeholder="email@website.com"
                     className="form-like"
                     onChange={e => this.setState({ search_email: e.target.value })}
                  />
                </h5>
                <h5 className="tucked">
                  <ContentEditable
                    placeholder="(555) 555-5555"
                    className="form-like"
                    onChange={e => this.setState({ search_phone: e.target.value })}
                  />
                </h5>
              </div>
              <div className="media-right media-middle"></div>
            </div>
          </div>
          {            
            currentUser ? 
              <div className="list-group-item min-content user-item">
                <div className="media">
                  <div className="media-left media-middle icon-container">
                    <span className="glyphicon glyphicon-plus clickable"  onClick={this.validateUser}></span>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading tucked">
                      <span contentEditable 
                            ref="name"
                            placeholder="Jean Doe"
                            className="form-like"> 
                      </span>
                    </h4>
                    <h5 className="tucked">
                      <span contentEditable 
                            ref="email"
                            placeholder="email@website.com"
                            className="form-like">
                      </span>
                    </h5>
                    <h5 className="tucked">
                      <span contentEditable 
                            ref="phone"
                            placeholder="(555) 555-5555"
                            className="form-like">
                      </span>
                    </h5>
                  </div>
                  <div className="media-right media-middle"></div>
                </div>
              </div>
            : <div></div>
          }
        </div>
        <br />
        <br />
        <div className="user-list">
        {  
          users
            .filter(this.filterUserItem)
            .map(this.renderUser)
        }
        </div>
      </div>
    );
  }

  filterUserItem(story) {
    const {email, name, phone} = story;
    const { search_email, search_name, search_phone } = this.state;

    const emailMatch = new RegExp(search_email, 'i');
    const nameMatch  = new RegExp(search_name, 'i');
    const phoneMatch = new RegExp(search_phone, 'i');

    return emailMatch.test(email) 
        && nameMatch.test(name) 
        && phoneMatch.test(phone);
  } 

  renderUser(user, index) {
    const { removeUser, currentUser } = this.props;
    return (
      <div key={index} className="list-group-item min-content user-item">
        <UserItem user={user} removeUser={removeUser} currentUser={currentUser}/>
      </div> 
    )
  }

  validateUser() {
    console.log(this.refs)
    const user = {
      name: this.refs.name.innerText,
      phone: this.refs.phone.innerText,
      email: this.refs.email.innerText
    }
    
    // only dispatch if valid
    if (user.name && user.phone && user.email) {
      this.props.addUser(user);
      // reset inputs
      this.refs.name.innerText = ""
      this.refs.phone.innerText = ""
      this.refs.email.innerText = ""
    }
  }
}

