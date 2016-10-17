import React from 'react';
import {Link} from 'react-router';
export default ({user, removeUser, glyphicon, currentUser}) => {
	// what to render if user isn't there
	if (!user) return <div><h2>Log in to continue</h2></div>
	
	return (
		<div className="media">
		  <div className="media-left media-middle icon-container">
	    { /* glyphicon stuff goes in here */
				glyphicon ?
			    <span
			      className={`glyphicon glyphicon-${glyphicon}`}>  
			    </span>
			  :
		  		<img className="media-object img-circle" src={user.photo}/>
		  }
		  </div>
		  <Link className="media-body"
		  			activeClassName="active" to={`/users/${user.id}`}>
		    <h4 className="media-heading tucked">
		      <div className="form-like"></div>
		      <span placeholder="Jean Doe">
		      	{user.name}
		      </span>
		    </h4>
		    <h5 className="tucked">
		      <div
		        placeholder="email@website.com"
		        className="form-like">
		      </div>
		      <span>
		      	{user.email}
		      </span>
		    </h5>
		    <h5 className="tucked">
		      <div
		        placeholder="(555) 555-5555"
		        className="form-like">
		      </div>
		      <span>
		      	{user.phone}
		      </span>
		    </h5>
		  </Link> 
		  {
		  	//Visibility Control for logged in user
		  	currentUser ?
			<div className="media-right media-middle">
				<button className="btn btn-default" 
								onClick={event => {
									console.log(event)
									event.stopPropagation();
									removeUser(user.id);
							}}>
				  <span className="glyphicon glyphicon-remove"></span>
				</button>
			</div>
			: <div className="media-right media-middle"><br/></div>
		}
		</div>
	)
}
