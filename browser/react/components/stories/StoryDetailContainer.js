import { connect } from'react-redux';
import StoryDetail from './StoryDetail';
import { updateStory } from '../../reducers/stories';

import _ from 'lodash';

const mapStateToProps = ({ stories, users, currentUser }, ownProps) => {
  const id = Number(ownProps.params.id);
  const story = _.find(stories, story => story.id === id);
  return { story, users, currentUser }
}

const mapDispatchToProps = { updateStory }


const StoryDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryDetail);

export default StoryDetailContainer;