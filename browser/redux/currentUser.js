import axios from 'axios';

const SET_CURRENT_USER = 'SET_CURRENT_USER'

const setUser = user => ({type: SET_CURRENT_USER, user});

export default function reducer (currentUser = {}, action) {
  switch (action.type) {
  
    case SET_CURRENT_USER:
    	return action.currentUser;

    default: 
      return currentUser;
  }
}

export const getCurrentUser = (curUserInfo) => dispatch => {
	axios.post('/login', curUserInfo)
	// .then(response => console.log(response))
	.catch(err => console.log(err));
}