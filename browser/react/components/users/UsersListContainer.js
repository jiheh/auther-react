import { connect } from'react-redux';
import UsersList from './UsersList';
import { removeUser, addUser } from '../../reducers/users';

const mapStateToProps = ({ users }) => ({ users })

const mapDispatchToProps = { removeUser, addUser }

const UserListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);

export default UserListContainer;