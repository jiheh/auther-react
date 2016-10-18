import axios from 'axios';

const SET_CURRENT_USER = 'SET_CURRENT_USER'
const LOGOUT     = 'LOGOUT'

const setUser = user => ({type: SET_CURRENT_USER, currentUser: user});
const logOutUser = () => ({type: LOGOUT}, currentUser: {});

export default function reducer (currentUser = {}, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
    	return action.currentUser;

    case LOGOUT:
      return action.currentUser;

    default:
      return currentUser;
  }
}

export const getCurrentUser = (curUserInfo) => dispatch => {
	axios.post('/login', curUserInfo)
	.then(response => {
    dispatch(setUser(curUserInfo));
    console.log("LOGIN SUCCESSSFULLLLLL", response)
  })
	.catch(err => console.log(err));
}

export const logOutUserServer = () => dispatch => {
  axios.get("/logout")
  .then(response => {
    dispatch(logOutUser);
    console.log("Logged outtt")
  })
  .catch(err => console.log(err));


}
