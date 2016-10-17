import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';
import App from './components/App';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import UsersListContainer from './components/users/UsersListContainer';
import UserDetailContainer from './components/users/UserDetailContainer';
import StoriesContainer from './components/stories/StoriesContainer';
import StoryDetailContainer from './components/stories/StoryDetailContainer';
import { receiveUsers } from './reducers/users';
import { receiveStories } from './reducers/stories';


export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={onAppEnter}>
      <IndexRoute component={Home} />
      <Route path="users" component={UsersListContainer} />
      <Route path="users/:id" component={UserDetailContainer} />
      <Route path="stories" component={StoriesContainer} />
      <Route path="stories/:id" component={StoryDetailContainer} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      // all other routes redirect to Home
      <Route path="*" component={Home} /> 
    </Route>
  </Router>
);

function onAppEnter() {
  return Promise.all([
    store.dispatch(receiveUsers()),
    store.dispatch(receiveStories()),
  ]);

}