import axios from 'axios';

const RECEIVE_STORIES = 'RECEIVE_STORIES',
      DELETE_STORY = 'DELETE_STORY',
      ADD_STORY = 'ADD_STORY',
      UPDATE_STORY = 'UPDATE_STORY';

const initialStories = [];

// ACTION CREATORS
const _receiveStories = stories => ({ type: RECEIVE_STORIES, stories })
const _removeStory = id => ({ type: DELETE_STORY, id })
const _addStory = story => ({ type: ADD_STORY, story })
const _updateStory = (id, story) => ({ type: UPDATE_STORY, id, story })


// DISPATCHERS
export const receiveStories = () => dispatch => {
    axios.get('/api/stories')
         .then(res => dispatch(_receiveStories(res.data)));
}

// delete is optimistic: it deletes from the front-end, then the backend (hopefully)
export const removeStory = id => dispatch => { 
    dispatch(_removeStory(id));
    axios.delete(`/api/stories/${id}`)
         .catch(err => console.error(`Removing story: ${id} unsuccesful`, err))
}

// can't add optomistically because we get the associated author data from the backend
// this could be updated through the uses of our users reducer, but then we couldn't split up our store
export const addStory = story => dispatch => {
    axios.post('/api/stories', story)
         .then(res => res.data)
         .then(story => dispatch(_addStory(story)))
         .catch(err => console.error(`Creating story: ${story} unsuccesful`, err))
}

export const updateStory = (id, story) => dispatch => {
    dispatch(_updateStory(id, story));
    axios.put(`/api/stories/${id}`, story)
         .catch(err => console.error(`Creating story: ${story} unsuccesful`, err))
}

// REDUCER
export default function stories (state = initialStories, action) {
  switch (action.type) {
    
    case RECEIVE_STORIES: 
      return action.stories;

    case DELETE_STORY:
      return state.filter(story => story.id !== action.id);

    case ADD_STORY:
      // we'll all out new story to the front just to see it immediately 
      return [action.story, ...state];
    
    case UPDATE_STORY:
      return state.map(story => (story.id === action.id) ?
          Object.assign({}, story, action.story) : story);

    default: 
      return state;
  }
}



