import { connect } from'react-redux';
import NewStoryWidget from './NewStoryWidget';
import { addStory } from '../../reducers/stories';

const mapStateToProps = ({ users }) => ({ users });

const mapDispatchToProps = { addStory }

const NewStoryWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewStoryWidget);

export default NewStoryWidgetContainer;