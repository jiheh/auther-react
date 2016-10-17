import { connect } from'react-redux';
import StoriesList from './StoriesList';
import { removeStory } from '../../reducers/stories';

const mapStateToProps = ({ stories, currentUser }) => ({ stories, currentUser });

const mapDispatchToProps = { removeStory }

const StoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoriesList);
         
export default StoriesContainer;

