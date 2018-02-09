// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
// Axios
import axios from 'axios';
// Components and Containers
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Profile from '../../components/Profile/Profile';
// Styling
import './UserProfile.css';

class UserProfile extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    let profile = null;
    if (this.props.users.length > 0) {
      console.log('USERS: ', this.props.users);
      let currentUser = this.props.users.filter(user => {
        return (user._id = this.props.match.params.userId);
      })[0];
      console.log('CurrentUser: ', currentUser);
      profile = <Profile user={currentUser} />;
    }
    return <Auxillary>{profile}</Auxillary>;
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(actions.fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
