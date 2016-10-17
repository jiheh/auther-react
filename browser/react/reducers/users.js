import axios from 'axios';

const RECEIVE_USERS = 'RECEIVE_USERS',
      DELETE_USER = 'DELETE_USER',
      ADD_USER = 'ADD_USER';

const initialUsers = [];

// ACTION CREATORS
const _receiveUsers = users => ({ type: RECEIVE_USERS, users })

const _removeUser = id => ({ type: DELETE_USER, id })

const _addUser = user => ({ type: ADD_USER, user })

// DISPATCHERS
  // ** enabled by using the 'redux-thunk' middleware **
  //
  // Dispatchers are: an async request + an action creator + a dispatch event
  // Dispatchers allow you to call store.dispatch with a *function*
  // the function is expected to *eventually* dispatch an action to the store,
  // but need not do so immediately.
  // another plus: react-redux understands these for use with mapDispatchToProps,
  // so they can make your logic considerably simpler!
export const receiveUsers = () => dispatch => {
  axios.get('/api/users')
       .then(res => dispatch(_receiveUsers(res.data)));
}

// remove users is doing an 'optimistic' update
// we update the front-end, and only then try to update the 
// backend in response. If it fails, we just log it
export const removeUser = id => dispatch => {
  dispatch(_removeUser(id));
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccesful`, err))
}

export const addUser = user => dispatch => {
  dispatch(_addUser(user));
  axios.post('/api/users', user)
       .catch(err => console.error(`Creating user: ${user} unsuccesful`, err))
}

// REDUCER
export default function users (state = initialUsers, action) {
  switch (action.type) {
    
    case RECEIVE_USERS: 
      return action.users;

    case DELETE_USER:
      return state.filter(user => user.id !== action.id);

    case ADD_USER:
      return [action.user, ...state];
    
    default: 
      return state;
  }
}

