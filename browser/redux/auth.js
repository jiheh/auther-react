import axios from 'axios';   // you may want this for AJAX

/* -----------------    ACTIONS     ------------------ */

const DUMMY_ACTION = 'DUMMY_ACTION'
// ...

/* ------------   ACTION CREATORS     ------------------ */

const dummyActionCreator = data => ({ type: DUMMY_ACTION, data })
// ...

/* ------------       REDUCER     ------------------ */

export default function reducer (currentUser = null, action) {
  switch (action.type) {
    
    case DUMMY_ACTION:
      return currentUser;

    // ...

    default: 
      return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const dummyDispatcher = data => dispatch => {
  setTimeout(() => {
    dispatch(dummyActionCreator(data));
  }, 1000);
}
